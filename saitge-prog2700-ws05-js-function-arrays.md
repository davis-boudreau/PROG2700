# **PROG2700 – Client-Side Programming**

## **Workshop 05 – Functions, Arrays & CRUD Operations**

---

## 1. Assignment Details

| Field                | Information                            |
| -------------------- | -------------------------------------- |
| **Assignment Title** | Workshop 05 – Functions, Arrays & CRUD |
| **Course Code**      | PROG2700                               |
| **Type**             | Guided Hands-On Workshop               |
| **Weight**           | Formative (Practice – Not Graded)      |
| **Estimated Time**   | 3–4 hours                              |
| **Prerequisites**    | Workshop 04 – JavaScript Fundamentals  |
| **Tools Required**   | VS Code, Browser, DevTools             |

---

## 2. Overview / Purpose / Objectives

### Purpose

Modern JavaScript applications are built around:

* **functions** that define behavior
* **arrays** that store application data

Almost everything you will do later depends on these two concepts:

* DOM rendering
* event handling
* API data processing
* UI updates

This workshop teaches how JavaScript **manages, transforms, and controls data**, not just how to write syntax.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* write reusable functions,
* pass data into functions and return results,
* store structured data in arrays,
* perform full **CRUD operations** on arrays,
* understand mutation vs immutability,
* correctly apply key array methods:

  * `forEach()`
  * `map()`
  * `filter()`
  * `reduce()`,
* explain the difference between:

  * *doing something with data*
  * *creating new data from data*.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| **L1**           | Demonstrate proficient understanding of JavaScript fundamentals without frameworks |

---

## 4. Assignment Description / Use Case

### Real-World Context

When JavaScript receives data (from a form or an API), it usually arrives as:

```js
[
  { id: 1, name: "Conference", price: 50 },
  { id: 2, name: "Workshop", price: 25 }
]
```

Before this data is saved to a database, the browser must:

* create items
* display items
* update items
* remove items

This is **CRUD**, performed entirely in memory.

Learning to manage data correctly here is essential before DOM or APIs.

---

# PART 1 — Functions (Reusable Business Logic)

A **function** is a named block of reusable logic.

Instead of repeating code, we:

* write it once
* reuse it everywhere

---

### Basic Function

```js
function greetUser() {
  console.log("Welcome to Corah!");
}

greetUser();
```

---

### Function with Parameters

```js
function greetUser(name) {
  console.log("Welcome " + name);
}

greetUser("Alex");
greetUser("Jordan");
```

➡️ Same logic, different input.

---

### Function with Return Value

```js
function calculateTotal(price, tax) {
  return price + tax;
}

let total = calculateTotal(100, 15);
console.log(total);
```

🔑 **Returning values allows data reuse.**

---

### Printing vs Returning (Critical Concept)

```js
console.log(value);   // debugging
return value;         // programming
```

✔ Print to inspect
✔ Return to use later

---

# PART 2 — Arrays (Application State)

Arrays represent your **current application data**.

```js
let events = [];
```

Think of this array as:

> “What the app currently knows.”

---

### Creating an Array

```js
let events = ["Conference", "Workshop", "Meetup"];
```

---

### Accessing Values

```js
events[0];
events[events.length - 1];
```

Arrays start at index **0**.

---

# PART 3 — CRUD with Arrays

CRUD = **Create, Read, Update, Delete**

Every application performs these operations.

---

## 🔹 CREATE — Add Data

```js
events.push("Conference");
```

Using a function:

```js
function addEvent(name) {
  events.push(name);
}
```

---

## 🔹 READ — View Data

```js
events.forEach(event => {
  console.log(event);
});
```

or

```js
console.log(events[0]);
```

---

## 🔹 UPDATE — Modify Data

### By index (older style)

```js
events[1] = "Updated Workshop";
```

### Using `map()` (preferred)

```js
events = events.map(event => {
  if (event === "Workshop") {
    return "Updated Workshop";
  }
  return event;
});
```

✔ safer
✔ predictable
✔ modern JS approach

---

## 🔹 DELETE — Remove Data

