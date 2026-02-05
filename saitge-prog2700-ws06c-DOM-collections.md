# **PROG2700 – Client-Side Programming**

## **Workshop 06c – JavaScript HTML DOM Collections (HTMLCollection & Length)**

---

## 1. Assignment Details

| Field                | Information                                               |
| -------------------- | --------------------------------------------------------- |
| **Assignment Title** | Workshop 06c – DOM Collections                            |
| **Course Code**      | PROG2700                                                  |
| **Type**             | Guided Hands-On Workshop                                  |
| **Weight**           | Formative (Practice – Not Graded)                         |
| **Estimated Time**   | 1 hour hours                                               |
| **Prerequisites**    | Workshop 06a & 06b – DOM Fundamentals & Node Manipulation |
| **Tools Required**   | VS Code, Browser, DevTools                                |

---

## 2. Overview / Purpose / Objectives

### Purpose

As soon as JavaScript selects **more than one element**, it no longer returns a single node — it returns a **collection**.

This workshop introduces **HTMLCollection**, a special DOM object that:

* looks like an array,
* behaves *almost* like an array,
* but is **not** an array.

Understanding this difference is essential before:

* looping over elements,
* adding event listeners,
* rendering lists,
* working with forms.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain what an HTMLCollection is,
* obtain an HTMLCollection from the DOM,
* access elements inside a collection,
* use the `.length` property correctly,
* loop through an HTMLCollection safely,
* explain why HTMLCollections are *not* arrays.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements |

---

## 4. Assignment Description / Use Case

### Real-World Context

In real applications, JavaScript frequently needs to:

* select all buttons,
* read all list items,
* attach behavior to many elements,
* update groups of elements at once.

The browser represents these groups as **HTMLCollections**.

If you misunderstand them:

* loops break,
* methods fail,
* bugs appear silently.

This workshop removes that confusion early.

---

# PART 1 — Setup (Consistent DOM)

Use a **simple, predictable structure** so students can focus on collections, not markup.

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop 06c – DOM Collections</title>
</head>
<body>

  <h1>DOM Collections</h1>

  <ul id="eventList">
    <li class="event">Conference</li>
    <li class="event">Workshop</li>
    <li class="event">Meetup</li>
  </ul>

  <p class="note">Note A</p>
  <p class="note">Note B</p>

  <script src="script.js"></script>
</body>
</html>
```

---

### script.js

Start empty.
Open **DevTools → Console**.

---

# PART 2 — What Is an HTMLCollection? (Theory First, Then Observe)

### Theory (Plain Language)

An **HTMLCollection** is:

* a live list of DOM elements,
* returned when JavaScript selects **multiple elements**,
* automatically updated when the DOM changes.

> It is *array-like*, but **not an array**.

---

### First Example — children

```js
const list = document.getElementById("eventList");
const items = list.children;

console.log(items);
```

➡️ Expand the result in the console.

**Instructor prompts:**

* Does this look like an array?
* Does it have indexes?
* Does it say `HTMLCollection`?

---

## Key Observation

```text
HTMLCollection(3) [li, li, li]
```

✔ Indexed
✔ Has length
❌ Not an array

---

# PART 3 — Accessing Elements in an HTMLCollection

### Access by Index

```js
console.log(items[0]);
console.log(items[1]);
```

---

### Why This Works

HTMLCollections support:

* numeric indexes
* `.length`

But they **do not support array methods**.

---

### Thinking Challenge 🤔

Ask students:

> Can we use `map()` here?

Try it:

```js
items.map(item => console.log(item));
```

➡️ Error.

---

# PART 4 — HTMLCollection Length (Critical Property)

### Theory

The `.length` property tells us:

* how many elements are in the collection
* when to stop looping

---

### Example

```js
console.log(items.length);
```

---

### Live Nature of HTMLCollections (Very Important)

```js
const newItem = document.createElement("li");
newItem.textContent = "Hackathon";
list.appendChild(newItem);

console.log(items.length);
```

➡️ The length changes automatically.

**Key Insight:**

> HTMLCollections are **live**, not snapshots.

---

# PART 5 — Looping Through an HTMLCollection

### Traditional for Loop (Safe & Correct)

```js
for (let i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}
```

✔ Works
✔ Predictable
✔ Beginner-safe

---

### Why forEach() Does NOT Work

```js
items.forEach(item => console.log(item));
```

➡️ Error.

**Reason:**

> HTMLCollection is not an array.

---

# PART 6 — Converting HTMLCollection to an Array (Preview Concept)

### Why Convert?

To use:

* `forEach()`
* `map()`
* `filter()`

---

### Conversion Example

```js
const itemsArray = Array.from(items);

itemsArray.forEach(item => {
  console.log(item.textContent);
});
```

⚠️ This is a **preview**, not required mastery yet.

---

# PART 7 — Other Ways HTMLCollections Appear

### getElementsByClassName

```js
const notes = document.getElementsByClassName("note");
console.log(notes);
```

Returns an **HTMLCollection**.

---

### document.body.children

```js
console.log(document.body.children);
```

Also an HTMLCollection.

---

# PART 8 — Common Beginner Mistakes (Address Explicitly)

❌ Treating HTMLCollection like an array
❌ Using `map()` directly
❌ Forgetting `.length` in loops
❌ Assuming the collection is static

✔ Use `for` loops
✔ Use `.length`
✔ Remember collections update automatically

---

# PART 9 — Guided Practice Tasks

Have students **predict before coding**.

---

### Task 1 — Access by Index

Log the first and last `<li>` elements.

---

### Task 2 — Loop with Length

Use a `for` loop to print all event names.

---

### Task 3 — Observe Live Behavior

Add a new `<li>` dynamically and log the updated `.length`.

---

### Task 4 — Class Collection

Select all `.note` elements and log how many exist.

---

### Task 5 — Thinking Question

Why might a *live* collection be dangerous in large applications?

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* HTMLCollection usage
* `.length`
* safe looping

---

## 7. Reflection Questions

1. Why is an HTMLCollection not an array?
2. Why does `.length` matter?
3. What makes HTMLCollections “live”?
4. When could this cause unexpected bugs?
5. How does this prepare you for rendering arrays?

---

## 8. Assessment (Formative)

| Criteria                  | Evidence           |
| ------------------------- | ------------------ |
| HTMLCollection identified | Correct usage      |
| Length property           | Used properly      |
| Looping                   | Safe iteration     |
| Concept clarity           | Reflection answers |

---

## 9. Key Takeaways (Student Summary)

* HTMLCollection = group of DOM elements
* Looks like an array, but isn’t
* Has `.length`
* Is **live**
* Requires careful looping
* Must be converted for array methods

> **Understanding DOM collections prevents silent, hard-to-debug errors.**

---
