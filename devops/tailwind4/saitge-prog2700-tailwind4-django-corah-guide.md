# 🧠 Corah Tailwind 4 Guide

## *Understanding Tailwind v4 + PostCSS + NPM in a Django Environment*

---

# 1. 🎯 What Students Need to Understand First

Before writing any code, you need to understand **what Tailwind 4 actually is now**.

### ❗ Tailwind v3 vs v4 (Critical Shift)

| Concept          | Tailwind v3          | Tailwind v4 (Corah)   |
| ---------------- | -------------------- | --------------------- |
| Configuration    | `tailwind.config.js` | ✅ CSS (`@theme`)      |
| Build Tool       | CLI / PostCSS        | ✅ PostCSS (preferred) |
| Design System    | JS-based             | ✅ CSS variables       |
| Tokens           | Optional             | ✅ Core architecture   |
| Content scanning | config file          | ✅ `@source` in CSS    |

👉 **Big idea:**

> Tailwind is no longer “configured in JS” — it is now a **CSS-driven design system engine**.

---

# 2. 🧱 High-Level Architecture (Corah Model)

This is the most important mental model:

```
Django Templates (HTML)
        ↓
Tailwind scans classes (@source)
        ↓
PostCSS compiles CSS
        ↓
app.css (final output)
        ↓
Django serves CSS
```

---

# 3. 📁 Project Structure (Corah Standard)

```
static/
├── src/
│   ├── input.css        ← Tailwind ENTRY POINT
│   ├── theme.css        ← Design tokens (colors, fonts, spacing)
│   └── components.css   ← Reusable UI classes (btn, card, etc.)
│
├── css/
│   └── app.css          ← GENERATED FILE (do not edit)
```

---

# 4. ⚙️ Toolchain Explained (THIS is what confuses everyone)

## 🔧 NPM

NPM is used to install:

* Tailwind
* PostCSS
* Build tools

👉 Think of NPM as:

> “The package manager that installs our frontend toolchain”

---

## 🔧 PostCSS

PostCSS is the **engine that runs Tailwind**.

👉 Think of PostCSS as:

> “The compiler that processes our CSS and runs Tailwind”

---

## 🔧 Tailwind (v4)

Tailwind is now:

* a **PostCSS plugin**
* driven by CSS (`@theme`, `@layer`, `@source`)

👉 Think of Tailwind as:

> “A CSS generation engine based on classes and tokens”

---

# 5. 🔌 How Everything Connects

## `package.json`

```json
"scripts": {
  "build:css": "postcss ./static/src/input.css -o ./static/css/app.css",
  "watch:css": "postcss ./static/src/input.css -o ./static/css/app.css --watch"
}
```

👉 This means:

| Command             | What it does             |
| ------------------- | ------------------------ |
| `npm run build:css` | builds CSS once          |
| `npm run watch:css` | rebuilds on file changes |

---

## `postcss.config.mjs`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};
```

👉 This tells PostCSS:

> “Run Tailwind when processing CSS”

---

# 6. 🎬 The Entry Point (MOST IMPORTANT FILE)

## `input.css`

```css
@import "tailwindcss";

/* Tell Tailwind where your HTML lives */
@source "../../templates/**/*.html";
@source "../../**/*.py";

/* Your design system */
@import "./theme.css";
@import "./components.css";
```

---

### 🔍 What is happening here?

1. `@import "tailwindcss"`
   → loads Tailwind engine

2. `@source`
   → tells Tailwind where to scan for classes like:

   ```
   class="bg-primary-600 text-white"
   ```

3. `@import theme.css`
   → loads your design tokens

4. `@import components.css`
   → loads reusable UI classes

---

# 7. 🎨 Design System (theme.css)

This is where Corah becomes **professional-grade**.

---

## 🧠 Key Idea

We define **design tokens**:

```css
:root {
  --corah-primary-600: #6a3c7b;
  --corah-text: #212529;
}
```

Then map them into Tailwind:

```css
@theme inline {
  --color-primary-600: var(--corah-primary-600);
  --color-text: var(--corah-text);
}
```

---

## 💡 Why this matters

Instead of:

```html
class="bg-purple-700"
```

We write:

```html
class="bg-primary-600"
```

👉 This gives:

* consistency
* branding
* maintainability

---

# 8. 🧩 Components Layer (components.css)

Example:

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg bg-action-primary text-action-on;
  }
}
```

---

## 🧠 What is `@layer`?

It tells Tailwind:

> “These are reusable component classes — compile them properly”

---

## 💡 Why not just utilities?

Instead of:

```html
class="px-4 py-2 rounded-lg bg-purple-600 text-white"
```

We use:

```html
class="btn"
```

👉 This is:

* cleaner
* reusable
* scalable

---

# 9. 🐳 Docker Integration (What Students Miss)

## Tailwind runs in its own container

```yaml
tailwind:
  command: npm run watch:css
```

---

## 🧠 What this does

* watches CSS changes
* rebuilds automatically
* keeps Django separate

---

## ❗ Important Lesson

We DO NOT run:

```bash
npx tailwindcss ...
```

Why?

👉 Because we are using **PostCSS**, not the Tailwind CLI.

---

# 10. 🚀 Full Development Workflow

## Step 1 – Install dependencies

```bash
npm install
```

---

## Step 2 – Start containers

```bash
docker compose up
```

---

## Step 3 – Tailwind runs automatically

```bash
npm run watch:css
```

---

## Step 4 – Edit templates

```html
<div class="bg-primary-600 text-white p-4">
```

---

## Step 5 – Tailwind detects changes

→ rebuilds CSS
→ Django reloads page

---

# 11. 🧪 Debugging Checklist

If Tailwind “is not working”:

### ✅ Check 1: CSS file exists

```
static/css/app.css
```

---

### ✅ Check 2: Template includes CSS

```html
<link rel="stylesheet" href="{% static 'css/app.css' %}">
```

---

### ✅ Check 3: Tailwind container running

```bash
docker logs corah_tailwind
```

---

### ✅ Check 4: Classes exist in output

Search `app.css` for:

```
.bg-primary-600
```

---

### ✅ Check 5: @source paths correct

If Tailwind doesn't see templates → no CSS generated.

---

# 12. ⚠️ Common Student Mistakes

| Mistake                    | Why it's wrong     |
| -------------------------- | ------------------ |
| Using `tailwind.config.js` | v4 uses CSS-first  |
| Running `npx tailwindcss`  | wrong toolchain    |
| Editing `app.css`          | generated file     |
| Missing `@source`          | no class detection |
| Circular CSS variables     | breaks tokens      |

---

# 13. 🧠 Final Mental Model

> Tailwind v4 is NOT a CSS library
> It is a **design system compiler powered by PostCSS**

---

# 14. 🧭 Corah Standard (Memorize This)

✔ Tailwind runs through **PostCSS**
✔ Design tokens live in **theme.css**
✔ Components live in **components.css**
✔ Entry file is **input.css**
✔ Output file is **app.css**
✔ Django only loads compiled CSS

---

# 15. 🔥 Instructor Insight (What You Should Remember)

This architecture is not just for Tailwind.

You are learning:

* modern frontend build pipelines
* design systems (tokens → components → UI)
* separation of concerns
* containerized frontend tooling

👉 This is **industry-level frontend architecture**

---
