create table if not exists public.time_entries (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    kind text not null check (kind in ('automatic', 'manual')),
    entry_date date not null,
    started_at timestamptz,
    finished_at timestamptz,
    lunch_started_at timestamptz,
    lunch_break_ms bigint not null default 0 check (lunch_break_ms >= 0),
    time_zone text,
    entry_time time,
    break_start_time time,
    break_end_time time,
    exit_time time,
    total_minutes integer check (total_minutes is null or total_minutes >= 0),
    created_at timestamptz not null default now(),
    unique (user_id, kind, entry_date)
);

alter table public.time_entries
    add column if not exists time_zone text;

create index if not exists time_entries_user_date_idx
    on public.time_entries (user_id, entry_date desc);

alter table public.time_entries enable row level security;
grant select, insert, update, delete on public.time_entries to authenticated;

drop policy if exists "Users can read their own time entries" on public.time_entries;
create policy "Users can read their own time entries"
    on public.time_entries for select to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own time entries" on public.time_entries;
create policy "Users can insert their own time entries"
    on public.time_entries for insert to authenticated
    with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own time entries" on public.time_entries;
create policy "Users can update their own time entries"
    on public.time_entries for update to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own time entries" on public.time_entries;
create policy "Users can delete their own time entries"
    on public.time_entries for delete to authenticated
    using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'avatars',
    'avatars',
    false,
    2097152,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
    public = false,
    file_size_limit = 2097152,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

drop policy if exists "Users can read their own avatar" on storage.objects;
create policy "Users can read their own avatar"
    on storage.objects for select to authenticated
    using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
    on storage.objects for update to authenticated
    using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text)
    with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
    on storage.objects for delete to authenticated
    using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create table if not exists public.vacation_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    requested_dates date[] not null check (cardinality(requested_dates) between 1 and 30),
    status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'cancelled')),
    created_at timestamptz not null default now()
);

create index if not exists vacation_requests_user_created_idx
    on public.vacation_requests (user_id, created_at desc);

alter table public.vacation_requests enable row level security;
grant select, insert on public.vacation_requests to authenticated;

drop policy if exists "Users can read their own vacation requests" on public.vacation_requests;
create policy "Users can read their own vacation requests"
    on public.vacation_requests for select to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Users can submit their own vacation requests" on public.vacation_requests;
create policy "Users can submit their own vacation requests"
    on public.vacation_requests for insert to authenticated
    with check (
        (select auth.uid()) = user_id
        and status = 'pending'
        and cardinality(requested_dates) between 1 and 30
    );

revoke update on public.vacation_requests from authenticated;
grant update (status) on public.vacation_requests to authenticated;

drop policy if exists "Users can cancel their pending vacation requests" on public.vacation_requests;
create policy "Users can cancel their pending vacation requests"
    on public.vacation_requests for update to authenticated
    using ((select auth.uid()) = user_id and status = 'pending')
    with check ((select auth.uid()) = user_id and status = 'cancelled');

create or replace function public.enforce_annual_vacation_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    request_year integer;
    existing_days integer;
    requested_days integer;
begin
    if new.status not in ('pending', 'approved') then
        return new;
    end if;

    perform pg_advisory_xact_lock(hashtextextended(new.user_id::text, 0));

    for request_year in
        select distinct extract(year from requested_dates.requested_date)::integer
        from unnest(new.requested_dates) as requested_dates(requested_date)
    loop
        select count(distinct dates.requested_date)::integer
        into existing_days
        from public.vacation_requests as request
        cross join lateral unnest(request.requested_dates) as dates(requested_date)
        where request.user_id = new.user_id
            and request.status in ('pending', 'approved')
            and request.id <> new.id
            and extract(year from dates.requested_date)::integer = request_year;

        select count(distinct dates.requested_date)::integer
        into requested_days
        from unnest(new.requested_dates) as dates(requested_date)
        where extract(year from dates.requested_date)::integer = request_year;

        if existing_days + requested_days > 30 then
            raise exception 'O limite anual de 30 dias de férias para % seria excedido.', request_year;
        end if;
    end loop;

    return new;
end;
$$;

drop trigger if exists enforce_annual_vacation_limit on public.vacation_requests;
create trigger enforce_annual_vacation_limit
    before insert or update of requested_dates, status
    on public.vacation_requests
    for each row execute function public.enforce_annual_vacation_limit();

-- Cada colaborador pode definir o próprio gestor pelo e-mail da conta cadastrada.
create table if not exists public.user_hierarchy (
    employee_id uuid primary key references auth.users(id) on delete cascade,
    manager_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz not null default now(),
    check (employee_id <> manager_id)
);

