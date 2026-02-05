# **PROG2700 – Client-Side Programming**

## **Workshop 06d – JavaScript HTML DOM NodeLists**

---

## 1. Assignment Details

| Field                | Information                                             |
| -------------------- | ------------------------------------------------------- |
| **Assignment Title** | Workshop 06d – DOM NodeLists                            |
| **Course Code**      | PROG2700                                                |
| **Type**             | Guided Hands-On Workshop                                |
| **Weight**           | Formative (Practice – Not Graded)                       |
| **Estimated Time**   | 1 hour hours                                             |
| **Prerequisites**    | Workshop 06a–06c (DOM Fundamentals, Nodes, Collections) |
| **Tools Required**   | VS Code, Browser, DevTools                              |

---

## 2. Overview / Purpose / Objectives

### Purpose

In Workshop 06c, you learned about **HTMLCollection** — a *live*, array-like group of elements.

In this workshop, you will learn about **NodeList**, another DOM collection that:

* looks similar,
* behaves differently,
* is returned by different DOM methods.

Understanding **NodeList vs HTMLCollection** prevents subtle bugs when:

* looping over elements,
* adding or removing nodes,
* attaching event listeners,
* rendering dynamic UI.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain what a NodeList is,
* obtain a NodeList from the DOM,
* access NodeList items using indexes,
* use the `.length` property correctly,
* loop through a NodeList safely,
* explain the differences between:

  * NodeList
  * HTMLCollection,
* choose the correct collection type for a task.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements |

---

## 4. Assignment Description / Use Case

### Real-World Context

When developers select elements using modern DOM methods like:

```js
document.querySelectorAll()
```

the browser returns a **NodeList**, not an HTMLCollection.

If you don’t understand the difference:

* loops may fail silently,
* UI updates may behave unexpectedly,
* performance issues can occur.

This workshop ensures you understand *why* collections behave differently.

---

# PART 1 — Setup (Same DOM, New Perspective)

Use a familiar structure so the **difference is the focus**, not the markup.

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop 06d – DOM NodeLists</title>
</head>
<body>

  <h1>DOM NodeLists</h1>

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

Start empty and open **DevTools → Console**.

---

# PART 2 — What Is a NodeList? (Observe First)

### Theory (Plain Language)

A **NodeList** is:

* a collection of DOM nodes,
* often returned by `querySelectorAll()`,
* usually **static** (not live),
* sometimes includes non-element nodes.

> NodeList = “results of a query at a moment in time.”

---

## First Example — querySelectorAll

```js
const items = document.querySelectorAll(".event");
console.log(items);
```

➡️ Expand the result in the console.

**Instructor prompts:**

* What does the console label say?
* How many items are there?
* Does this look similar to HTMLCollection?

---

## Key Observation

```text
NodeList(3) [li.event, li.event, li.event]
```

✔ Indexed
✔ Has length
✔ Can use forEach

---

# PART 3 — Accessing NodeList Elements

### Access by Index

```js
console.log(items[0]);
console.log(items[1]);
```

Works just like an array.

---

### NodeList Length

```js
console.log(items.length);
```

Used exactly like HTMLCollection length.

---

# PART 4 — Looping Through a NodeList

### forEach() Works (Important Difference)

```js
items.forEach(item => {
  console.log(item.textContent);
});
```

✔ This works
❌ It did NOT work with HTMLCollection

---

### Traditional for Loop Also Works

```js
for (let i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}
```

---

# PART 5 — Static Nature of NodeLists (Critical Concept)

### Theory

Most NodeLists are **static snapshots**.

They do **not automatically update** when the DOM changes.

---

### Test It

```js
const list = document.getElementById("eventList");

const nodes = document.querySelectorAll(".event");
console.log(nodes.length);

const newItem = document.createElement("li");
newItem.className = "event";
newItem.textContent = "Hackathon";

list.appendChild(newItem);

console.log(nodes.length);
```

➡️ The length does **not change**.

---

### Compare to HTMLCollection

```js
const liveItems = list.children;
console.log(liveItems.length);
```

➡️ This *does* update.

---

## Key Insight

| Collection     | Updates Automatically? |
| -------------- | ---------------------- |
| HTMLCollection | ✅ Yes (live)           |
| NodeList       | ❌ No (static)          |

---

# PART 6 — NodeList vs HTMLCollection (Side-by-Side)

| Feature             | HTMLCollection               | NodeList                   |
| ------------------- | ---------------------------- | -------------------------- |
| Returned by         | `children`, `getElementsBy*` | `querySelectorAll()`       |
| Live                | ✅ Yes                        | ❌ Usually no               |
| Has length          | ✅                            | ✅                          |
| Supports forEach    | ❌                            | ✅                          |
| Supports map/filter | ❌                            | ❌                          |
| Elements only       | ✅                            | ❌ (can include text nodes) |

---

### Thinking Challenge 🤔

Ask students:

> Why might a *static* list be safer in large applications?

Expected reasoning:

* predictable iteration
* avoids infinite loops
* avoids unexpected length changes

---

# PART 7 — When to Use Each

### Use HTMLCollection when:

* you want live updates
* DOM changes frequently
* you need automatic syncing

### Use NodeList when:

* you want predictable results
* attaching event listeners
* looping once over a known set

---

# PART 8 — Common Beginner Mistakes

❌ Assuming NodeList updates automatically
❌ Treating HTMLCollection like an array
❌ Forgetting `.length`
❌ Modifying DOM inside a live loop

✔ Choose the right collection
✔ Loop intentionally

---

# PART 9 — Guided Practice Tasks

Have students **predict before coding**.

---

### Task 1 — NodeList Selection

Select all `.note` elements using `querySelectorAll()` and log them.

---

### Task 2 — Loop with forEach

Print the text of each note.

---

### Task 3 — Static Test

Add a new `.note` paragraph dynamically and check if the NodeList length changes.

---

### Task 4 — Compare Live vs Static

Create:

* one HTMLCollection
* one NodeList
  Add a new list item and observe both lengths.

---

### Task 5 — Thinking Question

Which collection would you prefer when rendering arrays? Why?

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* NodeList usage
* length
* looping
* comparison with HTMLCollection

---

## 7. Reflection Questions

1. Why is a NodeList usually static?
2. Why does forEach work on NodeList but not HTMLCollection?
3. When would a live collection cause bugs?
4. How does this prepare you for event handling?

---

## 8. Assessment (Formative)

| Criteria            | Evidence           |
| ------------------- | ------------------ |
| NodeList identified | Correct selection  |
| Length usage        | Used appropriately |
| Looping             | forEach / for      |
| Concept clarity     | Reflection answers |

---

## 9. Key Takeaways (Student Summary)

* NodeList is a collection of nodes
* Returned by querySelectorAll
* Usually static
* Has length
* Supports forEach
* Different from HTMLCollection

> **Understanding the difference between NodeList and HTMLCollection prevents silent bugs.**

---
