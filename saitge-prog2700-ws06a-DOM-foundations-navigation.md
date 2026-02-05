# **PROG2700 – Client-Side Programming**

## **Workshop 06a – Introduction to the DOM (Foundations & Navigation)**

---

## 1. Assignment Details

| Field                | Information                            |
| -------------------- | -------------------------------------- |
| **Assignment Title** | Workshop 06a – DOM Fundamentals        |
| **Course Code**      | PROG2700                               |
| **Type**             | Guided Hands-On Workshop               |
| **Weight**           | Formative (Practice – Not Graded)      |
| **Estimated Time**   | 2.5–3 hours                            |
| **Prerequisites**    | Workshop 05 – Functions, Arrays & CRUD |
| **Tools Required**   | VS Code, Browser, DevTools             |

---

## 2. Overview / Purpose / Objectives

### Purpose

Before JavaScript can **change a web page**, students must understand **what the page actually is** in JavaScript terms.

This workshop introduces the **Document Object Model (DOM)** from a **beginner perspective**, focusing on:

* what nodes are,
* how nodes relate to each other,
* how JavaScript navigates the DOM tree,
* how values and content are stored and changed.

This workshop is **exploration-first**, not build-first.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* explain what the DOM is,
* identify different DOM node types,
* navigate between nodes using JavaScript,
* read node names, values, and types,
* safely inspect and modify DOM content,
* understand how HTML becomes a tree structure.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **L2**           | Demonstrate proficiency in DOM manipulation to meet project requirements |

---

## 4. Assignment Description / Use Case

### Real-World Context

Frameworks (React, Vue, Angular) **hide the DOM**, but they do not eliminate it.

Every client-side developer must understand:

* how the browser represents HTML,
* how JavaScript interacts with that structure,
* why incorrect DOM navigation causes bugs.

This workshop builds that mental model.

---

# PART 1 — What Is the DOM? (Core Theory)

### Key Idea

The **DOM (Document Object Model)** is a **tree of objects** created by the browser from your HTML.

* HTML → file
* DOM → live, interactive structure
* JavaScript → controls the DOM

> JavaScript never edits the HTML file — it edits the DOM.

---

## DOM as a Tree

```text
document
 └── html
     ├── head
     └── body
         ├── h1
         ├── p
         └── ul
             ├── li
             ├── li
             └── li
```

```text
Document
│
├─ Definition:
│  The Document object represents the entire web page.
│  It is the entry point to the DOM and owns all other nodes.
│
└── Root Element: <html>
    │
    ├─ Definition:
    │  The root element is the top-level HTML element.
    │  Every HTML document has exactly one <html> element.
    │
    ├── Element: <head>
    │   │
    │   ├─ Purpose:
    │   │  Contains metadata *about* the document,
    │   │  not content shown directly on the page.
    │   │
    │   └── Element: <title>
    │       │
    │       ├─ Node type: Element Node
    │       │
    │       └── Text Node:
    │           "My title"
    │
    └── Element: <body>
        │
        ├─ Purpose:
        │  Contains all visible content rendered in the browser.
        │
        ├── Element: <a>
        │   │
        │   ├─ Attribute Node:
        │   │  href
        │   │  (provides additional information about the element)
        │   │
        │   └── Text Node:
        │       "My link"
        │
        └── Element: <h1>
            │
            ├─ Semantic meaning:
            │  Highest-level heading in the document
            │
            └── Text Node:
                "My header"
```

Everything is a **node**.

---

# PART 2 — Setup (Minimal HTML)

Create:

```
workshop06a/
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workshop 06a – DOM Fundamentals</title>
</head>
<body>

  <h1 id="title">DOM Fundamentals</h1>

  <p>This paragraph explains the DOM.</p>

  <ul id="eventList">
    <li>Conference</li>
    <li>Workshop</li>
    <li>Meetup</li>
  </ul>

  <script src="script.js"></script>
</body>
</html>
```

Open the page and open **DevTools → Console**.

---

# PART 3 — DOM Nodes (Everything Is a Node)

### Theory

In the DOM:

* elements are nodes
* text is a node
* attributes are nodes
* even whitespace can be a node

---

### Interactive Exploration

```js
console.log(document);
```

➡️ Expand it in the console.

Ask students:

* Do you see `html`, `head`, `body`?
* Does this match the HTML file?

---

## Node Types (Conceptual)

| Node          | Description               |
| ------------- | ------------------------- |
| Element node  | HTML tags (`<p>`, `<ul>`) |
| Text node     | Text inside elements      |
| Document node | The entire page           |

