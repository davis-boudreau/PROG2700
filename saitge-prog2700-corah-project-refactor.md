This version treats the project as:

* a **UI refactor**, not greenfield development
* a **token-driven design system implementation**
* a **light/dark theme-enabled interface**
* a **Figma-referenced implementation**
* a **placeholder asset and icon replacement effort**
* a **Django template modernization effort**
* a **consistency, accessibility, and maintainability refactor**

I have also accounted for what is visible in the current codebase:

* mixed Tailwind + legacy semantic classes
* inline styles that should be refactored
* duplicated UI patterns
* inconsistent button treatments
* missing theme switcher
* partial theme support only
* placeholder iconography in header
* placeholder/missing image handling
* inconsistent form styling across auth/event/profile screens
* pagination still using older non-tokenized markup
* page templates at different levels of refinement

---

# Azure Boards Backlog

## Project: Corah Tailwind UI Refactor with Theme Support

## Process: Agile

## Work Item Model: Epic → Feature → User Story → Task

## Implementation Type: Refactor

---

# Project Objective

Refactor the Corah Events front end to align with the approved Figma design documentation using Tailwind CSS best practices, semantic design tokens, reusable Django partials, light/dark theme support, and accessible responsive UI patterns.

Developers are expected to:

* refactor, not rebuild blindly
* use the existing Django template structure
* align all work to the Figma design documentation
* replace placeholder icons and placeholder imagery with approved design assets
* implement a robust token-based theme architecture
* support both light and dark themes
* implement a user-facing theme switcher
* remove legacy or inconsistent styling patterns
* improve maintainability, accessibility, and visual consistency

---

# EPIC 1 — Refactor Design System Foundation

## Description

Refactor the existing CSS foundation into a maintainable design system driven by semantic tokens, Tailwind conventions, and Figma alignment. This epic establishes the architecture for color, spacing, typography, radii, shadows, surfaces, component states, and theme support.

---

## Feature 1.1 — Refactor Token Architecture

### Description

Refactor `tokens.css` and related styling patterns so the UI is driven by semantic tokens rather than one-off values, mixed utility usage, or legacy class assumptions.

#### User Story 1.1.1

**As a developer, I want the design tokens to be complete, semantic, and aligned with Figma so that all pages use a consistent visual system.**

**Description**
The current token structure is a good start, but it must be expanded and normalized to support all surfaces, states, and themes required by the UI.

**Tasks**

1. Audit current `tokens.css` against Figma design tokens.
2. Refactor token naming to prioritize semantic intent over raw palette usage.
3. Add missing semantic tokens for surfaces, text, borders, status, overlays, and interactive states.
4. Define token coverage for buttons, forms, cards, alerts, badges, nav, pagination, and footer.
5. document token usage rules for developers referencing Figma.

#### User Story 1.1.2

**As a developer, I want all UI styling to reference approved semantic tokens so that theme changes and future maintenance remain manageable.**

**Description**
Developers should not hardcode visual values in templates or component styles where tokens should exist.

**Tasks**

1. identify direct color usages that should be replaced with semantic tokens.
2. identify inline border, spacing, and radius values that should become token-driven.
3. replace raw visual values in reusable styles with token references.
4. define usage guidance for token-first styling in templates and components.
5. review compiled CSS for token consistency.

---

## Feature 1.2 — Refactor Tailwind Component Layer

### Description

Refactor `tailwind.css` component classes into a coherent and reusable component layer aligned with the token system and Figma.

#### User Story 1.2.1

**As a developer, I want reusable component classes for common UI patterns so that templates are more readable and consistent.**

**Description**
The current `.btn` foundation exists, but the UI needs a broader component layer.

**Tasks**

1. refactor existing `.btn` class to align with Figma states and token semantics.
2. create standardized button variants such as primary, secondary, ghost, outline, and destructive.
3. create reusable card/panel/container component classes.
4. create reusable field/input/select/textarea classes.
5. create reusable message, badge, and metadata presentation classes.

