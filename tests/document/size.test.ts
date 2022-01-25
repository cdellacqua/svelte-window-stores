import chai, {expect} from 'chai';
import {get} from 'svelte/store';
import type {Unsubscriber} from 'svelte/store';
import {windowShim} from '../../src/lib/ssr-shim.js';
import {
	documentSize,
	documentSizeUndebounced,
	documentWidth,
	documentWidthUndebounced,
	documentHeight,
	documentHeightUndebounced,
} from '../../src/lib/document/index.js';
import spies from 'chai-spies';

chai.use(spies);

describe('document size stores', () => {
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
			documentSize.subscribe(() => undefined),
			documentSizeUndebounced.subscribe(() => undefined),
			documentWidth.subscribe(() => undefined),
			documentWidthUndebounced.subscribe(() => undefined),
			documentHeight.subscribe(() => undefined),
			documentHeightUndebounced.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});
	it('tests the undebounced version of size', () => {
		expect(get(documentSizeUndebounced)).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(get(documentSizeUndebounced)).to.eqls({width: 10, height: 10});
	});
	it('tests the debounced version of size', async () => {
		expect(get(documentSize)).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(get(documentSize)).to.eqls({width: 0, height: 0});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(documentSize)).to.eqls({width: 10, height: 10});
	});
	it('tests the undebounced version of documentWidth', () => {
		expect(get(documentWidthUndebounced)).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(get(documentWidthUndebounced)).to.eqls(20);
	});
	it('tests the debounced version of documentWidth', async () => {
		expect(get(documentWidth)).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(get(documentWidth)).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(documentWidth)).to.eqls(40);
	});
	it('tests the undebounced version of documentHeight', () => {
		expect(get(documentHeightUndebounced)).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(get(documentHeightUndebounced)).to.eqls(30);
	});
	it('tests the debounced version of documentHeight', async () => {
		expect(get(documentHeight)).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(get(documentHeight)).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(documentHeight)).to.eqls(50);
	});
});
