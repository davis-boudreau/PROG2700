# **PROG2700 – Client-Side Programming**

## **Workshop 06b – JavaScript HTML DOM Elements (Creating, Removing, Replacing Nodes)**

---

## 1. Assignment Details

| Field                | Information                                     |
| -------------------- | ----------------------------------------------- |
| **Assignment Title** | Workshop 06b – DOM Elements & Node Manipulation |
| **Course Code**      | PROG2700                                        |
| **Type**             | Guided Hands-On Workshop                        |
| **Weight**           | Formative (Practice – Not Graded)               |
| **Estimated Time**   | 1-2 hours hours                                     |
| **Prerequisites**    | Workshop 06a – DOM Fundamentals                 |
| **Tools Required**   | VS Code, Browser, DevTools                      |

---

## 2. Overview / Purpose / Objectives

### Purpose

In **Workshop 06a**, you learned **what the DOM is** and how to **navigate it**.

In this workshop, you will learn how to **change the DOM safely** by:

* creating new nodes,
* inserting them into the DOM tree,
* removing existing nodes,
* replacing nodes with new ones.

This is the foundation for:

* dynamic content,
* UI updates,
* rendering arrays,
* and everything frameworks automate later.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* create new HTML elements using JavaScript,
* insert elements into the DOM tree,
* remove existing elements safely,
* remove specific child nodes,
* replace elements with new elements,
* reason about **where** and **why** DOM changes occur.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements |

---

## 4. Assignment Description / Use Case

### Real-World Context

Client-side applications constantly update the page:

* adding new items,
* deleting old ones,
* replacing outdated content.

Understanding **how and where nodes are created, removed, and replaced** prevents:

* broken layouts,
* memory leaks,
* duplicated content,
* unpredictable UI behavior.

This workshop builds **intentional DOM manipulation habits**.

---

# PART 1 — Starting Point (Shared DOM)

Reuse the same mental model and simplicity as Workshop 6a.

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop 06b – DOM Elements</title>
</head>
<body>

  <h1 id="title">DOM Element Manipulation</h1>

  <p id="description">
    This paragraph may be replaced.
  </p>

  <ul id="eventList">
    <li>Conference</li>
    <li>Workshop</li>
    <li>Meetup</li>
  </ul>

  <script src="script.js"></script>
</body>
</html>
```

---

### script.js

Start with an empty file and open **DevTools → Console**.

---

# PART 2 — Creating New HTML Elements (Nodes)

### Theory (Minimal, On Purpose)

JavaScript **does not write HTML strings** by default.
It creates **node objects**, then inserts them into the DOM tree.

---

## Step 1 — Create an Element

```js
const newItem = document.createElement("li");
console.log(newItem);
```

➡️ The element exists, but **is not on the page yet**.

**Instructor prompt:**

> “Why don’t we see anything yet?”

Answer:

> Because it hasn’t been attached to the DOM.

---

## Step 2 — Add Content

```js
newItem.textContent = "Networking Night";
```

---

## Step 3 — Insert into the DOM

```js
const list = document.getElementById("eventList");
list.appendChild(newItem);
```

✔ Node created
✔ Node attached
✔ Page updated

---

### Think About This 🤔

* Where did the node live *before* `appendChild()`?
* Why is DOM insertion a separate step?

---

# PART 3 — Removing Existing HTML Elements

### Theory

Removing an element means **detaching it from the DOM tree**.

---

## Example — Remove an Element Directly

```js
const paragraph = document.getElementById("description");
paragraph.remove();
```

➡️ The element is gone from the page.

---

### Thinking Challenge 🤔

* Is the JavaScript variable still defined?
* What happens if you try to remove it again?

---

# PART 4 — Removing a Child Node

### Theory

Sometimes you cannot remove a node directly —
you must remove it **through its parent**.

This reinforces DOM **parent → child relationships**.

---

## Step 1 — Identify Parent and Child

```js
const list = document.getElementById("eventList");
const firstItem = list.firstElementChild;
```

---

## Step 2 — Remove Child

```js
list.removeChild(firstItem);
```

➡️ The first `<li>` disappears.

---

### Why This Matters

* Older browsers required this pattern
* APIs often return parent + child relationships
* This reinforces tree thinking

---

# PART 5 — Replacing HTML Elements

### Theory

Replacing means:

1. create a new node
2. swap it with an existing one

Nothing is “edited in place” — nodes are **replaced**.

---

## Step 1 — Select Old Element

```js
const oldParagraph = document.getElementById("description");
```

---

## Step 2 — Create Replacement

```js
const newParagraph = document.createElement("p");
newParagraph.textContent = "This content was dynamically replaced.";
```

---

## Step 3 — Replace

```js
oldParagraph.parentNode.replaceChild(newParagraph, oldParagraph);
```

✔ Old node removed
✔ New node inserted in same position

---

### Thinking Challenge 🤔

* Why do we need the parent node?
* Why not call `replaceChild()` on the paragraph itself?

---

# PART 6 — Comparing Techniques (Critical Thinking)

| Action          | Preferred Method           |
| --------------- | -------------------------- |
| Create element  | `document.createElement()` |
| Insert element  | `appendChild()`            |
| Remove element  | `remove()`                 |
| Remove child    | `removeChild()`            |
| Replace element | `replaceChild()`           |

---

### Contrast With innerHTML

```js
list.innerHTML = "<li>Only One Item</li>";
```

Ask students:

* What happened to the other nodes?
* What else was removed silently?

---

# PART 7 — Guided Practice Tasks

Have students **predict first**, then code.

---

### Task 1 — Create & Insert

Create a new `<li>` with text `"Hackathon"` and add it to the list.

---

### Task 2 — Remove Last Item

Remove the last `<li>` from the list.

---

### Task 3 — Remove by Parent

Remove the second list item using `removeChild()`.

---

### Task 4 — Replace the Title

Replace the `<h1>` with a new `<h2>` that says:

> “Updated DOM Manipulation”

---

### Task 5 — Reflect in Console

Log:

* the parent of the `<ul>`
* the number of remaining child elements

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Demonstrating:

* element creation
* insertion
* removal
* replacement

---

## 7. Reflection Questions

1. Why must elements be attached to the DOM to appear?
2. Why does removing a child reinforce DOM tree thinking?
3. Why is replacement safer than editing innerHTML?
4. How does this prepare you for rendering arrays?

---

## 8. Assessment (Formative)

| Criteria              | Evidence             |
| --------------------- | -------------------- |
| Element creation      | createElement used   |
| DOM insertion         | appendChild          |
| Removal techniques    | remove / removeChild |
| Replacement           | replaceChild         |
| Concept understanding | Reflection answers   |

---

## 9. Key Takeaways (Student Summary)

* DOM changes happen through nodes
* Nodes must be created before insertion
* Parents control children
* Replacement swaps nodes, not text
* Safe DOM manipulation prevents bugs

> **If you can create, remove, and replace nodes intentionally, you control the DOM.**

---
