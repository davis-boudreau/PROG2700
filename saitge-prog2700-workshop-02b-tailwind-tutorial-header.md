## 1. Assignment Details

| Field                | Information                           |
| -------------------- | ------------------------------------- |
| **Assignment Title** | Workshop – Corah Header with Tailwind |
| **Course Code**      | PROG2700                              |
| **Type**             | Hands-On Workshop (Guided Tutorial)   |
| **Weight**           | Formative (Practice – Not Graded)     |
| **Estimated Time**   | 2–3 hours (in-class guided)           |
| **Prerequisites**    | WEBD3100 Corah HTML/CSS               |
| **Tools**            | VS Code, Web Browser, Tailwind CDN    |

---

## 2. Overview / Purpose / Objectives

### Purpose

This workshop introduces **Tailwind CSS** by rebuilding the **Corah site header** using **utility classes** (instead of custom CSS). Students will experience how Tailwind differs from Bootstrap and decide when each approach makes sense.

### Learning Objectives

By the end of this workshop, students will be able to:

* Build a **responsive header + navigation** using Tailwind utilities.
* Use **flex, spacing, typography, and breakpoint utilities** for layout.
* Implement a **mobile menu toggle** (minimal vanilla JS, optional but recommended).
* Compare **Tailwind vs Bootstrap** in terms of workflow, reuse, and maintainability.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| **L5**           | Apply CSS libraries / pre-processors to enhance the visual interface and usability of client side applications |

*(Optional secondary if you include the menu toggle)*
| **L2** | DOM manipulation (basic class toggling for menu open/close) |

---

## 4. Assignment Description / Use Case

### Real-World Context

Many teams choose between:

* **Bootstrap** (component-first) for fast standardized UI, or
* **Tailwind** (utility-first) for design-system consistency and custom layouts without writing CSS.

In this workshop, students rebuild the Corah header in Tailwind and compare it to the Bootstrap implementation.

---

## 5. Tasks / Instructions (Guided Workshop)

> ✅ This is a guided build. Follow each step in order.
> ✅ Build first, then discuss “why” and “trade-offs”.

---

### **Step 1 — Start from the Existing Corah Header**

Students begin with the existing Corah header HTML (from WEBD3100), for example:

```html
<header class="corah-header">
  <div class="logo">
    <img src="images/corah-logo.png" alt="Corah">
  </div>
  <nav>
    <ul>
      <li><a href="#">Events</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Register</a></li>
      <li><a href="#">Login</a></li>
    </ul>
  </nav>
</header>
```

**Instructor Prompt:**

> “Same starting point as Bootstrap. Now we’ll style it using Tailwind utilities instead of components.”

---

### **Step 2 — Add Tailwind to the Project (CDN)**

Add this to `<head>`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

> Instructor note: CDN is perfect for workshops. In later projects you can introduce Tailwind CLI/build steps if desired.

---

### **Step 3 — Replace the Header with a Tailwind Header Shell**

Replace the existing header with this *base structure*:

```html
<header class="bg-white border-b">
  <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
    <a href="#" class="flex items-center gap-3">
      <img src="images/corah-logo.png" alt="Corah" class="h-10 w-auto">
      <span class="text-lg font-semibold tracking-tight">Corah</span>
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center gap-6">
      <a class="text-sm font-medium hover:underline" href="#">Events</a>
      <a class="text-sm font-medium hover:underline" href="#">About</a>
      <a class="text-sm font-medium hover:underline" href="#">Register</a>
      <a class="text-sm font-medium hover:underline" href="#">Login</a>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      id="menuBtn"
      class="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium"
      aria-controls="mobileNav"
      aria-expanded="false"
    >
      Menu
    </button>
  </div>

  <!-- Mobile Nav Panel -->
  <div id="mobileNav" class="md:hidden hidden border-t bg-white">
    <nav class="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
      <a class="text-sm font-medium" href="#">Events</a>
      <a class="text-sm font-medium" href="#">About</a>
      <a class="text-sm font-medium" href="#">Register</a>
      <a class="text-sm font-medium" href="#">Login</a>
    </nav>
  </div>
</header>
```

**Instructor Demo (live):**

* Resize browser: desktop nav appears at `md`, mobile button appears below `md`.
* Explain: `hidden md:flex` is the breakpoint logic.

---

### **Step 4 — Explain What Just Happened (Mini-Teach, 5 minutes max)**

Teach only the essentials:

