# **PROG2700 – Client-Side Programming**

## **Workshop 06 – DOM Manipulation: Rendering Arrays to the Page**

---

## 1. Assignment Details

| Field                | Information                            |
| -------------------- | -------------------------------------- |
| **Assignment Title** | Workshop 06 – DOM Manipulation         |
| **Course Code**      | PROG2700                               |
| **Type**             | Guided Hands-On Workshop               |
| **Weight**           | Formative (Practice – Not Graded)      |
| **Estimated Time**   | 3–4 hours                              |
| **Prerequisites**    | Workshop 05 – Functions, Arrays & CRUD |
| **Tools Required**   | VS Code, Browser, DevTools             |

---

## 2. Overview / Purpose / Objectives

### Purpose

Up to this point, JavaScript logic has lived **only in the console**.

Real applications must:

* take data from arrays,
* turn that data into HTML,
* update the page when data changes.

This workshop teaches students how to **render application state (arrays)** into the **DOM**, and how **DOM updates reflect data changes**.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain what the DOM is and how it relates to HTML,
* select DOM elements using JavaScript,
* create and insert elements dynamically,
* render arrays of data to the page,
* re-render the UI when array data changes,
* understand the separation between **data**, **logic**, and **presentation**.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements |

---

## 4. Assignment Description / Use Case

### Real-World Context

In real client-side applications:

* data lives in arrays (state),
* JavaScript controls when and how the page updates,
* the DOM is rebuilt or updated when data changes.

Frameworks automate this — but **we must understand it first**.

This workshop builds a **mini event list renderer** similar to what Corah or NS Journey would do.

---

# PART 1 — What Is the DOM? (Theory in Context)

### Key Idea

The **DOM (Document Object Model)** is JavaScript’s **live representation of the HTML page**.

* HTML is static
* DOM is dynamic
* JavaScript talks to the DOM, not directly to HTML files

➡️ When JavaScript changes the DOM, the page updates instantly.

---

## DOM Mental Model

```text
Array (data)  →  JavaScript logic  →  DOM elements  →  Browser UI
```

---

# PART 2 — Setup

Create the following structure:

```
workshop06/
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
  <title>Workshop 06 – DOM Manipulation</title>
</head>
<body>

  <h1>Event List</h1>

  <ul id="eventList"></ul>

  <script src="script.js"></script>
</body>
</html>
```

---

# PART 3 — Selecting DOM Elements

### Theory

Before modifying the page, JavaScript must **select an element**.

---

### Example

```js
const list = document.getElementById("eventList");
console.log(list);
```

✔ You now have a reference to a real DOM node.

---

### Common Selectors

```js
document.getElementById("id");
document.querySelector(".class");
document.querySelector("tag");
```

> `querySelector()` returns the **first match**.

---

# PART 4 — Rendering Static Content (First DOM Update)

### Theory

DOM elements are **objects** that can be created, modified, and removed.

---

### Create an Element

```js
const li = document.createElement("li");
li.textContent = "Conference";
list.appendChild(li);
```

➡️ You just rendered data to the page.

---

# PART 5 — Rendering an Array to the DOM

### Step 1 — Application State

```js
let events = ["Conference", "Workshop", "Meetup"];
```

---

### Step 2 — Render Function (Critical Pattern)

```js
function renderEvents() {
  list.innerHTML = ""; // clear existing UI

  events.forEach(event => {
    const li = document.createElement("li");
    li.textContent = event;
    list.appendChild(li);
  });
}

renderEvents();
```

---

### Embedded Theory: Why Clear First?

* The DOM does not “auto-update”
* If you don’t clear, items duplicate
* Re-rendering ensures UI matches data

This is **manual state management** — the foundation of all frameworks.

---

# PART 6 — CRUD + DOM (Dynamic UI)

Now connect **CRUD operations** to **UI updates**.

---

## CREATE — Add an Item

### HTML Update

```html
<input id="eventInput" placeholder="New event">
<button id="addBtn">Add Event</button>
```

---

### JavaScript

```js
const input = document.getElementById("eventInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  events.push(input.value);
  input.value = "";
  renderEvents();
});
```

✔ Data updated
✔ UI refreshed

---

## READ — Display Items

Handled entirely by `renderEvents()`.

> Reading data = rendering state.

---

## UPDATE — Modify Data

### Simple Example (Uppercase All)

```js
function uppercaseEvents() {
  events = events.map(e => e.toUpperCase());
  renderEvents();
}
```

---

## DELETE — Remove Items

### Remove by Name

```js
function removeEvent(name) {
  events = events.filter(e => e !== name);
  renderEvents();
}
```

Call from console to test:

```js
removeEvent("Workshop");
```

---

# PART 7 — DOM + Objects (Realistic Data)

### Application State

```js
let events = [
  { id: 1, name: "Conference", price: 50 },
  { id: 2, name: "Workshop", price: 25 }
];
```

---

### Render Objects

```js
function renderEvents() {
  list.innerHTML = "";

  events.forEach(event => {
    const li = document.createElement("li");
    li.textContent = `${event.name} - $${event.price}`;
    list.appendChild(li);
  });
}
```

This mirrors **API-rendered UI**.

---

# PART 8 — Key Principles (Integrated Theory)

### 1️⃣ Data drives UI

> Never manually edit the DOM without updating data first.

---

### 2️⃣ One render function

> One function controls how data appears.

---

### 3️⃣ Re-render after change

> After CREATE, UPDATE, or DELETE → re-render.

---

### 4️⃣ Separation of concerns

| Layer     | Responsibility    |
| --------- | ----------------- |
| Array     | Application state |
| Functions | Business logic    |
| DOM       | Presentation      |

---

# PART 9 — Common Beginner Mistakes (Address Explicitly)

❌ Updating DOM but not array
❌ Forgetting to clear old content
❌ Rendering inside multiple places
❌ Mixing logic with DOM everywhere

✔ One render function fixes all of this.

---

# PART 10 — Practice Exercises

1. Add a **Delete button** beside each event.
2. Convert events to objects with `id`.
3. Add an **Update price** function.
4. Display total revenue using `reduce()`.
5. Highlight premium events visually (CSS class).

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* DOM selection
* element creation
* rendering arrays
* CRUD + UI updates

---

## 7. Reflection Questions

1. Why is the render function critical?
2. Why must data change before the DOM?
3. How does this compare to frameworks?
4. What would break if you skipped clearing the DOM?

---

## 8. Assessment (Formative)

| Criteria         | Evidence                  |
| ---------------- | ------------------------- |
| DOM selection    | Correct element targeting |
| Rendering logic  | Array → DOM               |
| CRUD integration | UI updates correctly      |
| Code structure   | Clean separation          |

---

## 9. Key Takeaways (Student Summary)

* Arrays = application state
* DOM = visual output
* JavaScript connects the two
* Change data → re-render UI
* Frameworks automate this, but do not replace understanding

> **If you can render arrays to the DOM, you understand client-side programming.**

---
