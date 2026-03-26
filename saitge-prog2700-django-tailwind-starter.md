# 1. Make sure your Django project already handles static files

In `settings.py`, confirm these basics exist:

```python
INSTALLED_APPS = [
    # ...
    "django.contrib.staticfiles",
    # ...
]
```

And usually:

```python
STATIC_URL = "static/"
```

If you want a project-level static folder too, add:

```python
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = "static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
STATIC_ROOT = BASE_DIR / "staticfiles"
```

Django’s official staticfiles docs recommend managing CSS, JS, and images through `django.contrib.staticfiles`, using static directories in development and `collectstatic` for deployment. ([Django Project][2])

---

# 2. Install `django-tailwind`

From your project root:

```bash
pip install django-tailwind
```

`django-tailwind` provides the Django integration layer and documents this as the installation starting point. ([Django Tailwind][1])

---

# 3. Add `tailwind` to `INSTALLED_APPS`

Open `settings.py` and add:

```python
INSTALLED_APPS = [
    # Django apps
    "django.contrib.staticfiles",

    # Third-party
    "tailwind",

    # your apps...
]
```

This is part of the documented install flow for `django-tailwind`. ([Django Tailwind][1])

---

# 4. Create a Tailwind theme app

Run:

```bash
python manage.py tailwind init
```

When prompted, name the app:

```text
theme
```

`django-tailwind` documents `python manage.py tailwind init` as the step that creates a Tailwind-compatible Django app, typically named `theme`, and lets you choose either standalone or npm-based installation. ([Django Tailwind][1])

---

# 5. Choose the installation mode

When `tailwind init` asks which install method to use, you will usually see a choice like:

* **standalone**
* **npm**

My recommendation:

* choose **npm** if you want the most flexibility and plugin support
* choose **standalone** if you want the simplest setup and do not want to rely heavily on Node tooling

`django-tailwind` explicitly supports both modes and documents differences between standalone and npm-based setups. ([Django Tailwind][1])

For most development environments, I recommend:

```text
npm
```

---

# 6. Add the generated `theme` app to `INSTALLED_APPS`

After initialization, update `settings.py` again:

```python
INSTALLED_APPS = [
    # Django apps
    "django.contrib.staticfiles",

    # Third-party
    "tailwind",

    # Local apps
    "theme",

    # your other apps...
]
```

Then define:

```python
TAILWIND_APP_NAME = "theme"
```

This is the documented pattern for wiring the generated Tailwind app into Django. ([Django Tailwind][1])

---

# 7. Install Tailwind dependencies for the theme app

Run:

```bash
python manage.py tailwind install
```

This installs the Tailwind dependencies inside the `theme` app. That install/build workflow is part of the standard `django-tailwind` usage pattern. ([Django Tailwind][3])

---

# 8. Understand the folder structure you now have

Your project will now look roughly like this:

```text
myproject/
├── manage.py
├── myproject/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── app1/
│   ├── templates/
│   ├── static/
│   └── ...
├── app2/
│   ├── templates/
│   ├── static/
│   └── ...
└── theme/
    ├── static/
    ├── static_src/
    ├── templates/
    └── ...
```

The important idea is:

* your existing Django apps keep their templates
* the `theme` app becomes your Tailwind build area
* Django still serves the compiled CSS as a static asset

That split matches how `django-tailwind` is designed and how Django staticfiles works. ([Django Tailwind][1])

---

# 9. Start the Tailwind watcher during development

Run this in one terminal:

```bash
python manage.py tailwind start
```

And run Django in another terminal:

```bash
python manage.py runserver
```

`django-tailwind` documents a development watcher that rebuilds CSS as you change templates and source files. ([Django Tailwind][3])

---

# 10. Load the compiled Tailwind CSS in your base template

In your main base template, usually something like `templates/base.html`, make sure you load static files:

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}My Site{% endblock %}</title>

    <link rel="stylesheet" href="{% static 'css/dist/styles.css' %}">
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

The exact compiled file path can vary slightly by setup, but the overall pattern is the same: Tailwind generates CSS, and Django serves it through staticfiles. That matches both Django staticfiles guidance and Tailwind’s general “scan templates, build CSS file” model. ([Django Project][2])

---

# 11. Make sure Tailwind scans your Django templates

Tailwind works by scanning your template files for class names and generating only the CSS you use. Tailwind’s official docs describe this scan-and-build model directly. ([Tailwind CSS][4])

In practice, your Tailwind config inside the `theme` app should include your Django templates and Python files. Depending on the generated version, you may have a config file that looks conceptually like this:

```js
module.exports = {
  content: [
    "../templates/**/*.html",
    "../../templates/**/*.html",
    "../../**/templates/**/*.html",
    "../../**/*.py",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

The exact file format can differ by Tailwind version and setup mode, but the key requirement is the same:

* scan all project templates
* scan reusable app templates
* optionally scan Python files if classes are assembled there

That is necessary because Tailwind only generates utilities it detects in the files it scans. ([Tailwind CSS][4])

---

# 12. Test with a simple Tailwind class

In one of your templates:

```html
{% extends "base.html" %}

{% block content %}
<div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Hello Tailwind in Django</h1>
    <p class="text-gray-600">Your Tailwind setup is working.</p>
    <button class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        Test Button
    </button>
