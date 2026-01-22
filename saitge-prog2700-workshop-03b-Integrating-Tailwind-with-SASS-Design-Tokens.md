# 🧩 Workshop: Integrating Tailwind with SASS & Design Tokens

### *Refactoring the Corah Header Using a Unified Design System*

---

## 1. Assignment Details

| Item                   | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Course**             | WEBD / PROG                                    |
| **Workshop Title**     | Integrating Tailwind with SASS & Design Tokens |
| **Type**               | Guided Hands-On Workshop                       |
| **Component Focus**    | Corah Header                                   |
| **Estimated Time**     | 3 hours                                        |
| **Prerequisites**      | Completed SASS & Design Tokens Workshop        |
| **Tools Required**     | VS Code, Node.js, browser                      |
| **Design System**      | Corah Event Management Platform                |
| **Portfolio Artifact** | ✅ Yes                                          |

---

## 2. Overview / Purpose

In the previous workshop, you built the Corah header using:

* Design tokens
* SASS partials
* Component-based CSS

This gave you **full control**, but required writing and maintaining your own CSS system.

In professional environments, teams often combine:

* **Design tokens** → source of truth
* **SASS** → preprocessing and structure
* **Tailwind** → utility abstraction

Tailwind does not replace design tokens.

Instead, it **consumes them**.

In this workshop, you will configure Tailwind to use the **same Corah design tokens** created in the previous lab, then refactor the header to use Tailwind utilities — without losing brand consistency.

---

## 3. Learning Outcomes Addressed

By the end of this workshop, students will be able to:

* Explain how design tokens act as a system baseline
* Describe the role of SASS in token management
* Configure Tailwind to consume design tokens
* Understand Tailwind as an abstraction layer
* Refactor a component while preserving system integrity
* Compare authored CSS vs utility abstraction

---

# 🧠 THEORY: HOW THESE TOOLS WORK TOGETHER

---

## 4. The Modern Front-End Architecture Model

Modern UI systems are layered:

```
Design Decisions
      ↓
Design Tokens (colors, spacing, typography)
      ↓
Pre-Processing Layer (SASS)
      ↓
Framework Abstraction (Tailwind)
      ↓
Components
```

Each layer has a purpose.

| Layer      | Responsibility          |
| ---------- | ----------------------- |
| Tokens     | define decisions        |
| SASS       | organize + manage       |
| Tailwind   | apply decisions quickly |
| Components | deliver UI              |

Tailwind sits **on top**, not underneath.

---

## 5. Why Teams Still Use SASS with Tailwind

Tailwind alone does not:

* Define brand decisions
* Manage multi-theme systems
* Maintain long-term token governance

SASS continues to be used for:

* Token definitions
* Theming
* Legacy CSS
* Shared variables

Tailwind **reads** those decisions through configuration.

---

# 🧭 COMPREHENSIVE TUTORIAL

---

# PART 1 — Starting from the Previous Project

You must begin with your **existing Corah SASS project** from the previous workshop.

You already have:

```
sass/
  tokens/
    _colors.scss
    _spacing.scss
    _typography.scss
```

These files are the **single source of truth**.

You will not duplicate values.

---

# PART 2 — Installing Tailwind in an Existing SASS Project

---

## Step 1 — Initialize Node

From the project root:

```bash
npm init -y
```

---

## Step 2 — Install Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

This creates:

```
tailwind.config.js
```

---

# PART 3 — Bridging SASS Tokens into Tailwind

⚠️ Important concept:

Tailwind cannot read `.scss` directly.

Instead, tokens must be **exported as values** that Tailwind can consume.

This mirrors real-world workflows.

---

## Step 3 — Create a Token Bridge File

Create:

```
tokens.js
```

This file mirrors your SASS tokens.

```js
module.exports = {
  colors: {
    brand: {
      primary: "#7B458F",
      secondary: "#5E2E73",
    },
  },
  spacing: {
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
  fontFamily: {
    base: ["Poppins", "sans-serif"],
  },
};
```

⚠️ Notice:
Values match SASS tokens exactly.

This is **intentional duplication for tooling compatibility**, not design duplication.

---

# PART 4 — Configuring Tailwind with Tokens

Open:

```
tailwind.config.js
```

Update:

```js
const tokens = require("./tokens");

module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.fontFamily,
    },
  },
};
```

Tailwind is now aligned with Corah design tokens.

---

# PART 5 — Updating SASS Entry Point

Your SASS still compiles base styles if needed:

```scss
@use "tokens/colors";
@use "tokens/spacing";
@use "tokens/typography";
```

Tailwind now sits **alongside**, not replacing it.

---

# PART 6 — Adding Tailwind to the CSS Pipeline

Create:

```
src/input.css
```

Add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Compile:

```bash
npx tailwindcss -i ./src/input.css -o ./css/main.css --watch
```

---

# PART 7 — Refactoring the Header

Now replace SASS-based classes with Tailwind utilities that reference the same tokens.

---

## Header Layout

```html
<header class="bg-brand-primary px-lg py-md font-base">
```

These values come from your token configuration.

---

## Layout Structure

```html
<div class="flex justify-between items-center">
```

---

## Logo

```html
<div class="text-white text-lg font-semibold">
  Corah
</div>
```

---

## Navigation

```html
<nav class="flex gap-md text-white">
  <a href="#" class="hover:underline">Events</a>
  <a href="#" class="hover:underline">Create</a>
  <a href="#" class="hover:underline">Dashboard</a>
</nav>
```

---

## CTA Button

```html
<button
  class="bg-white text-brand-primary px-md py-sm rounded-md font-medium hover:bg-neutral-100">
  Create Event
</button>
```

---

# ✅ Final Working Example

```html
<header class="bg-brand-primary px-lg py-md font-base">
  <div class="flex justify-between items-center">

    <div class="text-white text-lg font-semibold">
      Corah
    </div>

    <nav class="flex gap-md text-white">
      <a href="#" class="hover:underline">Events</a>
      <a href="#" class="hover:underline">Create</a>
      <a href="#" class="hover:underline">Dashboard</a>
    </nav>

    <button
      class="bg-white text-brand-primary px-md py-sm rounded-md font-medium hover:bg-neutral-100">
      Create Event
    </button>

  </div>
</header>
```

The header now uses:

* SASS tokens (source of truth)
* Tailwind utilities (application layer)
* No design drift

---

# 🧠 CRITICAL UNDERSTANDING

Tailwind is **not styling**.

Tailwind is **applying constraints**.

The real design lives in the tokens.

This is how enterprise design systems work.

---

## 6. Deliverables

* Working Tailwind + SASS project
* Tailwind configured with Corah tokens
* Header refactored successfully
* Screenshot
* Reflection responses

---

## 7. Reflection Questions

1. Why do design tokens remain the source of truth?
2. Why can’t Tailwind read SASS directly?
3. What problem does Tailwind solve?
4. When would you still write custom SASS?
5. How does this architecture scale to large teams?

---

## 8. Assessment (Practice)

| Criteria                          | Meets Expectations |
| --------------------------------- | ------------------ |
| Tokens reused consistently        | ✔                  |
| Tailwind config correct           | ✔                  |
| Header refactored accurately      | ✔                  |
| No hard-coded values              | ✔                  |
| Reflection shows systems thinking | ✔                  |

---

## 9. Submission Guidelines

* Submit project folder or GitHub repo
* Screenshot included
* Reflection via LMS

---

## 10. Resources

* Tailwind Documentation
* Corah Design Tokens
* Previous SASS Workshop

---

## 11. Academic Policies

Standard NSCC policies apply.

---

## 12. Copyright Notice

© Nova Scotia Community College

---