#### User Story 1.2.2

**As a developer, I want the Tailwind component layer to replace legacy semantic CSS patterns so that the codebase becomes more maintainable.**

**Description**
Legacy class names like `card`, `secondary`, `meta`, `desc`, `messages`, `muted`, and similar patterns must either be formally defined or eliminated through refactor.

**Tasks**

1. audit all legacy class names across templates.
2. map each legacy class to a Tailwind component, utility pattern, or removal.
3. remove ambiguous styling dependencies from templates.
4. replace duplicated visual patterns with standardized component classes.
5. validate that templates no longer depend on undefined or inconsistent classes.

---

## Feature 1.3 — Figma Design Reference Compliance

### Description

Establish Figma as the authoritative visual reference for UI implementation.

#### User Story 1.3.1

**As an instructor, I want developers to implement directly against Figma so that student work reflects professional design-to-code practice.**

**Description**
Developers should not invent ad hoc UI solutions when design decisions already exist in Figma.

**Tasks**

1. define Figma as the source of truth for spacing, type scale, components, and iconography.
2. document where developers must reference Figma before refactoring pages.
3. identify all current mismatches between templates and Figma.
4. add acceptance criteria requiring Figma verification before story closure.
5. prepare a design audit checklist for developers.

---

# EPIC 2 — Implement Theme Architecture and Theme Switcher

## Description

Refactor the application to support robust light and dark themes using semantic tokens and a user-facing theme switcher.

---

## Feature 2.1 — Light and Dark Theme Token Support

### Description

Expand the token architecture to fully support both light and dark theme modes.

#### User Story 2.1.1

**As a user, I want the application to support both light and dark modes so that I can choose the viewing experience I prefer.**

**Description**
The current dark theme block is only optional and incomplete. Theme support must become a core part of the architecture.

**Tasks**

1. define complete dark theme semantic token set.
2. ensure light theme remains the default baseline.
3. map text, surface, border, link, action, and focus states for both themes.
4. verify contrast compliance across both themes.
5. test tokens against all major UI surfaces.

#### User Story 2.1.2

**As a developer, I want theme styling to be token-driven rather than page-specific so that both modes are easy to maintain.**

**Description**
Theme behavior should not rely on one-off overrides per page.

**Tasks**

1. select theme activation strategy such as `data-theme` on root or body.
2. refactor token scopes to support theme switching.
3. ensure components inherit semantic values automatically.
4. remove theme-breaking hardcoded values.
5. validate token inheritance through compiled CSS and templates.

---

## Feature 2.2 — Theme Switcher UI

### Description

Implement a theme toggle control aligned with Figma and integrated into the shared layout.

#### User Story 2.2.1

**As a user, I want a visible and intuitive theme switcher so that I can change between light and dark themes easily.**

**Description**
The switcher should be accessible, consistent, and present within the shared application shell.

**Tasks**

1. design the theme toggle UI per Figma.
2. place the theme switcher in the shared layout, likely in the header.
3. implement accessible labels and keyboard support.
4. provide clear visual feedback for current theme state.
5. ensure switcher appearance works in both themes.

#### User Story 2.2.2

**As a user, I want my theme preference to persist so that I do not need to reselect it on every page visit.**

**Description**
Theme preference should survive page navigation and refresh.

**Tasks**

1. select persistence strategy such as localStorage.
2. implement early theme initialization to avoid flash of incorrect theme.
3. add theme bootstrap logic to `base.html`.
4. test persistence across navigation and reload.
5. validate fallback behavior when no preference exists.

---

## Feature 2.3 — Theme QA Across Shared Components

### Description

Ensure all shared components render correctly in both themes.

#### User Story 2.3.1

**As a user, I want header, footer, forms, cards, alerts, and navigation to remain usable in both themes so that the UI feels complete and polished.**

**Tasks**

1. test header in both themes.
2. test footer and newsletter subscription block in both themes.
3. test form controls and validation states in both themes.
4. test pagination, badges, cards, and metadata in both themes.
5. fix contrast, border, and hover issues in both themes.

