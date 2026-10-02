/* =========================
           SPLASH SCREEN
        ========================== */

        window.addEventListener("load", function () {

            setTimeout(function () {

                const splash =
                    document.getElementById("splashScreen");

                splash.classList.add("hidden");

            }, 2500);

        });


        const supabaseClient = window.supabase.createClient(
            "https://sikfaorfjwmjxipdeabf.supabase.co",
            "sb_publishable_KtiMslx-lfsPRfA6LPQGiQ_opr9e3UF",
            { auth: { persistSession: true, storage: window.localStorage, autoRefreshToken: true, detectSessionInUrl: false } }
        );
        const loginForm = document.getElementById("loginForm");
        const authMessage = document.getElementById("authMessage");
        const loginButton = loginForm.querySelector('button[type="submit"]');
        const toggleAuthMode = document.getElementById("toggleAuthMode");
        const forgotPassword = document.getElementById("forgotPassword");
        const signupFields = document.querySelectorAll(".signup-field");
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const passwordInput = document.getElementById("password");
        const passwordConfirmationInput = document.getElementById("passwordConfirmation");
        const loginScreen = document.querySelector(".login-card");
        const dashboardScreen = document.getElementById("dashboardScreen");
        const dashboardUser = document.getElementById("dashboardUser");
        const dashboardClock = document.getElementById("dashboardClock");
        const timerCaption = document.getElementById("timerCaption");
        const sidebarAccount = document.getElementById("sidebarAccount");
        const profileName = document.getElementById("profileName");
        const avatarFile = document.getElementById("avatarFile");
        const avatarImage = document.getElementById("avatarImage");
        const profilePhotoPreview = document.getElementById("profilePhotoPreview");
        const profilePhotoImage = document.getElementById("profilePhotoImage");
        const profileForm = document.getElementById("profileForm");
        const profileNameInput = document.getElementById("profileNameInput");
        const profileJobTitleInput = document.getElementById("profileJobTitleInput");
        const profilePhoneInput = document.getElementById("profilePhoneInput");
        const profileMessage = document.getElementById("profileMessage");
        const saveProfileButton = document.getElementById("saveProfileButton");
        const avatarUpload = document.querySelector(".avatar-upload");
        const sidebarMonthLabel = document.getElementById("sidebarMonthLabel");
        const sidebarDays = document.getElementById("sidebarDays");
        const dashboardSidebar = document.querySelector(".dashboard-sidebar");
        const todayDate = document.getElementById("todayDate");
        const todayHours = document.getElementById("todayHours");
        const trackingStatus = document.getElementById("trackingStatus");
        const startShiftButton = document.getElementById("startShiftButton");
        const lunchPauseButton = document.getElementById("lunchPauseButton");
        const lunchResumeButton = document.getElementById("lunchResumeButton");
        const finishShiftButton = document.getElementById("finishShiftButton");
        const dashboardMessage = document.getElementById("dashboardMessage");
        const historyList = document.getElementById("historyList");
        const logoutButton = document.getElementById("logoutButton");
        const logoutButtonManagement = document.getElementById("logoutButtonManagement");
        const logoutButtonProfile = document.getElementById("logoutButtonProfile");
        const overviewView = document.getElementById("overviewView");
        const timeManagementView = document.getElementById("timeManagementView");
        const profileView = document.getElementById("profileView");
        const hierarchyView = document.getElementById("hierarchyView");
        const hierarchyForm = document.getElementById("hierarchyForm");
        const managerEmailInput = document.getElementById("managerEmailInput");
        const hierarchyMessage = document.getElementById("hierarchyMessage");
        const managerDecisionMessage = document.getElementById("managerDecisionMessage");
        const hierarchyNotificationCount = document.getElementById("hierarchyNotificationCount");
        const managerVacationRequests = document.getElementById("managerVacationRequests");
        const saveHierarchyButton = document.getElementById("saveHierarchyButton");
        const navigationButtons = document.querySelectorAll(".nav-button");
        const timeEntryForm = document.getElementById("timeEntryForm");
        const timeEntryMessage = document.getElementById("timeEntryMessage");
        const manualEntriesList = document.getElementById("manualEntriesList");
        const exportRecordsButton = document.getElementById("exportRecordsButton");
        const exportRecordsMessage = document.getElementById("exportRecordsMessage");
        const vacationMonthLabel = document.getElementById("vacationMonthLabel");
        const vacationCalendarDays = document.getElementById("vacationCalendarDays");
        const vacationSelectionCount = document.getElementById("vacationSelectionCount");
        const requestVacationButton = document.getElementById("requestVacationButton");
        const vacationMessage = document.getElementById("vacationMessage");
        const vacationRequestList = document.getElementById("vacationRequestList");
        const confirmationOverlay = document.getElementById("confirmationOverlay");
        const confirmationTitle = document.getElementById("confirmationTitle");
        const confirmationMessage = document.getElementById("confirmationMessage");
        const confirmationCancel = document.getElementById("confirmationCancel");
        const confirmationAccept = document.getElementById("confirmationAccept");
        const entryDate = document.getElementById("entryDate");
        const entryDateDisplay = document.getElementById("entryDateDisplay");
        const datePicker = document.getElementById("datePicker");
        const datePickerToggle = document.getElementById("datePickerToggle");
        const calendarPopover = document.getElementById("calendarPopover");
        const calendarMonthLabel = document.getElementById("calendarMonthLabel");
        const calendarDays = document.getElementById("calendarDays");
        document.body.appendChild(calendarPopover);
        let calendarCursor = new Date();
        let isSignUpMode = false;
        let authenticatedUser = null;
        let profileLoadedForUserId = null;
        let loadedDataUserId = null;
        let userDataLoadPromise = null;
        let loadingDataUserId = null;
        let savedEntriesCache = [];
        let manualEntriesCache = [];
        let avatarLoadedForUserId = null;
        let avatarUrlExpiresAt = 0;
        const sessionIdleLimitMs = 10 * 60 * 1000;
        let sessionExpiryTimer = null;
        let confirmationResolver = null;
        let confirmationPreviousFocus = null;
        let sidebarMonthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        let vacationMonthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        let selectedVacationDates = new Set();
        let vacationRequestsCache = [];
        let lastOwnVacationRequestsRefreshAt = 0;
        let ownVacationRequestsLoading = false;
        let managerVacationRequestsCache = [];
        let currentManagerEmail = "";
        let hierarchySetupError = "";
        let lastManagerRequestsRefreshAt = 0;
        let managerRequestsLoading = false;
        let managerVacationDecisionId = null;
        let expandedVacationRequestId = null;
        let vacationSetupError = "";
        let vacationRequestSubmitting = false;
        let vacationRequestCancellingId = null;
        let vacationRangePointerId = null;
        let vacationRangeStart = "";
        let vacationRangeEnd = "";
        let vacationRangePressedDate = "";
        let vacationRangeMoved = false;

        function getLocalDateKey(date = new Date()) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }

        function getVacationDateRange(startKey, endKey) {
            if (!startKey || !endKey) return [];
            const [startYear, startMonth, startDay] = startKey.split("-").map(Number);
            const [endYear, endMonth, endDay] = endKey.split("-").map(Number);
            const current = new Date(startYear, startMonth - 1, startDay);
            const end = new Date(endYear, endMonth - 1, endDay);
            const direction = startKey <= endKey ? 1 : -1;
            const dates = [];
            while (direction > 0 ? current <= end : current >= end) {
                dates.push(getLocalDateKey(current));
                current.setDate(current.getDate() + direction);
            }
            return dates;
        }

        function getReservedVacationDates() {
            return new Set(
                vacationRequestsCache
                    .filter((request) => request.status === "pending" || request.status === "approved")
                    .flatMap((request) => request.requested_dates || [])
            );
        }

        function getVacationDaysUsed(year) {
            const yearPrefix = `${year}-`;
            return new Set(
                vacationRequestsCache
                    .filter((request) => request.status === "pending" || request.status === "approved")
                    .flatMap((request) => request.requested_dates || [])
                    .filter((dateKey) => dateKey.startsWith(yearPrefix))
            );
        }

        function getVacationDaysSelected(year) {
            const yearPrefix = `${year}-`;
            return [...selectedVacationDates].filter((dateKey) => dateKey.startsWith(yearPrefix)).length;
        }

        function getVacationSelectionYears() {
            const years = new Set([...selectedVacationDates].map((dateKey) => dateKey.slice(0, 4)));
            if (!years.size) years.add(String(vacationMonthCursor.getFullYear()));
            return [...years].sort();
        }

        function getVacationQuotaSummary() {
            return getVacationSelectionYears().map((year) => {
                const used = getVacationDaysUsed(year).size;
                const selected = getVacationDaysSelected(year);
                return `${Math.max(0, 30 - used - selected)} de 30 dias disponíveis em ${year}`;
            }).join(" · ");
        }

        function updateVacationRangePreview() {
            const reservedDates = getReservedVacationDates();
            const previewDates = new Set();
            let remainingSlots = 30 - selectedVacationDates.size;
            const annualCounts = new Map();
            for (const dateKey of selectedVacationDates) {
                const year = dateKey.slice(0, 4);
                annualCounts.set(year, getVacationDaysUsed(year).size + getVacationDaysSelected(year));
            }
            for (const dateKey of getVacationDateRange(vacationRangeStart, vacationRangeEnd)) {
                if (dateKey < getLocalDateKey() || (reservedDates.has(dateKey) && !selectedVacationDates.has(dateKey))) break;
                if (selectedVacationDates.has(dateKey)) {
                    previewDates.add(dateKey);
                } else if (remainingSlots > 0) {
                    const year = dateKey.slice(0, 4);
                    const usedInYear = annualCounts.get(year) ?? getVacationDaysUsed(year).size;
                    if (usedInYear >= 30) break;
                    previewDates.add(dateKey);
                    remainingSlots -= 1;
                    annualCounts.set(year, usedInYear + 1);
                } else break;
            }
            vacationCalendarDays.querySelectorAll(".vacation-day").forEach((button) => {
                button.classList.toggle("is-range-preview", previewDates.has(button.dataset.date));
            });
            vacationSelectionCount.textContent = `${new Set([...selectedVacationDates, ...previewDates]).size} de 30 dias selecionados`;
        }

        function setVacationSelectionRange(startKey, endKey) {
            const start = startKey < endKey ? startKey : endKey;
            const end = startKey < endKey ? endKey : startKey;
            let dates = getVacationDateRange(start, end);
            if (dates.length > 30) {
                if (selectedVacationDates.size) {
                    vacationMessage.textContent = "O limite é de 30 dias por solicitação.";
                    return false;
                }
                dates = dates.slice(0, 30);
                vacationMessage.textContent = "O limite é de 30 dias; foram selecionados os primeiros 30 dias do intervalo.";
            }

            const reservedDates = getReservedVacationDates();
            if (dates.some((dateKey) => dateKey < getLocalDateKey() || reservedDates.has(dateKey))) {
                vacationMessage.textContent = "O período não pode incluir dias passados ou já solicitados.";
                return false;
            }

            const selectedByYear = new Map();
            dates.forEach((dateKey) => {
                const year = dateKey.slice(0, 4);
                selectedByYear.set(year, (selectedByYear.get(year) || 0) + 1);
            });
            for (const [year, count] of selectedByYear) {
                if (getVacationDaysUsed(year).size + count > 30) {
                    vacationMessage.textContent = `O limite anual de 30 dias para ${year} seria excedido.`;
                    return false;
                }
            }

            selectedVacationDates = new Set(dates);
            return true;
        }

        function toggleVacationDate(dateKey) {
            const selectedRange = [...selectedVacationDates].sort();
            vacationMessage.textContent = "";
            if (!selectedRange.length) {
                setVacationSelectionRange(dateKey, dateKey);
            } else if (dateKey < selectedRange[0] || dateKey > selectedRange[selectedRange.length - 1]) {
                setVacationSelectionRange(selectedRange[0], dateKey);
            } else if (selectedRange.length === 1) {
                selectedVacationDates.clear();
            } else if (dateKey === selectedRange[0]) {
                setVacationSelectionRange(selectedRange[1], selectedRange[selectedRange.length - 1]);
            } else if (dateKey === selectedRange[selectedRange.length - 1]) {
                setVacationSelectionRange(selectedRange[0], selectedRange[selectedRange.length - 2]);
            } else {
                setVacationSelectionRange(selectedRange[0], dateKey);
            }
            renderVacationCalendar();
        }

        function renderVacationCalendar() {
            if (!authenticatedUser) return;
            vacationMonthLabel.textContent = vacationMonthCursor.toLocaleDateString("pt-BR", {
                month: "long", year: "numeric"
            });
            vacationCalendarDays.replaceChildren();

            const year = vacationMonthCursor.getFullYear();
            const month = vacationMonthCursor.getMonth();
            const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const todayKey = getLocalDateKey();
            const reservedDates = getReservedVacationDates();
            const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            document.getElementById("vacationPreviousMonth").disabled = vacationMonthCursor <= currentMonth;

            for (let blankIndex = 0; blankIndex < firstWeekday; blankIndex += 1) {
                const blank = document.createElement("span");
                blank.setAttribute("aria-hidden", "true");
                vacationCalendarDays.appendChild(blank);
            }

            for (let day = 1; day <= daysInMonth; day += 1) {
                const date = new Date(year, month, day);
                const dateKey = getLocalDateKey(date);
                const isSelected = selectedVacationDates.has(dateKey);
                const isReserved = reservedDates.has(dateKey);
                const dayButton = document.createElement("button");
                dayButton.type = "button";
                dayButton.className = "vacation-day";
                dayButton.textContent = String(day);
                dayButton.setAttribute("aria-pressed", String(isSelected));
                dayButton.setAttribute("aria-label", date.toLocaleDateString("pt-BR", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric"
                }));
                dayButton.dataset.date = dateKey;
                const annualLimitReached = getVacationDaysUsed(year).size + getVacationDaysSelected(year) >= 30;
                dayButton.disabled = dateKey < todayKey || isReserved || (!isSelected && (selectedVacationDates.size >= 30 || annualLimitReached));
                if (isReserved) dayButton.title = "Este dia já está em uma solicitação pendente ou aprovada.";
                else if (annualLimitReached) dayButton.title = `O limite anual de 30 dias para ${year} foi atingido.`;
                dayButton.addEventListener("click", (event) => {
                    if (event.detail === 0 && !dayButton.disabled) {
                        vacationMessage.textContent = "";
                        toggleVacationDate(dateKey);
                    }
                });
                vacationCalendarDays.appendChild(dayButton);
            }

            const selectedCount = selectedVacationDates.size;
            vacationSelectionCount.textContent = `${selectedCount} selecionados · ${getVacationQuotaSummary()}`;
            if (vacationSetupError) {
                vacationMessage.style.color = "#b42318";
                vacationMessage.textContent = "Férias indisponíveis. Execute o supabase-setup.sql atualizado no projeto Supabase.";
            }
            const managerIsConfigured = Boolean(currentManagerEmail) && !hierarchySetupError;
            if (!vacationSetupError && hierarchySetupError) {
                vacationMessage.style.color = "#b42318";
                vacationMessage.textContent = "Atualize o supabase-setup.sql para encaminhar solicitações ao gestor.";
            } else if (!vacationSetupError && !currentManagerEmail) {
                vacationMessage.style.color = "#8a5b12";
                vacationMessage.textContent = "Defina seu gestor na opção Hierarquia antes de solicitar férias.";
            }
            requestVacationButton.disabled = selectedCount === 0 || selectedCount > 30 || vacationRequestSubmitting || Boolean(vacationSetupError) || !managerIsConfigured;
            requestVacationButton.textContent = vacationRequestSubmitting ? "Enviando..." : "Solicitar férias";
        }

        function renderVacationRequests() {
            vacationRequestList.replaceChildren();
            const requests = [...vacationRequestsCache].sort((first, second) =>
                new Date(second.created_at) - new Date(first.created_at)
            );
            if (!requests.length) return;

            const statuses = {
                pending: "Pendente",
                approved: "Aprovada",
                rejected: "Recusada",
                cancelled: "Cancelada"
            };
            requests.forEach((request) => {
                const row = document.createElement("div");
                row.className = "vacation-request-row";
                const dates = document.createElement("span");
                dates.textContent = (request.requested_dates || []).map((dateKey) =>
                    new Date(`${dateKey}T12:00:00`).toLocaleDateString("pt-BR")
                ).join(", ");
                const status = document.createElement("span");
                status.className = "vacation-request-status";
                status.textContent = statuses[request.status] || request.status;
                row.append(dates, status);
                if (request.status === "pending") {
                    const cancelButton = document.createElement("button");
                    cancelButton.type = "button";
                    cancelButton.className = "vacation-cancel-button";
                    cancelButton.textContent = vacationRequestCancellingId === request.id ? "Cancelando..." : "Cancelar";
                    cancelButton.disabled = vacationRequestCancellingId === request.id;
                    cancelButton.setAttribute("aria-label", "Cancelar solicitação de férias pendente");
                    cancelButton.addEventListener("click", () => void cancelVacationRequest(request.id));
                    row.appendChild(cancelButton);
                }
                vacationRequestList.appendChild(row);
            });
        }

        async function cancelVacationRequest(requestId) {
            if (!authenticatedUser || vacationRequestCancellingId) return;
            const request = vacationRequestsCache.find((item) => item.id === requestId);
            if (!request || request.status !== "pending") return;

            const userId = authenticatedUser.id;
            if (!(await requestConfirmation("Deseja cancelar esta solicitação de férias?", "Sim, cancelar"))) return;
            if (authenticatedUser?.id !== userId) return;
            vacationRequestCancellingId = requestId;
            vacationMessage.style.color = "#6b7280";
            vacationMessage.textContent = "Cancelando solicitação...";
            renderVacationRequests();
            try {
                const { data, error } = await supabaseClient
                    .from("vacation_requests")
                    .update({ status: "cancelled" })
                    .eq("id", requestId)
                    .eq("user_id", userId)
                    .eq("status", "pending")
                    .select("id, status")
                    .single();
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;
                const cachedRequest = vacationRequestsCache.find((item) => item.id === data.id);
                if (cachedRequest) cachedRequest.status = data.status;
                vacationMessage.style.color = "#16794b";
                vacationMessage.textContent = "Solicitação de férias cancelada.";
                renderVacationRequests();
                renderVacationCalendar();
            } catch (error) {
                vacationMessage.style.color = "#b42318";
                vacationMessage.textContent = error.message || "Não foi possível cancelar a solicitação.";
            } finally {
                vacationRequestCancellingId = null;
                renderVacationRequests();
            }
        }

        function updateHierarchyNotificationBadge() {
            const pendingCount = managerVacationRequestsCache.length;
            hierarchyNotificationCount.textContent = String(pendingCount);
            hierarchyNotificationCount.hidden = pendingCount === 0;
        }

        function renderManagerVacationRequests() {
            managerVacationRequests.replaceChildren();
            if (!managerVacationRequestsCache.length) {
                const emptyState = document.createElement("p");
                emptyState.className = "hours-caption";
                emptyState.textContent = "Nenhuma solicitação pendente.";
                managerVacationRequests.appendChild(emptyState);
                return;
            }

            managerVacationRequestsCache.forEach((request) => {
                const row = document.createElement("div");
                row.className = "vacation-request-row";
                const copy = document.createElement("div");
                copy.className = "hierarchy-request-copy";
                const requester = document.createElement("strong");
                requester.textContent = request.requester_name || request.requester_email || "Colaborador";
                const email = document.createElement("small");
                email.textContent = request.requester_email || "";
                copy.append(requester, email);
                const status = document.createElement("span");
                status.className = "vacation-request-status";
                status.textContent = "Pendente";
                const analyzeButton = document.createElement("button");
                analyzeButton.type = "button";
                analyzeButton.className = "hierarchy-analyze-button";
                analyzeButton.textContent = expandedVacationRequestId === request.id ? "Fechar análise" : "Analisar solicitação";
                analyzeButton.setAttribute("aria-expanded", String(expandedVacationRequestId === request.id));
                analyzeButton.addEventListener("click", () => {
                    expandedVacationRequestId = expandedVacationRequestId === request.id ? null : request.id;
                    renderManagerVacationRequests();
                });
                row.append(copy, status, analyzeButton);

                if (expandedVacationRequestId === request.id) {
                    const review = document.createElement("div");
                    review.className = "hierarchy-review";
                    const dates = document.createElement("p");
                    const formattedDates = (request.requested_dates || []).map((dateKey) =>
                        new Date(`${dateKey}T12:00:00`).toLocaleDateString("pt-BR", {
                            weekday: "long", day: "numeric", month: "long", year: "numeric"
                        })
                    );
                    dates.textContent = `Período solicitado (${formattedDates.length} dia(s)): ${formattedDates.join("; ")}`;
                    const actions = document.createElement("div");
                    actions.className = "hierarchy-review-actions";
                    const approveButton = document.createElement("button");
                    approveButton.type = "button";
                    approveButton.className = "hierarchy-approve-button";
                    approveButton.textContent = managerVacationDecisionId === request.id ? "Salvando..." : "Aprovar férias";
                    approveButton.disabled = managerVacationDecisionId === request.id;
                    approveButton.addEventListener("click", () => void decideVacationRequest(request.id, "approved"));
                    const rejectButton = document.createElement("button");
                    rejectButton.type = "button";
                    rejectButton.className = "hierarchy-reject-button";
                    rejectButton.textContent = managerVacationDecisionId === request.id ? "Salvando..." : "Reprovar férias";
                    rejectButton.disabled = managerVacationDecisionId === request.id;
                    rejectButton.addEventListener("click", () => void decideVacationRequest(request.id, "rejected"));
                    actions.append(approveButton, rejectButton);
                    review.append(dates, actions);
                    row.appendChild(review);
                }
                managerVacationRequests.appendChild(row);
            });
        }

        async function decideVacationRequest(requestId, decision) {
            if (!authenticatedUser || managerVacationDecisionId) return;
            if (decision !== "approved" && decision !== "rejected") return;
            const request = managerVacationRequestsCache.find((item) => item.id === requestId);
            if (!request) return;

            const userId = authenticatedUser.id;
            if (request.user_id === userId) {
                managerDecisionMessage.style.color = "#b42318";
                managerDecisionMessage.textContent = "Você não pode aprovar ou reprovar sua própria solicitação.";
                return;
            }
            const decisionLabel = decision === "approved" ? "aprovar" : "reprovar";
            const confirmLabel = decision === "approved" ? "Sim, aprovar" : "Sim, reprovar";
            if (!(await requestConfirmation(`Deseja ${decisionLabel} as férias de ${request.requester_name || request.requester_email || "este colaborador"}?`, confirmLabel))) return;
            if (authenticatedUser?.id !== userId) return;

            managerVacationDecisionId = requestId;
            managerDecisionMessage.textContent = "";
            renderManagerVacationRequests();
            try {
                const { error } = await supabaseClient
                    .from("vacation_requests")
                    .update({ status: decision })
                    .eq("id", requestId)
                    .eq("manager_id", userId)
                    .neq("user_id", userId)
                    .eq("status", "pending")
                    .select("id")
                    .single();
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;
                managerVacationRequestsCache = managerVacationRequestsCache.filter((item) => item.id !== requestId);
                expandedVacationRequestId = null;
                managerDecisionMessage.style.color = "#16794b";
                managerDecisionMessage.textContent = decision === "approved"
                    ? "Solicitação aprovada."
                    : "Solicitação reprovada.";
                updateHierarchyNotificationBadge();
            } catch (error) {
                managerDecisionMessage.style.color = "#b42318";
                managerDecisionMessage.textContent = error.message || "Não foi possível registrar a decisão. Execute o supabase-setup.sql atualizado.";
            } finally {
                managerVacationDecisionId = null;
                renderManagerVacationRequests();
            }
        }

        async function refreshManagerVacationRequests() {
            if (!authenticatedUser || managerRequestsLoading) return;
            managerRequestsLoading = true;
            const userId = authenticatedUser.id;
            try {
                const { data, error } = await supabaseClient
                    .from("vacation_requests")
                    .select("id, user_id, requested_dates, created_at, requester_email, requester_name")
                    .eq("manager_id", userId)
                    .neq("user_id", userId)
                    .eq("status", "pending")
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;
                managerVacationRequestsCache = data || [];
                lastManagerRequestsRefreshAt = Date.now();
                renderManagerVacationRequests();
                updateHierarchyNotificationBadge();
            } finally {
                managerRequestsLoading = false;
            }
        }

        async function refreshOwnVacationRequests() {
            if (!authenticatedUser || ownVacationRequestsLoading) return;
            ownVacationRequestsLoading = true;
            const userId = authenticatedUser.id;
            try {
                const { data, error } = await supabaseClient
                    .from("vacation_requests")
                    .select("id, requested_dates, status, created_at")
                    .eq("user_id", userId)
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;
                vacationRequestsCache = data || [];
                lastOwnVacationRequestsRefreshAt = Date.now();
                renderVacationRequests();
                renderVacationCalendar();
            } finally {
                ownVacationRequestsLoading = false;
            }
        }

        async function loadHierarchyData() {
            if (!authenticatedUser) return;
            const userId = authenticatedUser.id;
            hierarchyMessage.textContent = "";
            try {
                const { data, error } = await supabaseClient.rpc("get_my_manager_email");
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;
                currentManagerEmail = data?.[0]?.manager_email || "";
                managerEmailInput.value = currentManagerEmail;
                hierarchySetupError = "";
            } catch (error) {
                currentManagerEmail = "";
                managerEmailInput.value = "";
                hierarchySetupError = error.message || "A hierarquia ainda não foi configurada no Supabase.";
                hierarchyMessage.style.color = "#b42318";
                hierarchyMessage.textContent = "Execute o supabase-setup.sql atualizado no projeto Supabase para ativar a hierarquia.";
            }

            try {
                await refreshManagerVacationRequests();
            } catch (error) {
                hierarchySetupError = hierarchySetupError || error.message || "Não foi possível carregar as notificações.";
                hierarchyMessage.style.color = "#b42318";
                hierarchyMessage.textContent = "Não foi possível carregar as notificações. Confira se o supabase-setup.sql atualizado foi executado.";
                managerVacationRequestsCache = [];
                renderManagerVacationRequests();
                updateHierarchyNotificationBadge();
            }
            renderVacationCalendar();
        }

        async function saveMyManager(managerEmail) {
            if (!authenticatedUser) return;
            const normalizedEmail = managerEmail.trim().toLowerCase();
            saveHierarchyButton.disabled = true;
            hierarchyMessage.style.color = "#16794b";
            hierarchyMessage.textContent = "Salvando...";
            try {
                const { error } = await supabaseClient.rpc("set_my_manager", {
                    p_manager_email: normalizedEmail
                });
                if (error) throw error;
                currentManagerEmail = normalizedEmail;
                managerEmailInput.value = normalizedEmail;
                hierarchyMessage.textContent = normalizedEmail
                    ? "Gestor salvo. As próximas solicitações de férias serão encaminhadas a essa conta."
                    : "Gestor removido da hierarquia.";
                hierarchySetupError = "";
                renderVacationCalendar();
            } catch (error) {
                hierarchyMessage.style.color = "#b42318";
                hierarchyMessage.textContent = error.message || "Não foi possível salvar o gestor. Confira se o e-mail pertence a uma conta cadastrada.";
            } finally {
                saveHierarchyButton.disabled = false;
            }
        }

        async function submitVacationRequest() {
            if (!authenticatedUser || vacationRequestSubmitting) return;
            if (hierarchySetupError || !currentManagerEmail) {
                vacationMessage.style.color = "#b42318";
                vacationMessage.textContent = "Defina seu gestor na opção Hierarquia antes de solicitar férias.";
                return;
            }
            if (vacationSetupError) {
                vacationMessage.style.color = "#b42318";
                vacationMessage.textContent = "Férias indisponíveis. Execute o supabase-setup.sql atualizado no projeto Supabase.";
                return;
            }
            const userId = authenticatedUser.id;
            const requestedDates = [...selectedVacationDates].sort();
            if (!requestedDates.length || requestedDates.length > 30) return;

            vacationRequestSubmitting = true;
            vacationMessage.textContent = "";
            renderVacationCalendar();
            try {
                const { data, error } = await supabaseClient
                    .from("vacation_requests")
                    .insert({ user_id: userId, requested_dates: requestedDates })
                    .select("id, requested_dates, status, created_at")
                    .single();
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;

                vacationRequestsCache.unshift(data);
                selectedVacationDates.clear();
                vacationMessage.style.color = "#16794b";
                vacationMessage.textContent = "Solicitação enviada para aprovação.";
                renderVacationRequests();
            } catch (error) {
                vacationMessage.style.color = "#b42318";
                vacationMessage.textContent = error.message || "Não foi possível enviar a solicitação.";
            } finally {
                vacationRequestSubmitting = false;
                renderVacationCalendar();
            }
        }

        function renderSidebarDays() {
            if (!authenticatedUser) return;
            const year = sidebarMonthCursor.getFullYear();
            const month = sidebarMonthCursor.getMonth();
            sidebarMonthLabel.textContent = sidebarMonthCursor.toLocaleDateString("pt-BR", {
                month: "long", year: "numeric"
            });
            sidebarDays.replaceChildren();

            const recordedDates = new Set([
                ...getManualEntries().map((entry) => entry.date),
                ...getSavedEntries().map((entry) => entry.date)
            ]);
            const selectedDate = entryDate.value;
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let day = 1; day <= daysInMonth; day += 1) {
                const date = new Date(year, month, day);
                const dateKey = getLocalDateKey(date);
                const dayButton = document.createElement("button");
                dayButton.type = "button";
                dayButton.className = "sidebar-day-button";
                dayButton.dataset.date = dateKey;
                dayButton.setAttribute("aria-label", `Abrir registros de ${date.toLocaleDateString("pt-BR", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric"
                })}`);
                if (dateKey === selectedDate) dayButton.setAttribute("aria-current", "date");
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const isToday = dateKey === getLocalDateKey();
                dayButton.disabled = !isToday;
                if (isWeekend) {
                    dayButton.classList.add("is-weekend");
                    dayButton.setAttribute("aria-label", `${dayButton.getAttribute("aria-label")}. Nenhum registro esperado.`);
                }

                const label = document.createElement("span");
                label.className = "sidebar-day-label";
                const weekday = document.createElement("span");
                weekday.textContent = date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "").toLocaleUpperCase("pt-BR");
                const dayCopy = document.createElement("span");
                dayCopy.className = "sidebar-day-copy";
                const dayText = document.createElement("span");
                dayText.textContent = `${String(day).padStart(2, "0")} · ${date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}`;
                dayCopy.appendChild(dayText);
                if (isWeekend) {
                    const weekendNote = document.createElement("span");
                    weekendNote.className = "sidebar-day-note";
                    weekendNote.textContent = "Nenhum registro esperado";
                    dayCopy.appendChild(weekendNote);
                }
                label.append(weekday, dayCopy);

                const status = document.createElement("span");
                status.className = "sidebar-day-status";
                status.setAttribute("aria-label", recordedDates.has(dateKey) ? "Horário registrado" : "Sem registro");
                if (recordedDates.has(dateKey)) status.classList.add("has-entry");
                dayButton.append(label, status);
                dayButton.addEventListener("click", () => {
                    sidebarMonthCursor = new Date(year, month, 1);
                    entryDate.value = dateKey;
                    syncDateDisplay(dateKey);
                    entryDate.dispatchEvent(new Event("change", { bubbles: true }));
                    showDashboardView("timeManagement");
                    dashboardSidebar.classList.remove("days-open");
                    renderSidebarDays();
                });
                sidebarDays.appendChild(dayButton);
            }
        }

        function changeSidebarMonth(amount) {
            sidebarMonthCursor = new Date(
                sidebarMonthCursor.getFullYear(),
                sidebarMonthCursor.getMonth() + amount,
                1
            );
            renderSidebarDays();
        }

        async function loadProfilePhoto() {
            if (!authenticatedUser) return;
            const userId = authenticatedUser.id;
            if (avatarLoadedForUserId === userId && Date.now() < avatarUrlExpiresAt) return;
            try {
                const { data, error } = await supabaseClient.storage
                    .from("avatars")
                    .createSignedUrl(`${userId}/avatar`, 3600);
                if (error) throw error;
                if (authenticatedUser?.id !== userId) return;
                const photo = data.signedUrl;
                avatarImage.src = photo || "";
                avatarUpload.classList.toggle("has-photo", Boolean(photo));
                profilePhotoImage.src = photo || "";
                profilePhotoPreview.classList.toggle("has-photo", Boolean(photo));
                avatarLoadedForUserId = userId;
                avatarUrlExpiresAt = Date.now() + 55 * 60 * 1000;
            } catch {
                if (authenticatedUser?.id !== userId) return;
                let photo = "";
                try {
                    photo = localStorage.getItem(`timetrack-avatar-${userId}`) || "";
                } catch { }
                avatarImage.src = photo;
                profilePhotoImage.src = photo;
                avatarUpload.classList.remove("has-photo");
                avatarUpload.classList.toggle("has-photo", Boolean(photo));
                profilePhotoPreview.classList.toggle("has-photo", Boolean(photo));
            }
        }

        function loadProfileForm(user) {
            if (profileLoadedForUserId === user.id) return;
            const metadata = user.user_metadata || {};
            profileNameInput.value = metadata.full_name || [metadata.first_name, metadata.last_name].filter(Boolean).join(" ");
            profileJobTitleInput.value = metadata.job_title || "";
            profilePhoneInput.value = metadata.phone || "";
            profileMessage.textContent = "";
            profileMessage.style.color = "#16794b";
            profileLoadedForUserId = user.id;
        }

        function getSessionActivityKey(userId) {
            return `timetrack-last-activity-${userId}`;
        }

        function readLastSessionActivity(userId) {
            try {
                return Number(localStorage.getItem(getSessionActivityKey(userId))) || 0;
            } catch {
                return 0;
            }
        }

        function writeLastSessionActivity(userId, timestamp = Date.now()) {
            try {
                localStorage.setItem(getSessionActivityKey(userId), String(timestamp));
            } catch {
                // The in-memory timeout still applies if browser storage is unavailable.
            }
        }

        function scheduleSessionExpiry(user) {
            if (sessionExpiryTimer) window.clearTimeout(sessionExpiryTimer);
            const lastActivity = readLastSessionActivity(user.id) || Date.now();
            const remaining = sessionIdleLimitMs - (Date.now() - lastActivity);
            if (remaining <= 0) {
                sessionExpiryTimer = window.setTimeout(async () => {
                    try {
                        await supabaseClient.auth.signOut();
                        showAuthMessage("Sua sessão expirou após 10 minutos sem atividade. Entre novamente.", true);
                    } catch {
                        showLoginScreen();
                    }
                }, 0);
                return;
            }
            sessionExpiryTimer = window.setTimeout(() => scheduleSessionExpiry(user), remaining);
        }

        function recordSessionActivity() {
            if (!authenticatedUser) return;
            writeLastSessionActivity(authenticatedUser.id);
            scheduleSessionExpiry(authenticatedUser);
        }

        ["pointerdown", "keydown", "touchstart", "scroll"].forEach((eventName) => {
            document.addEventListener(eventName, recordSessionActivity, { passive: true });
        });

        window.addEventListener("storage", (event) => {
            if (authenticatedUser && event.key === getSessionActivityKey(authenticatedUser.id)) {
                scheduleSessionExpiry(authenticatedUser);
            }
        });

        function syncDateDisplay(dateValue = entryDate.value) {
            if (!dateValue) {
                entryDateDisplay.value = "";
                return;
            }
            const [year, month, day] = dateValue.split("-").map(Number);
            entryDateDisplay.value = new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
                day: "2-digit", month: "long", year: "numeric"
            });
        }

        function closeCalendar() {
            calendarPopover.hidden = true;
            datePicker.closest(".dashboard-card")?.classList.remove("calendar-open");
            datePickerToggle.setAttribute("aria-expanded", "false");
            entryDateDisplay.setAttribute("aria-expanded", "false");
        }

        function placePopover(popover, anchor) {
            const anchorRect = anchor.getBoundingClientRect();
            const margin = 12;
            const gap = 10;
            const width = popover.offsetWidth;
            const height = popover.offsetHeight;
            const maxLeft = Math.max(margin, window.innerWidth - width - margin);
            const maxTop = Math.max(margin, window.innerHeight - height - margin);
            const left = Math.min(Math.max(margin, anchorRect.left), maxLeft);
            let top = anchorRect.bottom + gap;

            if (top + height > window.innerHeight - margin) {
                const above = anchorRect.top - height - gap;
                top = above >= margin ? above : maxTop;
            }

            popover.style.left = `${left}px`;
            popover.style.top = `${Math.min(Math.max(margin, top), maxTop)}px`;
        }

        function renderCalendar() {
            const year = calendarCursor.getFullYear();
            const month = calendarCursor.getMonth();
            calendarMonthLabel.textContent = new Date(year, month, 1).toLocaleDateString("pt-BR", {
                month: "long", year: "numeric"
            });
            calendarDays.replaceChildren();

            const firstDay = new Date(year, month, 1);
            const gridStart = new Date(year, month, 1 - ((firstDay.getDay() + 6) % 7));
            const todayKey = getLocalDateKey();
            for (let index = 0; index < 42; index += 1) {
                const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
                const dateKey = getLocalDateKey(date);
                const dayButton = document.createElement("button");
                dayButton.type = "button";
                dayButton.className = "calendar-day";
                dayButton.textContent = String(date.getDate());
                dayButton.dataset.date = dateKey;
                dayButton.setAttribute("aria-label", date.toLocaleDateString("pt-BR", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric"
                }));
                dayButton.setAttribute("aria-pressed", String(dateKey === entryDate.value));
                if (date.getDay() === 0 || date.getDay() === 6) {
                    dayButton.classList.add("is-weekend");
                    dayButton.setAttribute("aria-label", `${dayButton.getAttribute("aria-label")}. Nenhum registro esperado.`);
                }
                if (date.getMonth() !== month) dayButton.classList.add("outside-month");
                if (dateKey === todayKey) dayButton.classList.add("is-today");
                if (dateKey === entryDate.value) dayButton.classList.add("is-selected");
                dayButton.disabled = dateKey !== todayKey;
                dayButton.addEventListener("click", () => {
                    if (dateKey !== getLocalDateKey()) return;
                    entryDate.value = dateKey;
                    syncDateDisplay(dateKey);
                    entryDate.dispatchEvent(new Event("change", { bubbles: true }));
                    closeCalendar();
                    entryDateDisplay.focus();
                });
                calendarDays.appendChild(dayButton);
            }
        }

        function openCalendar() {
            timePickers.forEach((picker) => picker.close());
            if (entryDate.value) {
                const [year, month, day] = entryDate.value.split("-").map(Number);
                calendarCursor = new Date(year, month - 1, day);
            } else {
                calendarCursor = new Date();
            }
            renderCalendar();
            calendarPopover.hidden = false;
            datePicker.closest(".dashboard-card")?.classList.add("calendar-open");
            datePickerToggle.setAttribute("aria-expanded", "true");
            entryDateDisplay.setAttribute("aria-expanded", "true");
            placePopover(calendarPopover, datePickerToggle);
        }

        function createTimePicker(input) {
            const formGroup = input.closest(".form-group");
            const label = formGroup.querySelector(`label[for="${input.id}"]`);
            const display = document.createElement("input");
            const picker = document.createElement("div");
            const control = document.createElement("div");
            const toggle = document.createElement("button");
            const popover = document.createElement("div");
            const heading = document.createElement("div");
            const title = document.createElement("span");
            const preview = document.createElement("span");
            const columns = document.createElement("div");
            const hourColumn = document.createElement("div");
            const minuteColumn = document.createElement("div");
            const hourOptions = document.createElement("div");
            const minuteOptions = document.createElement("div");
            const actions = document.createElement("div");
            const cancel = document.createElement("button");
            const confirm = document.createElement("button");
            const displayId = `${input.id}Display`;
            const popoverId = `${input.id}Popover`;
            let selectedHour = 8;
            let selectedMinute = 0;

            picker.className = "time-picker";
            control.className = "time-picker-control";
            display.type = "text";
            display.id = displayId;
            display.className = "time-picker-display";
            display.readOnly = true;
            display.placeholder = "Selecione um horário";
            display.setAttribute("aria-haspopup", "dialog");
            display.setAttribute("aria-expanded", "false");
            display.setAttribute("aria-controls", popoverId);
            if (label) {
                display.setAttribute("aria-label", label.textContent.trim());
                label.htmlFor = displayId;
            }

            toggle.type = "button";
            toggle.className = "time-picker-toggle";
            toggle.setAttribute("aria-label", `Abrir relógio para ${label?.textContent.trim() || "horário"}`);
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-controls", popoverId);
            toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3.2 2"></path></svg>';

            popover.id = popoverId;
            popover.className = "time-picker-popover";
            popover.hidden = true;
            popover.setAttribute("role", "dialog");
            popover.setAttribute("aria-label", `Selecione o horário de ${label?.textContent.trim() || "registro"}`);
            heading.className = "time-picker-heading";
            title.textContent = "Selecione o horário";
            preview.className = "time-picker-preview";
            heading.append(title, preview);
            columns.className = "time-picker-columns";
            hourColumn.className = "time-picker-column";
            minuteColumn.className = "time-picker-column";
            hourOptions.className = "time-picker-options";
            minuteOptions.className = "time-picker-options";
            hourOptions.setAttribute("aria-label", "Horas");
            minuteOptions.setAttribute("aria-label", "Minutos");

            const hourLabel = document.createElement("span");
            hourLabel.className = "time-picker-column-label";
            hourLabel.textContent = "Hora";
            const minuteLabel = document.createElement("span");
            minuteLabel.className = "time-picker-column-label";
            minuteLabel.textContent = "Minuto";
            hourColumn.append(hourLabel, hourOptions);
            minuteColumn.append(minuteLabel, minuteOptions);
            columns.append(hourColumn, minuteColumn);

            actions.className = "time-picker-actions";
            cancel.type = confirm.type = "button";
            cancel.className = confirm.className = "time-picker-action";
            confirm.classList.add("confirm");
            cancel.textContent = "Cancelar";
            confirm.textContent = "Confirmar";
            actions.append(cancel, confirm);
            popover.append(heading, columns, actions);

            input.required = false;
            input.tabIndex = -1;
            input.setAttribute("aria-hidden", "true");
            input.style.display = "none";
            picker.append(control, input);
            document.body.appendChild(popover);
            control.append(display, toggle);
            formGroup.insertBefore(picker, formGroup.querySelector("input[type='time']"));

            const updateSelection = () => {
                const hour = String(selectedHour).padStart(2, "0");
                const minute = String(selectedMinute).padStart(2, "0");
                preview.textContent = `${hour}:${minute}`;
                hourOptions.querySelectorAll(".time-picker-option").forEach((option) => {
                    option.classList.toggle("is-selected", Number(option.dataset.value) === selectedHour);
                    option.setAttribute("aria-pressed", String(Number(option.dataset.value) === selectedHour));
                });
                minuteOptions.querySelectorAll(".time-picker-option").forEach((option) => {
                    option.classList.toggle("is-selected", Number(option.dataset.value) === selectedMinute);
                    option.setAttribute("aria-pressed", String(Number(option.dataset.value) === selectedMinute));
                });
            };

            const scrollSelectionIntoView = (list, selectedValue) => {
                const selectedOption = [...list.querySelectorAll(".time-picker-option")]
                    .find((option) => Number(option.dataset.value) === selectedValue);
                if (selectedOption) {
                    const optionTop = selectedOption.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
                    list.scrollTop = optionTop - (list.clientHeight - selectedOption.offsetHeight) / 2;
                }
            };

            const addOption = (list, value, column) => {
                const option = document.createElement("button");
                option.type = "button";
                option.className = "time-picker-option";
                option.dataset.value = String(value);
                option.textContent = String(value).padStart(2, "0");
                option.addEventListener("click", () => {
                    if (column === "hour") selectedHour = value;
                    else selectedMinute = value;
                    updateSelection();
                });
                list.appendChild(option);
            };

            for (let hour = 0; hour < 24; hour += 1) addOption(hourOptions, hour, "hour");
            for (let minute = 0; minute < 60; minute += 1) addOption(minuteOptions, minute, "minute");

            const close = () => {
                popover.hidden = true;
                picker.closest(".dashboard-card")?.classList.remove("time-picker-open");
                display.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-expanded", "false");
            };
            const open = () => {
                closeCalendar();
                timePickers.forEach((otherPicker) => otherPicker.close());
                if (input.value) {
                    [selectedHour, selectedMinute] = input.value.split(":").map(Number);
                } else {
                    const now = new Date();
                    selectedHour = now.getHours();
                    selectedMinute = now.getMinutes();
                }
                updateSelection();
                popover.hidden = false;
                picker.closest(".dashboard-card")?.classList.add("time-picker-open");
                display.setAttribute("aria-expanded", "true");
                toggle.setAttribute("aria-expanded", "true");
                placePopover(popover, toggle);
                requestAnimationFrame(() => {
                    scrollSelectionIntoView(hourOptions, selectedHour);
                    scrollSelectionIntoView(minuteOptions, selectedMinute);
                });
            };

            toggle.addEventListener("click", () => popover.hidden ? open() : close());
            display.addEventListener("click", open);
            cancel.addEventListener("click", close);
            confirm.addEventListener("click", () => {
                input.value = `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`;
                display.value = input.value;
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.dispatchEvent(new Event("change", { bubbles: true }));
                close();
            });
            popover.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    close();
                    toggle.focus();
                }
            });
            input._syncTimePicker = () => { display.value = input.value; };
            input._syncTimePicker();

            return { picker, popover, close };
        }

        const timePickers = [...document.querySelectorAll('#timeEntryForm input[type="time"]')]
            .map(createTimePicker);

        document.addEventListener("pointerdown", (event) => {
            timePickers.forEach((picker) => {
                if (!picker.picker.contains(event.target) && !picker.popover.contains(event.target)) picker.close();
            });
        });

        function getSavedEntries() {
            return authenticatedUser ? savedEntriesCache : [];
        }

        function getManualEntries() {
            return authenticatedUser ? manualEntriesCache : [];
        }

        function readLocalEntries(key) {
            try {
                const entries = JSON.parse(localStorage.getItem(key) || "[]");
                return Array.isArray(entries) ? entries : [];
            } catch {
                return [];
            }
        }

        function databaseEntry(kind, userId, entry) {
            return kind === "automatic"
                ? {
                    user_id: userId,
                    kind,
                    entry_date: entry.date,
                    started_at: entry.startedAt,
                    finished_at: entry.finishedAt,
                    lunch_started_at: entry.lunchStartedAt,
                    lunch_break_ms: Number(entry.lunchBreakMs) || 0,
                    time_zone: entry.timeZone || null
                }
                : {
                    user_id: userId,
                    kind,
                    entry_date: entry.date,
                    entry_time: entry.entryTime,
                    break_start_time: entry.breakStartTime || null,
                    break_end_time: entry.breakEndTime || null,
                    exit_time: entry.exitTime,
                    total_minutes: Number(entry.totalMinutes) || 0
                };
        }

        function applicationEntry(row) {
            return row.kind === "automatic"
                ? {
                    date: row.entry_date,
                    startedAt: row.started_at,
                    finishedAt: row.finished_at,
                    lunchStartedAt: row.lunch_started_at,
                    lunchBreakMs: Number(row.lunch_break_ms) || 0,
                    timeZone: row.time_zone || ""
                }
                : {
                    date: row.entry_date,
                    entryTime: row.entry_time,
                    breakStartTime: row.break_start_time || "",
                    breakEndTime: row.break_end_time || "",
                    exitTime: row.exit_time,
                    totalMinutes: Number(row.total_minutes) || 0
                };
        }

        async function migrateLocalAvatar(userId) {
            let photo;
            try {
                photo = localStorage.getItem(`timetrack-avatar-${userId}`);
            } catch {
                return;
            }
            if (!photo) return;

            const { data } = await supabaseClient.storage
                .from("avatars")
                .createSignedUrl(`${userId}/avatar`, 60);
            if (data?.signedUrl) return;

            const imageBlob = await (await fetch(photo)).blob();
            const { error } = await supabaseClient.storage
                .from("avatars")
                .upload(`${userId}/avatar`, imageBlob, {
                    contentType: imageBlob.type,
                    upsert: true
                });
            if (error) throw error;
        }

        async function initializeUserData(user) {
            authenticatedUser = user;
            if (loadedDataUserId === user.id) {
                renderDashboard(user);
                return;
            }
            if (loadingDataUserId === user.id && userDataLoadPromise) {
                try {
                    await userDataLoadPromise;
                } catch { }
                return;
            }

            loadingDataUserId = user.id;
            savedEntriesCache = [];
            manualEntriesCache = [];
            vacationRequestsCache = [];
            managerVacationRequestsCache = [];
            currentManagerEmail = "";
            hierarchySetupError = "";
            lastManagerRequestsRefreshAt = 0;
            renderManagerVacationRequests();
            updateHierarchyNotificationBadge();
            vacationSetupError = "";
            selectedVacationDates.clear();
            dashboardScreen.hidden = true;
            loginScreen.hidden = false;
            showAuthMessage("Sincronizando seus dados...");
            userDataLoadPromise = (async () => {
                const { data, error } = await supabaseClient
                    .from("time_entries")
                    .select("*")
                    .eq("user_id", user.id);
                if (error) throw error;
                if (authenticatedUser?.id !== user.id) return;

                vacationSetupError = "";
                try {
                    const { data: vacationData, error: vacationError } = await supabaseClient
                        .from("vacation_requests")
                        .select("id, requested_dates, status, created_at")
                        .eq("user_id", user.id)
                        .order("created_at", { ascending: false });
                    if (vacationError) throw vacationError;
                    vacationRequestsCache = vacationData || [];
                    lastOwnVacationRequestsRefreshAt = Date.now();
                } catch (error) {
                    vacationRequestsCache = [];
                    vacationSetupError = error.message || "Tabela de férias não configurada.";
                }

                await loadHierarchyData();
                if (authenticatedUser?.id !== user.id) return;

                const remoteRows = data || [];
                const remoteKeys = new Set(remoteRows.map((row) => `${row.kind}:${row.entry_date}`));
                const localAutomatic = readLocalEntries(`timetrack-entries-${user.id}`);
                const localManual = readLocalEntries(`timetrack-manual-${user.id}`);
                const rowsToImport = [
                    ...localAutomatic.map((entry) => databaseEntry("automatic", user.id, entry)),
                    ...localManual.map((entry) => databaseEntry("manual", user.id, entry))
                ].filter((row) => !remoteKeys.has(`${row.kind}:${row.entry_date}`));

                if (rowsToImport.length) {
                    const { error: importError } = await supabaseClient
                        .from("time_entries")
                        .upsert(rowsToImport, { onConflict: "user_id,kind,entry_date" });
                    if (importError) throw importError;
                }
                if (authenticatedUser?.id !== user.id) return;

                const allRows = [...remoteRows, ...rowsToImport];
                savedEntriesCache = allRows
                    .filter((row) => row.kind === "automatic")
                    .map(applicationEntry);
                manualEntriesCache = allRows
                    .filter((row) => row.kind === "manual")
                    .map(applicationEntry);

                try {
                    await migrateLocalAvatar(user.id);
                } catch {
                    // Keep the local photo as a fallback if Storage is unavailable.
                }

                loadedDataUserId = user.id;
                renderDashboard(user);
            })();

            try {
                await userDataLoadPromise;
            } catch (error) {
                if (authenticatedUser?.id === user.id) {
                    showLoginScreen();
                    showAuthMessage(`Não foi possível sincronizar seus dados com o Supabase: ${error.message || "verifique a configuração do banco"}`, true);
                }
            } finally {
                if (loadingDataUserId === user.id) {
                    loadingDataUserId = null;
                    userDataLoadPromise = null;
                }
            }
        }

        function formatDuration(milliseconds) {
            const minutes = Math.max(0, Math.floor(milliseconds / 60000));
            const hours = Math.floor(minutes / 60);
            return `${hours}h ${String(minutes % 60).padStart(2, "0")}min`;
        }

        function formatElapsed(milliseconds) {
            const seconds = Math.max(0, Math.floor(milliseconds / 1000));
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
        }

        function getEntryElapsedMs(entry, now = Date.now()) {
            const start = new Date(entry.startedAt).getTime();
            const end = entry.finishedAt
                ? new Date(entry.finishedAt).getTime()
                : entry.lunchStartedAt
                    ? new Date(entry.lunchStartedAt).getTime()
                    : now;
            return Math.max(0, end - start - (Number(entry.lunchBreakMs) || 0));
        }

        function updateSidebarTimer() {
            if (!authenticatedUser) return;
            const entries = getSavedEntries();
            const activeEntry = entries.find((entry) => !entry.finishedAt);
            const latestFinishedEntry = entries
                .filter((entry) => entry.finishedAt && entry.date === getLocalDateKey())
                .sort((a, b) => new Date(b.finishedAt) - new Date(a.finishedAt))[0];

            if (activeEntry) {
                dashboardClock.textContent = formatElapsed(getEntryElapsedMs(activeEntry));
                timerCaption.textContent = activeEntry.lunchStartedAt
                    ? `Pausa para almoço desde ${formatTime(activeEntry.lunchStartedAt, activeEntry.timeZone)}`
                    : `Iniciada às ${formatTime(activeEntry.startedAt, activeEntry.timeZone)}`;
            } else if (latestFinishedEntry) {
                dashboardClock.textContent = formatElapsed(getEntryElapsedMs(latestFinishedEntry));
                timerCaption.textContent = "Última jornada concluída";
            } else {
                dashboardClock.textContent = "00:00:00";
                timerCaption.textContent = "Aguardando início";
            }
        }

        function renderManualEntries() {
            manualEntriesList.replaceChildren();
            const entries = getManualEntries().sort((a, b) => b.date.localeCompare(a.date));
            if (!entries.length) {
                const emptyMessage = document.createElement("p");
                emptyMessage.className = "history-empty";
                emptyMessage.textContent = "Ainda não há horários lançados manualmente.";
                manualEntriesList.appendChild(emptyMessage);
                return;
            }

            entries.forEach((entry) => {
                const row = document.createElement("div");
                row.className = "history-row";
                const formattedDate = new Date(`${entry.date}T12:00:00`).toLocaleDateString("pt-BR", {
                    day: "2-digit", month: "short", year: "numeric"
                });
                [formattedDate, entry.entryTime, entry.exitTime, formatDuration(entry.totalMinutes * 60000)].forEach((value) => {
                    const cell = document.createElement("span");
                    cell.textContent = value;
                    row.appendChild(cell);
                });
                manualEntriesList.appendChild(row);
            });
        }

        function exportTimeRecordsPdf() {
            exportRecordsMessage.textContent = "";
            exportRecordsMessage.style.color = "#b42318";
            if (!authenticatedUser) return;

            const JsPDF = window.jspdf?.jsPDF;
            if (!JsPDF) {
                exportRecordsMessage.textContent = "Não foi possível carregar o gerador de PDF. Verifique sua conexão e tente novamente.";
                return;
            }

            const rows = [
                ...getSavedEntries().map((entry) => {
                    const pauseMs = (Number(entry.lunchBreakMs) || 0) + (entry.lunchStartedAt
                        ? Math.max(0, Date.now() - new Date(entry.lunchStartedAt).getTime())
                        : 0);
                    return {
                        date: entry.date,
                        source: "Cronômetro",
                        start: formatTime(entry.startedAt, entry.timeZone),
                        pause: pauseMs ? formatDuration(pauseMs) : "—",
                        finish: entry.finishedAt ? formatTime(entry.finishedAt, entry.timeZone) : "Em andamento",
                        total: formatDuration(getEntryElapsedMs(entry))
                    };
                }),
                ...getManualEntries().map((entry) => ({
                    date: entry.date,
                    source: "Manual",
                    start: entry.entryTime || "—",
                    pause: entry.breakStartTime && entry.breakEndTime
                        ? `${entry.breakStartTime} - ${entry.breakEndTime}`
                        : "—",
                    finish: entry.exitTime || "—",
                    total: formatDuration((Number(entry.totalMinutes) || 0) * 60000)
                }))
            ].sort((first, second) => second.date.localeCompare(first.date) || first.source.localeCompare(second.source));

            try {
                const pdf = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 14;
                const contentWidth = pageWidth - margin * 2;
                const columns = [
                    { title: "Data", width: 36 },
                    { title: "Origem", width: 38 },
                    { title: "Entrada", width: 36 },
                    { title: "Pausa", width: 55 },
                    { title: "Saída", width: 36 },
                    { title: "Total", width: 68 }
                ];
                const rowHeight = 9;
                const drawTableHeader = (top) => {
                    pdf.setFillColor(22, 77, 132);
                    pdf.rect(margin, top, contentWidth, rowHeight, "F");
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(8);
                    pdf.setTextColor(255, 255, 255);
                    let left = margin;
                    columns.forEach((column) => {
                        pdf.text(column.title, left + 3, top + 5.8);
                        left += column.width;
                    });
                };

                pdf.setProperties({
                    title: "Registro de horas - TimeTrackDNR",
                    subject: "Registros de jornada e horários manuais",
                    author: "TimeTrackDNR"
                });
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(20);
                pdf.setTextColor(20, 39, 64);
                pdf.text("Registro de horas", margin, 18);

                const metadata = authenticatedUser.user_metadata || {};
                const userName = metadata.full_name ||
                    [metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
                    authenticatedUser.email?.split("@")[0] || "Usuário";
                const selectedDate = entryDate.value || getLocalDateKey();
                const hasSelectedDateEntry = rows.some((row) => row.date === selectedDate);
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(9);
                pdf.setTextColor(75, 85, 99);
                pdf.text(pdf.splitTextToSize(`Conta: ${userName}`, contentWidth), margin, 26);
                pdf.text(`Exportado em ${new Date().toLocaleString("pt-BR")}`, margin, 34);
                pdf.text(`${rows.length} registro(s)`, pageWidth - margin, 34, { align: "right" });

                let cursorY = 41;
                if (!hasSelectedDateEntry) {
                    const dateLabel = new Date(`${selectedDate}T12:00:00`).toLocaleDateString("pt-BR");
                    pdf.setFontSize(10);
                    pdf.setTextColor(180, 35, 24);
                    pdf.text(`O usuário ${userName} não registrou horários para esse dia (${dateLabel}).`, margin, 48, {
                        maxWidth: contentWidth
                    });
                    cursorY = 58;
                }

                if (rows.length) {
                    drawTableHeader(cursorY);
                    cursorY += rowHeight;
                    pdf.setFont("helvetica", "normal");
                    pdf.setFontSize(8);

                    rows.forEach((row, rowIndex) => {
                        if (cursorY + rowHeight > pageHeight - 14) {
                            pdf.addPage();
                            cursorY = 14;
                            drawTableHeader(cursorY);
                            cursorY += rowHeight;
                            pdf.setFont("helvetica", "normal");
                            pdf.setFontSize(8);
                        }

                        if (rowIndex % 2 === 0) {
                            pdf.setFillColor(240, 245, 250);
                            pdf.rect(margin, cursorY, contentWidth, rowHeight, "F");
                        }
                        pdf.setDrawColor(220, 226, 234);
                        pdf.line(margin, cursorY + rowHeight, pageWidth - margin, cursorY + rowHeight);
                        pdf.setTextColor(31, 41, 55);
                        let left = margin;
                        [
                            new Date(`${row.date}T12:00:00`).toLocaleDateString("pt-BR"),
                            row.source,
                            row.start,
                            row.pause,
                            row.finish,
                            row.total
                        ].forEach((value, columnIndex) => {
                            const column = columns[columnIndex];
                            pdf.text(String(value), left + 3, cursorY + 5.8, {
                                maxWidth: column.width - 6
                            });
                            left += column.width;
                        });
                        cursorY += rowHeight;
                    });
                }

                const pageCount = pdf.internal.getNumberOfPages();
                for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
                    pdf.setPage(pageNumber);
                    pdf.setFontSize(8);
                    pdf.setTextColor(107, 114, 128);
                    pdf.text(`TimeTrackDNR · Página ${pageNumber} de ${pageCount}`, pageWidth - margin, pageHeight - 7, { align: "right" });
                }

                pdf.save(`TimeTrackDNR-registros-${getLocalDateKey()}.pdf`);
                exportRecordsMessage.style.color = "#16794b";
                exportRecordsMessage.textContent = "PDF exportado com sucesso.";
            } catch {
                exportRecordsMessage.textContent = "Não foi possível gerar o PDF. Tente novamente.";
            }
        }

        function formatTime(value, timeZone = "") {
            if (!value) return "—";
            const options = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
            if (timeZone) options.timeZone = timeZone;
            return new Date(value).toLocaleTimeString("pt-BR", options);
        }

        function renderHistory(entries) {
            historyList.replaceChildren();
            const recentEntries = [...entries]
                .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
                .slice(0, 7);

            if (!recentEntries.length) {
                const emptyMessage = document.createElement("p");
                emptyMessage.className = "history-empty";
                emptyMessage.textContent = "Seus registros aparecerão aqui após iniciar uma jornada.";
                historyList.appendChild(emptyMessage);
                return;
            }

            recentEntries.forEach((entry) => {
                const row = document.createElement("div");
                row.className = "history-row";
                const date = new Date(`${entry.date}T12:00:00`).toLocaleDateString("pt-BR", {
                    day: "2-digit", month: "short", year: "numeric"
                });
                const duration = entry.finishedAt
                    ? formatDuration(getEntryElapsedMs(entry))
                    : entry.lunchStartedAt ? "Pausa para almoço" : "Em andamento";

                [date, formatTime(entry.startedAt, entry.timeZone), formatTime(entry.finishedAt, entry.timeZone), duration].forEach((value) => {
                    const cell = document.createElement("span");
                    cell.textContent = value;
                    row.appendChild(cell);
                });
                historyList.appendChild(row);
            });
        }

        function renderDashboard(user) {
            authenticatedUser = user;
            document.body.classList.add("app-authenticated");
            loginScreen.hidden = true;
            dashboardScreen.hidden = false;
            dashboardUser.textContent = user.email || "";
            sidebarAccount.textContent = user.email || "";
            const metadataName = user.user_metadata?.full_name || [user.user_metadata?.first_name, user.user_metadata?.last_name].filter(Boolean).join(" ");
            profileName.textContent = metadataName || (user.email ? user.email.split("@")[0] : "Usuario");
            logoutButton.textContent = "Sair da conta";
            todayDate.textContent = new Date().toLocaleDateString("pt-BR", {
                weekday: "long", day: "numeric", month: "long", year: "numeric"
            });
            if (!document.getElementById("entryDate").value) {
                document.getElementById("entryDate").value = getLocalDateKey();
            }
            syncDateDisplay();

            const entries = getSavedEntries();
            const todayKey = getLocalDateKey();
            const todayEntry = entries.find((entry) => entry.date === todayKey);
            const openEntry = entries.find((entry) => !entry.finishedAt);
            const todayTotal = entries
                .filter((entry) => entry.date === todayKey)
                .reduce((total, entry) => {
                    return total + getEntryElapsedMs(entry);
                }, 0);

            todayHours.textContent = formatDuration(todayTotal);
            if (openEntry) {
                trackingStatus.textContent = openEntry.lunchStartedAt
                    ? `Pausa para almoço iniciada às ${formatTime(openEntry.lunchStartedAt, openEntry.timeZone)}.`
                    : `Jornada iniciada às ${formatTime(openEntry.startedAt, openEntry.timeZone)} — em andamento.`;
            } else if (todayEntry) {
                trackingStatus.textContent = `Jornada encerrada às ${formatTime(todayEntry.finishedAt, todayEntry.timeZone)}.`;
            } else {
                trackingStatus.textContent = "Nenhuma jornada iniciada.";
            }

            startShiftButton.hidden = Boolean(todayEntry || openEntry);
            startShiftButton.disabled = Boolean(todayEntry || openEntry);
            lunchPauseButton.hidden = !openEntry || Boolean(openEntry.lunchStartedAt);
            lunchPauseButton.disabled = !openEntry || Boolean(openEntry.lunchStartedAt);
            lunchResumeButton.hidden = !openEntry || !openEntry.lunchStartedAt;
            finishShiftButton.disabled = !openEntry;
            finishShiftButton.hidden = !openEntry;
            dashboardMessage.textContent = "";
            renderHistory(entries);
            renderManualEntries();
            renderVacationCalendar();
            renderVacationRequests();
            void loadProfilePhoto();
            loadProfileForm(user);
            renderSidebarDays();
            updateSidebarTimer();
        }

        function showLoginScreen() {
            authenticatedUser = null;
            profileLoadedForUserId = null;
            loadedDataUserId = null;
            savedEntriesCache = [];
            manualEntriesCache = [];
            vacationRequestsCache = [];
            managerVacationRequestsCache = [];
            currentManagerEmail = "";
            hierarchySetupError = "";
            lastManagerRequestsRefreshAt = 0;
            renderManagerVacationRequests();
            updateHierarchyNotificationBadge();
            vacationSetupError = "";
            selectedVacationDates.clear();
            avatarLoadedForUserId = null;
            avatarUrlExpiresAt = 0;
            document.body.classList.remove("app-authenticated");
            dashboardScreen.hidden = true;
            loginScreen.hidden = false;
        }

        function showDashboardView(viewName) {
            const showManagement = viewName === "timeManagement";
            const showProfile = viewName === "profile";
            const showHierarchy = viewName === "hierarchy";
            overviewView.hidden = showManagement || showProfile || showHierarchy;
            timeManagementView.hidden = !showManagement;
            profileView.hidden = !showProfile;
            hierarchyView.hidden = !showHierarchy;
            navigationButtons.forEach((button) => {
                const isCurrent = button.dataset.view === viewName ||
                    (viewName === "history" && button.dataset.view === "history");
                if (isCurrent) button.setAttribute("aria-current", "page");
                else button.removeAttribute("aria-current");
            });

            if (viewName === "history") {
                overviewView.hidden = false;
                document.getElementById("historySection").scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (!showManagement) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }

        async function saveEntries(entries) {
            if (!authenticatedUser) return;
            try {
                const { error } = await supabaseClient
                    .from("time_entries")
                    .upsert(entries.map((entry) => databaseEntry("automatic", authenticatedUser.id, entry)), {
                        onConflict: "user_id,kind,entry_date"
                    });
                if (error) throw error;
                savedEntriesCache = entries;
                renderDashboard(authenticatedUser);
            } catch (error) {
                dashboardMessage.textContent = error.message || "Não foi possível salvar o registro no Supabase.";
            }
        }

        function showAuthMessage(message, isError = false) {
            authMessage.textContent = message;
            authMessage.style.color = isError ? "#b42318" : "#16794b";
        }

        function requestConfirmation(message, confirmLabel = "Sim, continuar") {
            if (confirmationResolver) finishConfirmation(false);
            confirmationPreviousFocus = document.activeElement;
            confirmationTitle.textContent = "Tem certeza?";
            confirmationMessage.textContent = message;
            confirmationAccept.textContent = confirmLabel;
            confirmationOverlay.hidden = false;
            document.body.style.overflow = "hidden";
            confirmationCancel.focus();
            return new Promise((resolve) => {
                confirmationResolver = resolve;
            });
        }

        function finishConfirmation(confirmed) {
            confirmationOverlay.hidden = true;
            document.body.style.overflow = "";
            const resolve = confirmationResolver;
            confirmationResolver = null;
            if (resolve) resolve(confirmed);
            if (confirmationPreviousFocus?.isConnected) confirmationPreviousFocus.focus();
            confirmationPreviousFocus = null;
        }

        confirmationCancel.addEventListener("click", () => finishConfirmation(false));
        confirmationAccept.addEventListener("click", () => finishConfirmation(true));
        confirmationOverlay.addEventListener("click", (event) => {
            if (event.target === confirmationOverlay) finishConfirmation(false);
        });
        confirmationOverlay.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                finishConfirmation(false);
            } else if (event.key === "Tab") {
                event.preventDefault();
                (document.activeElement === confirmationCancel ? confirmationAccept : confirmationCancel).focus();
            }
        });

        toggleAuthMode.addEventListener("click", () => {
            isSignUpMode = !isSignUpMode;
            loginButton.textContent = isSignUpMode ? "Criar conta" : "Entrar";
            toggleAuthMode.textContent = isSignUpMode ? "Já tenho uma conta" : "Criar uma nova conta";
            forgotPassword.hidden = isSignUpMode;
            signupFields.forEach((field) => {
                field.hidden = !isSignUpMode;
                const input = field.querySelector("input");
                input.disabled = !isSignUpMode;
                input.required = isSignUpMode;
                if (!isSignUpMode) input.value = "";
            });
            passwordInput.autocomplete = isSignUpMode ? "new-password" : "current-password";
            loginScreen.querySelector("h2").textContent = isSignUpMode ? "Criar conta" : "Bem-vindo";
            document.querySelector(".login-description").textContent = isSignUpMode
                ? "Preencha seus dados para criar sua conta."
                : "Entre com seu e-mail e senha individuais para acessar seus registros.";
            showAuthMessage("");
        });

        document.getElementById("hierarchyNavButton").addEventListener("click", () => {
            showDashboardView("hierarchy");
            dashboardSidebar.classList.remove("days-open");
            void loadHierarchyData();
        });

        navigationButtons.forEach((button) => {
            button.addEventListener("click", () => {
                showDashboardView(button.dataset.view);
                if (button.dataset.view === "timeManagement" && window.matchMedia("(max-width: 760px)").matches) {
                    dashboardSidebar.classList.toggle("days-open");
                } else {
                    dashboardSidebar.classList.remove("days-open");
                }
            });
        });

        document.getElementById("sidebarPreviousMonth").addEventListener("click", () => changeSidebarMonth(-1));
        document.getElementById("sidebarNextMonth").addEventListener("click", () => changeSidebarMonth(1));
        exportRecordsButton.addEventListener("click", exportTimeRecordsPdf);
        document.getElementById("vacationPreviousMonth").addEventListener("click", () => {
            vacationMonthCursor = new Date(vacationMonthCursor.getFullYear(), vacationMonthCursor.getMonth() - 1, 1);
            renderVacationCalendar();
        });
        document.getElementById("vacationNextMonth").addEventListener("click", () => {
            vacationMonthCursor = new Date(vacationMonthCursor.getFullYear(), vacationMonthCursor.getMonth() + 1, 1);
            renderVacationCalendar();
        });
        requestVacationButton.addEventListener("click", submitVacationRequest);
        vacationCalendarDays.addEventListener("pointerdown", (event) => {
            const dayButton = event.target.closest(".vacation-day");
            if (!dayButton || dayButton.disabled || (event.pointerType === "mouse" && event.button !== 0)) return;
            event.preventDefault();
            vacationRangePointerId = event.pointerId;
            const selectedRange = [...selectedVacationDates].sort();
            if (selectedRange.length && dayButton.dataset.date < selectedRange[0]) {
                vacationRangeStart = dayButton.dataset.date;
                vacationRangeEnd = selectedRange[selectedRange.length - 1];
            } else {
                vacationRangeStart = selectedRange[0] || dayButton.dataset.date;
                vacationRangeEnd = dayButton.dataset.date;
            }
            vacationRangeMoved = false;
            vacationRangePressedDate = dayButton.dataset.date;
            vacationMessage.textContent = "";
            updateVacationRangePreview();
        });

        document.addEventListener("pointermove", (event) => {
            if (vacationRangePointerId !== event.pointerId) return;
            const dayButton = document.elementFromPoint(event.clientX, event.clientY)?.closest(".vacation-day");
            if (!dayButton || !vacationCalendarDays.contains(dayButton) || dayButton.disabled) return;
            const selectedRange = [...selectedVacationDates].sort();
            if (selectedRange.length && dayButton.dataset.date < selectedRange[0]) {
                vacationRangeStart = dayButton.dataset.date;
                vacationRangeEnd = selectedRange[selectedRange.length - 1];
            } else {
                vacationRangeStart = selectedRange[0] || vacationRangeStart;
                vacationRangeEnd = dayButton.dataset.date;
            }
            if (vacationRangeStart === vacationRangeEnd && !vacationRangeMoved) return;
            vacationRangeMoved = true;
            updateVacationRangePreview();
        });

        document.addEventListener("pointerup", (event) => {
            if (vacationRangePointerId !== event.pointerId) return;
            const startDate = vacationRangeStart;
            const endDate = vacationRangeEnd;
            const pressedDate = vacationRangePressedDate;
            const movedAcrossDays = vacationRangeMoved;
            vacationRangePointerId = null;
            vacationRangeStart = "";
            vacationRangeEnd = "";
            vacationRangePressedDate = "";
            vacationRangeMoved = false;

            if (!movedAcrossDays) {
                toggleVacationDate(pressedDate);
                return;
            }

            vacationMessage.textContent = "";
            setVacationSelectionRange(startDate, endDate);
            renderVacationCalendar();
        });

        document.addEventListener("pointercancel", (event) => {
            if (vacationRangePointerId !== event.pointerId) return;
            vacationRangePointerId = null;
            vacationRangeStart = "";
            vacationRangeEnd = "";
            vacationRangePressedDate = "";
            vacationRangeMoved = false;
            renderVacationCalendar();
        });

        avatarFile.addEventListener("change", async () => {
            const [file] = avatarFile.files || [];
            if (!file || !authenticatedUser) return;
            if (!file.type.startsWith("image/")) {
                avatarFile.value = "";
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                avatarFile.value = "";
                window.alert("Escolha uma imagem de até 2 MB.");
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
                try {
                    const userId = authenticatedUser.id;
                    const imageBlob = await (await fetch(reader.result)).blob();
                    const { error } = await supabaseClient.storage
                        .from("avatars")
                        .upload(`${userId}/avatar`, imageBlob, {
                            contentType: imageBlob.type,
                            upsert: true
                        });
                    if (error) throw error;
                    const { data, error: urlError } = await supabaseClient.storage
                        .from("avatars")
                        .createSignedUrl(`${userId}/avatar`, 3600);
                    if (urlError) throw urlError;
                    if (authenticatedUser?.id !== userId) return;
                    avatarImage.src = data.signedUrl;
                    avatarUpload.classList.add("has-photo");
                    profilePhotoImage.src = data.signedUrl;
                    profilePhotoPreview.classList.add("has-photo");
                    avatarLoadedForUserId = userId;
                    avatarUrlExpiresAt = Date.now() + 55 * 60 * 1000;
                } catch (error) {
                    window.alert(error.message || "Não foi possível salvar a foto no Supabase.");
                }
                avatarFile.value = "";
            });
            reader.readAsDataURL(file);
        });

        datePickerToggle.addEventListener("click", () => {
            if (calendarPopover.hidden) openCalendar();
            else closeCalendar();
        });
        entryDateDisplay.addEventListener("click", openCalendar);
        document.getElementById("calendarPrevious").addEventListener("click", () => {
            calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
            renderCalendar();
        });
        document.getElementById("calendarNext").addEventListener("click", () => {
            calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
            renderCalendar();
        });
        document.getElementById("calendarToday").addEventListener("click", () => {
            entryDate.value = getLocalDateKey();
            syncDateDisplay();
            entryDate.dispatchEvent(new Event("change", { bubbles: true }));
            closeCalendar();
        });
        document.addEventListener("pointerdown", (event) => {
            if (!datePicker.contains(event.target) && !calendarPopover.contains(event.target)) closeCalendar();
        });
        calendarPopover.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeCalendar();
                datePickerToggle.focus();
            }
        });

        window.addEventListener("scroll", () => {
            closeCalendar();
            timePickers.forEach((picker) => picker.close());
        }, { passive: true });
        window.addEventListener("resize", () => {
            closeCalendar();
            timePickers.forEach((picker) => picker.close());
        });

        document.getElementById("entryDate").addEventListener("change", (event) => {
            const today = getLocalDateKey();
            if (event.target.value !== today) {
                event.target.value = today;
                syncDateDisplay(today);
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = "Os horários só podem ser registrados na data atual.";
                renderSidebarDays();
                return;
            }
            syncDateDisplay(event.target.value);
            if (event.target.value) {
                const [year, month] = event.target.value.split("-").map(Number);
                sidebarMonthCursor = new Date(year, month - 1, 1);
                renderSidebarDays();
            }
            const savedEntry = getManualEntries().find((entry) => entry.date === event.target.value);
            document.getElementById("entryTime").value = savedEntry?.entryTime || "";
            document.getElementById("breakStartTime").value = savedEntry?.breakStartTime || "";
            document.getElementById("breakEndTime").value = savedEntry?.breakEndTime || "";
            document.getElementById("exitTime").value = savedEntry?.exitTime || "";
            ["entryTime", "breakStartTime", "breakEndTime", "exitTime"].forEach((id) => {
                document.getElementById(id)._syncTimePicker();
            });
            timeEntryMessage.textContent = savedEntry ? "Horários existentes carregados para edição." : "";
            timeEntryMessage.style.color = "#6b7280";
        });

        timeEntryForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            timeEntryMessage.textContent = "";

            const date = document.getElementById("entryDate").value;
            const entryTime = document.getElementById("entryTime").value;
            const breakStartTime = document.getElementById("breakStartTime").value;
            const breakEndTime = document.getElementById("breakEndTime").value;
            const exitTime = document.getElementById("exitTime").value;

            if (date !== getLocalDateKey()) {
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = "Os horários só podem ser registrados na data atual.";
                entryDate.value = getLocalDateKey();
                syncDateDisplay();
                renderSidebarDays();
                return;
            }

            if (!date) {
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = "Selecione a data da jornada.";
                openCalendar();
                return;
            }

            if (!entryTime || !exitTime) {
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = "Escolha os horários de entrada e saída.";
                return;
            }

            if (Boolean(breakStartTime) !== Boolean(breakEndTime)) {
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = "Preencha os dois horários da pausa ou deixe ambos vazios.";
                return;
            }

            const entryMinutes = Number(entryTime.slice(0, 2)) * 60 + Number(entryTime.slice(3, 5));
            const exitMinutes = Number(exitTime.slice(0, 2)) * 60 + Number(exitTime.slice(3, 5));
            let breakMinutes = 0;
            if (breakStartTime) {
                const breakStartMinutes = Number(breakStartTime.slice(0, 2)) * 60 + Number(breakStartTime.slice(3, 5));
                const breakEndMinutes = Number(breakEndTime.slice(0, 2)) * 60 + Number(breakEndTime.slice(3, 5));
                if (breakStartMinutes <= entryMinutes || breakEndMinutes <= breakStartMinutes || breakEndMinutes >= exitMinutes) {
                    timeEntryMessage.style.color = "#b42318";
                    timeEntryMessage.textContent = "Confira a ordem dos horários: entrada, pausa, retorno e saída.";
                    return;
                }
                breakMinutes = breakEndMinutes - breakStartMinutes;
            }

            if (exitMinutes <= entryMinutes) {
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = "O horário de saída deve ser posterior à entrada no mesmo dia.";
                return;
            }

            if (!(await requestConfirmation("Confirma salvar os horários desta jornada?", "Salvar horários"))) {
                timeEntryMessage.style.color = "#6b7280";
                timeEntryMessage.textContent = "O salvamento foi cancelado.";
                return;
            }

            const entries = getManualEntries();
            const newEntry = {
                date,
                entryTime,
                breakStartTime,
                breakEndTime,
                exitTime,
                totalMinutes: exitMinutes - entryMinutes - breakMinutes
            };
            const existingIndex = entries.findIndex((entry) => entry.date === date);
            if (existingIndex >= 0) entries[existingIndex] = newEntry;
            else entries.push(newEntry);

            try {
                const { error } = await supabaseClient
                    .from("time_entries")
                    .upsert(databaseEntry("manual", authenticatedUser.id, newEntry), {
                        onConflict: "user_id,kind,entry_date"
                    });
                if (error) throw error;
                manualEntriesCache = entries;
                renderManualEntries();
                renderSidebarDays();
                timeEntryForm.reset();
                document.getElementById("entryDate").value = getLocalDateKey();
                syncDateDisplay();
                ["entryTime", "breakStartTime", "breakEndTime", "exitTime"].forEach((id) => {
                    document.getElementById(id)._syncTimePicker();
                });
                timeEntryMessage.style.color = "#16794b";
                timeEntryMessage.textContent = "Horários salvos na sua conta.";
            } catch (error) {
                timeEntryMessage.style.color = "#b42318";
                timeEntryMessage.textContent = error.message || "Não foi possível salvar os horários no Supabase.";
            }
        });

        startShiftButton.addEventListener("click", async () => {
            if (!(await requestConfirmation("Deseja iniciar a jornada de trabalho agora?", "Iniciar jornada"))) return;
            const entries = getSavedEntries();
            if (entries.some((entry) => !entry.finishedAt)) return;
            if (entries.some((entry) => entry.date === getLocalDateKey())) return;

            entries.push({
                date: getLocalDateKey(),
                startedAt: new Date().toISOString(),
                finishedAt: null,
                lunchStartedAt: null,
                lunchBreakMs: 0,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
            });
            saveEntries(entries);
        });

        lunchPauseButton.addEventListener("click", async () => {
            if (!(await requestConfirmation("Deseja iniciar a pausa para almoço?", "Iniciar pausa"))) return;
            const entries = getSavedEntries();
            const openEntry = entries.find((entry) => !entry.finishedAt);
            if (!openEntry || openEntry.lunchStartedAt) return;
            openEntry.lunchStartedAt = new Date().toISOString();
            saveEntries(entries);
        });

        lunchResumeButton.addEventListener("click", async () => {
            if (!(await requestConfirmation("Deseja encerrar a pausa e retomar a jornada?", "Retomar jornada"))) return;
            const entries = getSavedEntries();
            const openEntry = entries.find((entry) => !entry.finishedAt);
            if (!openEntry?.lunchStartedAt) return;
            openEntry.lunchBreakMs = (Number(openEntry.lunchBreakMs) || 0) +
                Math.max(0, Date.now() - new Date(openEntry.lunchStartedAt).getTime());
            openEntry.lunchStartedAt = null;
            saveEntries(entries);
        });

        finishShiftButton.addEventListener("click", async () => {
            if (!(await requestConfirmation("Deseja encerrar a jornada de trabalho agora?", "Encerrar jornada"))) return;
            const entries = getSavedEntries();
            const openEntry = entries.find((entry) => !entry.finishedAt);
            if (!openEntry) return;
            const finishedAt = new Date();
            if (openEntry.lunchStartedAt) {
                openEntry.lunchBreakMs = (Number(openEntry.lunchBreakMs) || 0) +
                    Math.max(0, finishedAt.getTime() - new Date(openEntry.lunchStartedAt).getTime());
                openEntry.lunchStartedAt = null;
            }
            openEntry.finishedAt = finishedAt.toISOString();
            saveEntries(entries);
        });

        logoutButton.addEventListener("click", async () => {
            if (!(await requestConfirmation("Deseja sair da sua conta?", "Sair da conta"))) return;
            logoutButton.disabled = true;
            try {
                const { error } = await supabaseClient.auth.signOut();
                if (error) throw error;
                showLoginScreen();
                showAuthMessage("Você saiu da sua conta.");
            } catch (error) {
                dashboardMessage.textContent = error.message || "Não foi possível sair da conta.";
            } finally {
                logoutButton.disabled = false;
            }
        });

        logoutButtonManagement.addEventListener("click", () => logoutButton.click());
        logoutButtonProfile.addEventListener("click", () => logoutButton.click());

        document.getElementById("profilePhotoButton").addEventListener("click", () => avatarFile.click());

        profileForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (!authenticatedUser) return;
            profileMessage.textContent = "";
            profileMessage.style.color = "#16794b";
            saveProfileButton.disabled = true;
            saveProfileButton.textContent = "Salvando...";
            try {
                const fullName = profileNameInput.value.trim();
                const { data, error } = await supabaseClient.auth.updateUser({
                    data: {
                        full_name: fullName,
                        job_title: profileJobTitleInput.value.trim(),
                        phone: profilePhoneInput.value.trim()
                    }
                });
                if (error) throw error;
                authenticatedUser = data.user || authenticatedUser;
                profileName.textContent = fullName || (authenticatedUser.email ? authenticatedUser.email.split("@")[0] : "Usuário");
                profileMessage.textContent = "Perfil atualizado com sucesso.";
            } catch (error) {
                profileMessage.textContent = error.message || "Não foi possível salvar as alterações do perfil.";
                profileMessage.style.color = "#b42318";
            } finally {
                saveProfileButton.disabled = false;
                saveProfileButton.textContent = "Salvar perfil";
            }
        });

        hierarchyForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const managerEmail = managerEmailInput.value.trim();
            if (!managerEmail) {
                hierarchyMessage.style.color = "#b42318";
                hierarchyMessage.textContent = "Informe o e-mail do gestor. Para remover a relação, use o botão Remover gestor.";
                return;
            }
            await saveMyManager(managerEmail);
        });

        document.getElementById("removeManagerButton").addEventListener("click", () => {
            managerEmailInput.value = "";
            void saveMyManager("");
        });

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            showAuthMessage("");
            loginButton.disabled = true;
            loginButton.textContent = isSignUpMode ? "Criando conta..." : "Entrando...";
            try {
                const email = document.getElementById("email").value.trim().toLowerCase();
                const password = passwordInput.value;

                if (isSignUpMode && password !== passwordConfirmationInput.value) {
                    throw new Error("A senha e a confirmação da senha não são iguais.");
                }

                const { data, error } = isSignUpMode
                    ? await supabaseClient.auth.signUp({
                        email,
                        password,
                        options: { data: { first_name: firstNameInput.value.trim(), last_name: lastNameInput.value.trim() } }
                    })
                    : await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                if (isSignUpMode && !data.session) {
                    showAuthMessage("Conta criada. Verifique seu e-mail para confirmar o cadastro antes de entrar.");
                } else if (data.session && data.user) {
                    await initializeUserData(data.user);
                }
            } catch (error) {
                showAuthMessage(error.message || "Não foi possível entrar. Tente novamente.", true);
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = isSignUpMode ? "Criar conta" : "Entrar";
            }
        });

        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                const lastActivity = readLastSessionActivity(session.user.id);
                if (event === "SIGNED_IN" || !lastActivity) {
                    writeLastSessionActivity(session.user.id);
                }
                scheduleSessionExpiry(session.user);
                void initializeUserData(session.user);
            } else if (event === "SIGNED_OUT") {
                if (sessionExpiryTimer) window.clearTimeout(sessionExpiryTimer);
                sessionExpiryTimer = null;
                if (authenticatedUser) {
                    try {
                        localStorage.removeItem(getSessionActivityKey(authenticatedUser.id));
                    } catch {
                        // Session is already cleared by Supabase.
                    }
                }
                showLoginScreen();
            }
        });

        window.setInterval(() => {
            if (!authenticatedUser) return;
            if (Date.now() - lastManagerRequestsRefreshAt >= 15000) {
                void refreshManagerVacationRequests().catch(() => {});
            }
            if (Date.now() - lastOwnVacationRequestsRefreshAt >= 30000) {
                void refreshOwnVacationRequests().catch(() => {});
            }
            updateSidebarTimer();
            if (new Date().getSeconds() === 0 && getSavedEntries().some((entry) => !entry.finishedAt)) {
                renderDashboard(authenticatedUser);
            }
        }, 1000);

        document.getElementById("forgotPassword").addEventListener("click", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            if (!email) {
                showAuthMessage("Digite seu e-mail para receber o link de recuperação.", true);
                document.getElementById("email").focus();
                return;
            }
            showAuthMessage("");
            try {
                const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
                if (error) throw error;
                showAuthMessage("Se houver uma conta para esse e-mail, você receberá um link de recuperação.");
            } catch (error) {
                showAuthMessage(error.message || "Não foi possível enviar o link de recuperação.", true);
            }
        });