</div>
{% endblock %}
```

If the watcher is running and your CSS link is correct, you should immediately see the styling apply.

---

# 13. Migrate your existing templates gradually

Do not try to rewrite everything at once.

Use this progression:

1. **Add Tailwind to `base.html`**
2. **Style layout primitives first**

   * container widths
   * spacing
   * typography
   * buttons
   * forms
3. **Refactor shared partials**

   * navbars
   * cards
   * tables
   * alerts
4. **Refactor page-by-page**

That approach works best because Django template projects often already have a lot of HTML in place, and Tailwind is easiest to adopt incrementally.

A practical example:

Old HTML:

```html
<div class="page">
    <h2>Events</h2>
    <a href="/events/create/">Create Event</a>
</div>
```

Refactored with Tailwind:

```html
<div class="max-w-6xl mx-auto px-4 py-6">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold">Events</h2>
        <a href="/events/create/" class="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Create Event
        </a>
    </div>
</div>
```

---

# 14. Good Django + Tailwind structure for reusable templates

A maintainable pattern is:

## `templates/base.html`

Global HTML shell.

## `templates/partials/`

Reusable snippets:

* `_navbar.html`
* `_footer.html`
* `_messages.html`
* `_pagination.html`

## Per-feature templates

* `events/list.html`
* `events/detail.html`
* `events/form.html`

Then standardize repeated Tailwind patterns across partials.

Example message component:

```html
{% if messages %}
  <div class="space-y-3 mb-4">
    {% for message in messages %}
      <div class="rounded-lg border px-4 py-3 bg-white shadow-sm">
        {{ message }}
      </div>
    {% endfor %}
  </div>
{% endif %}
```

---

# 15. Be careful with dynamic class names

This is one of the biggest Tailwind issues in Django projects.

Tailwind may not detect classes built dynamically like:

```html
<div class="text-{{ color }}-600">
```

Because Tailwind’s engine generally needs to see the class names in scanned source files to generate them. Tailwind’s docs emphasize that it scans files for class names and emits matching utilities. ([Tailwind CSS][4])

Better options:

## Option A: choose full classes explicitly in template logic

```html
{% if status == "success" %}
  <div class="text-green-600">Success</div>
{% elif status == "warning" %}
  <div class="text-yellow-600">Warning</div>
{% else %}
  <div class="text-red-600">Error</div>
{% endif %}
```

## Option B: map classes in the view/context

```python
if status == "success":
    status_class = "text-green-600"
elif status == "warning":
    status_class = "text-yellow-600"
else:
    status_class = "text-red-600"
```

Then:

```html
<div class="{{ status_class }}">Message</div>
```

But only do this if those exact classes appear somewhere Tailwind can detect, or safelist them in your config if needed.

---

# 16. Keep your custom CSS small

Tailwind is best when you use utility classes for most styling and reserve custom CSS for a few cases:

* third-party widget overrides
* global typography tweaks
* complex component composition
* repeated class bundles using `@apply` where appropriate

Try not to rebuild Bootstrap inside Tailwind with huge custom stylesheets.

A good rule:

* **layout and spacing:** Tailwind classes
* **component consistency:** shared partials
* **rare edge cases:** small custom CSS file

---

# 17. Production build

When you are ready to deploy, run:

```bash
python manage.py tailwind build
python manage.py collectstatic
```

This matches the documented `django-tailwind` workflow for generating production CSS and Django’s staticfiles workflow for collecting assets for deployment. ([Django Tailwind][3])

If your deployment serves static files through a web server or storage backend, `collectstatic` is the step Django expects before deployment. ([Django Project][5])

---

# 18. Recommended `base.html` starter

Here is a good practical starter:

```html
{% load static %}
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}My Django App{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'css/dist/styles.css' %}">
</head>
<body class="min-h-full bg-gray-50 text-gray-900">
    <header class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" class="text-xl font-semibold">My App</a>
            <nav class="flex items-center gap-4 text-sm">
                <a href="/" class="hover:underline">Home</a>
                <a href="/about/" class="hover:underline">About</a>
                <a href="/contact/" class="hover:underline">Contact</a>
            </nav>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
        {% if messages %}
            <div class="mb-6 space-y-3">
                {% for message in messages %}
                    <div class="rounded-lg border bg-white px-4 py-3 shadow-sm">
                        {{ message }}
                    </div>
                {% endfor %}
            </div>
        {% endif %}

        {% block content %}{% endblock %}
    </main>
</body>
</html>
```

---

# 19. Recommended `settings.py` example

Here is a safe starting point:

```python
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "tailwind",
    "theme",

    # your apps
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

TAILWIND_APP_NAME = "theme"

STATIC_URL = "static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
STATIC_ROOT = BASE_DIR / "staticfiles"
```

You may not need `STATICFILES_DIRS` immediately if all assets live inside app static folders, but many projects like having a project-level `static/` directory as well. Django supports both app-level and project-level static asset organization. ([Django Project][2])

---

# 20. Day-to-day workflow

Use this every time you work on the UI:

## Terminal 1

```bash
python manage.py runserver
```

## Terminal 2

```bash
python manage.py tailwind start
```

Then edit:

* Django templates
* partials
* form templates
* layout templates

Tailwind will rebuild as you go. `django-tailwind` documents this watch-based development flow. ([Django Tailwind][3])

---

# 21. The most common mistakes

## CSS link path is wrong

You are loading the wrong compiled file in `base.html`.

## Tailwind watcher is not running

You changed templates, but the CSS never rebuilt.

## Template paths are missing from Tailwind scan config

Tailwind is not scanning your app templates.

## Dynamic classes are invisible to Tailwind

Classes like `text-{{ color }}-600` often cause missing styles.

## `collectstatic` not run in production

Your compiled CSS exists locally but is missing in deployment.

## Mixing too many styling approaches

Avoid combining:

* old large custom CSS
* Bootstrap-style class assumptions
* random inline styles
* Tailwind all at once

Refactor in layers.

---