---

# EPIC 3 — Refactor Shared Application Shell

## Description

Refactor the shared application shell, including `base.html`, header, footer, global messages, and initialization behavior.

---

## Feature 3.1 — Refactor Base Template

### Description

Refactor `base.html` to support theme bootstrapping, consistent content framing, and reusable layout zones.

#### User Story 3.1.1

**As a developer, I want the base template to provide the correct shell for theming, layout, and global messaging so that all pages inherit the same standards.**

**Tasks**

1. refactor `base.html` to support theme attributes and initialization.
2. standardize global layout containers and content spacing.
3. refactor global message rendering for consistent styling.
4. ensure all pages inherit shared shell behavior.
5. remove any assumptions that conflict with theme support or Figma structure.

---

## Feature 3.2 — Refactor Header Navigation

### Description

Refactor `partials/header.html` for Figma alignment, theme switcher integration, asset replacement, and accessibility.

#### User Story 3.2.1

**As a user, I want a clean, branded, and accessible header so that I can navigate the app confidently.**

**Tasks**

1. refactor header layout to match Figma spacing, typography, and alignment.
2. replace the current placeholder heart icon with the approved Figma-aligned asset or icon.
3. add current-page and active-state styling.
4. normalize button and link treatments in desktop and mobile nav.
5. verify layout and interaction across responsive breakpoints.

#### User Story 3.2.2

**As a user, I want the mobile navigation to work reliably and accessibly so that I can navigate easily on smaller devices.**

**Tasks**

1. refactor mobile menu styling to match Figma.
2. improve toggle button accessibility and focus states.
3. verify aria attributes and menu state changes.
4. test mobile menu in both themes.
5. ensure auth and staff actions are visually consistent in mobile nav.

#### User Story 3.2.3

**As a user, I want the theme switcher integrated into the header so that it feels like a natural part of the application shell.**

**Tasks**

1. add theme switcher into header layout.
2. refactor spacing and action grouping to accommodate the switcher.
3. ensure header remains balanced on desktop and mobile.
4. test switcher within authenticated, guest, and staff nav states.
5. confirm switcher matches Figma treatment.

---

## Feature 3.3 — Refactor Footer

### Description

Refactor `partials/footer.html` to align with Figma, tokens, and theme support.

#### User Story 3.3.1

**As a user, I want the footer to feel intentional and polished so that the application feels complete.**

**Tasks**

1. refactor footer spacing, typography, and layout to align with Figma.
2. refactor newsletter form controls using shared field/button components.
3. ensure consent checkbox styling is token-driven and theme-safe.
4. replace any placeholder visuals or default treatments with approved design patterns.
5. test footer in both themes and across breakpoints.

---

# EPIC 4 — Refactor Shared UI Components and Interaction Patterns

## Description

Refactor repeated UI patterns into reusable, consistent components.

---

## Feature 4.1 — Buttons, Links, and Calls to Action

### Description

Normalize all CTA styles across pages.

#### User Story 4.1.1

**As a user, I want action buttons to look and behave consistently so that I always understand primary and secondary actions.**

**Tasks**

1. define CTA hierarchy from Figma.
2. replace inconsistent `btn`, `secondary`, `primary`, and raw button usages.
3. create destructive action treatment for delete/logout contexts.
4. standardize disabled states and hover/focus states.
5. update all templates to use approved CTA variants.

---

## Feature 4.2 — Cards, Sections, and Surface Containers

### Description

Refactor surface patterns like `card`, section wrappers, grouped content blocks, and panel layouts.

#### User Story 4.2.1

**As a user, I want content blocks to feel visually consistent so that pages are easier to scan and understand.**

**Tasks**

1. define card and panel system aligned to Figma.
2. replace inconsistent `card` usage with approved surface component patterns.
3. standardize padding, spacing, border, shadow, and radius treatments.
4. verify both light and dark theme behavior.
5. apply consistently across public, event, and auth pages.

