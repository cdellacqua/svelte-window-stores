/**
 * Shim that provides support for server-side rendering
 * by emulating the window behavior on specific
 * properties and methods used in this library.
 */
export const windowShim =
	typeof window !== 'undefined'
		? window
		: {
				scrollX: 0,
				scrollY: 0,
				innerWidth: 1920,
				innerHeight: 1080,
				addEventListener: (() => undefined) as (eventName: string, cb: () => unknown) => void,
				removeEventListener: (() => undefined) as (eventName: string, cb: () => unknown) => void,
				matchMedia: () => ({
					addEventListener: (() => undefined) as (eventName: string, cb: () => unknown) => void,
					removeEventListener: (() => undefined) as (eventName: string, cb: () => unknown) => void,
					matches: false,
				}),
		  };

/**
 * Shim that provides support for server-side rendering
 * by emulating the document behavior on specific
 * properties and methods used in this library.
 */
export const documentShim =
	typeof document !== 'undefined'
		? document
		: {
				addEventListener: () => undefined,
				removeEventListener: () => undefined,
				createElement: () => ({
					style: {} as Record<string, string>,
					tabIndex: -1,
					setAttribute: () => undefined,
					contentWindow: windowShim,
					src: '',
				}),
				body: {
					style: {
						position: '',
					},
					appendChild: () => undefined,
				},
		  };
