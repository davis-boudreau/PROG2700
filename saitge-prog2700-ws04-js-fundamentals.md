# **PROG2700 – Client-Side Programming**

## **Workshop 04: JavaScript Fundamentals (No Frameworks)**

---

## 1. Assignment Details

| Field                | Information                               |
| -------------------- | ----------------------------------------- |
| **Assignment Title** | Workshop 04 – JavaScript Fundamentals     |
| **Course Code**      | PROG2700                                  |
| **Type**             | Guided Hands-On Workshop                  |
| **Weight**           | Formative (Practice – Not Graded)         |
| **Estimated Time**   | 3–4 hours                                 |
| **Prerequisites**    | Basic HTML, CSS (WEBD3100), Workshops 1–3 |
| **Tools Required**   | VS Code, Web Browser, DevTools            |

---

## 2. Overview / Purpose / Objectives

### Purpose

Before we manipulate the DOM or connect to APIs, students must develop a **solid foundation in JavaScript logic**.

This workshop focuses on **how JavaScript thinks**, not how frameworks hide logic.

Students will:

* write JavaScript from scratch,
* understand how decisions are made in code,
* control the flow of execution,
* and debug common beginner mistakes.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* write valid JavaScript syntax,
* declare and use variables correctly,
* apply operators to evaluate conditions,
* use conditional statements to control logic,
* implement loops to repeat tasks,
* trace program execution step-by-step.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **L1**           | Demonstrate a proficient understanding of the JavaScript programming language without the use of frameworks |

---

## 4. Assignment Description / Use Case

### Real-World Context

Every interactive web application relies on **logic**:

* showing or hiding elements,
* validating user input,
* deciding what data to display,
* responding to user actions.

JavaScript is the **decision-making layer** of the browser.

In this workshop, students will build small interactive examples that mirror real application behavior — without any frameworks.

---

## 5. Tasks / Instructions (Integrated Tutorial)

> ⚠️ Important
>
> * Do **not** copy blindly.
> * Type examples manually.
> * Change values and observe results.
>   Learning happens when you *break things and fix them*.

---

# PART 1 — JavaScript Setup

### Step 1: Create Basic Files

Create:

```
workshop04/
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
  <title>Workshop 04 – JavaScript Fundamentals</title>
</head>
<body>

  <h1>JavaScript Fundamentals</h1>

  <script src="script.js"></script>
</body>
</html>
```

Open the file in a browser and open **DevTools → Console**.

---

# PART 2 — Variables

### Example 1: Declaring Variables

```js
let username = "Alex";
let age = 21;

console.log(username);
console.log(age);
```

✅ Variables store information
❌ They do not “do” anything by themselves

---

### Example 2: Changing Values

```js
age = 22;
console.log(age);
```

➡️ Variables can change over time.

---

### Example 3: Const vs Let

```js
const school = "NSCC";
school = "Another School"; // ❌ ERROR
```

**Rule of thumb:**

* `const` → value should not change
* `let` → value will change

---

# PART 3 — Operators

### Arithmetic Operators

```js
let total = 10 + 5;
let price = 20 - 3;
let result = 4 * 2;
let average = 20 / 4;
```

---

### Comparison Operators

```js
console.log(5 > 3);   // true
console.log(5 < 3);   // false
console.log(5 === 5); // true
console.log(5 !== 3); // true
```

⚠️ Always use `===`, not `==`.

---

### Logical Operators

```js
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin);
console.log(isLoggedIn || isAdmin);
```

Used constantly in real apps.

---

# PART 4 — Conditionals

### Example: If Statement

```js
let age = 18;

if (age >= 18) {
  console.log("Access granted");
}
```

---

### If / Else

```js
if (age >= 18) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}
```

---

### If / Else If / Else

```js
let score = 82;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
```

➡️ Only ONE block runs.

---

# PART 5 — Control Flow (Why Order Matters)

```js
let isMember = true;
let price = 100;

if (isMember) {
  price = price - 20;
}

console.log(price);
```

JavaScript runs **top to bottom**.

Order matters.

---

# PART 6 — Loops

### While Loop

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

⚠️ Forgetting `count++` causes infinite loops.

---

### For Loop

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Most common loop in JavaScript.

---

### Loop Example: Rendering Data

```js
let events = ["Conference", "Workshop", "Meetup"];

for (let i = 0; i < events.length; i++) {
  console.log(events[i]);
}
```

---

# PART 7 — Mini Practice Tasks (Highly Encouraged)

### Task 1

Create a variable called `ticketPrice`.

If price is greater than 50, print:

> "Premium Event"

Else print:

> "Standard Event"

---

### Task 2

Create a loop that prints numbers 1–10.

---

### Task 3

Create a variable `isLoggedIn`.

If false, print:

> "Please log in"

If true, print:

> "Welcome back"

---

# PART 8 — Debugging Practice

Introduce mistakes intentionally:

```js
let total = "10" + 5;
console.log(total);
```

Discuss:

* why result is `"105"`
* how JavaScript treats strings

➡️ Debugging is a skill.

---

## 6. Deliverables

Students submit:

* `index.html`
* `script.js`

Containing:

* variables
* operators
* conditionals
* loops
* console output

---

## 7. Reflection Questions

Students answer briefly:

1. Which JavaScript concept was easiest to understand?
2. Which concept was most confusing?
3. Why is logic more important than syntax?
4. How does JavaScript differ from HTML and CSS?

---

## 8. Assessment & Rubric (Formative)

| Criteria                 | Evidence                |
| ------------------------ | ----------------------- |
| Variables used correctly | let / const applied     |
| Operators used properly  | arithmetic & comparison |
| Conditionals function    | if / else logic works   |
| Loops execute correctly  | no infinite loops       |
| Code runs without errors | clean console output    |

✔ Feedback provided in class
❌ No grade assigned

---

## 9. Submission Guidelines

* Submit files via Brightspace
* Folder named:
  `studentID_PROG2700_workshop04`

---

## 10. Resources / Equipment

* Browser DevTools
* JavaScript Console
* MDN JavaScript Reference

---

## 11. Academic Policies

Standard NSCC academic integrity and participation policies apply.

---

## 12. Copyright Notice

© Nova Scotia Community College – PROG2700
Educational use only.

