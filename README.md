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

- **Svelte + daisyUI:** Native Svelte implementation of daisyUI components with full TypeScript support.
- **Built-in Icons:** A custom SVG plugin that handles icon injection without duplicating SVG source code.
- **AOT Syntax Highlighting:** Integrated Shiki support for beautiful code blocks that don't slow down your site.
- **Advanced Controls:** Complex UI elements like `DatePicker`, `Combobox`, `FileTree`, and `DoubleRangeSlider` ready to use.
- **Developer Utilities:** Logic for breakpoints, filesystem operations, and reactive tasks.

---

## 📦 Installation

Install the package via PNPM directly from GitHub:

```bash
pnpm add github:Juvofy/base
```

Since the package is installed from a Git repo (not a published registry tarball), PNPM needs to run its build step so the `postinstall` script (`svelte-package`) generates the `dist` folder the package's `exports` point to. Make sure builds aren't blocked, e.g. approve the build if PNPM prompts for it, or allowlist it upfront:

```bash
pnpm approve-builds
# or, before installing
pnpm config set onlyBuiltDependencies[] @juvofy/lib
```

Because the package ships `.svelte` files directly (not pre-compiled JS), your bundler needs to resolve them. If you're using Vite, add `.svelte` to `resolve.extensions` in your `vite.config.ts`:

```typescript
export default defineConfig({
	resolve: {
		extensions: [".ts", ".js", ".svelte"],
	},
});
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
import {svelte} from "@sveltejs/vite-plugin-svelte";
import {svgPlugin, shikiPlugin} from "@juvofy/lib/vite";

export default defineConfig({
	plugins: [
		svelte(),
		svgPlugin("icon"), // Simplifies SVG usage [query parameter is configurable]
		shikiPlugin(), // Ahead-of-time code highlighting [query parameter is ?shiki]
	],
	resolve: {
		extensions: [".ts", ".js", ".svelte"], // Required so Vite resolves the library's .svelte files
	},
});
```

---

## 🧹 Linting (oxlint)

This project is linted with [oxlint](https://oxc.rs/docs/guide/usage/linter.html) via `.oxlintrc.json`. If you consume this library and want to extend its lint rules in your own config, reference it with `extends`:

```json
{
	"extends": ["./node_modules/@juvofy/lib/.oxlintrc.json"],
	"rules": {
		"no-console": "off"
	}
}
```

---

## 🧰 Utilities

We've included a `utils` directory full of helpers that solve common "hobby dev" headaches. Each one is importable from `@juvofy/lib/utils/<Name>`.

- **`Breakpoint`**: A `MediaQuery`-based reactive class for Tailwind CSS breakpoints. Construct it with `{up}`, `{down}`, `{up, down}`, or `{exact}` referencing a `BreakpointName` (e.g. `md`), and read `.current` for the live match. Use it carefully — like any `MediaQuery`, it can't work on SSR.

    ```typescript
    const isDesktop = new Breakpoint({up: "lg"});
    ```

- **`StorageState.svelte.ts`**: A reactive wrapper class around `localStorage`/`sessionStorage`. Give it a storage kind, a key, and an initial value; read/write the current value through `.value`, and check `.loaded` to know once the persisted value has been hydrated. It stays in sync across tabs via the `storage` event and JSON-serializes values automatically (an optional `reviver` is passed through to `JSON.parse`). No-ops safely outside the browser (SSR).

    ```typescript
    const settings = new StorageState("local", "settings", {theme: "dark"});
    settings.value = {theme: "light"};
    ```

- **`Constructor<T>`**: A type alias for `abstract new (...args: SpreadParameters) => T`, handy for typing mixins or factory functions that accept any class constructor.

- **`PropsUnion<A, B>`**: A type helper that builds a proper union of two prop shapes `A` and `B`, marking the other side's exclusive keys as optional `undefined` so exhaustive prop checks and spreads behave as expected.

- **`Range`** (and the `range()` helper): An iterable numeric range. `range(end)`, `range(start, end)`, or `range(start, end, step)` all return a `Range` instance you can spread or `for...of` over, e.g. `[...range(5)]` or `range(0, 10, 2)`.

- **`SpreadParameters`**: A type alias (`[] | any[]`) that every `Parameters<?>` tuple satisfies — useful as a generic constraint for functions/constructors that forward arbitrary arguments.

- **`assert(condition, thrown?)`**: A TypeScript assertion function — throws `thrown` (or `undefined` if omitted) when `condition` is falsy, narrowing the type afterwards.

- **`escapeRegexPart(string)`**: Escapes regex special characters in a string so it can be safely embedded inside a `RegExp` pattern.

- **`event(eventName, handler?)`**: A Svelte [attachment](https://svelte.dev/docs/svelte/svelte-attachments) factory that wires up a typed DOM event listener (`HTMLElementEventMap`, `SVGElementEventMap`, `MathMLElementEventMap`, or a custom event name) on the element it's attached to, cleaning it up automatically.

    ```svelte
    <button {@attach event("click", () => console.log("clicked"))}>Click</button>
    ```

- **`sleep(ms)`**: Returns a `Promise` that resolves after `ms` milliseconds — a minimal `await sleep(1000)` delay helper.

- **`tw(...classes)`**: Passes Tailwind class values through unchanged while giving editor autocompletion for `ClassValue`. Also exposes `tw.map(object)` for typed class-name maps, and `tw.prefixed(...keys)`, which finds the shared dash-delimited prefix among a set of keys and returns a lookup function mapping the unprefixed variant back to the full class name.

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
