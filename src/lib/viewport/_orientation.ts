import {readable} from 'svelte/store';
import {debounce} from '@cdellacqua/debounce';
import {windowShim} from '../ssr-shim';

export enum Orientation {
	Landscape,
	Portrait,
}

let orientationMediaQuery:
	| {
			addEventListener: (eventName: string, cb: () => unknown) => void;
			removeEventListener: (eventName: string, cb: () => unknown) => void;
			matches: boolean;
	  }
	| undefined;

function getOrientationMediaQuery() {
	if (!orientationMediaQuery) {
		orientationMediaQuery = windowShim.matchMedia('(orientation: portrait)');
	}
	return orientationMediaQuery;
}

function getOrientation() {
	return getOrientationMediaQuery().matches ? Orientation.Portrait : Orientation.Landscape;
}

function makeOrientationStore(debounced: boolean) {
	let previousValue: Orientation | undefined;
	return readable<Orientation>(undefined, (set) => {
		const update = () => {
			const currentValue = getOrientation();
			if (currentValue !== previousValue) {
				previousValue = currentValue;
				set(currentValue);
			}
		};
		update();
		const changeHandler = debounced ? debounce(update) : update;
		getOrientationMediaQuery().addEventListener('change', changeHandler);
		return () => {
			getOrientationMediaQuery().removeEventListener('change', changeHandler);
		};
	});
}

/**
 * A readable store that indicates whether the viewport is in landscape or portrait mode (debounced).
 */
export const orientation = makeOrientationStore(true);

/**
 * A readable store that indicates whether the viewport is in landscape or portrait mode (undebounced).
 */
export const orientationUndebounced = makeOrientationStore(false);
