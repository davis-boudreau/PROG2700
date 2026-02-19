## **Workshop 09 – Asynchronous JavaScript + REST APIs (Build a Weather Forecast App with OpenWeather + Tailwind)**

---

## 1. Assignment Details

| Field                | Information                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| **Assignment Title** | Workshop 09 – Async JavaScript + REST APIs (Weather App)                 |
| **Course Code**      | PROG2700                                                                 |
| **Type**             | Guided Hands-On Workshop + Lab Build                                     |
| **Weight**           | Formative (Practice – Not Graded)                                        |
| **Estimated Time**   | 3.5–4.5 hours                                                            |
| **Prerequisites**    | JS Fundamentals, DOM, Events, Client-Side State/UX, Tailwind             |
| **Tools Required**   | VS Code, Browser, DevTools (Network + Console), OpenWeather API Key      |
| **Deliverable**      | A functional weather forecast app that fetches and renders forecast JSON |

---

## 2. Overview / Purpose / Objectives

In modern client-side development, your UI is often powered by **remote data**:

* you send a request (HTTP),
* the server responds with **JSON**,
* you parse it,
* you render it to the page,
* you handle errors, loading states, and edge cases.

This workshop teaches the “real world” loop:

> **User action → async fetch → JSON parse → state update → DOM render**

### Learning Objectives

By the end of this workshop, students will be able to:

* explain asynchronous JS at a beginner level (what it is and why it exists)
* use `fetch()` with `async/await` to call a REST API
* interpret REST concepts: endpoints, resources, query parameters, HTTP methods
* parse JSON and safely access nested properties
* build a UI that handles:

  * loading state
  * errors (bad city, invalid key, network)
  * empty results
* render a forecast list dynamically from API data using DOM methods
* apply Tailwind styling and responsive layout

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **L1**           | Use core JavaScript effectively (functions, objects, arrays, control flow) |
| **L2**           | Manipulate DOM to meet project requirements                                |
| **L3**           | Retrieve and send data asynchronously with `fetch()` + integrate JSON      |
| **L5**           | Use a CSS framework (Tailwind) to enhance UX and responsive UI             |

---

## 4. REST + API Concepts (Student-Friendly)

### What is an API?

An **API** (Application Programming Interface) is a set of rules for how software can talk to other software. In web apps, APIs are usually accessed over HTTP.

### What is REST?

**REST** is a common style for designing web APIs. REST organizes data into **resources** and uses standard HTTP methods:

| Method      | Meaning     | Example        |
| ----------- | ----------- | -------------- |
| `GET`       | read data   | get forecast   |
| `POST`      | create data | create a route |
| `PUT/PATCH` | update data | update a draft |
| `DELETE`    | remove data | delete a trip  |

In **Workshop 09**, we mostly use **GET**.

### Endpoints and Query Parameters

An **endpoint** is a URL you request. A **query parameter** is a `key=value` added to the URL after `?`.

Example (forecast endpoint):

* endpoint: `/data/2.5/forecast`
* query params: `q=Halifax`, `appid=YOUR_KEY`, `units=metric`

OpenWeather forecast documentation includes city-name and city-id based calls for the 5-day forecast. ([OpenWeatherMap][1])

---

## 5. Important Note About “Hourly Forecast” vs “Free Forecast”

You suggested this hourly endpoint:

`https://pro.openweathermap.org/data/2.5/forecast/hourly?id={city ID}&appid={API key}`

That is part of OpenWeather’s **Hourly Forecast 4 days** product on the **pro** domain. ([OpenWeatherMap][2])

To keep this workshop aligned with “free API” usage, we will build our app using the **5 day / 3 hour forecast** endpoint:

`https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}` ([OpenWeatherMap][1])

**What students learn is the same** (async fetch, JSON parsing, rendering lists). The only difference is the time-step (3-hour blocks instead of hourly).

---

## 6. JSON Basics (What Students Must Understand)

### What is JSON?

**JSON** (JavaScript Object Notation) is the most common format used by REST APIs to send data.

In JS, you’ll usually do:

```js
const res = await fetch(url);
const data = await res.json(); // parses JSON text into a JS object
```

### What “Parsing” Means

* the server sends text
* `.json()` converts that text into a usable JS object/array structure

---

# PART A — Build the Weather App (Step-by-Step Lab)

## Project Setup

Create:

```
workshop09-weather/
├── index.html
└── script.js
```

---

# PART B — index.html (Broken into Steps)

## ✅ Step HTML-1 — Base Document + Tailwind + Brand Tokens

> Using the same brand approach as Workshop 08 (Primary: `#004780`, Secondary: `#2B71B9`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Workshop 09 – Weather Forecast App</title>

  <script src="https://cdn.tailwindcss.com"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#004780',
            secondary: '#2B71B9',
          }
        }
      }
    }
  </script>
</head>
```

## ✅ Step HTML-2 — Layout + Header + Key Reminder

```html
<body class="min-h-screen bg-slate-100 p-6">
  <main class="mx-auto max-w-4xl">
    <header class="bg-white rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-primary">Weather Forecast App</h1>
      <p class="text-slate-600 mt-1">
        Workshop 09 — Async JavaScript + REST + JSON + DOM Rendering
      </p>

      <div class="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
        <p class="font-semibold text-slate-800">API Key Reminder</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>Do <strong>not</strong> commit your API key to GitHub.</li>
          <li>Use your assigned key for in-class testing.</li>
          <li>We will discuss safer key strategies when we introduce auth + server-side proxying.</li>
        </ul>
      </div>
    </header>
