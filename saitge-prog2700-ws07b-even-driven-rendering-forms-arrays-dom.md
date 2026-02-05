# **PROG2700 – Client-Side Programming**

## **Workshop 07b – Event-Driven Rendering (Forms → Arrays → DOM)**

---

## 1. Assignment Details

| Field                | Information                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Assignment Title** | Workshop 07b – Event-Driven Rendering                        |
| **Course Code**      | PROG2700                                                     |
| **Type**             | Guided Hands-On Workshop                                     |
| **Weight**           | Formative (Practice – Not Graded)                            |
| **Estimated Time**   | 3–3.5 hours                                                  |
| **Prerequisites**    | Workshop 07a (Events & Forms), Workshop 06 (DOM Foundations) |
| **Tools Required**   | VS Code, Browser, DevTools                                   |

---

## 2. Overview / Purpose / Objectives

### Purpose

In Workshop 07a, you learned how to handle user events (click, input, submit).
Now you will connect **user interaction** to **application state** (arrays) and then to **DOM rendering**.

This is the pattern used by every real application:

> **User action → Event listener → Update array (state) → Re-render UI**

Frameworks automate this later. In this course, you will build it manually so you understand it.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* store user-submitted data in an array,
* render an array to the DOM using a single render function,
* re-render the UI after Create / Update / Delete operations,
* build delete buttons dynamically for each item,
* use event handling intentionally (and understand why it’s required).

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements             |
| **L1**           | Demonstrate a proficient understanding of JavaScript fundamentals without frameworks |

---

## 4. Assignment Description / Use Case

### Real-World Context

This workshop simulates a mini version of Corah / NS Journey behavior:

* users add items (events),
* the UI updates instantly,
* users remove items,
* the list stays accurate.

This is “client-side state” before databases and APIs.

---

# PART 1 — The Core Pattern (Theory First)

### The Single Most Important Pattern in Client-Side Programming

```text
1) User does something (event)
2) JavaScript updates data (array)
3) JavaScript updates UI (render)
```

**Rule:** The UI should be a *reflection* of your data, not the source of truth.

* ✅ Data (array) is the truth
* ✅ DOM is the display

---

# PART 2 — Setup (Starter UI)

Create:

```
workshop07b/
├── index.html
└── script.js
```

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop 07b – Event-Driven Rendering</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .row { display: flex; gap: 8px; margin-bottom: 12px; }
    input { padding: 8px; width: 260px; }
    button { padding: 8px 10px; cursor: pointer; }
    ul { padding-left: 18px; }
    li { margin: 6px 0; display: flex; gap: 10px; align-items: center; }
    .muted { color: #666; font-size: 0.9rem; }
  </style>
</head>
<body>

  <h1>Corah Event Builder (Client-Side)</h1>
  <p class="muted">Add events, render them, delete them — using arrays + DOM + events.</p>

  <form id="eventForm" class="row">
    <input id="eventInput" type="text" placeholder="Enter event name">
    <button type="submit">Add</button>
  </form>

  <div class="row">
    <button id="clearBtn" type="button">Clear All</button>
  </div>

  <h2>Event List</h2>
  <ul id="eventList"></ul>

  <script src="script.js"></script>
</body>
</html>
```

---

# PART 3 — State (Your Data Lives Here)

### Theory

Your **array** is your application state.

The DOM will be rebuilt based on it.

---

### script.js (Start Here)

```js
let events = ["Conference", "Workshop", "Meetup"]; // starter data

const form = document.getElementById("eventForm");
const input = document.getElementById("eventInput");
const list = document.getElementById("eventList");
const clearBtn = document.getElementById("clearBtn");
```

---

# PART 4 — Render Function (The UI Mirror)

### Theory

You should have **one render function** that controls:

* what the UI looks like
* how items appear
* where buttons and text are created

If you render from multiple places, your UI becomes unpredictable.

---

### Step 1 — Basic Render

```js
function renderEvents() {
  list.innerHTML = ""; // clear old UI

  events.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

renderEvents();
```

✅ Array → DOM
✅ Visible UI created from data

---

### Thinking Pause 🤔

* What happens if you remove `list.innerHTML = ""`?
* Why do duplicates appear?

---

# PART 5 — CREATE (Form Submission Adds Data)

### Theory

Create operations should:

1. validate
2. update the array
3. re-render

---

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = input.value.trim();

  if (name === "") {
    alert("Please enter an event name.");
    return;
  }

  events.push(name);      // ✅ update data
  input.value = "";       // reset input
  renderEvents();         // ✅ update UI
});
```

---

# PART 6 — DELETE (Buttons per Item)

### Theory

Delete actions must connect the button → specific item.

This requires:

* creating the button dynamically,
* attaching a click listener,
* removing the correct item from the array,
* re-rendering.

---

### Update renderEvents() to include delete buttons

Replace your `renderEvents()` with:

```js
function renderEvents() {
  list.innerHTML = "";

  events.forEach((name, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = name;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", () => {
      events.splice(index, 1); // ✅ delete by index (mutating)
      renderEvents();          // ✅ re-render
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
```

---

### Thinking Challenge 🤔

* Why does the delete button need to be created inside render?
* Why does the click handler need access to the index?

---

# PART 7 — DELETE ALL (Clear Button)

### Theory

Some actions affect the entire state.

---

```js
clearBtn.addEventListener("click", () => {
  events = [];       // ✅ replace state (non-mutating style)
  renderEvents();    // ✅ update UI
});
```

---

# PART 8 — UPDATE (Optional But Strong)

### Theory

Update means modifying existing data.

We’ll do a simple update: clicking the event name converts it to uppercase.

---

Add this inside the `forEach` in `renderEvents()`:

```js
span.addEventListener("click", () => {
  events = events.map((e, i) => i === index ? e.toUpperCase() : e);
  renderEvents();
});
```

Now students can:

* click a name
* update state
* re-render UI

---

# PART 9 — Key Principles (Embedded Theory Summary)

1. **State is the truth** (arrays)
2. **Render reflects state** (DOM)
3. **After changes: re-render**
4. **One render function** prevents chaos
5. **Events connect user to state**

This is the manual version of what frameworks automate.

---

# PART 10 — Guided Practice Tasks

Have students predict first, then build.

### Task 1 — Prevent duplicates

If the event name already exists, display a message and don’t add it.

Hint:

```js
events.includes(name)
```

---

### Task 2 — Add a counter

Show “Total events: X” above the list (updates on every render).

---

### Task 3 — Add a “Remove Last” button

Delete the last item only.

---

### Task 4 — Add basic input rules

Do not allow event names shorter than 3 characters.

---

### Task 5 — Thinking question

Why do we re-render instead of editing the DOM in random places?

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* form submission creates data + UI updates
* delete buttons remove correct item
* clear all resets state + UI updates
* a single render function is used

---

## 7. Reflection Questions

1. Why is the array considered “state”?
2. Why must re-render happen after every state change?
3. What bugs happen if you don’t clear the DOM before rendering?
4. How is this similar to how frameworks work?

---

## 8. Assessment (Formative)

| Criteria        | Evidence                                   |
| --------------- | ------------------------------------------ |
| Event handling  | submit/click listeners                     |
| State updates   | array changes correct                      |
| Rendering       | array → DOM via render function            |
| CRUD operations | Create + Delete (+ optional Update)        |
| Code structure  | clear separation (state / render / events) |

---

## 9. Key Takeaways (Student Summary)

* Events trigger logic
* Logic updates state (arrays)
* UI is rebuilt from state
* One render function controls output
* This is the foundation of client-side apps

> **If you can build event-driven rendering without a framework, you truly understand client-side programming.**
