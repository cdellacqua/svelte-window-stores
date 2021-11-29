import chai, {expect} from 'chai';
import {get} from 'svelte/store';
import type {Unsubscriber} from 'svelte/store';
import {windowShim} from '../../src/lib/ssr-shim';
import {
	viewportSize,
	innerWidth,
	innerHeight,
	viewportSizeUndebounced,
	innerWidthUndebounced,
	innerHeightUndebounced,
} from '../../src/lib/viewport';
import spies from 'chai-spies';

chai.use(spies);

describe('viewport size stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setSize({width, height}: {width: number; height: number}) {
		(windowShim as {innerWidth: number}).innerWidth = width;
		(windowShim as {innerHeight: number}).innerHeight = height;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscriber[] = [];
	beforeEach(() => {
		setSize({width: 0, height: 0});
		sandbox.on(windowShim, 'addEventListener', (_, cb) => updateCbs.push(cb));
		sandbox.on(windowShim, 'removeEventListener', (_, cb) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		);
		subscriptions.push(
			viewportSize.subscribe(() => undefined),
			viewportSizeUndebounced.subscribe(() => undefined),
			innerWidth.subscribe(() => undefined),
			innerWidthUndebounced.subscribe(() => undefined),
			innerHeight.subscribe(() => undefined),
			innerHeightUndebounced.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});
	it('tests the undebounced version of size', () => {
		expect(get(viewportSizeUndebounced)).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(get(viewportSizeUndebounced)).to.eqls({width: 10, height: 10});
	});
	it('tests the debounced version of size', async () => {
		expect(get(viewportSize)).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(get(viewportSize)).to.eqls({width: 0, height: 0});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(viewportSize)).to.eqls({width: 10, height: 10});
	});
	it('tests the undebounced version of innerWidth', () => {
		expect(get(innerWidthUndebounced)).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(get(innerWidthUndebounced)).to.eqls(20);
	});
	it('tests the debounced version of innerWidth', async () => {
		expect(get(innerWidth)).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(get(innerWidth)).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(innerWidth)).to.eqls(40);
	});
	it('tests the undebounced version of innerHeight', () => {
		expect(get(innerHeightUndebounced)).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(get(innerHeightUndebounced)).to.eqls(30);
	});
	it('tests the debounced version of innerHeight', async () => {
		expect(get(innerHeight)).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(get(innerHeight)).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(innerHeight)).to.eqls(50);
	});
});