```js
events.pop();              // last item
events.splice(1, 1);       // by index
```

### Preferred approach

```js
events = events.filter(event => event !== "Conference");
```

✔ non-destructive
✔ readable
✔ common in industry

---

# PART 4 — Mutation vs Immutability

### Mutating methods (change original array)

* `push()`
* `pop()`
* `splice()`

### Non-mutating methods (return new array)

* `map()`
* `filter()`
* `reduce()`

🔑 Modern JavaScript prefers **non-mutating logic** because:

* debugging is easier
* state changes are predictable
* UI updates are safer

---

# PART 5 — Key Array Concepts You Must Know

### Length

```js
events.length;
```

---

### Checking existence

```js
events.includes("Conference");
```

---

### Finding index

```js
events.indexOf("Workshop");
```

Returns index or `-1`.

---

# PART 6 — Arrays of Objects (Real API Shape)

```js
let events = [
  { id: 1, name: "Conference", price: 50 },
  { id: 2, name: "Workshop", price: 25 }
];
```

This is exactly how API data looks.

---

### Reading object data

```js
console.log(events[0].name);
```

---

# PART 7 — CRUD with Objects in Arrays

### CREATE

```js
events.push({ id: 3, name: "Meetup", price: 15 });
```

---

### READ

```js
events.forEach(event => {
  console.log(event.name);
});
```

---

### UPDATE

```js
events = events.map(event => {
  if (event.id === 2) {
    return { ...event, price: 30 };
  }
  return event;
});
```

---

### DELETE

```js
events = events.filter(event => event.id !== 1);
```

This pattern is **identical** to API updates.

---

# PART 8 — Array Methods (Deep Understanding)

## forEach()

> Use when you want to **do something**.

```js
events.forEach(event => {
  console.log(event.name);
});
```

✔ no return
✔ no transformation

---

## map()

> Use when you want to **create new data**.

```js
let labels = events.map(event => "Event: " + event.name);
```

✔ returns new array
✔ original unchanged

---

## 🔥 map() vs forEach()

| Concept       | forEach        | map             |
| ------------- | -------------- | --------------- |
| Purpose       | Perform action | Transform data  |
| Returns array | ❌              | ✅               |
| Used for      | DOM output     | Data conversion |

🔑
**Need new data → map**
**Need an action → forEach**

---

## filter()

> Select matching items.

```js
let premium = events.filter(e => e.price > 30);
```

---

## reduce()

> Combine values into one result.

```js
let revenue = events.reduce((sum, e) => sum + e.price, 0);
```

Used for totals, averages, counters.

---

# PART 9 — Putting It All Together

```js
function calculateRevenue(events) {
  return events.reduce((sum, e) => sum + e.price, 0);
}

let total = calculateRevenue(events);
console.log("Total revenue:", total);
```

✔ functions organize logic
✔ arrays store state
✔ methods transform data

---

# PART 10 — Practice Exercises

1. Create an array of event objects.
2. Write:

   * `addEvent()`
   * `removeEvent()`
   * `updateEventPrice()`
3. Use `filter()` to show premium events.
4. Use `map()` to apply tax.
5. Use `reduce()` to calculate total revenue.
6. Use `forEach()` to display results.

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* functions
* arrays
* CRUD
* array methods

---

## 7. Reflection Questions

1. Why are arrays considered application state?
2. Which CRUD operation felt easiest?
3. Which was hardest?
4. Why are non-mutating methods preferred?
5. How does this prepare you for DOM and APIs?

---

## 8. Assessment (Formative)

| Criteria         | Evidence                        |
| ---------------- | ------------------------------- |
| CRUD implemented | Create / Read / Update / Delete |
| Functions used   | Clear logic separation          |
| Method usage     | map / filter / reduce           |
| Code clarity     | Readable and structured         |

---

## 9. Key Takeaways (Student Summary)

* Functions define behavior
* Arrays hold application data
* CRUD is the foundation of all apps
* `forEach()` performs actions
* `map()` creates new data
* `filter()` removes data
* `reduce()` summarizes data

> **If you can manage arrays correctly, you can build applications.**

---