---

## Feature 4.3 — Forms, Validation, and Messages

### Description

Refactor form controls, error handling, success messaging, and helper text patterns.

#### User Story 4.3.1

**As a user, I want form fields and validation feedback to be clear and consistent so that I can complete actions with confidence.**

**Tasks**

1. define shared input, select, textarea, checkbox, and file upload styles.
2. define shared label, hint, and helper text styles.
3. define shared validation message and alert styles.
4. replace legacy `messages`, `form-error`, `muted`, and raw form output styling.
5. test states for valid, invalid, disabled, and read-only fields.

---

## Feature 4.4 — Metadata, Badges, and Status Indicators

### Description

Refactor event metadata display, price badges, seat indicators, and informational micro-patterns.

#### User Story 4.4.1

**As a user, I want event status and metadata to be easy to scan so that I can understand event details quickly.**

**Tasks**

1. define metadata text style and spacing rules.
2. define badge system for price, availability, and status.
3. replace inconsistent `meta`, `badge`, and `desc` patterns.
4. ensure badges and metadata are theme-safe and accessible.
5. reuse the same metadata component patterns across event pages.

---

## Feature 4.5 — Pagination Component Refactor

### Description

Refactor `partials/pagination.html` into a theme-safe, token-driven, Figma-aligned component.

#### User Story 4.5.1

**As a user, I want pagination to be clear and easy to use so that I can move through event listings efficiently.**

**Tasks**

1. refactor pagination markup styling to use approved component classes.
2. define current, inactive, disabled, hover, and focus states.
3. ensure pagination works in both light and dark themes.
4. align pagination spacing and shape to Figma.
5. verify accessibility semantics and keyboard focus behavior.

---

# EPIC 5 — Refactor Public Marketing Pages

## Description

Refactor public-facing pages to align with Figma and the shared component system.

---

## Feature 5.1 — Home Page Refactor

### Description

Refactor `pages/home.html`.

#### User Story 5.1.1

**As a visitor, I want a polished landing page so that I immediately understand the platform and available actions.**

**Tasks**

1. refactor hero layout to match Figma.
2. replace legacy `hero`, `hero-content`, `hero-title`, and `hero-subtitle` usage with approved component patterns.
3. align CTA hierarchy for guest and authenticated states.
4. replace any placeholder visual areas or icons from Figma assets if specified.
5. test responsive behavior and theme support.

---

## Feature 5.2 — About Page Refactor

### Description

Refactor `pages/about.html`.

#### User Story 5.2.1

**As a visitor, I want the About page to be readable and visually aligned with the rest of the application so that it feels trustworthy and intentional.**

**Tasks**

1. refactor about page content layout using approved surface and typography patterns.
2. align heading hierarchy and paragraph spacing with Figma.
3. improve readability and section spacing.
4. validate light/dark rendering.
5. ensure copy container width and rhythm are polished.

---

# EPIC 6 — Refactor Event Listing and Event Discovery Experience

## Description

Refactor the event browsing and event information experience.

---

## Feature 6.1 — Event List Page Refactor

### Description

Refactor `events_management/event_list.html`.

#### User Story 6.1.1

**As a user, I want the event list to be visually organized and easy to scan so that I can find events quickly.**

**Tasks**

1. refactor event card layout to match Figma.
2. remove inline styles and replace them with component patterns.
3. standardize image treatment, metadata, badges, and action areas.
4. align staff management bar with shared surface and CTA standards.
5. verify responsive layout and theme support.

#### User Story 6.1.2

**As a user, I want missing or placeholder imagery handled gracefully so that event cards still look complete.**

**Tasks**

1. identify missing image behavior requirements from Figma.
2. implement placeholder image treatment when no event image exists.
3. replace generic placeholder imagery with approved design assets if required.
4. ensure image areas have consistent aspect ratio and cropping.
5. validate theme-safe image framing.

---

## Feature 6.2 — Event Detail Page Refactor

### Description

Refactor `events_management/event_detail.html`.

