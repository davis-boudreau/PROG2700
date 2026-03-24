To wrap up **Feature 4 (Navigation & Footers)**, we need a footer that balances site navigation with a clear "Call to Action" (CTA) for the newsletter. This partial utilizes a responsive grid that collapses into a single column on mobile but expands into a four-column layout on desktop.

### `templates/partials/_footer.html`

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    <div class="space-y-4">
        <div class="flex items-center space-x-2">
            <svg class="w-6 h-6 text-corah-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="text-lg font-bold tracking-tight dark:text-white">Corah Events</span>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Empowering community through seamless event management and inclusive participation.
        </p>
    </div>

    <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Platform</h3>
        <ul class="space-y-2">
            <li><a href="{% url 'events:event_list' %}" class="text-sm text-slate-600 hover:text-corah-blue dark:text-slate-400 dark:hover:text-corah-gold transition-colors">Browse Events</a></li>
            <li><a href="#" class="text-sm text-slate-600 hover:text-corah-blue dark:text-slate-400 dark:hover:text-corah-gold transition-colors">Host an Event</a></li>
            <li><a href="#" class="text-sm text-slate-600 hover:text-corah-blue dark:text-slate-400 dark:hover:text-corah-gold transition-colors">Pricing</a></li>
        </ul>
    </div>

    <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Support</h3>
        <ul class="space-y-2">
            <li><a href="{% url 'events:about' %}" class="text-sm text-slate-600 hover:text-corah-blue dark:text-slate-400 dark:hover:text-corah-gold transition-colors">About Us</a></li>
            <li><a href="#" class="text-sm text-slate-600 hover:text-corah-blue dark:text-slate-400 dark:hover:text-corah-gold transition-colors">Help Center</a></li>
            <li><a href="#" class="text-sm text-slate-600 hover:text-corah-blue dark:text-slate-400 dark:hover:text-corah-gold transition-colors">Privacy Policy</a></li>
        </ul>
    </div>

    <div class="space-y-4">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Stay Updated</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Get notified about new events and community updates.</p>
        
        <form action="#" method="POST" class="mt-4">
            {% csrf_token %}
            <div class="flex flex-col space-y-2">
                <input type="email" name="email" placeholder="you@example.com" required
                    class="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-corah-blue focus:ring-corah-blue sm:text-sm">
                <button type="submit" 
                    class="flex w-full justify-center rounded-md bg-corah-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-corah-blue transition-all">
                    Subscribe
                </button>
            </div>
        </form>
    </div>
</div>

<div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
    <p class="text-xs text-center text-slate-400">
        &copy; 2026 Corah Management Systems. All rights reserved.
    </p>
</div>

```

---

### 🎨 Tailwind Best Practices Used Here:

1. **Form Input Focus:** The `input` element uses `focus:ring-corah-blue`, which creates a high-visibility halo around the field when the user clicks in—crucial for accessibility and a "premium" feel.
2. **Semantic Grids:** By using `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, the footer automatically re-stacks itself perfectly for smartphones, tablets, and wide-screen monitors.
3. **Color Hierarchy:** Headers use the boldest slate/white, while descriptions use `text-slate-500` to create a clear visual hierarchy that guides the eye to the Newsletter form.

### 🧪 Student Exercise for Feature 4:

The students should now ensure that the Newsletter form actually targets a view. If the `newsletter_signup` view isn't built yet, they can use this as a chance to practice **Feature 8 (Stateful Feedback)** by styling a success message once the form is submitted.

**The Foundation and Layout (Features 1-4) are now complete. Would you like me to move to Feature 5 (Event Discovery UI) to generate the responsive Event Card and Grid layout?**