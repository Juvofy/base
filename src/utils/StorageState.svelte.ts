import {flushSync} from "svelte";

/**
 * A `$state`-backed value that's persisted to `localStorage`/`sessionStorage`, kept in sync
 * across tabs (via the `storage` event) and across bfcache navigations (via `pageshow`). Reads
 * `.value` reactively and writes to storage as a side effect whenever it changes.
 *
 * On the server (no `window`), it behaves like a plain in-memory `$state` - `.loaded` stays
 * `false` and nothing is persisted.
 *
 * @example
 * ```ts
 * const theme = new StorageState<"light" | "dark">("local", "theme", "light");
 *
 * theme.value; // "light" - or whatever was previously stored
 * theme.value = "dark"; // reactively updates and persists to localStorage
 * ```
 */
export class StorageState<Value> {
	private readonly storage?: Storage;
	private readonly storageKey: string;
	private readonly reviver?: (this: void, key: string, value: unknown) => unknown;

	private storedValue = $state<Value>();
	private initialValue: Value;

	/** `true` once the value has been read from storage and the sync listeners are attached. Always `false` on the server. */
	public loaded = $state(false);

	/**
	 * @param storageKind Whether to use `localStorage` or `sessionStorage`.
	 * @param storageKey The storage key to read/write.
	 * @param initialValue Value to use before storage has loaded, or when nothing is stored yet. Deep-cloned via `structuredClone`.
	 * @param reviver Optional `JSON.parse` reviver applied when reading the stored value back.
	 */
	constructor(
		storageKind: "local" | "session",
		storageKey: string,
		initialValue: Value,
		reviver?: (this: void, key: string, value: unknown) => unknown,
	) {
		this.storageKey = storageKey;
		this.initialValue = structuredClone(initialValue);
		this.storedValue = this.initialValue;
		this.reviver = reviver;

		if (typeof window === "undefined") {
			return;
		}
		this.storage = window[`${storageKind}Storage`];

		this.resyncFromStorage();

		// To handle a deeply-reactive values change,
		// we need to use $effect to watch for changes and save them to storage.

		this.dispose = $effect.root(() => {
			const storageListener = this.handleStorageEvent.bind(this);
			window.addEventListener("storage", storageListener);

			const visibilityListener = this.handleVisibilityChange.bind(this);
			document.addEventListener("visibilitychange", visibilityListener);

			// A page restored from the back/forward cache doesn't necessarily fire "visibilitychange" -
			// "pageshow" with persisted=true is the dedicated signal for that.
			const pageshowListener = this.handlePageshow.bind(this);
			window.addEventListener("pageshow", pageshowListener);

			$effect(() => {
				this.saveValueToStorage(this.value);
			});

			return (): void => {
				window.removeEventListener("storage", storageListener);
				document.removeEventListener("visibilitychange", visibilityListener);
				window.removeEventListener("pageshow", pageshowListener);
			};
		});

		this.loaded = true;
	}

	/** Stops syncing with storage and removes all event listeners. Safe to call multiple times. */
	public dispose(): void {
		// Set in constructor
	}

	private resyncFromStorage(): void {
		if (!this.storage) {
			return;
		}
		const storedValue = this.storage.getItem(this.storageKey);
		if (storedValue === null) {
			// Another tab removed the key (or cleared storage entirely) – follow suit.
			this.storedValue = structuredClone(this.initialValue);
			return;
		}
		try {
			this.storedValue = JSON.parse(storedValue, this.reviver) as Value;
		} catch {
			// Corrupted/unparsable value should never happen, but if it does, don't get stuck on it.
			this.storedValue = structuredClone(this.initialValue);
		}
	}

	private handleStorageEvent(event: StorageEvent): void {
		if (event.storageArea !== this.storage || (event.key !== this.storageKey && event.key !== null)) {
			return;
		}
		this.resyncFromStorageAfterFlush();
	}

	private handleVisibilityChange(): void {
		if (document.visibilityState !== "visible") {
			return;
		}
		this.resyncFromStorageAfterFlush();
	}

	private handlePageshow(event: PageTransitionEvent): void {
		if (!event.persisted) {
			return;
		}
		this.resyncFromStorageAfterFlush();
	}

	private resyncFromStorageAfterFlush(): void {
		flushSync();
		this.resyncFromStorage();
	}

	private saveValueToStorage(value: Value): void {
		if (value === null || value === undefined) {
			this.storage?.removeItem(this.storageKey);
		} else {
			this.storage?.setItem(this.storageKey, JSON.stringify(value));
		}
	}

	/** The current value. Reactive - read it inside `$derived`/`$effect` to track changes. */
	public get value(): Value {
		return this.storedValue as Value;
	}

	/** Sets the value, updates reactive readers, and persists it to storage (or removes the key if `null`/`undefined`). */
	public set value(newValue: Value) {
		this.storedValue = newValue;
		this.saveValueToStorage(newValue);
	}
}
