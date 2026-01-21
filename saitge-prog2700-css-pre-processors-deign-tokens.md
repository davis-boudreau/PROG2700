# 🎨 Workshop: CSS Pre-Processors & Design Tokens Using SASS

### *Extensive Tutorial — Building the Corah Header*

---

## 1. Assignment Details

| Item                   | Description                                   |
| ---------------------- | --------------------------------------------- |
| **Course**             | WEBD / PROG (Front-End Development)           |
| **Workshop Title**     | CSS Pre-Processors & Design Tokens Using SASS |
| **Component Focus**    | Corah Site Header                             |
| **Type**               | Guided Hands-On Tutorial                      |
| **Duration**           | 2–3 hours                                     |
| **Weight**             | Practice Activity (Assessment)                |
| **Prerequisites**      | HTML & CSS fundamentals                       |
| **Design System**      | Corah Event Management Platform               |
| **Portfolio Artifact** | ✅ Yes                                         |

---

## 2. Overview / Purpose

In small websites, writing CSS directly is manageable.

In real applications like **Corah**, it quickly becomes difficult:

* Brand colors are repeated everywhere
* Spacing is inconsistent
* Headers break when design changes
* Updating styles becomes risky

Professional teams solve this problem by introducing **design systems** built from:

* **Design tokens** → design decisions
* **SASS** → structure and reuse
* **Components** → predictable UI behavior

In this workshop, you will **build the Corah header step by step**, learning not only *how* to write SASS — but *why it exists*.

---

## 3. Learning Outcomes

By completing this tutorial, students will be able to:

* Describe the limitations of plain CSS
* Explain the role of design tokens
* Organize styling using SASS partials
* Apply nesting to match HTML structure
* Build a reusable header component
* Understand how frameworks abstract these ideas

---

# 🧭 Tutorial Walkthrough

---

## Step 1 — Understanding the Problem

Let’s imagine we build the Corah header using plain CSS.

We might write:

```css
header {
  background: #7B458F;
  padding: 16px 32px;
  font-family: Poppins;
}
```

Now ask yourself:

* What if the brand color changes?
* What if spacing rules change?
* What if the header appears on 20 pages?

You would need to hunt down values everywhere.

This is the problem **design tokens** solve.

---

## Step 2 — What Are Design Tokens?

Design tokens represent **decisions**, not styles.

Examples:

| Token         | Meaning            |
| ------------- | ------------------ |
| brand-primary | main brand color   |
| space-md      | standard spacing   |
| font-base     | default typography |

Instead of writing values repeatedly, we reference **meaning**.

This creates a **single source of truth**.

---

## Step 3 — Project Structure

Create the following structure:

```
corah-header/
│
├── index.html
├── css/
│   └── main.css
│
└── sass/
    ├── main.scss
    ├── tokens/
    │   ├── _colors.scss
    │   ├── _spacing.scss
    │   └── _typography.scss
    └── components/
        └── _header.scss
```

This mirrors professional front-end projects.

---

## Step 4 — Creating Corah Design Tokens

### 🎨 Color Tokens

`sass/tokens/_colors.scss`

```scss
$color-brand-primary: #7B458F;
$color-brand-secondary: #5E2E73;

$color-neutral-900: #1f1f1f;
$color-neutral-100: #f5f5f5;
```

These values should **never appear inside components**.

---

### 📏 Spacing Tokens

`sass/tokens/_spacing.scss`

```scss
$space-sm: 0.5rem;
$space-md: 1rem;
$space-lg: 2rem;
```

Spacing becomes predictable and consistent.

---

### 🔤 Typography Tokens

`sass/tokens/_typography.scss`

```scss
$font-family-base: "Poppins", sans-serif;
$font-size-base: 1rem;
$font-size-lg: 1.25rem;
```

---

## Step 5 — Importing the System

`sass/main.scss`

```scss
@use "tokens/colors";
@use "tokens/spacing";
@use "tokens/typography";
@use "components/header";
```

This file represents the **entire design system entry point**.

---

## Step 6 — Building the Header Component

Now we create a **real component**.

`sass/components/_header.scss`

```scss
.header {
  background-color: colors.$color-brand-primary;
  padding: spacing.$space-md spacing.$space-lg;
  font-family: typography.$font-family-base;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    color: white;
    font-size: typography.$font-size-lg;
    font-weight: 600;
  }

  &__nav {
    display: flex;
    gap: spacing.$space-md;

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__cta {
    background: white;
    color: colors.$color-brand-primary;
    padding: spacing.$space-sm spacing.$space-md;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
}
```

### Why this matters:

* Nesting mirrors HTML
* Tokens remove magic numbers
* Component is portable and reusable

---

## Step 7 — Compile SASS

Install once:

```bash
npm install -g sass
```

Run:

```bash
sass --watch sass/main.scss css/main.css
```

SASS compiles your system into browser-safe CSS.

---

## Step 8 — Working HTML Example

```html
<link rel="stylesheet" href="css/main.css">

<header class="header">
  <div class="header__container">

    <div class="header__logo">
      Corah
    </div>

    <nav class="header__nav">
      <a href="#">Events</a>
      <a href="#">Create</a>
      <a href="#">Dashboard</a>
    </nav>

    <button class="header__cta">
      Create Event
    </button>

  </div>
</header>
```

At this point, students see a **fully working header**, styled entirely through tokens.

---

## 6. Deliverables

* Working Corah header
* Token files created
* Compiled CSS
* Screenshot of output
* Reflection responses

---

## 7. Reflection Questions

1. Why are design tokens more powerful than raw CSS variables?
2. How does SASS help manage growth?
3. What would change if Corah rebranded?
4. How do frameworks build on this idea?
5. What part of this system would scale best?

---

## 8. Assessment (Practice)

✔ Structure
✔ Tokens
✔ Component logic
✔ Compilation
✔ Reflection

---

## Why this version works exceptionally well

This tutorial:

* Teaches **thinking, not syntax**
* Builds something students recognize
* Makes frameworks feel logical later
* Reinforces Corah continuity
* Produces a **design-system artifact**, not just CSS

---
