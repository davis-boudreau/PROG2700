# Tailwind CSS Cheatsheat


## Layout

| Class                  | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `block`                | Element behaves as a block (full-width by default). |
| `inline`               | Element is inline; width/height not applied.        |
| `inline-block`         | Inline element that accepts width/height.           |
| `hidden`               | Sets `display: none`.                               |
| `flex` / `inline-flex` | Creates a flex container (block/inline).            |
| `grid` / `inline-grid` | Creates a grid container (block/inline).            |

***

## Position

| Class                                 | What it does                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------ |
| `static`                              | Default; ignores top/right/bottom/left.                                              |
| `relative`                            | Establishes a positioning context for absolutely positioned children.                |
| `absolute`                            | Positioned relative to nearest ancestor with `relative`/`absolute`/`fixed`/`sticky`. |
| `fixed`                               | Positioned relative to viewport.                                                     |
| `sticky`                              | Sticks within scroll container once threshold is reached.                            |
| `inset-0`                             | Sets `top/right/bottom/left: 0`.                                                     |
| `top-0` `right-0` `bottom-0` `left-0` | Pin to specified edge.                                                               |
| `z-10` `z-50`                         | Stack order (higher is in front).                                                    |

***

## Overflow

| Class                                 | What it does                                                 |
| ------------------------------------- | ------------------------------------------------------------ |
| `overflow-auto`                       | Scrolls as needed.                                           |
| `overflow-hidden`                     | Clips overflow; no scrollbars.                               |
| `overflow-visible`                    | Overflow shown.                                              |
| `overflow-scroll`                     | Always show scrollbars.                                      |
| `overflow-x-auto` / `overflow-y-auto` | Axis-specific scroll.                                        |
| `truncate`                            | Single-line ellipsis (requires constrained width + no wrap). |
| `text-ellipsis`                       | Explicit text ellipsis overflow behavior.                    |

***

## Spacing

### Padding

| Class                         | What it does             |
| ----------------------------- | ------------------------ |
| `p-0` `p-2` `p-4` `p-6` `p-8` | Uniform padding.         |
| `px-4` / `py-2`               | X-axis / Y-axis padding. |
| `pt-4` `pr-4` `pb-4` `pl-4`   | Side-specific padding.   |

### Margin & Auto

| Class                       | What it does                                             |
| --------------------------- | -------------------------------------------------------- |
| `m-0` `m-2` `m-4`           | Uniform margin.                                          |
| `mx-auto`                   | Centers block with fixed width (auto left/right).        |
| `my-6`                      | Top + bottom margin.                                     |
| `mt-4` `mr-4` `mb-4` `ml-4` | Side-specific margin.                                    |
| `space-x-2` / `space-y-2`   | Adds gap between sibling elements (horizontal/vertical). |

### Gap (Grid/Flex)

| Class                           | What it does                  |
| ------------------------------- | ----------------------------- |
| `gap-0` `gap-2` `gap-4` `gap-6` | Uniform gap between children. |
| `gap-x-4` / `gap-y-2`           | Axis-specific gap.            |

***

## Flexbox

| Class                                                               | What it does                                 |
| ------------------------------------------------------------------- | -------------------------------------------- |
| `flex`                                                              | Makes a flex container.                      |
| `flex-1` `flex-auto` `flex-none`                                    | Flex item sizing: grow/shrink/basis presets. |
| `flex-row` / `flex-row-reverse`                                     | Horizontal main axis (LTR/RTL).              |
| `flex-col` / `flex-col-reverse`                                     | Vertical main axis (top→bottom / reverse).   |
| `flex-wrap` / `flex-nowrap`                                         | Wrap items onto multiple lines or not.       |
| `items-start` `items-center` `items-end`                            | Align items on cross-axis.                   |
| `justify-start` `justify-center` `justify-between` `justify-around` | Distribute items on main axis.               |
| `content-start` `content-center`                                    | Align wrapped lines on cross-axis.           |
| `self-start` `self-center` `self-end`                               | Per-item cross-axis alignment.               |
| `order-1` `order-2` `order-last`                                    | Item ordering within the flex line.          |

***

## Grid

