import chai, {expect} from 'chai';
import {get} from 'svelte/store';
import type {Unsubscriber} from 'svelte/store';
import {windowShim} from '../../src/lib/ssr-shim';
import {
	scrollX,
	scrollXUndebounced,
	scrollY,
	scrollYUndebounced,
	windowScroll,
	windowScrollUndebounced,
} from '../../src/lib/viewport';
import spies from 'chai-spies';

chai.use(spies);

describe('scroll stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setScroll({x, y}: {x: number; y: number}) {
		(windowShim as {scrollX: number}).scrollX = x;
		(windowShim as {scrollY: number}).scrollY = y;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscriber[] = [];
	beforeEach(() => {
		setScroll({x: 0, y: 0});
		sandbox.on(windowShim, 'addEventListener', (_, cb) => updateCbs.push(cb));
		sandbox.on(windowShim, 'removeEventListener', (_, cb) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		);
		subscriptions.push(
			windowScroll.subscribe(() => undefined),
			windowScrollUndebounced.subscribe(() => undefined),
			scrollX.subscribe(() => undefined),
			scrollXUndebounced.subscribe(() => undefined),
			scrollY.subscribe(() => undefined),
			scrollYUndebounced.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});
	it('tests the undebounced version of windowScroll', () => {
		expect(get(windowScrollUndebounced)).to.eqls({x: 0, y: 0});
		setScroll({x: 10, y: 10});
		expect(get(windowScrollUndebounced)).to.eqls({x: 10, y: 10});
	});
	it('tests the debounced version of windowScroll', async () => {
		expect(get(windowScroll)).to.eqls({x: 0, y: 0});
		setScroll({x: 10, y: 10});
		expect(get(windowScroll)).to.eqls({x: 0, y: 0});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(windowScroll)).to.eqls({x: 10, y: 10});
	});
	it('tests the undebounced version of scrollX', () => {
		expect(get(scrollXUndebounced)).to.eqls(0);
		setScroll({x: 20, y: 30});
		expect(get(scrollXUndebounced)).to.eqls(20);
	});
	it('tests the debounced version of scrollX', async () => {
		expect(get(scrollX)).to.eqls(0);
		setScroll({x: 40, y: 50});
		expect(get(scrollX)).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(scrollX)).to.eqls(40);
	});
	it('tests the undebounced version of scrollY', () => {
		expect(get(scrollYUndebounced)).to.eqls(0);
		setScroll({x: 20, y: 30});
		expect(get(scrollYUndebounced)).to.eqls(30);
	});
	it('tests the debounced version of scrollY', async () => {
		expect(get(scrollY)).to.eqls(0);
		setScroll({x: 40, y: 50});
		expect(get(scrollY)).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(scrollY)).to.eqls(50);
	});
});
