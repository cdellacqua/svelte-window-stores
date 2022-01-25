import chai, {expect} from 'chai';
import {get} from 'svelte/store';
import type {Unsubscriber} from 'svelte/store';
import {windowShim} from '../../src/lib/ssr-shim.js';
import {orientation, Orientation, orientationUndebounced} from '../../src/lib/viewport/index.js';
import spies from 'chai-spies';

chai.use(spies);

describe('orientation stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	const stub = {
		addEventListener: (_: string, cb: () => void) => updateCbs.push(cb),
		removeEventListener: (_: string, cb: () => void) => updateCbs.splice(updateCbs.indexOf(cb), 1),
		matches: false,
	};
	function setOrientation(o: Orientation) {
		stub.matches = o === Orientation.Portrait;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscriber[] = [];
	beforeEach(() => {
		sandbox.on(windowShim, 'matchMedia', () => stub);
		subscriptions.push(
			orientation.subscribe(() => undefined),
			orientationUndebounced.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		setOrientation(Orientation.Landscape);
		sandbox.restore(windowShim, 'matchMedia');
	});

	it('tests the undebounced version', () => {
		expect(get(orientationUndebounced)).to.eq(Orientation.Landscape);
		setOrientation(Orientation.Portrait);
		expect(get(orientationUndebounced)).to.eq(Orientation.Portrait);
	});
	it('tests the debounced version', async () => {
		expect(get(orientation)).to.eq(Orientation.Landscape);
		setOrientation(Orientation.Portrait);
		expect(get(orientation)).to.eq(Orientation.Landscape);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(orientation)).to.eq(Orientation.Portrait);
	});
});
