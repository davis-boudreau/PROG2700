# **PROG2700 – Client-Side Programming**

## **Workshop 07c – Event Delegation (Scale-Friendly Delete/Edit)**

---

## 1. Assignment Details

| Field                | Information                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Assignment Title** | Workshop 07c – Event Delegation                              |
| **Course Code**      | PROG2700                                                     |
| **Type**             | Guided Hands-On Workshop                                     |
| **Weight**           | Formative (Practice – Not Graded)                            |
| **Estimated Time**   | 3 hours                                                      |
| **Prerequisites**    | Workshop 07b – Event-Driven Rendering (Forms → Arrays → DOM) |
| **Tools Required**   | VS Code, Browser, DevTools                                   |

---

## 2. Overview / Purpose / Objectives

### Purpose

In Workshop 07b, we created a **Delete button** for every list item and attached an event listener to each button. That works… until your list grows.

This workshop introduces **event delegation**, a professional pattern where:

* one listener is attached to a parent container,
* clicks “bubble up” from children,
* the parent decides what action to take.

This approach is:

* cleaner,
* faster,
* easier to maintain,
* perfect for dynamic lists (like Corah events).

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain event bubbling in plain language,
* implement event delegation using one listener,
* identify click targets using `event.target`,
* use `data-*` attributes to connect DOM items to array data,
* build scalable delete and edit actions.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements             |
| **L1**           | Demonstrate a proficient understanding of JavaScript fundamentals without frameworks |

---

## 4. Assignment Description / Use Case

### Real-World Context

In real applications:

* lists may contain hundreds of items,
* items are frequently added/removed,
* attaching listeners to each item becomes messy and inefficient.

Event delegation ensures:

* only one listener is needed,
* the UI scales cleanly,
* new items automatically work without extra code.

---

# PART 1 — The Core Idea (Theory First)

### Event Bubbling (Simple Explanation)

When you click a button inside a list item:

1. the button receives the click
2. the click “bubbles up” to its parent
3. then to the parent’s parent
4. eventually to the document

That means a parent can “hear” clicks from its children.

---

### Mental Model

```text
Click child → event bubbles upward → parent listener runs → parent inspects target
```

---

# PART 2 — Setup (Same App, New Pattern)

Create:

```
workshop07c/
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
  <title>Workshop 07c – Event Delegation</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .row { display: flex; gap: 8px; margin-bottom: 12px; }
    input { padding: 8px; width: 260px; }
    button { padding: 8px 10px; cursor: pointer; }
    ul { padding-left: 18px; }
    li { margin: 6px 0; display: flex; gap: 10px; align-items: center; }
    .muted { color: #666; font-size: 0.9rem; }
    .badge { font-size: 0.75rem; padding: 2px 6px; border: 1px solid #ccc; border-radius: 10px; }
    .actions { display: inline-flex; gap: 6px; }
  </style>
</head>
<body>

  <h1>Corah Event Builder (Delegation)</h1>
  <p class="muted">One listener. Many buttons. Scales cleanly.</p>

  <form id="eventForm" class="row">
    <input id="eventInput" type="text" placeholder="Enter event name">
    <button type="submit">Add</button>
  </form>

  <div class="row">
    <button id="clearBtn" type="button">Clear All</button>
  </div>

  <p id="count" class="muted"></p>

  <h2>Event List</h2>
  <ul id="eventList"></ul>

  <script src="script.js"></script>
</body>
</html>
```

---

# PART 3 — State (Array of Objects)

### Theory

To delete/edit reliably, each item needs a stable identifier.

We will use an object structure:

```js
{ id, name }
```

---

### script.js (Starter)

```js
let events = [
  { id: 1, name: "Conference" },
  { id: 2, name: "Workshop" },
  { id: 3, name: "Meetup" }
];

let nextId = 4;

const form = document.getElementById("eventForm");
const input = document.getElementById("eventInput");
const list = document.getElementById("eventList");
const clearBtn = document.getElementById("clearBtn");
const count = document.getElementById("count");
```

---

# PART 4 — Render Function (Creates Buttons Without Listeners)

### Theory

With event delegation:

* render creates DOM elements (buttons included)
* **no per-button listeners**
* one listener on the parent handles everything

---

### Render