| Class                                       | What it does                                   |
| ------------------------------------------- | ---------------------------------------------- |
| `grid`                                      | Makes a grid container.                        |
| `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | Responsive column count.                       |
| `grid-rows-2`                               | Two explicit rows.                             |
| `auto-rows-fr`                              | Auto rows share free space equally.            |
| `col-span-2`                                | Item spans 2 columns.                          |
| `col-start-2` `col-end-4`                   | Set grid column start/end lines.               |
| `gap-2 gap-x-4 gap-y-6`                     | Grid gaps.                                     |
| `place-items-center`                        | Shorthand for `align-items` + `justify-items`. |
| `place-content-between`                     | Distribute tracks within container.            |

***

## Sizing

| Class                             | What it does                     |
| --------------------------------- | -------------------------------- |
| `w-4 w-8 w-16 w-24`               | Fixed widths via spacing scale.  |
| `w-1/2`                           | 50% width.                       |
| `w-full`                          | 100% width of parent.            |
| `w-screen`                        | 100vw.                           |
| `min-w-0` / `min-w-full`          | Minimum width constraints.       |
| `max-w-xs` `max-w-md` `max-w-7xl` | Max width presets.               |
| `h-4 h-10 h-24`                   | Fixed heights via spacing scale. |
| `h-full` `h-screen`               | 100% height / 100vh.             |
| `aspect-square` / `aspect-video`  | Aspect ratio (1:1 / 16:9).       |

***

## Typography

| Class                                                             | What it does     |
| ----------------------------------------------------------------- | ---------------- |
| `text-xs` → `text-2xl`                                            | Font size scale. |
| `font-light` → `font-bold`                                        | Font weight.     |
| `leading-none` `leading-tight` `leading-normal` `leading-relaxed` | Line-height.     |
| `tracking-tight` `tracking-normal` `tracking-wide`                | Letter-spacing.  |
| `text-left` `text-center` `text-right`                            | Text alignment.  |
| `italic` / `not-italic`                                           | Font style.      |
| `underline` `line-through` `no-underline`                         | Text decoration. |

***

## Colors

| Class                                                       | What it does                            |
| ----------------------------------------------------------- | --------------------------------------- |
| `text-gray-900` `text-white` `text-red-600` `text-blue-600` | Text color.                             |
| `bg-white` `bg-gray-50` `bg-gray-900` `bg-blue-100`         | Background color.                       |
| `border` `border-gray-200` `border-red-500`                 | 1px border + color variants.            |
| `fill-current` / `stroke-current`                           | SVG fill/stroke inherits current color. |
| `text-black/70` `bg-blue-500/20`                            | Use opacity suffix `/NN`.               |

***

## Borders & Radius

| Class                                                           | What it does                              |
| --------------------------------------------------------------- | ----------------------------------------- |
| `border` `border-2` `border-0`                                  | Border width utilities.                   |
| `border-t` `border-x`                                           | Side-specific borders (top / left+right). |
| `border-gray-200` `border-blue-500`                             | Border color.                             |
| `rounded` `rounded-md` `rounded-lg` `rounded-xl` `rounded-full` | Border radius scale and pill.             |
| `divide-x` `divide-y` `divide-gray-200`                         | Adds separators between children.         |

***

## Effects

| Class                                                                  | What it does                         |
| ---------------------------------------------------------------------- | ------------------------------------ |
| `shadow` `shadow-sm` `shadow-md` `shadow-lg` `shadow-xl` `shadow-none` | Box-shadow presets.                  |
| `opacity-0` `opacity-50` `opacity-100`                                 | Element opacity.                     |
| `mix-blend-multiply`                                                   | Blending mode (element vs backdrop). |
| `bg-blend-overlay`                                                     | Background layer blending mode.      |

***

## Transforms & Transitions

| Class                                             | What it does                       |
| ------------------------------------------------- | ---------------------------------- |
| `transform`                                       | Enables transforms.                |
| `scale-95` `scale-100`                            | Scale transforms.                  |
| `rotate-6` `-rotate-3`                            | Rotation transforms.               |
| `translate-x-2`                                   | Translate on X axis.               |
| `transition` `transition-colors` `transition-all` | Enable transitions for properties. |
| `duration-200`                                    | Transition duration (ms).          |
| `ease-linear` `ease-in` `ease-out` `ease-in-out`  | Easing functions.                  |
| `animate-pulse` `animate-bounce`                  | Common CSS animations.             |

***

## Interactivity

| Class                                                  | What it does                  |
| ------------------------------------------------------ | ----------------------------- |
| `cursor-pointer`                                       | Pointer cursor.               |
| `select-none` `select-text`                            | User text selection behavior. |
| `pointer-events-none` / `pointer-events-auto`          | Toggle hit-testing.           |
| `focus:outline-none`                                   | Remove default outline.       |
| `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2` | Accessible focus ring.        |

***

## Lists & Tables

| Class                                     | What it does                               |
| ----------------------------------------- | ------------------------------------------ |
| `list-disc` `list-decimal`                | List markers.                              |
| `list-inside` `list-outside`              | Marker placement.                          |
| `table` `table-auto` `table-fixed`        | Display as table; column layout modes.     |
| `align-top` `align-middle` `align-bottom` | Vertical alignment in cells/inline-blocks. |

***

## Breakpoints

| Breakpoint | Min-width | Usage example   |
| ---------- | --------: | --------------- |
| `sm:`      |   ≥ 640px | `sm:text-sm`    |
| `md:`      |   ≥ 768px | `md:text-base`  |
| `lg:`      |  ≥ 1024px | `lg:text-lg`    |
| `xl:`      |  ≥ 1280px | `xl:text-xl`    |
| `2xl:`     |  ≥ 1536px | `2xl:max-w-7xl` |

***

## Dark Mode

| Class                                                          | What it does                            |
| -------------------------------------------------------------- | --------------------------------------- |
| `dark:bg-gray-900` `dark:text-gray-100` `dark:border-gray-700` | Dark theme variants for bg/text/border. |
| `dark:hover:bg-gray-800` `dark:focus:ring-blue-400`            | Dark + state variants.                  |

> **Config**: `darkMode: 'class'` in `tailwind.config.js`, then toggle `<html class="dark">`.

***

## Images & Media

| Class                                                           | What it does                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------ |
| `object-cover` `object-contain` `object-center`                 | Object-fit & position for replaced elements (images/videos). |
| `rounded-lg`                                                    | Rounded corners for media.                                   |
| `ring-1 ring-black/5`                                           | Subtle outline ring.                                         |
| `prose` `prose-sm` `sm:prose` `lg:prose-lg` `dark:prose-invert` | Typography plugin styles for rich content.                   |

***

## Forms (Basics)

| Class                                             | What it does                         |
| ------------------------------------------------- | ------------------------------------ |
| `appearance-none`                                 | Remove OS-native control appearance. |
| `placeholder-gray-400`                            | Placeholder color.                   |
| `ring-1 ring-gray-300`                            | Input ring border.                   |
| `focus:ring-2 focus:ring-blue-500`                | Emphasized focus ring.               |
| `disabled:opacity-50 disabled:cursor-not-allowed` | Disabled styling.                    |

***

## Visibility & Misc

| Class                                                    | What it does                      |
| -------------------------------------------------------- | --------------------------------- |
| `visible` `invisible`                                    | Visibility without layout change. |
| `sr-only` `not-sr-only`                                  | Screen-reader only / revert.      |
| `isolate`                                                | Creates new stacking context.     |
| `z-0 z-10 z-50`                                          | Common z-index values.            |
| `ring` `ring-1` `ring-2` `ring-offset-2` `ring-blue-500` | Outline-style focus rings.        |

***

## Variants & Patterns

### State Variants

| Class                           | What it does                                          |
| ------------------------------- | ----------------------------------------------------- |
| `hover:bg-blue-600`             | On hover, change background.                          |
| `focus:ring-2`                  | On focus, apply ring.                                 |
| `active:scale-95`               | On active press, shrink slightly.                     |
| `disabled:opacity-50`           | When disabled, fade.                                  |
| `group-hover:opacity-100`       | When parent has `group` and hovered, child changes.   |
| `aria-pressed:true:bg-blue-600` | ARIA attribute-based variant.                         |
| `data-[open=true]:rotate-180`   | Data attribute-based variant with arbitrary selector. |

### Responsive + State

| Class                  | What it does                         |
| ---------------------- | ------------------------------------ |
| `sm:hover:bg-gray-100` | Apply hover style at `sm` and up.    |
| `md:focus:ring-2`      | Apply focus ring at `md` and up.     |
| `lg:active:opacity-80` | Apply active opacity at `lg` and up. |

### Arbitrary Values

| Class                                             | What it does                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| `mt-[3.5rem]`                                     | Margin-top with custom value.                                       |
| `w-[72ch]`                                        | Width in `ch` units.                                                |
| `text-[15px]`                                     | Custom font size.                                                   |
| `shadow-[0_1px_8px_rgba(0,0,0,0.08)]`             | Custom box-shadow.                                                  |
| `bg-[conic-gradient(at_top_right,_#0ea5e9,_#22d3` | Arbitrary background (truncated; complete your gradient as needed). |

***

## Quick Usage Examples

<!-- Responsive grid of cards -->
<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <li class="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
    <h3 class="text-lg font-semibold">Card Title</h3>
    <p class="text-sm text-gray-600">Body text with <span class="underline">link style</span>.</p>
    <button class="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Action
    </button>
  </li>
</ul>

<!-- Flex alignment + space utilities -->
<div class="flex items-center justify-between space-x-4">
  <span class="text-sm text-gray-700">Left</span>
  <span class="text-sm text-gray-700">Right</span>
</div>

<!-- Sticky header -->
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 py-3">Sticky Header</div>
</header>