---

# PART 4 — Node Relationships (Tree Thinking)

### Theory

DOM nodes have **family relationships**:

* parent
* children
* siblings

---

### Interactive Exercise

```js
const list = document.getElementById("eventList");

console.log(list.parentNode);
console.log(list.childNodes);
```

Discuss:

* What is the parent?
* How many child nodes exist?
* Why more than 3?

➡️ Whitespace counts.

---

# PART 5 — Navigating Between Nodes (Required Properties)

These properties allow movement through the DOM tree.

---

### parentNode

```js
console.log(list.parentNode);
```

Moves **up** the tree.

---

### childNodes[n]

```js
console.log(list.childNodes[0]);
```

Returns a node (could be text).

---

### firstChild / lastChild

```js
console.log(list.firstChild);
console.log(list.lastChild);
```

Often text nodes!

---

### nextSibling / previousSibling

```js
const firstItem = list.firstChild;
console.log(firstItem.nextSibling);
```

Moves **sideways**.

---

### Instructor Pause (Important)

Ask:

> Why do we keep seeing `#text` nodes?

Answer:

> Because whitespace and line breaks are text nodes.

---

# PART 6 — Child Nodes vs Element Nodes

### Key Distinction

* `childNodes` → **all nodes**
* `children` → **elements only**

---

### Demonstration

```js
console.log(list.childNodes);
console.log(list.children);
```

➡️ `children` is usually safer for beginners.

---

# PART 7 — Node Values & Content

## nodeValue

```js
console.log(list.nodeValue);
```

Result: `null` (elements don’t store text)

---

### Access text node value

```js
console.log(list.firstChild.nodeValue);
```

---

### Change text node value

```js
list.firstChild.nodeValue = "Updated Conference";
```

Observe the page update.

---

# PART 8 — innerHTML (Powerful but Dangerous)

### Theory

`innerHTML` replaces **all content inside an element**.

---

### Example

```js
list.innerHTML = "<li>New Event</li>";
```

✔ Easy
❌ Replaces everything

---

### Warning (Explain Explicitly)

* innerHTML removes event listeners
* innerHTML can introduce security risks
* innerHTML should be used carefully

---

# PART 9 — DOM Root Nodes

### document

```js
console.log(document);
```

The **root** of the DOM.

---

### documentElement

```js
console.log(document.documentElement);
```

Represents `<html>`.

---

### body

```js
console.log(document.body);
```

Where most DOM work happens.

---

# PART 10 — nodeName, nodeValue, nodeType

These properties describe **what a node is**.

---

### nodeName

```js
console.log(list.nodeName);
```

Outputs:

```text
UL
```

---

### nodeValue

```js
console.log(list.nodeValue); // null
console.log(list.firstChild.nodeValue);
```

---

### nodeType

```js
console.log(list.nodeType);
```

Common values:

| nodeType | Meaning       |
| -------- | ------------- |
| 1        | Element node  |
| 3        | Text node     |
| 9        | Document node |

---

# PART 11 — Guided Practice Tasks

1. Log the `nodeName` of:

   * the `<h1>`
   * the `<ul>`
2. Navigate from the `<ul>` to:

   * its parent
   * its first child
3. Change the text of the first `<li>` using `nodeValue`
4. Replace all list items using `innerHTML`
5. Log the `nodeType` of:

   * document
   * body
   * a text node

---

## 6. Deliverables

Submit:

* `index.html`
* `script.js`

Containing:

* console exploration
* DOM navigation examples
* node property usage

---

## 7. Reflection Questions

1. Why is the DOM described as a tree?
2. Why are text nodes confusing for beginners?
3. When is `children` safer than `childNodes`?
4. Why is `innerHTML` considered dangerous?
5. How does this knowledge help before rendering arrays?

---

## 8. Assessment (Formative)

| Criteria               | Evidence                        |
| ---------------------- | ------------------------------- |
| DOM node understanding | Correct navigation              |
| Property usage         | nodeName / nodeValue / nodeType |
| Exploration            | Console-based investigation     |
| Concept clarity        | Reflection responses            |

---

## 9. Key Takeaways (Student Summary)

* The DOM is a tree
* Everything is a node
* Nodes have relationships
* Text is separate from elements
* JavaScript navigates the DOM, not HTML
* Understanding this prevents bugs later

> **If you understand the DOM tree, DOM manipulation becomes logical instead of magical.**

---

