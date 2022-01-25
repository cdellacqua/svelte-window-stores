import chai, {expect} from 'chai';
import {get} from 'svelte/store';
import type {Unsubscriber} from 'svelte/store';
import {windowShim} from '../../src/lib/ssr-shim.js';
import {
	prefersColorScheme,
	ColorScheme,
	prefersColorSchemeUndebounced,
} from '../../src/lib/appearance/index.js';
import spies from 'chai-spies';

chai.use(spies);

describe('"prefers color scheme" stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	const stub = {
		addEventListener: (_: string, cb: () => void) => updateCbs.push(cb),
		removeEventListener: (_: string, cb: () => void) => updateCbs.splice(updateCbs.indexOf(cb), 1),
		matches: false,
	};
	function setColorScheme(o: ColorScheme) {
		stub.matches = o === ColorScheme.Dark;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscriber[] = [];
	beforeEach(() => {
		sandbox.on(windowShim, 'matchMedia', () => stub);
		subscriptions.push(
			prefersColorScheme.subscribe(() => undefined),
			prefersColorSchemeUndebounced.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		setColorScheme(ColorScheme.Light);
		sandbox.restore(windowShim, 'matchMedia');
	});

	it('tests the undebounced version', () => {
		expect(get(prefersColorSchemeUndebounced)).to.eq(ColorScheme.Light);
		setColorScheme(ColorScheme.Dark);
		expect(get(prefersColorSchemeUndebounced)).to.eq(ColorScheme.Dark);
	});
	it('tests the debounced version', async () => {
		expect(get(prefersColorScheme)).to.eq(ColorScheme.Light);
		setColorScheme(ColorScheme.Dark);
		expect(get(prefersColorScheme)).to.eq(ColorScheme.Light);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(prefersColorScheme)).to.eq(ColorScheme.Dark);
	});
});
