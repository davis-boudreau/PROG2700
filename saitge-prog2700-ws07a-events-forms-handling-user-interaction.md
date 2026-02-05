# **PROG2700 – Client-Side Programming**

## **Workshop 07a – Events & Forms: Handling User Interaction**

---

## 1. Assignment Details

| Field                | Information                           |
| -------------------- | ------------------------------------- |
| **Assignment Title** | Workshop 07a – Events & Forms         |
| **Course Code**      | PROG2700                              |
| **Type**             | Guided Hands-On Workshop              |
| **Weight**           | Formative (Practice – Not Graded)     |
| **Estimated Time**   | 1-2 hours                               |
| **Prerequisites**    | Workshops 06a–06d (DOM & Collections) |
| **Tools Required**   | VS Code, Browser, DevTools            |

---

## 2. Overview / Purpose / Objectives

### Purpose

So far, JavaScript has:

* inspected the DOM,
* created and modified elements,
* rendered data.

Now, JavaScript must **respond to the user**.

This workshop introduces:

* **events** (things the user does),
* **event listeners** (how JavaScript reacts),
* **form inputs** (how users provide data),
* **safe handling of user interaction**.

This is the foundation of **all interactive web applications**.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain what a JavaScript event is,
* attach event listeners to DOM elements,
* respond to common user events,
* read values from form inputs,
* prevent default browser behavior,
* connect user actions to DOM updates.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements |
| **L1**           | Demonstrate understanding of JavaScript fundamentals                     |

---

## 4. Assignment Description / Use Case

### Real-World Context

Every real application responds to users:

* clicking buttons,
* typing into forms,
* submitting data,
* interacting with UI elements.

JavaScript **does not run constantly** —
it waits for **events**.

This workshop teaches how JavaScript:

* *listens*,
* *reacts*,
* and *controls behavior*.

---

# PART 1 — What Is an Event? (Core Theory)

### Key Idea

An **event** is something that happens in the browser.

Examples:

* a click
* a key press
* a form submission
* mouse movement

JavaScript reacts by **listening** for events.

---

### Mental Model

```text
User Action → Event → JavaScript Listener → Code Runs → DOM Updates
```

JavaScript does nothing until an event occurs.

---

# PART 2 — Setup (Simple, Predictable DOM)

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop 07a – Events & Forms</title>
</head>
<body>

  <h1>Event Handling</h1>

  <button id="clickBtn">Click Me</button>

  <p id="output"></p>

  <form id="eventForm">
    <input type="text" id="eventInput" placeholder="Enter event name">
    <button type="submit">Add Event</button>
  </form>

  <script src="script.js"></script>
</body>
</html>
```

---

### script.js

Start empty.
Open **DevTools → Console**.

---

# PART 3 — Listening for Events

### Theory

To react to an event, JavaScript must:

1. select an element
2. attach an event listener
3. define what happens when the event fires

---

### Example — Click Event

```js
const button = document.getElementById("clickBtn");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  output.textContent = "Button clicked!";
});
```

✔ Listener attached
✔ Code runs only when clicked

---

### Thinking Pause 🤔

* Does this code run when the page loads?
* When does it run?

---

# PART 4 — Common Event Types

| Event     | Trigger           |
| --------- | ----------------- |
| `click`   | Mouse click       |
| `input`   | User types        |
| `submit`  | Form submitted    |
| `change`  | Input loses focus |
| `keydown` | Key pressed       |

---

### Try It — input Event

```js
const input = document.getElementById("eventInput");

input.addEventListener("input", () => {
  console.log(input.value);
});
```

Type and observe the console.

---

# PART 5 — The Event Object

### Theory

When an event occurs, JavaScript passes an **event object** with information about it.

---

### Example

```js
button.addEventListener("click", (event) => {
  console.log(event);
});
```

Explore:

* `event.type`
* `event.target`

---

### Why This Matters

The event object tells you:

* what happened
* where it happened
* what element caused it

---

# PART 6 — Forms & Default Behavior

### Important Concept

Forms have **default browser behavior**:

* they submit
* they reload the page

JavaScript often needs to **stop this**.

---

### Example — Form Submission

```js
const form = document.getElementById("eventForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted safely");
});
```

✔ Page does not reload
✔ JavaScript stays in control

---

### Thinking Challenge 🤔

* What happens if `preventDefault()` is removed?

---

# PART 7 — Reading User Input

### Example — Capture Input Value

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value;
  output.textContent = "You entered: " + value;
  input.value = "";
});
```

✔ User input read
✔ Page updated
✔ Input cleared

---

# PART 8 — Connecting Events to Application Logic

### Theory

Events should:

* update data
* then update the DOM

(Not the other way around.)

---

### Example — Event Creates Data

```js
let events = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  events.push(input.value);
  console.log(events);
  input.value = "";
});
```

This prepares students for rendering arrays next.

---

# PART 9 — Common Beginner Mistakes

❌ Using inline HTML events (`onclick=""`)
❌ Forgetting `preventDefault()`
❌ Reading input value before event fires
❌ Mixing logic everywhere

✔ Use `addEventListener()`
✔ Keep logic inside listeners

---

# PART 10 — Guided Practice Tasks

Have students **predict first**, then code.

---

### Task 1 — Click Counter

Each click increases a counter displayed on the page.

---

### Task 2 — Live Typing

Display text as the user types into the input.

---

### Task 3 — Form Validation

Prevent submission if input is empty.

---

### Task 4 — Multiple Listeners

Add both `click` and `mouseover` listeners to the button.

---

### Task 5 — Thinking Question

Why should logic run *inside* event listeners?

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* event listeners
* form handling
* user input processing

---

## 7. Reflection Questions

1. What is an event in JavaScript?
2. Why doesn’t JavaScript run constantly?
3. Why is `preventDefault()` important?
4. How do events connect users to application logic?

---

## 8. Assessment (Formative)

| Criteria        | Evidence               |
| --------------- | ---------------------- |
| Event listeners | addEventListener used  |
| Form handling   | preventDefault applied |
| Input reading   | Correct value capture  |
| DOM updates     | Visible feedback       |

---

## 9. Key Takeaways (Student Summary)

* Users trigger events
* JavaScript listens
* Code runs only when events occur
* Forms have default behavior
* JavaScript controls interaction

> **Events are the bridge between users and your code.**

---