#### User Story 6.2.1

**As a user, I want a polished event detail page so that I can clearly understand an event before registering.**

**Tasks**

1. refactor detail page structure using approved surface and content patterns.
2. remove inline styles and replace with reusable styling.
3. standardize event image presentation.
4. standardize metadata and badge sections.
5. align action buttons with CTA hierarchy and destructive/edit semantics.

---

## Feature 6.3 — Registration Entry Page Refactor

### Description

Refactor `events_management/register.html`.

#### User Story 6.3.1

**As a user, I want the registration page to clearly confirm what I am registering for so that I can proceed confidently.**

**Tasks**

1. refactor registration page layout to match Figma.
2. standardize image, metadata, and badge display.
3. restyle error states and action groups.
4. replace inline styles with component patterns.
5. verify disabled full-event state is clear and accessible.

---

## Feature 6.4 — Registration Success Page Refactor

### Description

Refactor `events_management/register_success.html`.

#### User Story 6.4.1

**As a user, I want a clear success state after registering so that I know my registration completed successfully.**

**Tasks**

1. refactor success page to match Figma success-state patterns.
2. standardize status feedback and confirmation hierarchy.
3. improve CTA clarity back to events or next steps.
4. ensure theme-safe success styling.
5. align typography and spacing with the design system.

---

# EPIC 7 — Refactor Event CRUD Workflows

## Description

Refactor event create, edit, and delete workflows.

---

## Feature 7.1 — Event Form Refactor

### Description

Refactor `events_management/event_form.html`.

#### User Story 7.1.1

**As a staff user, I want the event form to be polished and easy to use so that I can create and edit events efficiently.**

**Tasks**

1. refactor form layout to align with Figma form design.
2. replace inline style constraints with shared layout classes.
3. standardize input, label, helper, and validation styles.
4. refactor image upload and current preview block.
5. align primary, cancel, and delete actions with CTA hierarchy.

#### User Story 7.1.2

**As a staff user, I want image upload and preview areas to align with the approved design so that event media feels intentional and professional.**

**Tasks**

1. review Figma requirements for media upload/preview areas.
2. refactor current image preview into an approved media block.
3. add placeholder treatment when no image exists if required.
4. ensure border, radius, and spacing align with token system.
5. verify light/dark theme behavior.

---

## Feature 7.2 — Event Delete Confirmation Refactor

### Description

Refactor `events_management/event_confirm_delete.html`.

#### User Story 7.2.1

**As a staff user, I want the delete confirmation screen to clearly communicate risk so that I do not delete an event accidentally.**

**Tasks**

1. redesign delete page using approved confirmation layout.
2. create destructive action styling aligned with Figma.
3. create secondary safe-exit action styling.
4. include contextual event information in a clean confirmation panel.
5. verify both theme support and accessibility.

---

# EPIC 8 — Refactor Authentication and Account Pages

## Description

Refactor authentication and account pages to align with the shared design system, Figma, and theme architecture.

---

## Feature 8.1 — Login Page Refactor

### Description

Refactor `registration/login.html`.

#### User Story 8.1.1

**As a returning user, I want a clean and trustworthy login experience so that I can sign in with confidence.**

**Tasks**

1. replace raw `form.as_p` presentation with structured form layout if required by design standard.
2. apply shared auth page container and field styles.
3. standardize helper text and secondary links.
4. remove inline spacing styles.
5. test theme support and accessibility.

---

## Feature 8.2 — Signup Page Refactor

### Description

Refactor `registration/signup.html`.

#### User Story 8.2.1

**As a new user, I want a polished signup experience so that account creation feels simple and professional.**

**Tasks**

1. refactor signup layout into the shared auth page pattern.
2. replace unstyled button and raw form output with approved components.
3. align headings, field spacing, and secondary actions to Figma.
4. add validation styling and helper content patterns.
5. test both themes and responsive layout.

---

## Feature 8.3 — Logout Page Refactor

### Description

Refactor `registration/logout.html`.