```js
function renderEvents() {
  list.innerHTML = "";

  count.textContent = `Total events: ${events.length}`;

  events.forEach(event => {
    const li = document.createElement("li");

    // label
    const span = document.createElement("span");
    span.textContent = event.name;

    // small id badge (visual debugging)
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `id:${event.id}`;

    // action buttons
    const actions = document.createElement("span");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = String(event.id);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.dataset.action = "delete";
    delBtn.dataset.id = String(event.id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(badge);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

renderEvents();
```

---

### Thinking Pause 🤔

* Where are the click listeners?
* How will the buttons work?

Answer: Event delegation.

---

# PART 5 — The Delegated Listener (One Listener to Rule Them All)

### Theory

We attach one click listener to the **list**.

Inside the listener we:

* check what was clicked (`event.target`)
* read `data-action` and `data-id`
* perform the correct action

---

### Delegated Click Listener

```js
list.addEventListener("click", (event) => {
  const target = event.target;

  // Only handle clicks on buttons that have data-action
  if (!(target instanceof HTMLButtonElement)) return;

  const action = target.dataset.action;
  const id = Number(target.dataset.id);

  if (!action || Number.isNaN(id)) return;

  if (action === "delete") {
    deleteEventById(id);
  } else if (action === "edit") {
    editEventById(id);
  }
});
```

---

# PART 6 — Delete and Edit Logic (Business Functions)

### Theory

Event listeners should be small and clean.

We keep real logic in functions:

* readable
* reusable
* testable

---

### DELETE

```js
function deleteEventById(id) {
  events = events.filter(e => e.id !== id);
  renderEvents();
}
```

---

### EDIT (Simple Prompt Version)

```js
function editEventById(id) {
  const found = events.find(e => e.id === id);
  if (!found) return;

  const updated = prompt("Edit event name:", found.name);
  if (updated === null) return; // user cancelled

  const name = updated.trim();
  if (name === "") {
    alert("Event name cannot be empty.");
    return;
  }

  events = events.map(e => e.id === id ? { ...e, name } : e);
  renderEvents();
}
```

---

### Thinking Challenge 🤔

* Why is `find()` useful here?
* Why do we use `map()` to update instead of editing directly?

---

# PART 7 — CREATE (Add via Form)

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = input.value.trim();
  if (name === "") {
    alert("Please enter an event name.");
    return;
  }

  // optional: prevent duplicates (case-insensitive)
  const exists = events.some(e => e.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    alert("That event already exists.");
    return;
  }

  events.push({ id: nextId++, name });
  input.value = "";
  renderEvents();
});
```

---

# PART 8 — Clear All

```js
clearBtn.addEventListener("click", () => {
  events = [];
  renderEvents();
});
```

---

# PART 9 — Why Event Delegation Matters (Embedded Theory)

### Without delegation:

* many listeners (one per button)
* more code inside render
* more memory usage
* harder to maintain

### With delegation:

* **one** listener
* works automatically for new items
* easier to debug
* scales cleanly

---

# PART 10 — Guided Practice Tasks

Have students **predict first**, then implement.

### Task 1 — Add a “View” action

Add a “View” button beside each event that alerts:

> Event: NAME (id: X)

Hint: `data-action="view"`

---

### Task 2 — Improve Edit UX

Instead of `prompt()`, reuse the form:

* clicking Edit fills the input box
* submit updates instead of adding (stretch goal)

---

### Task 3 — Add “Delete Confirm”

Require confirmation before delete:

```js
confirm("Are you sure?")
```

---

### Task 4 — Add a “Premium” flag

Extend the event object:

```js
{ id, name, premium: true/false }
```

Render a badge for premium items.

---

### Task 5 — Thinking Question

Why do `data-*` attributes solve the “which item was clicked?” problem?

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* event delegation (one listener on the list)
* data attributes for action + id
* delete and edit functionality
* render function without per-button listeners

---

## 7. Reflection Questions

1. What is event bubbling?
2. Why is delegation more scalable than per-button listeners?
3. How do `data-action` and `data-id` connect UI to state?
4. Why is a stable `id` better than using array index?

---

## 8. Assessment (Formative)

| Criteria                  | Evidence                          |
| ------------------------- | --------------------------------- |
| Delegation implemented    | One list listener handles actions |
| Correct targeting         | Uses event.target + dataset       |
| CRUD works                | Create, Edit, Delete              |
| State + render separation | Clean functions + render          |

---

## 9. Key Takeaways (Student Summary)

* Events bubble upward
* One parent listener can handle many children
* `data-*` attributes identify actions and items
* Stable IDs prevent bugs
* Delegation scales for real applications

> **Event delegation is how professionals build dynamic lists.**

---
