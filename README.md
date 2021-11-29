# svelte-window-stores

A collection of stores that monitor the size, orientation, color scheme and scroll position of the browser window.

_Compatible with Server-Side Rendering._

[NPM Package](https://www.npmjs.com/package/svelte-window-stores)

`npm install svelte-window-stores`

[Documentation](https://github.com/cdellacqua/svelte-window-stores/blob/main/docs/README.md)

## Highlights

- Check the user's preferred color scheme:

```svelte
<script>
	import {ColorScheme, prefersColorScheme} from 'svelte-window-stores/appearance';
</script>

You prefer {$prefersColorScheme === ColorScheme.Dark ? 'dark' : 'light'} mode!
```

- Use responsive media query in your code:

```svelte
<script>
	import {makeScreenSizeStore} from 'svelte-window-stores/viewport';

	export const screenSize = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
	});
</script>

Your screen is categorized as {$screenSize.name}
```

- Show a "go to the top" button when the user scrolls down the page:

```svelte
<script>
	import {scrollY} from 'svelte-window-stores/viewport';
</script>

<button
	type="button"
	style="position: fixed; bottom: 0; right: 0; display: {$scrollY > 10 ? 'inline-block' : 'none'}"
	>Go to the top</button
>
```

- Automatically go full screen when the user rotates their device:

```svelte
<script>
	import {orientation, Orientation} from '$lib/viewport';

	let fullScreenElement;

	let previousOrientation = $orientation;
	/** @type {'exit'|'enter'|null}*/
	let btnAction = null;
	$: handleOrientationChange($orientation);
	function handleOrientationChange(currentOrientation) {
		if (
			previousOrientation === Orientation.Portrait &&
			currentOrientation === Orientation.Landscape
		) {
			if (!document.fullscreenElement) {
				btnAction = 'enter';
			}
		} else if (
			previousOrientation === Orientation.Landscape &&
			currentOrientation === Orientation.Portrait
		) {
			if (document.fullscreenElement) {
				btnAction = 'exit';
			}
		}
		previousOrientation = currentOrientation;
	}
	function handleBtnAction() {
		if (btnAction === 'enter') {
			fullScreenElement?.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
		btnAction = null;
	}
</script>

<div bind:this={fullScreenElement} style="position: relative; background: white; color: black;">
	Some content here and there

	<button
		type="button"
		on:click={handleBtnAction}
		style="display: {btnAction
			? 'inline-block'
			: 'none'};position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)"
		>{btnAction === 'exit' ? 'Exit' : 'Enter'} full screen</button
	>
</div>
```

### A possible use case for $viewportSize

```svelte
<script>
	import {viewportSize} from 'svelte-window-stores/viewport';
</script>

<div style="background-color: blue; color: white; width: 100%; height: {$viewportSize.height}px">
	This DIV height takes into account collapsible navigation menus and/or the search bar on a mobile
	browser.
</div>
<div style="background: linear-gradient(orange, black); width: 100%; height: 1000vh">Filler</div>
```
