# **PROG2700 – Client-Side Programming**

## **Workshop: Building the Corah Header with Bootstrap**

---

## 1. Assignment Details

| Field                | Information                            |
| -------------------- | -------------------------------------- |
| **Assignment Title** | Workshop – Corah Header with Bootstrap |
| **Course Code**      | PROG2700                               |
| **Type**             | Hands-On Workshop (Guided Tutorial)    |
| **Weight**           | Formative (Practice – Not Graded)      |
| **Estimated Time**   | 2–3 hours (in-class guided)            |
| **Prerequisites**    | WEBD3100 Corah HTML/CSS                |
| **Tools**            | VS Code, Web Browser, Bootstrap CDN    |

---

## 2. Overview / Purpose / Objectives

### Purpose

This workshop introduces students to **Bootstrap as a CSS framework** by **rebuilding the Corah site header** using **Bootstrap components and utilities**, instead of custom CSS.

Students will:

* see how frameworks reduce CSS complexity,
* understand how layout and responsiveness are handled,
* prepare for applying frameworks across the full Corah site.

---

### Learning Objectives

By the end of this workshop, students will be able to:

* apply Bootstrap layout and utility classes to an existing HTML structure,
* build a responsive navigation header using Bootstrap components,
* compare framework-based styling to custom CSS from WEBD3100.

---

## 3. Learning Outcomes Addressed

| Learning Outcome | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| **L5**           | Apply CSS libraries / pre-processors to enhance the visual interface and usability of client-side applications |

---

## 4. Assignment Description / Use Case

### Real-World Context

In industry, front-end developers rarely build navigation headers from scratch.
Instead, they:

* use **framework components**,
* apply **consistent spacing and layout utilities**,
* ensure **responsiveness with minimal effort**.

In this workshop, students will **rebuild the Corah header** using **Bootstrap**, transforming a custom-styled header into a **professional, responsive component**.

---

## 5. Tasks / Instructions (Guided Workshop)

> ⚠️ **Important**
> This is a **guided build**. Follow each step in order.
> Do **not** skip steps.

---

### **Step 1 – Start from the Existing Corah Header**

Students should begin with their **existing Corah HTML header**, for example:

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

➡️ **Instructor Prompt:**

> “This works — but it requires custom CSS, media queries, and maintenance.”

---

### **Step 2 – Add Bootstrap to the Project**

Add the Bootstrap CDN **inside `<head>`**:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet">
```

Add Bootstrap JS **before closing `</body>`**:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

➡️ **Instructor Checkpoint:**
Have students refresh and confirm **no layout breaks**.

---

### **Step 3 – Replace the Header with a Bootstrap Navbar**

Replace the original header HTML with:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    
    <a class="navbar-brand" href="#">
      <img src="images/corah-logo.png" alt="Corah" height="40">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#corahNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="corahNavbar">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
      </ul>
    </div>

  </div>
</nav>
```

➡️ **Instructor Demonstration:**
Resize the browser to show:

* mobile hamburger menu
* expanded desktop layout

---

### **Step 4 – Explain What Just Happened (Mini-Teach)**

Instructor explains **only what is needed**:

* `navbar` → main component
* `container` → consistent layout width
* `navbar-expand-lg` → responsive breakpoint
* `ms-auto` → pushes menu to the right
* `collapse` → mobile behavior

➡️ **Key Message:**

> “Bootstrap is doing the hard CSS work for you.”

---

### **Step 5 – Customize the Header Using Utilities**

Students apply Bootstrap utilities:

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary py-3">
```

Optional enhancements:

* `shadow-sm`
* `fw-semibold`
* `text-uppercase`

➡️ **Student Task:**
Modify spacing, colour, and alignment **without writing custom CSS**.

---

### **Step 6 – Compare to WEBD3100 Version**

Students answer verbally or in notes:

* How many CSS rules were removed?
* How is responsiveness handled now?
* What would be harder to maintain?

---

## 6. Deliverables

Students must submit:

* Updated HTML file containing the Bootstrap header
* Screenshot showing:

  * desktop view
  * mobile view (collapsed menu)

---

## 7. Reflection Questions

Students respond briefly:

1. What problem did Bootstrap solve immediately?
2. What part of the header required the least effort using Bootstrap?
3. When would you still choose custom CSS instead of a framework?

---

## 8. Assessment & Rubric (Formative – Feedback Only)

| Criteria                       | Evidence                     |
| ------------------------------ | ---------------------------- |
| Bootstrap integrated correctly | CDN included, navbar renders |
| Responsive behaviour           | Menu collapses correctly     |
| Proper use of utilities        | Spacing, alignment, colours  |
| Clean HTML structure           | Semantic and readable        |

✔ Feedback provided in-class
❌ No grade attached

---

## 9. Submission Guidelines

* Submit via Brightspace
* Upload:

  * HTML file
  * Screenshots (PNG/JPG)

---

## 10. Resources / Equipment

* Bootstrap Documentation (Navbar)
* Corah starter HTML
* Browser DevTools (Responsive Mode)

---

## 11. Academic Policies

Standard NSCC academic integrity and submission policies apply.

---

## 12. Copyright Notice

© Nova Scotia Community College – PROG2700
Educational use only.

---

