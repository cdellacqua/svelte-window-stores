import {derived} from 'svelte/store';
import type {Readable} from 'svelte/store';
import {innerHeight, innerWidth, innerHeightUndebounced, innerWidthUndebounced} from './_size';

/**
 * A screen size descriptor consists of a name indicating the category (e.g. 'sm', 'md', 'lg', ...),
 * a threshold indicating its validity and an index with
 * respect to other registered breakpoints. The lower
 * the index, the lower the corresponding threshold.
 */
export interface ScreenSize {
	/** Index of the breakpoint, from 0 (lower threshold) to n. of names - 1 */
	index: number;
	/** A value in pixel */
	threshold: number;
	/** A name that identifies the screen size (e.g. 'sm', 'md', 'lg', ...) */
	name: string;
}

export interface MakeScreenSizeStoreParams {
	/** (optional) A list of names identifying the possible screen sizes and that will be associated to the thresholds */
	names?: string[];
	/** A list of thresholds that will be used to determine the current screen size */
	thresholds: number[];
	/** (optional, default 'width') Determines which dimension should be compared to the thresholds, the width or the height of the viewport */
	dimension?: 'width' | 'height';
	/** (optional, default 'min') Determines if the thresholds describe the starting or the ending point of the screen size */
	strategy?: 'max' | 'min';
	/** (optional, default true) Determines if the store should be updated using requestAnimationFrame as a debouncing function or instantly react to the resize event */
	debounced?: boolean;
}

/**
 * Creates a store that indicates the screen size based on the width or height of the viewport
 * @param config.names (optional) A list of names identifying the possible screen sizes and that will be associated to the thresholds
 * @param config.thresholds A list of thresholds that will be used to determine the current screen size
 * @param config.dimension (optional, default 'width') Determines which dimension should be compared to the thresholds, the width or the height of the viewport
 * @param config.strategy (optional, default 'min') Determines if the thresholds describe the starting or the ending point of the screen size
 * @param config.debounced (optional, default true) Determines if the store should be updated using requestAnimationFrame as a debouncing function or instantly react to the resize event
 * @returns a readable store
 */
export function makeScreenSizeStore({
	names: optionalNames,
	thresholds,
	dimension = 'width',
	strategy = 'min',
	debounced = true,
}: MakeScreenSizeStoreParams): Readable<ScreenSize> {
	const names =
		optionalNames ||
		new Array(thresholds.length + 1).fill(0).map((_, index) => 'screen-size-' + index);
	if (names.length !== thresholds.length + 1) {
		throw new Error(
			`length mismatch: expected ${thresholds.length + 1} names, ${names.length} received`,
		);
	}

	let derivedSize: Readable<number>;
	if (dimension === 'width' && debounced) {
		derivedSize = innerWidth;
	} else if (dimension === 'width' && !debounced) {
		derivedSize = innerWidthUndebounced;
	} else if (dimension === 'height' && debounced) {
		derivedSize = innerHeight;
	} else {
		derivedSize = innerHeightUndebounced;
	}

	if (strategy === 'max') {
		const ascendingBreakpoints = thresholds
			.sort((threshold1, threshold2) => threshold1 - threshold2)
			.map((threshold, index) => ({
				threshold,
				index,
				name: names[index],
			}));
		return derived(derivedSize, ($size) => {
			const candidate = ascendingBreakpoints.find((b) => b.threshold >= $size);

			if (candidate !== undefined) {
				return candidate;
			}
			return {
				threshold: Infinity,
				index: names.length - 1,
				name: names[names.length - 1],
			};
		});
	} else {
		const descendingBreakpoints = thresholds
			.sort((threshold1, threshold2) => threshold2 - threshold1)
			.map((threshold, index) => ({
				threshold,
				index: thresholds.length - index,
				name: names[thresholds.length - index],
			}));
		return derived(derivedSize, ($size) => {
			const candidate = descendingBreakpoints.find((b) => b.threshold <= $size);

			if (candidate !== undefined) {
				return candidate;
			}
			return {
				threshold: 0,
				index: 0,
				name: names[0],
			};
		});
	}
}
