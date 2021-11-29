import {derived, readable} from 'svelte/store';
import {debounce} from '@cdellacqua/debounce';
import {windowShim} from '../ssr-shim';

function makeWindowScrollStore(debounced: boolean) {
	let previous: {x: number; y: number} | undefined;

	return readable<{x: number; y: number}>(undefined, (set) => {
		const update = () => {
			const currentX = windowShim.scrollX;
			const currentY = windowShim.scrollY;
			if (currentX !== previous?.x || currentY !== previous?.y) {
				previous = {x: currentX, y: currentY};
				set(previous);
			}
		};
		update();
		const scrollHandler = debounced ? debounce(update) : update;
		windowShim.addEventListener('scroll', scrollHandler);
		return () => {
			windowShim.removeEventListener('scroll', scrollHandler);
		};
	});
}

/**
 * A readable store that contains the current scrolling position (x and y) (debounced).
 */
export const windowScroll = makeWindowScrollStore(true);

/**
 * A readable store that contains the current scrolling position (x and y) (undebounced).
 */
export const windowScrollUndebounced = makeWindowScrollStore(false);

/**
 * A readable store that contains the current scrolling position on the X axis (debounced).
 */
export const scrollX = derived(windowScroll, ($windowScroll) => $windowScroll.x);

/**
 * A readable store that contains the current scrolling position on the X axis (undebounced).
 */
export const scrollXUndebounced = derived(
	windowScrollUndebounced,
	($windowScroll) => $windowScroll.x,
);

/**
 * A readable store that contains the current scrolling position on the Y axis (debounced).
 */
export const scrollY = derived(windowScroll, ($windowScroll) => $windowScroll.y);

/**
 * A readable store that contains the current scrolling position on the Y axis (undebounced).
 */
export const scrollYUndebounced = derived(
	windowScrollUndebounced,
	($windowScroll) => $windowScroll.y,
);