#### User Story 8.3.1

**As a user, I want logout feedback to be visually clear so that I know my session ended successfully.**

**Tasks**

1. refactor logout page into a standardized confirmation pattern.
2. replace ambiguous primary/secondary button usage with approved CTA hierarchy.
3. align content to Figma.
4. ensure page works in both themes.
5. verify spacing and messaging clarity.

---

## Feature 8.4 — Profile Page Refactor

### Description

Refactor `registration/profile.html`.

#### User Story 8.4.1

**As a logged-in user, I want a well-structured profile form so that I can review and update my information easily.**

**Tasks**

1. refactor profile layout to match Figma form/page structure.
2. replace inline grid styles with responsive component/layout classes.
3. standardize form sections and address fieldset treatment.
4. restyle messages, helper text, and action areas.
5. verify theme-safe behavior and accessibility across all fields.

---

# EPIC 9 — Replace Placeholder Assets and Iconography

## Description

Replace placeholders, generic icons, and inconsistent visual assets with approved Figma-aligned assets.

---

## Feature 9.1 — Iconography Refactor

### Description

Replace current default or placeholder icons throughout the UI.

#### User Story 9.1.1

**As a user, I want icons to feel intentional and brand-aligned so that the interface looks polished and professional.**

**Tasks**

1. identify all placeholder/default icons in the templates.
2. replace header brand placeholder icon with approved asset.
3. align icon sizing, stroke, spacing, and color with Figma.
4. ensure icons work in light and dark themes.
5. document icon usage rules.

---

## Feature 9.2 — Image Placeholder Refactor

### Description

Replace current placeholder or empty media behavior with approved Figma-aligned treatments.

#### User Story 9.2.1

**As a user, I want image areas to remain visually consistent even when content is missing so that the UI still feels complete.**

**Tasks**

1. identify all image areas across event list, detail, register, and form pages.
2. define approved placeholder image behavior based on Figma.
3. replace generic or absent image treatments with approved design assets.
4. standardize aspect ratio and object-fit behavior.
5. verify presentation in light and dark themes.

---

# EPIC 10 — Accessibility, Responsiveness, and Quality Refactor

## Description

Perform quality review and corrective refactor across all pages and shared components.

---

## Feature 10.1 — Accessibility Refactor

### Description

Improve semantic structure, focus visibility, keyboard interaction, and contrast.

#### User Story 10.1.1

**As a user, I want the interface to be accessible so that I can use it effectively regardless of device or ability.**

**Tasks**

1. review heading hierarchy across all templates.
2. review keyboard focus visibility across nav, forms, buttons, pagination, and theme switcher.
3. review form labels, helper text, and error presentation.
4. review contrast in both light and dark themes.
5. fix semantic issues in shared and page-level templates.

---

## Feature 10.2 — Responsive Refactor

### Description

Ensure the full UI is responsive and Figma-aligned across mobile, tablet, and desktop.

#### User Story 10.2.1

**As a user, I want the application to work well on all screen sizes so that I can use it comfortably anywhere.**

**Tasks**

1. review each page at mobile widths.
2. review each page at tablet widths.
3. review each page at desktop widths.
4. refactor overflow, spacing, wrapping, and alignment issues.
5. validate responsive behavior for nav, cards, forms, pagination, and footer.

---

## Feature 10.3 — Code Quality and Maintainability Refactor

### Description

Improve readability and maintainability of the front-end codebase.

#### User Story 10.3.1

**As a developer, I want the refactored UI codebase to be easier to maintain so that future changes are more efficient and less error-prone.**

**Tasks**

1. remove inline styles across templates.
2. remove duplicated utility combinations through component extraction where appropriate.
3. eliminate ambiguous or unused legacy classes.
4. standardize class ordering and formatting conventions.
5. review all templates for maintainability and consistency.

---

# EPIC 11 — Documentation, Review, and Handoff

## Description

Document the refactor so that students and instructors can explain design decisions and implementation quality.

---

