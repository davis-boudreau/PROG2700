// =====================================================
// Workshop 09 — Async JavaScript + REST + JSON
// Weather Forecast App (OpenWeather) + Tailwind UI
// =====================================================

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const apiKeyInput = document.getElementById("apiKey");

const statusEl = document.getElementById("status");
const errorEl = document.getElementById("error");
const currentEl = document.getElementById("current");
const forecastEl = document.getElementById("forecast");

const clearBtn = document.getElementById("clear-btn");
const searchBtn = document.getElementById("search-btn");

function setStatus(msg) {
  statusEl.textContent = msg || "";
}

function setError(msg) {
  errorEl.textContent = msg || "";
}

function disableSearch(disabled) {
  searchBtn.disabled = disabled;
}

function toTitleCase(s) {
  return s
    .split(" ")
    .filter(Boolean)
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// Convert unix seconds -> readable local date/time
function formatUnixTime(unixSeconds) {
  const d = new Date(unixSeconds * 1000);
  return d.toLocaleString(); // uses user locale/timezone
}

// Safely read nested properties without crashing the app
function safeGet(obj, path, fallback = null) {
  try {
    return path.split(".").reduce((acc, key) => acc[key], obj) ?? fallback;
  } catch {
    return fallback;
  }
}

function buildForecastUrl({ city, country, apiKey, units = "metric" }) {
  // Example:
  // https://api.openweathermap.org/data/2.5/forecast?q=Halifax,CA&appid=KEY&units=metric
  const q = country ? `${city},${country}` : city;
  const params = new URLSearchParams({
    q,
    appid: apiKey,
    units
  });

  return `https://api.openweathermap.org/data/2.5/forecast?${params.toString()}`;
}

async function fetchJson(url) {
  // Fetch returns a Promise -> await pauses until the Promise resolves
  const res = await fetch(url);

  // REST concept: status codes
  // 200-299 = OK
  // 401 = invalid key, 404 = not found city, etc.
  if (!res.ok) {
    // Try to extract error details (OpenWeather typically returns JSON)
    let detail = "";
    try {
      const errData = await res.json();
      detail = errData?.message ? ` (${errData.message})` : "";
    } catch {
      // ignore parse errors
    }
    throw new Error(`HTTP ${res.status}${detail}`);
  }

  // JSON parsing (text -> JS object)
  return await res.json();
}

function clearUI() {
  setStatus("");
  setError("");
  currentEl.innerHTML = `<p class="text-slate-500">Search a city to load data.</p>`;
  forecastEl.innerHTML = "";
}

function renderCurrentSnapshot(data) {
  const cityName = safeGet(data, "city.name", "Unknown city");
  const country = safeGet(data, "city.country", "");
  const first = safeGet(data, "list.0", null);

  if (!first) {
    currentEl.innerHTML = `<p class="text-slate-500">No forecast entries returned.</p>`;
    return;
  }

  const temp = safeGet(first, "main.temp", "?");
  const feels = safeGet(first, "main.feels_like", "?");
  const desc = safeGet(first, "weather.0.description", "n/a");
  const wind = safeGet(first, "wind.speed", "?");
  const time = formatUnixTime(safeGet(first, "dt", 0));

  currentEl.innerHTML = `
    <div class="space-y-2">
      <p class="text-slate-800 font-semibold">${toTitleCase(cityName)} ${country ? "(" + country + ")" : ""}</p>
      <p><span class="font-medium">As of:</span> ${time}</p>
      <p><span class="font-medium">Temp:</span> ${temp}°</p>
      <p><span class="font-medium">Feels like:</span> ${feels}°</p>
      <p><span class="font-medium">Conditions:</span> ${toTitleCase(desc)}</p>
      <p><span class="font-medium">Wind:</span> ${wind}</p>
    </div>
  `;
}

function renderForecastCards(data) {
  const list = safeGet(data, "list", []);

  if (!Array.isArray(list) || list.length === 0) {
    forecastEl.innerHTML = `<p class="text-slate-500">No forecast entries found.</p>`;
    return;
  }

  // Limit cards so UI stays readable in a workshop
  const limited = list.slice(0, 12); // ~36 hours (3-hour blocks)

  forecastEl.innerHTML = "";
  for (const item of limited) {
    const dt = formatUnixTime(item.dt);
    const temp = safeGet(item, "main.temp", "?");
    const desc = safeGet(item, "weather.0.description", "n/a");
    const humidity = safeGet(item, "main.humidity", "?");
    const icon = safeGet(item, "weather.0.icon", null);

    const card = document.createElement("div");
    card.className = "rounded-xl border border-slate-200 p-4 bg-slate-50";

    const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";

    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm text-slate-600">${dt}</p>
          <p class="text-lg font-semibold text-primary">${temp}°</p>
          <p class="text-sm text-slate-700">${toTitleCase(desc)}</p>
          <p class="text-xs text-slate-600 mt-1">Humidity: ${humidity}%</p>
        </div>
        ${iconUrl ? `<img src="${iconUrl}" alt="icon" class="w-12 h-12" />` : ""}
      </div>
    `;
    forecastEl.appendChild(card);
  }
}

async function runSearch() {
  setError("");

  const cityRaw = cityInput.value.trim();
  const countryRaw = countryInput.value.trim().toUpperCase();
  const apiKey = apiKeyInput.value.trim();

  // Basic validation (client-side)
  if (cityRaw.length < 2) {
    setError("Please enter a city name (at least 2 characters).");
    return;
  }
  if (!apiKey) {
    setError("Please paste your OpenWeather API key.");
    return;
  }

  const city = toTitleCase(cityRaw);

  // Loading UX
  disableSearch(true);
  setStatus("Loading forecast… (check DevTools → Network)");
  currentEl.innerHTML = `<p class="text-slate-500">Loading…</p>`;
  forecastEl.innerHTML = "";

  try {
    const url = buildForecastUrl({ city, country: countryRaw, apiKey, units: "metric" });
    const data = await fetchJson(url);

    // Render
    renderCurrentSnapshot(data);
    renderForecastCards(data);

    setStatus(`Loaded forecast for ${city}${countryRaw ? ", " + countryRaw : ""}.`);
  } catch (err) {
    console.error(err);
    setStatus("");
    setError(`Could not load forecast. ${err.message}`);
    currentEl.innerHTML = `<p class="text-slate-500">No data.</p>`;
    forecastEl.innerHTML = "";
  } finally {
    disableSearch(false);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent full page refresh
  runSearch();
});

clearBtn.addEventListener("click", () => {
  cityInput.value = "";
  countryInput.value = "";
  // Leave apiKey as-is so students don't re-paste constantly
  clearUI();
});

// Startup
clearUI();
setStatus("Enter a city and click Get Forecast.");

