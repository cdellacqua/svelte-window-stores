import {derived, readable} from 'svelte/store';
import {debounce} from '@cdellacqua/debounce';
import {windowShim} from '../ssr-shim';

function makeSizeStore(debounced: boolean) {
	let previous: {width: number; height: number} | undefined;

	return readable<{width: number; height: number}>(undefined, (set) => {
		const update = () => {
			const currentWidth = windowShim.innerWidth;
			const currentHeight = windowShim.innerHeight;
			if (currentWidth !== previous?.width || currentHeight !== previous?.height) {
				previous = {width: currentWidth, height: currentHeight};
				set(previous);
			}
		};
		update();
		const resizeHandler = debounced ? debounce(update) : update;
		windowShim.addEventListener('resize', resizeHandler);
		return () => {
			windowShim.removeEventListener('resize', resizeHandler);
		};
	});
}

/**
 * A readable store that contains the size of the viewport (innerWidth and innerHeight of the window) (debounced).
 */
export const viewportSize = makeSizeStore(true);

/**
 * A readable store that contains the size of the viewport (innerWidth and innerHeight of the window) (undebounced).
 */
export const viewportSizeUndebounced = makeSizeStore(false);

/**
 * A readable store that contains the innerWidth of the window (debounced).
 */
export const innerWidth = derived(viewportSize, ($windowSize) => $windowSize.width);

/**
 * A readable store that contains the innerWidth of the window (undebounced).
 */
export const innerWidthUndebounced = derived(
	viewportSizeUndebounced,
	($windowSize) => $windowSize.width,
);

/**
 * A readable store that contains the innerHeight of the window (debounced).
 */
export const innerHeight = derived(viewportSize, ($windowSize) => $windowSize.height);

/**
 * A readable store that contains the innerHeight of the window (undebounced).
 */
export const innerHeightUndebounced = derived(
	viewportSizeUndebounced,
	($windowSize) => $windowSize.height,
);