* `max-w-6xl mx-auto px-4` → layout container + padding
* `flex items-center justify-between` → alignment
* `hidden md:flex` → responsive display rules
* `gap-6` → spacing between nav links
* `border-b` and `border-t` → separators

**Key Message:**

> “Tailwind is readable once you learn to *scan* the utilities.”

---

### **Step 5 — Add Corah Brand Styling Using Tailwind Utilities**

Students customize colours + polish *without writing CSS*.

Replace the header class line:

```html
<header class="bg-white border-b">
```

With:

```html
<header class="bg-slate-900 text-white border-b border-slate-800">
```

Then update nav link styles:

```html
<a class="text-sm font-medium text-slate-200 hover:text-white hover:underline" href="#">Events</a>
```

Update mobile button:

```html
<button
  id="menuBtn"
  class="md:hidden inline-flex items-center justify-center rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
  aria-controls="mobileNav"
  aria-expanded="false"
>
  Menu
</button>
```

Update mobile panel:

```html
<div id="mobileNav" class="md:hidden hidden border-t border-slate-800 bg-slate-900">
```

---

### **Step 6 — Mobile Menu Toggle (Minimal Vanilla JS)**

*(Recommended — this is the Tailwind equivalent of Bootstrap’s built-in collapse behaviour.)*

Add this before `</body>`:

```html
<script>
  const btn = document.getElementById("menuBtn");
  const panel = document.getElementById("mobileNav");

  btn.addEventListener("click", () => {
    const isOpen = !panel.classList.contains("hidden");
    panel.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
</script>
```

**Instructor Talking Point:**

> “Bootstrap ships behavior (JS) with components. Tailwind gives styling; you decide the behavior.”

---

### **Step 7 — Compare Tailwind vs Bootstrap (Guided Reflection in Class)**

Students complete a quick comparison (discussion or short notes):

**A) Speed to first result**

* Which was faster to produce a working responsive header?

**B) Control**

* Which gave more control over spacing/typography without custom CSS?

**C) Responsiveness**

* Bootstrap: uses component behavior
* Tailwind: uses breakpoints + your own toggle logic
* Which feels clearer?

**D) Maintainability**

* Where do changes live (HTML utilities vs component + config)?
* Which is easier for your team?

---

## 6. Deliverables

Students submit:

1. `header-tailwind.html` (or updated Corah template)
2. Two screenshots:

   * Desktop view (nav visible)
   * Mobile view (menu opened)

---

## 7. Reflection Questions

1. What Tailwind utility did you use most often and why?
2. What did Tailwind make easier compared to writing custom CSS?
3. What did Bootstrap do automatically that Tailwind required you to implement?
4. If Corah needed a full design system and unique layout, which would you choose? Why?

---

## 8. Assessment & Rubric (Formative – Feedback Only)

| Criteria                                 | Evidence                                  |
| ---------------------------------------- | ----------------------------------------- |
| Tailwind integrated correctly            | Tailwind CDN included and classes apply   |
| Responsive behavior                      | Desktop + mobile behavior works           |
| Utility usage is intentional             | Layout, spacing, and typography are clear |
| Mobile menu toggle works *(if included)* | Button opens/closes panel                 |
| Clean structure                          | Semantic header/nav, readable markup      |

✔ Feedback provided in-class
❌ No grade attached (unless you choose to convert into a skill check)

---

## 9. Submission Guidelines

Upload to Brightspace:

* HTML file
* Screenshots (PNG/JPG)

---

## 10. Resources / Equipment

* Tailwind docs (utilities, responsive breakpoints)
* Browser DevTools (responsive mode)
* Corah header baseline HTML

---

## 11. Academic Policies

Standard NSCC academic integrity and submission policies apply.

---

## 12. Copyright Notice

© Nova Scotia Community College – PROG2700
Educational use only.

---

# Instructor Teaching Notes (Not Student-Facing)

### Common student sticking points (plan for them)

* forgetting `md:` breakpoint logic
* confusion about “too many classes”
* missing `hidden` on the mobile panel
* forgetting to include JS toggle

### Coaching lines that work

* “Read utilities as a sentence: *flex + align + space + breakpoint*”
* “Bootstrap gives you the component. Tailwind lets you design the component.”

---

## Optional Upgrade (If you want Corah brand alignment)

If you’ve got a Corah brand colour (e.g., `#7B458F`), we can apply it via Tailwind CDN config:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: { corah: "#7B458F" }
      }
    }
  }
</script>
```

Then use:

* `bg-corah`, `hover:bg-corah/90`, etc.

---