```

## ✅ Step HTML-3 — Search Form + Loading/Error Areas

```html
    <section class="mt-6 bg-white rounded-2xl shadow p-6">
      <h2 class="text-lg font-semibold text-primary">Search</h2>

      <form id="search-form" class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div class="flex-1">
          <label for="city" class="block text-sm font-medium text-slate-700">City</label>
          <input id="city" type="text" placeholder="e.g., Halifax"
            class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"/>
        </div>

        <div class="w-full sm:w-44">
          <label for="country" class="block text-sm font-medium text-slate-700">Country code</label>
          <input id="country" type="text" placeholder="e.g., CA"
            class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 uppercase
                   focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"/>
        </div>

        <div class="w-full sm:w-64">
          <label for="apiKey" class="block text-sm font-medium text-slate-700">OpenWeather API Key</label>
          <input id="apiKey" type="password" placeholder="Paste your key"
            class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"/>
        </div>

        <button id="search-btn" type="submit"
          class="w-full sm:w-auto rounded-md bg-primary px-5 py-3 text-white font-semibold
                 hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed">
          Get Forecast
        </button>
      </form>

      <p id="status" class="mt-4 text-sm text-slate-600"></p>
      <p id="error" class="mt-2 text-sm text-red-700"></p>
    </section>
```

## ✅ Step HTML-4 — Results Rendering Containers

```html
    <section class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1 bg-white rounded-2xl shadow p-6">
        <h2 class="text-lg font-semibold text-primary">Current Snapshot</h2>
        <div id="current" class="mt-4 text-slate-700 text-sm">
          <p class="text-slate-500">Search a city to load data.</p>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white rounded-2xl shadow p-6">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-lg font-semibold text-primary">Forecast (5 days / 3-hour blocks)</h2>
          <button id="clear-btn" type="button"
            class="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 transition">
            Clear
          </button>
        </div>

        <div id="forecast" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Forecast cards injected here -->
        </div>
      </div>
    </section>

  </main>

  <script src="script.js"></script>
</body>
</html>
```

---

# PART C — script.js (Broken into Steps)

> Paste into `script.js` in this exact order.

## ✅ Step JS-1 — DOM References + Small Utilities

```js
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
```

## ✅ Step JS-2 — Core REST URL Builder

We’ll call the **5-day / 3-hour forecast** endpoint. ([OpenWeatherMap][1])

```js
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
```

## ✅ Step JS-3 — Fetch Basics (Async/Await + Error Handling)

```js
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
```

## ✅ Step JS-4 — Render Functions (DOM Creation)

```js
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
```

## ✅ Step JS-5 — The “Controller” Function (State + UX Flow)

This is where your workshop concepts combine: **events → async → render**.

```js
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
```

## ✅ Step JS-6 — Event Wiring (Forms + Buttons)

```js
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
```

---

# PART D — Teaching Notes (Async Explained Simply)

## Why do we need async?

Because HTTP requests take time. While the browser waits, we don’t want the page to freeze.

## Two mental models (beginner-friendly)

1. **Synchronous:** line 1, then line 2, then line 3… no waiting
2. **Asynchronous:** “start request now, continue, and come back when finished”

With `async/await`, the code *reads* like synchronous code, but runs asynchronously.

---

# PART E — DevTools Skills (Required)

Students must open DevTools → **Network** and observe:

* the request URL
* status code (200, 401, 404)
* response JSON preview

This is how developers debug API apps.

---

# PART F — Guided Practice Tasks

### Task 1 — Units Toggle (State + UX)

Add a toggle for:

* Metric (°C) vs Imperial (°F)

Hint: store `units` in a variable and re-run the search.

### Task 2 — Better Errors

If error includes “401”, show: “Invalid API Key”
If error includes “404”, show: “City not found”

### Task 3 — Auto-run on Enter + Button Disable

Disable the search button during loading (already done). Confirm it works.

### Task 4 — Forecast Filtering

Show only entries at:

* 09:00, 12:00, 15:00 (for example)
  Hint: filter using `item.dt_txt` if present.

### Task 5 — Thinking Question

Why does a state-driven UI make REST integration easier?

---

# PART G — Deliverables

Submit:

* `index.html`
* `script.js`

Your app must:

* fetch forecast data asynchronously with `fetch()`
* parse JSON and safely access nested fields
* render at least 8 forecast cards dynamically
* show a loading message and handle errors cleanly
* be styled with Tailwind and responsive

---

# PART H — Reflection Questions

1. Explain what “asynchronous” means in your own words.
2. What does `await res.json()` do?
3. What are query parameters, and why are they useful?
4. What did you observe in DevTools → Network when the request succeeded?
5. If the NS Journey app saves a journey via REST, which HTTP methods would it likely use?

---

## Instructor Note for Continuity (NS Journey Alignment)

Workshop 08 taught:

* state, validation, persistence, wizard UX

Workshop 09 adds:

* **async fetch**
* **REST + JSON**
* **API-driven UI rendering**