alter table public.user_hierarchy enable row level security;
revoke all on public.user_hierarchy from anon, authenticated;

create or replace function public.set_my_manager(p_manager_email text)
returns void
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
    v_employee_id uuid := auth.uid();
    v_manager_id uuid;
begin
    if v_employee_id is null then
        raise exception 'É necessário entrar na conta para configurar a hierarquia.';
    end if;

    if nullif(trim(p_manager_email), '') is null then
        delete from public.user_hierarchy where employee_id = v_employee_id;
        return;
    end if;

    select id into v_manager_id
    from auth.users
    where lower(email) = lower(trim(p_manager_email))
    limit 1;

    if v_manager_id is null then
        raise exception 'Não encontramos uma conta cadastrada com esse e-mail.';
    end if;
    if v_manager_id = v_employee_id then
        raise exception 'Você não pode definir sua própria conta como gestor.';
    end if;

    if exists (
        with recursive manager_chain(user_id) as (
            select v_manager_id
            union
            select hierarchy.manager_id
            from public.user_hierarchy as hierarchy
            join manager_chain on hierarchy.employee_id = manager_chain.user_id
        )
        select 1 from manager_chain where user_id = v_employee_id
    ) then
        raise exception 'Essa alteração criaria um ciclo na hierarquia.';
    end if;

    insert into public.user_hierarchy (employee_id, manager_id)
    values (v_employee_id, v_manager_id)
    on conflict (employee_id) do update
        set manager_id = excluded.manager_id,
            created_at = now();
end;
$$;

create or replace function public.get_my_manager_email()
returns table(manager_email text)
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
    select manager.email::text
    from public.user_hierarchy as hierarchy
    join auth.users as manager on manager.id = hierarchy.manager_id
    where hierarchy.employee_id = auth.uid()
    limit 1;
$$;

revoke all on function public.set_my_manager(text) from public, anon;
revoke all on function public.get_my_manager_email() from public, anon;
grant execute on function public.set_my_manager(text) to authenticated;
grant execute on function public.get_my_manager_email() to authenticated;

-- Cada solicitação guarda o gestor responsável e os dados do solicitante
-- para aparecer como notificação na caixa de entrada do gestor no aplicativo.
alter table public.vacation_requests
    add column if not exists manager_id uuid references auth.users(id) on delete set null,
    add column if not exists requester_email text,
    add column if not exists requester_name text;

create index if not exists vacation_requests_manager_status_idx
    on public.vacation_requests (manager_id, status, created_at desc);

create or replace function public.assign_vacation_request_manager()
returns trigger
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
begin
    new.manager_id := null;
    select hierarchy.manager_id
    into new.manager_id
    from public.user_hierarchy as hierarchy
    where hierarchy.employee_id = new.user_id;

    if new.manager_id is null then
        raise exception 'Configure seu gestor na opção Hierarquia antes de solicitar férias.';
    end if;
    if new.manager_id = new.user_id then
        raise exception 'O solicitante não pode ser o gestor da própria solicitação.';
    end if;

    select
        account.email,
        coalesce(
            nullif(account.raw_user_meta_data ->> 'full_name', ''),
            nullif(concat_ws(' ', account.raw_user_meta_data ->> 'first_name', account.raw_user_meta_data ->> 'last_name'), ''),
            account.email
        )
    into new.requester_email, new.requester_name
    from auth.users as account
    where account.id = new.user_id;

    return new;
end;
$$;

drop trigger if exists assign_vacation_request_manager on public.vacation_requests;
create trigger assign_vacation_request_manager
    before insert on public.vacation_requests
    for each row execute function public.assign_vacation_request_manager();

drop policy if exists "Managers can read their employees vacation requests" on public.vacation_requests;
create policy "Managers can read their employees vacation requests"
    on public.vacation_requests for select to authenticated
    using ((select auth.uid()) = manager_id and user_id <> (select auth.uid()));

drop policy if exists "Managers can decide their employees vacation requests" on public.vacation_requests;
create policy "Managers can decide their employees vacation requests"
    on public.vacation_requests for update to authenticated
    using (
        (select auth.uid()) = manager_id
        and user_id <> (select auth.uid())
        and status = 'pending'
    )
    with check (
        (select auth.uid()) = manager_id
        and user_id <> (select auth.uid())
        and status in ('approved', 'rejected')
    );

notify pgrst, 'reload schema';