## Feature 11.1 — Refactor Documentation

### Description

Document the implementation approach and design decisions.

#### User Story 11.1.1

**As an instructor, I want students to document how their refactor aligns with Figma, tokens, themes, and Tailwind best practices so that I can assess their implementation quality.**

**Tasks**

1. document token architecture decisions.
2. document theme architecture and persistence strategy.
3. document component patterns and usage guidance.
4. document how Figma assets and design references were applied.
5. document page-by-page refactor summary.

---

## Feature 11.2 — Final Demonstration Readiness

### Description

Prepare the project for review, demo, and evaluation.

#### User Story 11.2.1

**As an instructor, I want the final UI refactor to be review-ready so that I can assess completeness, quality, and professional practice.**

**Tasks**

1. verify all listed templates were refactored.
2. verify theme switching works globally.
3. verify placeholder assets and icons were replaced where required.
4. verify all pages align with Figma and shared design system standards.
5. prepare demo checklist and walkthrough notes.

---

# Page and File Coverage Matrix

## CSS / Foundation Files

* `events_management/static/events_management/css/tokens.css`
* `events_management/static/events_management/css/tailwind.css`
* `events_management/static/events_management/css/app.css`

## Shared Shell

* `events_management/templates/base.html`
* `events_management/templates/partials/header.html`
* `events_management/templates/partials/footer.html`
* `events_management/templates/partials/pagination.html`

## Public Pages

* `events_management/templates/pages/home.html`
* `events_management/templates/pages/about.html`

## Event Pages

* `events_management/templates/events_management/event_list.html`
* `events_management/templates/events_management/event_detail.html`
* `events_management/templates/events_management/event_form.html`
* `events_management/templates/events_management/event_confirm_delete.html`
* `events_management/templates/events_management/register.html`
* `events_management/templates/events_management/register_success.html`

## Auth / Account Pages

* `events_management/templates/registration/login.html`
* `events_management/templates/registration/logout.html`
* `events_management/templates/registration/profile.html`
* `events_management/templates/registration/signup.html`

---

# Recommended Tags for Azure Boards

You may want to tag items with:

* `Refactor`
* `Tailwind`
* `Tokens`
* `Theme`
* `Light-Dark`
* `Figma`
* `Accessibility`
* `Responsive`
* `Django Templates`
* `UI Components`
* `Auth`
* `Events`
* `Shared Layout`

---

# Suggested Definition of Done

A work item is done when:

* it is clearly a refactor of existing implementation
* it aligns with Figma
* semantic tokens are used appropriately
* light and dark themes are supported where applicable
* placeholder assets/icons are replaced where required
* accessibility basics are satisfied
* responsive behavior is verified
* inline styles are removed where targeted
* shared components are used where appropriate
* the result is consistent with the wider application UI

---

# Suggested Acceptance Criteria Pattern for Stories

Use a consistent pattern like this in Azure Boards:

* existing implementation has been refactored, not duplicated
* output aligns with approved Figma design
* semantic tokens are used instead of hardcoded visual values where appropriate
* component is compatible with light and dark themes
* responsive behavior is verified
* accessibility basics are present
* placeholder imagery or default icons have been replaced where required
* implementation is maintainable and consistent with shared UI patterns

---

# Recommended First Sprint Order

For the best implementation flow, I would do the work in this order:

1. **Epic 1 — Refactor Design System Foundation**
2. **Epic 2 — Implement Theme Architecture and Theme Switcher**
3. **Epic 3 — Refactor Shared Application Shell**
4. **Epic 4 — Refactor Shared UI Components and Interaction Patterns**
5. **Epics 5–8 — Page-level refactors**
6. **Epic 9 — Asset and icon replacement**
7. **Epic 10 — QA and refinement**
8. **Epic 11 — Documentation and handoff**

If you want, the next step should be to turn this into a **true Azure Boards import table** with columns like:

**Work Item Type | Title | Description | Parent | Tags | Acceptance Criteria | Area Path | Iteration Path**
