import {readable} from 'svelte/store';
import {debounce} from '@cdellacqua/debounce';
import {windowShim} from '../ssr-shim';

export enum ColorScheme {
	Light,
	Dark,
}

let colorSchemeMediaQuery:
	| {
			addEventListener: (eventName: string, cb: () => unknown) => void;
			removeEventListener: (eventName: string, cb: () => unknown) => void;
			matches: boolean;
	  }
	| undefined;

function getColorSchemeMediaQuery() {
	if (!colorSchemeMediaQuery) {
		colorSchemeMediaQuery = windowShim.matchMedia('(prefers-color-scheme: dark)');
	}
	return colorSchemeMediaQuery;
}

function getColorScheme() {
	return getColorSchemeMediaQuery().matches ? ColorScheme.Dark : ColorScheme.Light;
}

function makeColorSchemeStore(debounced: boolean) {
	let previousValue: ColorScheme | undefined;
	return readable<ColorScheme>(undefined, (set) => {
		const update = () => {
			const currentValue = getColorScheme();
			if (currentValue !== previousValue) {
				previousValue = currentValue;
				set(currentValue);
			}
		};
		update();
		const changeHandler = debounced ? debounce(update) : update;
		getColorSchemeMediaQuery().addEventListener('change', changeHandler);
		return () => {
			getColorSchemeMediaQuery().removeEventListener('change', changeHandler);
		};
	});
}

/**
 * A readable store that contains the preferred color scheme (debounced).
 */
export const prefersColorScheme = makeColorSchemeStore(true);

/**
 * A readable store that contains the preferred color scheme (undebounced).
 */
export const prefersColorSchemeUndebounced = makeColorSchemeStore(false);
