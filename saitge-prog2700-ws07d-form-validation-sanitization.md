# **PROG2700 – Client-Side Programming**

## **Workshop 08 – Form Validation & Sanitization (Client-Side)**

---

## 1. Assignment Details

| Field                | Information                                  |
| -------------------- | -------------------------------------------- |
| **Assignment Title** | Workshop 08 – Form Validation & Sanitization |
| **Course Code**      | PROG2700                                     |
| **Type**             | Guided Hands-On Workshop                     |
| **Weight**           | Formative (Practice – Not Graded)            |
| **Estimated Time**   | 3–3.5 hours                                  |
| **Prerequisites**    | Workshop 07 (Events, Rendering, Delegation)  |
| **Tools Required**   | VS Code, Browser, DevTools                   |

---

## 2. Overview / Purpose / Objectives

### Purpose

So far, users can:

* type anything into a form,
* submit it,
* and the app will accept it.

That is **dangerous**.

This workshop teaches students to:

* validate user input,
* sanitize unsafe values,
* provide meaningful feedback,
* and protect the UI from malformed or malicious data.

This is **not optional** in professional client-side development.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain the difference between validation and sanitization,
* enforce client-side validation rules,
* sanitize user input before storing or rendering,
* display validation feedback to users,
* prevent unsafe or malformed data from entering application state.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| **L1**           | Demonstrate understanding of JavaScript fundamentals                  |
| **L2**           | Demonstrate proficiency in DOM manipulation                           |
| **L3**           | Sanitize all received and sent data to improve security and usability |

---

## 4. Assignment Description / Use Case

### Real-World Context

Every real application must assume:

> **User input is untrusted.**

Users may:

* make mistakes,
* submit empty values,
* attempt to inject scripts,
* submit malformed or oversized data.

Client-side validation:

* improves usability,
* reduces server load,
* prevents obvious security issues.

---

# PART 1 — Validation vs Sanitization (Core Theory)

### Validation

> “Is the data acceptable?”

Examples:

* required fields
* minimum length
* allowed characters

---

### Sanitization

> “Make the data safe.”

Examples:

* trimming whitespace
* escaping HTML
* normalizing casing

---

### Key Rule

> **Validate first. Sanitize always.**

---

# PART 2 — Setup (Familiar App)

We continue using the **Corah Event Builder** pattern.

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop 08 – Validation & Sanitization</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .row { display: flex; gap: 8px; margin-bottom: 12px; }
    input { padding: 8px; width: 260px; }
    button { padding: 8px 10px; cursor: pointer; }
    .error { color: #b00020; font-size: 0.9rem; }
    .success { color: #006400; font-size: 0.9rem; }
    ul { padding-left: 18px; }
    li { margin: 6px 0; }
  </style>
</head>
<body>

  <h1>Corah Event Builder (Validated)</h1>
  <p class="muted">User input is validated and sanitized before use.</p>

  <form id="eventForm" class="row" novalidate>
    <input id="eventInput" type="text" placeholder="Enter event name">
    <button type="submit">Add</button>
  </form>

  <p id="message"></p>

  <ul id="eventList"></ul>

  <script src="script.js"></script>
</body>
</html>
```

---

# PART 3 — State & DOM References

```js
let events = [];

const form = document.getElementById("eventForm");
const input = document.getElementById("eventInput");
const message = document.getElementById("message");
const list = document.getElementById("eventList");
```

---

# PART 4 — Validation Rules (Make Them Explicit)

### Theory

Validation rules must be:

* clear,
* predictable,
* communicated to the user.

---

### Define Rules

```js
function validateEventName(name) {
  if (name.length === 0) {
    return "Event name is required.";
  }

  if (name.length < 3) {
    return "Event name must be at least 3 characters.";
  }

  if (name.length > 50) {
    return "Event name must be under 50 characters.";
  }

  return null; // valid
}
```

---

# PART 5 — Sanitization Functions (Always Apply)

### Theory

Sanitization protects:

* the DOM,
* future API calls,
* stored data.

---

### Basic Sanitization

```js
function sanitizeInput(value) {
  return value
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
```

---

### Thinking Pause 🤔

* Why do we escape `<` and `>`?
* What could happen if we don’t?

---

# PART 6 — Safe Form Submission (Putting It Together)

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  message.textContent = "";
  message.className = "";

  const rawValue = input.value;
  const sanitizedValue = sanitizeInput(rawValue);

  const error = validateEventName(sanitizedValue);

  if (error) {
    message.textContent = error;
    message.className = "error";
    return;
  }

  events.push(sanitizedValue);
  input.value = "";

  message.textContent = "Event added successfully.";
  message.className = "success";

  renderEvents();
});
```

---

# PART 7 — Rendering Safely

### Theory

Even sanitized input should be rendered safely.

Use:

* `textContent`
* **not** `innerHTML`

---

```js
function renderEvents() {
  list.innerHTML = "";

  events.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}
```

---

# PART 8 — Common Dangerous Patterns (Explicit Warning)

❌ `innerHTML = userInput`
❌ trusting form input
❌ no length limits
❌ no feedback

✔ sanitize
✔ validate
✔ textContent
✔ user messaging

---

# PART 9 — Guided Practice Tasks

Have students **predict first**, then implement.

---

### Task 1 — Block Numbers

Reject event names containing digits.

---

### Task 2 — Normalize Case

Store event names in Title Case.

---

### Task 3 — Duplicate Prevention

Prevent duplicate event names (case-insensitive).

---

### Task 4 — Real-Time Validation

Display error messages as the user types.

---

### Task 5 — Thinking Question

Why must client-side validation be repeated on the server?

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* validation rules
* sanitization
* user feedback
* safe rendering

---

## 7. Reflection Questions

1. Why is user input untrusted?
2. What is the difference between validation and sanitization?
3. Why is client-side validation not enough?
4. How does this improve usability and security?

---

## 8. Assessment (Formative)

| Criteria       | Evidence                  |
| -------------- | ------------------------- |
| Validation     | Clear rules enforced      |
| Sanitization   | Unsafe characters escaped |
| Feedback       | User sees errors/success  |
| Safe rendering | Uses textContent          |

---

## 9. Key Takeaways (Student Summary)

* Never trust user input
* Validate before accepting
* Sanitize before storing or rendering
* Client-side validation improves UX
* Server-side validation is still required

> **Good client-side developers protect users *and* their applications.**

---
