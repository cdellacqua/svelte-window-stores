import {makeScreenSizeStore} from '$lib/viewport/_screen';

export enum ScreenSize {
	sm,
	md,
	lg,
}
export const screenSize = makeScreenSizeStore({
	names: ['sm', 'md', 'lg'],
	thresholds: [768, 992],
	dimension: 'width',
	strategy: 'min',
});
export const screenSizeAlt = makeScreenSizeStore({
	names: ['sm', 'md', 'lg'],
	thresholds: [768, 992],
	dimension: 'width',
	strategy: 'max',
});
