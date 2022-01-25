import chai, {expect} from 'chai';
import {get} from 'svelte/store';
import type {Unsubscriber} from 'svelte/store';
import {windowShim} from '../../src/lib/ssr-shim.js';
import {makeScreenSizeStore} from '../../src/lib/viewport/index.js';
import spies from 'chai-spies';

chai.use(spies);

describe('custom screen size store', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setSize({width, height}: {width: number; height: number}) {
		(windowShim as {innerWidth: number}).innerWidth = width;
		(windowShim as {innerHeight: number}).innerHeight = height;
		updateCbs.forEach((cb) => cb());
	}
	const screenSizeMinWidth = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'min',
		debounced: true,
	});
	const screenSizeMinWidthUndebounced = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'min',
		debounced: false,
	});
	const screenSizeMaxWidth = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'max',
		debounced: true,
	});
	const screenSizeMaxWidthUndebounced = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'max',
		debounced: false,
	});
	const screenSizeMinHeight = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'min',
		debounced: true,
	});
	const screenSizeMinHeightUndebounced = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'min',
		debounced: false,
	});
	const screenSizeMaxHeight = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'max',
		debounced: true,
	});
	const screenSizeMaxHeightUndebounced = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'max',
		debounced: false,
	});
	const subscriptions: Unsubscriber[] = [];
	beforeEach(() => {
		setSize({width: 1000, height: 1000});
		sandbox.on(windowShim, 'addEventListener', (_, cb) => updateCbs.push(cb));
		sandbox.on(windowShim, 'removeEventListener', (_, cb) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		);
		subscriptions.push(
			screenSizeMinWidth.subscribe(() => undefined),
			screenSizeMinWidthUndebounced.subscribe(() => undefined),
			screenSizeMinHeight.subscribe(() => undefined),
			screenSizeMinHeightUndebounced.subscribe(() => undefined),
			screenSizeMaxWidth.subscribe(() => undefined),
			screenSizeMaxWidthUndebounced.subscribe(() => undefined),
			screenSizeMaxHeight.subscribe(() => undefined),
			screenSizeMaxHeightUndebounced.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});

	it('tests the undebounced version of screenSizeMaxWidth', () => {
		setSize({width: 9000, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).name).to.eqls('lg');
		setSize({width: 993, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).name).to.eqls('lg');
		setSize({width: 992, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).name).to.eqls('md');
		setSize({width: 769, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).name).to.eqls('md');
		setSize({width: 768, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).name).to.eqls('sm');
		setSize({width: 0, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).name).to.eqls('sm');
	});
	it('tests the debounced version of screenSizeMaxWidth', async () => {
		setSize({width: 9000, height: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxWidth).name).to.eqls('lg');

		setSize({width: 993, height: 1000});
		expect(get(screenSizeMaxWidth).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxWidth).name).to.eqls('lg');

		setSize({width: 992, height: 1000});
		expect(get(screenSizeMaxWidth).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxWidth).name).to.eqls('md');

		setSize({width: 769, height: 1000});
		expect(get(screenSizeMaxWidth).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxWidth).name).to.eqls('md');

		setSize({width: 768, height: 1000});
		expect(get(screenSizeMaxWidth).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxWidth).name).to.eqls('sm');

		setSize({width: 0, height: 1000});
		expect(get(screenSizeMaxWidth).name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxWidth).name).to.eqls('sm');
	});

	it('tests the undebounced version of screenSizeMaxHeight', () => {
		setSize({height: 9000, width: 1000});
		expect(get(screenSizeMaxHeightUndebounced).name).to.eqls('lg');
		setSize({height: 993, width: 1000});
		expect(get(screenSizeMaxHeightUndebounced).name).to.eqls('lg');
		setSize({height: 992, width: 1000});
		expect(get(screenSizeMaxHeightUndebounced).name).to.eqls('md');
		setSize({height: 769, width: 1000});
		expect(get(screenSizeMaxHeightUndebounced).name).to.eqls('md');
		setSize({height: 768, width: 1000});
		expect(get(screenSizeMaxHeightUndebounced).name).to.eqls('sm');
		setSize({height: 0, width: 1000});
		expect(get(screenSizeMaxHeightUndebounced).name).to.eqls('sm');
	});
	it('tests the debounced version of screenSizeMaxHeight', async () => {
		setSize({height: 9000, width: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxHeight).name).to.eqls('lg');

		setSize({height: 993, width: 1000});
		expect(get(screenSizeMaxHeight).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxHeight).name).to.eqls('lg');

		setSize({height: 992, width: 1000});
		expect(get(screenSizeMaxHeight).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxHeight).name).to.eqls('md');

		setSize({height: 769, width: 1000});
		expect(get(screenSizeMaxHeight).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxHeight).name).to.eqls('md');

		setSize({height: 768, width: 1000});
		expect(get(screenSizeMaxHeight).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxHeight).name).to.eqls('sm');

		setSize({height: 0, width: 1000});
		expect(get(screenSizeMaxHeight).name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMaxHeight).name).to.eqls('sm');
	});

	it('tests the undebounced version of screenSizeMinWidth', () => {
		setSize({width: 9000, height: 1000});
		expect(get(screenSizeMinWidthUndebounced).name).to.eqls('lg');
		setSize({width: 992, height: 1000});
		expect(get(screenSizeMinWidthUndebounced).name).to.eqls('lg');
		setSize({width: 991, height: 1000});
		expect(get(screenSizeMinWidthUndebounced).name).to.eqls('md');
		setSize({width: 768, height: 1000});
		expect(get(screenSizeMinWidthUndebounced).name).to.eqls('md');
		setSize({width: 767, height: 1000});
		expect(get(screenSizeMinWidthUndebounced).name).to.eqls('sm');
		setSize({width: 0, height: 1000});
		expect(get(screenSizeMinWidthUndebounced).name).to.eqls('sm');
	});
	it('tests the debounced version of screenSizeMinWidth', async () => {
		setSize({width: 9000, height: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinWidth).name).to.eqls('lg');

		setSize({width: 992, height: 1000});
		expect(get(screenSizeMinWidth).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinWidth).name).to.eqls('lg');

		setSize({width: 991, height: 1000});
		expect(get(screenSizeMinWidth).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinWidth).name).to.eqls('md');

		setSize({width: 768, height: 1000});
		expect(get(screenSizeMinWidth).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinWidth).name).to.eqls('md');

		setSize({width: 767, height: 1000});
		expect(get(screenSizeMinWidth).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinWidth).name).to.eqls('sm');

		setSize({width: 0, height: 1000});
		expect(get(screenSizeMinWidth).name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinWidth).name).to.eqls('sm');
	});

	it('tests the undebounced version of screenSizeMinHeight', () => {
		setSize({height: 9000, width: 1000});
		expect(get(screenSizeMinHeightUndebounced).name).to.eqls('lg');
		setSize({height: 992, width: 1000});
		expect(get(screenSizeMinHeightUndebounced).name).to.eqls('lg');
		setSize({height: 991, width: 1000});
		expect(get(screenSizeMinHeightUndebounced).name).to.eqls('md');
		setSize({height: 768, width: 1000});
		expect(get(screenSizeMinHeightUndebounced).name).to.eqls('md');
		setSize({height: 767, width: 1000});
		expect(get(screenSizeMinHeightUndebounced).name).to.eqls('sm');
		setSize({height: 0, width: 1000});
		expect(get(screenSizeMinHeightUndebounced).name).to.eqls('sm');
	});
	it('tests the debounced version of screenSizeMinHeight', async () => {
		setSize({height: 9000, width: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinHeight).name).to.eqls('lg');

		setSize({height: 992, width: 1000});
		expect(get(screenSizeMinHeight).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinHeight).name).to.eqls('lg');

		setSize({height: 991, width: 1000});
		expect(get(screenSizeMinHeight).name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinHeight).name).to.eqls('md');

		setSize({height: 768, width: 1000});
		expect(get(screenSizeMinHeight).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinHeight).name).to.eqls('md');

		setSize({height: 767, width: 1000});
		expect(get(screenSizeMinHeight).name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinHeight).name).to.eqls('sm');

		setSize({height: 0, width: 1000});
		expect(get(screenSizeMinHeight).name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 second / 60Hz
		expect(get(screenSizeMinHeight).name).to.eqls('sm');
	});

	it('verifies that indexes are from lower to higher resolution', async () => {
		setSize({width: 0, height: 0});
		expect(get(screenSizeMaxWidthUndebounced).index).to.be.eq(0);
		expect(get(screenSizeMinWidthUndebounced).index).to.be.eq(0);
		expect(get(screenSizeMaxHeightUndebounced).index).to.be.eq(0);
		expect(get(screenSizeMinHeightUndebounced).index).to.be.eq(0);
		setSize({width: 800, height: 800});
		expect(get(screenSizeMaxWidthUndebounced).index).to.be.eq(1);
		expect(get(screenSizeMinWidthUndebounced).index).to.be.eq(1);
		expect(get(screenSizeMaxHeightUndebounced).index).to.be.eq(1);
		expect(get(screenSizeMinHeightUndebounced).index).to.be.eq(1);
		setSize({width: 1000, height: 1000});
		expect(get(screenSizeMaxWidthUndebounced).index).to.be.eq(2);
		expect(get(screenSizeMinWidthUndebounced).index).to.be.eq(2);
		expect(get(screenSizeMaxHeightUndebounced).index).to.be.eq(2);
		expect(get(screenSizeMinHeightUndebounced).index).to.be.eq(2);
	});

	it('checks parameter validation', () => {
		expect(() =>
			makeScreenSizeStore({
				names: ['universal'],
				thresholds: [],
			}),
		).to.not.throw();
		expect(() =>
			makeScreenSizeStore({
				names: ['sm', 'md'],
				thresholds: [],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [1, 2, 3],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [1, 2],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [1],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				thresholds: [],
			}),
		).to.not.throw();
	});
});
