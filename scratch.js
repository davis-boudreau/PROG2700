// =====================================================
// Workshop 08 — NS Journey: Client-Side State & UX Logic
// Step 1: constants + state + DOM refs
// =====================================================

const STORAGE_KEY = "ns_journey_draft_v1";

// UI State
let currentPanel = 1;

// App State (Journey Draft)
let draft = {
  origin_geoname: "",
  origin_departure: "",
  departure_days: [],

  nscc_stop: "",
  nscc_departure: "",

  stop: "",
  stop_arrive_time: "Calculated From API",

  start_date: "",
  end_date: ""
};

// DOM refs — panels
const panels = [
  document.getElementById("panel-1"),
  document.getElementById("panel-2"),
  document.getElementById("panel-3"),
  document.getElementById("panel-4")
];

// DOM refs — inputs
const origin_geoname = document.getElementById("origin_geoname");
const origin_departure = document.getElementById("origin_departure");

const dayIds = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const dayCheckboxes = dayIds.map(id => document.getElementById(id));

const nscc_stop = document.getElementById("nscc_stop");
const nscc_departure = document.getElementById("nscc_departure");

const stop = document.getElementById("stop");
const stop_arrive_time = document.getElementById("stop_arrive_time");

const start_date = document.getElementById("start_date");
const end_date = document.getElementById("end_date");

// DOM refs — UX
const message = document.getElementById("message");
const backBtn = document.getElementById("back-button");
const nextBtn = document.getElementById("next-button");
const resetBtn = document.getElementById("reset-button");

// =====================================================
// Step 2: message helpers (UX feedback)
// =====================================================

function setMessage(text, type = "muted") {
  message.textContent = text;
  message.className = type; // "muted" | "error" | "success"
}

// =====================================================
// Step 3: render panels + button states (UI state → DOM)
// =====================================================

function showPanel(n) {
  currentPanel = n;

  panels.forEach((panel, index) => {
    panel.style.display = (index === n - 1) ? "block" : "none";
  });

  backBtn.disabled = (currentPanel === 1);

  // Update Next button label (Next vs Save Draft)
  if (currentPanel < 4) {
    nextBtn.textContent = "Next";
  } else {
    nextBtn.textContent = "Save Draft";
  }

  setMessage(`Panel ${currentPanel} of 4`, "muted");
}

// =====================================================
// Step 4: sync state from inputs (read) and into inputs (write)
// =====================================================

function readPanelIntoState(panelNumber) {
  if (panelNumber === 1) {
    draft.origin_geoname = origin_geoname.value.trim();
    draft.origin_departure = origin_departure.value;

    draft.departure_days = dayCheckboxes
      .filter(cb => cb.checked)
      .map(cb => cb.id);
  }

  if (panelNumber === 2) {
    draft.nscc_stop = nscc_stop.value.trim();
    draft.nscc_departure = nscc_departure.value;
  }

  if (panelNumber === 3) {
    draft.stop = stop.value;
    // stop_arrive_time is read-only (in real app calculated from API)
    draft.stop_arrive_time = stop_arrive_time.value;
  }

  if (panelNumber === 4) {
    draft.start_date = start_date.value;
    draft.end_date = end_date.value;
  }
}

function writeStateIntoAllInputs() {
  origin_geoname.value = draft.origin_geoname;
  origin_departure.value = draft.origin_departure;

  dayCheckboxes.forEach(cb => {
    cb.checked = draft.departure_days.includes(cb.id);
  });

  nscc_stop.value = draft.nscc_stop;
  nscc_departure.value = draft.nscc_departure;

  stop.value = draft.stop;
  stop_arrive_time.value = draft.stop_arrive_time || "Calculated From API";

  start_date.value = draft.start_date;
  end_date.value = draft.end_date;
}

// =====================================================
// Step 5: validation gates (UX logic before advancing)
// =====================================================

function validatePanel(panelNumber) {
  // Panel 1: town + time + at least one day
  if (panelNumber === 1) {
    if (draft.origin_geoname.length < 2) return "Enter your town (at least 2 characters).";
    if (!draft.origin_departure) return "Select a departure time.";
    if (draft.departure_days.length === 0) return "Select at least one departure day.";
  }

  // Panel 2: campus + arrival time
  if (panelNumber === 2) {
    if (draft.nscc_stop.length < 2) return "Enter your campus (at least 2 characters).";
    if (!draft.nscc_departure) return "Select an arrival time.";
  }

  // Panel 3: meet-me stop
  if (panelNumber === 3) {
    if (!draft.stop) return "Select a Meet Me location.";
  }

  // Panel 4: dates + order
  if (panelNumber === 4) {
    if (!draft.start_date) return "Select a journey start date.";
    if (!draft.end_date) return "Select a journey end date.";
    if (draft.start_date > draft.end_date) return "Start date must be before (or equal to) end date.";
  }

  return null; // valid
}


// =====================================================
// Step 6: draft persistence (localStorage)
// =====================================================

function saveDraftToLocalStorage() {
  const payload = {
    currentPanel,
    draft,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadDraftFromLocalStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.draft) return false;

    draft = parsed.draft;
    currentPanel = parsed.currentPanel || 1;

    writeStateIntoAllInputs();
    // showPanel(currentPanel);
    showPanel(1);

    setMessage(`Draft loaded (saved at ${parsed.savedAt}).`, "success");
    return true;
  } catch {
    return false;
  }
}

function resetDraft() {
  localStorage.removeItem(STORAGE_KEY);

  currentPanel = 1;
  draft = {
    origin_geoname: "",
    origin_departure: "",
    departure_days: [],
    nscc_stop: "",
    nscc_departure: "",
    stop: "",
    stop_arrive_time: "Calculated From API",
    start_date: "",
    end_date: ""
  };

  writeStateIntoAllInputs();
  showPanel(1);
  setMessage("Draft cleared.", "muted");
}


// =====================================================
// Step 7: navigation (Back / Next / Save Draft)
// =====================================================

function goNext() {
  // 1) read current panel values into state
  readPanelIntoState(currentPanel);

  // 2) validate current panel before moving on
  const error = validatePanel(currentPanel);
  if (error) {
    setMessage(error, "error");
    return;
  }

  // 3) if not final panel → advance
  if (currentPanel < 4) {
    showPanel(currentPanel + 1);
    return;
  }

  // 4) final panel → save draft locally (later becomes POST/PUT to REST API)
  saveDraftToLocalStorage();
  setMessage("Draft saved locally. (In production: POST/PUT to Django REST API.)", "success");
}

function goBack() {
  if (currentPanel > 1) {
    showPanel(currentPanel - 1);
  }
}

// Button events
nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);
resetBtn.addEventListener("click", resetDraft);

// =====================================================
// Step 8: startup
// =====================================================

const loaded = loadDraftFromLocalStorage();
if (!loaded) {
  writeStateIntoAllInputs();
  showPanel(1);
  setMessage("No saved draft found. Start Panel 1.", "muted");
}

