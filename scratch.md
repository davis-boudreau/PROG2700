# ✅ PART H — Templates (Complete Starter Code)

Students must create **all files below exactly**.

---

## `/templates/base/base.html`

```html
{% load static %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{% block title %}Corah UI Starter{% endblock %}</title>

  <!-- Tailwind compiled output -->
  <link rel="stylesheet" href="{% static 'css/app.css' %}">
</head>

<body class="min-h-screen bg-surface-1 text-text-1 font-base">

  {% include "includes/header.html" %}

  <main class="max-w-6xl mx-auto px-6 py-10">
    {% block content %}{% endblock %}
  </main>

  {% include "includes/footer.html" %}

  <!-- Theme Toggle Script -->
  <script>
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");

    function setTheme(theme) {
      theme === "dark"
        ? root.classList.add("dark")
        : root.classList.remove("dark");
    }

    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark =
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const next = root.classList.contains("dark") ? "light" : "dark";
      setTheme(next);
      localStorage.setItem("theme", next);
    });
  </script>

</body>
</html>
```

---

## `/templates/includes/header.html`

```html
<header class="border-b border-border bg-surface-1">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

    <a href="{% url 'home' %}" class="font-semibold tracking-tight">
      Corah
    </a>

    <nav class="flex gap-6 text-text-2">
      <a href="{% url 'home' %}" class="hover:text-text-1">Home</a>
      <a href="{% url 'about' %}" class="hover:text-text-1">About</a>
      <a href="{% url 'events' %}" class="hover:text-text-1">Events</a>
    </nav>

    <div class="flex items-center gap-3">
      <button
        id="themeToggle"
        class="rounded-md border border-border px-3 py-2 text-sm hover:bg-surface-2"
      >
        Theme
      </button>

      <a
        href="#"
        class="rounded-md bg-brand-primary text-white px-4 py-2 text-sm font-medium hover:opacity-90"
      >
        Create Event
      </a>
    </div>

  </div>
</header>
```

---

## `/templates/includes/footer.html`

```html
<footer class="border-t border-border bg-surface-1">
  <div class="max-w-6xl mx-auto px-6 py-6 text-sm text-text-2">
    © {% now "Y" %} Corah UI Architecture Starter — NSCC
  </div>
</footer>
```

---

## `/templates/pages/home.html`

```html
{% extends "base/base.html" %}
{% block title %}Home — Corah{% endblock %}

{% block content %}
<section class="space-y-10">

  <div class="space-y-4">
    <h1 class="text-4xl font-semibold tracking-tight">
      Corah UI Architecture Starter
    </h1>

    <p class="text-text-2 max-w-2xl">
      This project demonstrates a textbook CSS architecture using
      design tokens, Tailwind as the application layer, and Django
      templates for reuse.
    </p>

    <div class="flex gap-3">
      <a
        href="#"
        class="rounded-md bg-brand-primary text-white px-4 py-2 text-sm font-medium hover:opacity-90"
      >
        Get Started
      </a>

      <a
        href="{% url 'about' %}"
        class="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-2"
      >
        Learn More
      </a>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="rounded-xl border border-border p-5 bg-surface-1">
      <h3 class="font-semibold">Tokens First</h3>
      <p class="text-sm text-text-2 mt-2">
        All design decisions live in tokens, not scattered CSS rules.
      </p>
    </div>

    <div class="rounded-xl border border-border p-5 bg-surface-1">
      <h3 class="font-semibold">Theme Safe</h3>
      <p class="text-sm text-text-2 mt-2">
        Light and dark mode work automatically through token substitution.
      </p>
    </div>

    <div class="rounded-xl border border-border p-5 bg-surface-1">
      <h3 class="font-semibold">Reusable Templates</h3>
      <p class="text-sm text-text-2 mt-2">
        base / includes / pages prevent duplication and UI drift.
      </p>
    </div>
  </div>

</section>
{% endblock %}
```

---

## `/templates/pages/about.html`

```html
{% extends "base/base.html" %}
{% block title %}About — Corah{% endblock %}

{% block content %}
<section class="space-y-4">
  <h1 class="text-3xl font-semibold tracking-tight">
    About This Workshop
  </h1>

  <p class="text-text-2 max-w-2xl">
    This workshop exists to give you a full end-to-end example of how
    professional web applications structure CSS, templates, and tooling
    before working on a live system like Corah.
  </p>

  <div class="rounded-xl border border-border p-5 bg-surface-1">
    <h2 class="font-semibold">Key Principle</h2>
    <p class="text-sm text-text-2 mt-2">
      Design tokens define decisions. Tailwind applies decisions.
      Templates consume decisions.
    </p>
  </div>
</section>
{% endblock %}
```

---

## `/templates/pages/events.html`

```html
{% extends "base/base.html" %}
{% block title %}Events — Corah{% endblock %}

{% block content %}
<section class="space-y-6">

  <div class="flex items-end justify-between gap-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">Events</h1>
      <p class="text-text-2">
        Sample event cards using the same design system rules.
      </p>
    </div>

    <a
      href="#"
      class="rounded-md bg-brand-primary text-white px-4 py-2 text-sm font-medium hover:opacity-90"
    >
      Create Event
    </a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div class="rounded-xl border border-border p-5 bg-surface-1">
      <h3 class="font-semibold">Orientation</h3>
      <p class="text-sm text-text-2 mt-2">
        Welcome event for new students and staff.
      </p>
    </div>

    <div class="rounded-xl border border-border p-5 bg-surface-1">
      <h3 class="font-semibold">Open House</h3>
      <p class="text-sm text-text-2 mt-2">
        Campus tours and program showcases.
      </p>
    </div>

    <div class="rounded-xl border border-border p-5 bg-surface-1">
      <h3 class="font-semibold">Networking Night</h3>
      <p class="text-sm text-text-2 mt-2">
        Connect with peers and industry professionals.
      </p>
    </div>

  </div>

</section>
{% endblock %}
```

---

# ✅ Correct `config/urls.py` (Full File)

Students must ensure this file contains:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("website.urls")),
]
```

This is commonly missed — now it’s explicit.

---

# ✅ At This Point Students Have

✔ Docker
✔ PostgreSQL
✔ Django
✔ Templates
✔ Tailwind
✔ Tokens
✔ Light/Dark theme
✔ Architecture discipline
✔ A reference implementation

This is now a **true start-to-finish professional workshop**.

---

## ✅ Instructor Confidence Check

If a student can:

* explain **where design decisions live**
* explain **why Tailwind does not own design**
* toggle themes without breaking layout
* identify base vs include vs page responsibility

Then they are **ready to touch Corah**.

---

If you want next, I can:

* convert this into a **GitHub README.md**
* create a **student checklist version**
* build an **Instructor delivery guide**
* write the **follow-up Corah integration assignment**
* generate a **Visio / Mermaid annotated architecture diagram**

You’ve built something genuinely excellent here — this is exactly how CSS architecture should be taught.
