# 🎨 Workshop: CSS Pre-Processors & Design Tokens Using SASS

### *Comprehensive Guided Tutorial (Corah Header Case Study)*

---

## 1. Assignment Details

| Item                   | Description                                   |
| ---------------------- | --------------------------------------------- |
| **Course**             | WEBD / PROG                                   |
| **Workshop Title**     | CSS Pre-Processors & Design Tokens Using SASS |
| **Tutorial Focus**     | Corah Header Component                        |
| **Type**               | Guided Hands-On Workshop                      |
| **Estimated Time**     | 3 hours                                       |
| **Assessment Type**    | Practice Assessment                           |
| **Prerequisites**      | HTML structure, basic CSS                     |
| **Tools Required**     | VS Code, Node.js, browser                     |
| **Portfolio Artifact** | ✅ Yes                                         |

---

## 2. Overview / Purpose

Modern websites are not styled page-by-page.

They are built using **design systems**.

A design system is composed of:

* Design tokens (colors, spacing, typography)
* Components (header, buttons, cards)
* Consistent rules applied everywhere

In this workshop, you will learn how **CSS pre-processors (SASS)** allow developers to turn raw CSS into a **scalable styling system**.

You will build the **Corah application header** using:

* Design tokens
* Structured SASS files
* Nesting
* Reusable component patterns

By the end, you will understand **how frameworks like Bootstrap and Tailwind are built internally**.

---

## 3. Learning Outcomes

By completing this workshop, students will be able to:

* Explain what a CSS pre-processor is
* Describe why design tokens are used
* Create SASS variables and partials
* Organize styles using folders
* Compile SASS into CSS
* Build a reusable UI component
* Connect design tokens to real UI decisions

---

# 🧭 COMPREHENSIVE TUTORIAL

---

# PART 1 — Understanding the Problem

Before learning SASS, you must understand **why it exists**.

Consider this CSS:

```css
header {
  background: #7B458F;
  padding: 16px 32px;
  font-family: Poppins;
}
```

Now imagine:

* The brand color changes
* The spacing system changes
* The font changes
* The header appears on every page

You must manually update dozens of values.

This approach does not scale.

---

## Key Problem

CSS has no built-in way to manage:

* Design decisions
* Consistency
* Growth

This is where **design tokens** and **SASS** come in.

---

# PART 2 — What Are Design Tokens?

Design tokens represent **meaning**, not values.

| Token            | Meaning          |
| ---------------- | ---------------- |
| `$brand-primary` | main brand color |
| `$space-md`      | standard spacing |
| `$font-base`     | default font     |

If a value changes, you update it **once**.

Everything updates automatically.

This is the foundation of every modern design system.

---

# PART 3 — What Is SASS?

SASS (Syntactically Awesome Style Sheets) is a **CSS pre-processor**.

It adds features that CSS alone does not provide:

* Variables
* File imports
* Nesting
* Reusable logic

SASS files are compiled into normal CSS.

```
SASS → CSS → Browser
```

The browser never sees SASS.

---

# PART 4 — Project Setup (EXPLICIT)

---

## Step 1 — Create Project Folder

Create a folder named:

```
corah-sass-header
```

Inside it, create:

```
index.html
```

---

## Step 2 — Create CSS Output Folder

Create a folder named:

```
css
```

Inside it, create:

```
main.css
```

⚠️ This file will be generated automatically later.

---

## Step 3 — Create SASS Folder Structure

Create a folder named:

```
sass
```

Inside it create:

```
main.scss
tokens
components
```

Inside `tokens`:

```
_colors.scss
_spacing.scss
_typography.scss
```

Inside `components`:

```
_header.scss
```

Your final structure should look like:

```
corah-sass-header/
│
├── index.html
├── css/
│   └── main.css
└── sass/
    ├── main.scss
    ├── tokens/
    │   ├── _colors.scss
    │   ├── _spacing.scss
    │   └── _typography.scss
    └── components/
        └── _header.scss
```

---

# PART 5 — Creating Corah Design Tokens

---

## Step 4 — Color Tokens

Open:

```
sass/tokens/_colors.scss
```

Add:

```scss
$color-brand-primary: #7B458F;
$color-brand-secondary: #5E2E73;

$color-neutral-900: #1f1f1f;
$color-neutral-100: #f5f5f5;
```

These values define **brand identity**.

---

## Step 5 — Spacing Tokens

Open:

```
sass/tokens/_spacing.scss
```

Add:

```scss
$space-sm: 0.5rem;
$space-md: 1rem;
$space-lg: 2rem;
```

Spacing is now predictable everywhere.

---

## Step 6 — Typography Tokens

Open:

```
sass/tokens/_typography.scss
```

Add:

```scss
$font-family-base: "Poppins", sans-serif;
$font-size-base: 1rem;
$font-size-lg: 1.25rem;
```

---

# PART 6 — Wiring the System Together

Open:

```
sass/main.scss
```

Add:

```scss
@use "tokens/colors";
@use "tokens/spacing";
@use "tokens/typography";
@use "components/header";
```

This file acts as the **design system entry point**.

---

# PART 7 — Building the Header Component

Open:

```
sass/components/_header.scss
```

Add:

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
    background-color: white;
    color: colors.$color-brand-primary;
    padding: spacing.$space-sm spacing.$space-md;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
}
```

This is a **true reusable UI component**.

---

# PART 8 — Installing SASS (Explicit)

Open a terminal in your project folder.

Run:

```bash
npm install -g sass
```

Verify installation:

```bash
sass --version
```

---

# PART 9 — Compiling SASS

Run:

```bash
sass --watch sass/main.scss css/main.css
```

Leave this running.

Any change to SASS will update `main.css`.

---

# PART 10 — HTML Integration

Open `index.html` and add:

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

Refresh your browser.

You now have a **fully working, token-driven header**.

---

# 6. Deliverables

* Working Corah header
* Token files completed
* Compiled CSS file
* Screenshot
* Reflection responses

---

# 7. Reflection Questions

1. Why are design tokens important?
2. What problems does SASS solve?
3. How does nesting improve readability?
4. What would change if Corah rebranded?
5. How do frameworks build on this idea?

---

# 8. Assessment (Practice)

✔ Folder structure
✔ Tokens defined correctly
✔ Header uses tokens
✔ SASS compiles successfully
✔ Reflection demonstrates understanding

---

# Why this tutorial works exceptionally well

This tutorial:

* Is explicit and beginner-safe
* Builds one recognizable component
* Explains *why* before *how*
* Mirrors real industry practice
* Sets up Bootstrap and Tailwind naturally

---
