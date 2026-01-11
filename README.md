# Juvofy Lib

**Juvofy Lib** is a comprehensive, open-source toolkit designed for internal purposes. It combines a robust **daisyUI** implementation with specialized Vite plugins and a suite of powerful TypeScript utilities.

---

## 🎨 CSS Setup

Because this library relies on Tailwind CSS and daisyUI, you need to tell Tailwind to scan the library for classes and include the library's base styles.

Add the following to your global CSS file (e.g., `app.css`):

```css
/* Ensure Tailwind scans the library components */
@source "../../node_modules/@juvofy/lib";

/* Import Juvofy core styles */
@import "@juvofy/lib/app.tw.css";
```

---

## 🚀 Features

-   **Svelte + daisyUI:** Native Svelte implementation of daisyUI components with full TypeScript support.
-   **Built-in Icons:** A custom SVG plugin that handles icon injection without duplicating SVG source code.
-   **AOT Syntax Highlighting:** Integrated Shiki support for beautiful code blocks that don't slow down your site.
-   **Advanced Controls:** Complex UI elements like `DatePicker`, `Combobox`, `FileTree`, and `DoubleRangeSlider` ready to use.
-   **Developer Utilities:** Logic for breakpoints, filesystem operations, and reactive tasks.

---

## 📦 Installation

Install the package via PNPM:

```bash
pnpm add github:Juvofy/base
```

Or you may prefer to copy the components to your code. If so, you can use this repo as a template.

---

## 🛠️ Component Overview

Juvofy Lib is organized into functional categories to keep your imports clean:

| Category       | Key Components                                                    |
| -------------- | ----------------------------------------------------------------- |
| **Actions**    | `Button`, `Dropdown`, `Dialog`, `ContextMenu`, `SpeedDial`        |
| **Controls**   | `Combobox`, `DatePicker`, `Slider`, `FileUploader`, `Calendar`    |
| **Display**    | `Card`, `Badge`, `Timeline`, `Accordion`, `FileTree`, `Countdown` |
| **Feedback**   | `Toast`, `Tooltip`                                                |
| **Navigation** | `Tabs`, `Tab`                                                     |
| **AOT**        | `Svg` (Optimized icons), `Shiki` (Build-time highlighting)        |

---

## 🔌 Vite Plugins

Supercharge your development environment with our custom build tools. In your `vite.config.ts`:

```typescript
import {defineConfig} from "vite";
import {sveltekit} from "@sveltejs/kit/vite";
import {svgPlugin, shikiPlugin} from "@juvofy/lib/vite";

export default defineConfig({
	plugins: [
		sveltekit(),
		svgPlugin("icon"), // Simplifies SVG usage [query parameter is configurable]
		shikiPlugin(), // Ahead-of-time code highlighting [query parameter is ?shiki]
	],
});
```

---

## 🧰 Utilities

We’ve included a `utils` directory full of helpers that solve common "hobby dev" headaches:

-   **`Task.svelte.ts`**: A way how to inspect promise status outside of the `{#await }` block.
-   **`Breakpoint`**: A reactive value for Tailwind CSS breakpoint. Use it carefully, it can't work on SSR.
-   **`FileSystem`**: A wrapper for the File System Access API (OPFS) providing high-level utility methods for file and directory management.

---

## 📖 Basic Usage

Run this app to see the docs.

```bash
git clone https://github.com/Juvofy/base juvofy-lib
cd juvofy-lib
pnpm i
pnpm dev
```

---

## 🤝 Contributing

This project is open source! If you found a bug or want to add a component, feel free to open a PR.

**License:** MIT

---
