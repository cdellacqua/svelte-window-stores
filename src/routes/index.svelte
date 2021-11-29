<script lang="ts">
	import {documentSize} from '$lib/document';
	import {ColorScheme, prefersColorScheme} from '$lib/appearance';
	import {
		viewportSize,
		innerHeight,
		innerWidth,
		orientation,
		scrollX,
		scrollY,
		windowScroll,
		Orientation,
	} from '$lib/viewport';

	import {screenSize, screenSizeAlt, ScreenSize} from '../screen-size';

	$: smallScreenSize = $screenSize.index < ScreenSize.md;
	$: largeScreenSize = $screenSizeAlt.index >= ScreenSize.lg;
</script>

<div style="width: 200vw; height: 200vh">

<div
	style="position: fixed; top: 0; left: 0; padding: 10px; display: inline-block"
>
	<p>
		Your screen is {smallScreenSize ? '' : 'not'} small
	</p>
	<p>
		Your screen is {largeScreenSize ? '' : 'not'} large
	</p>
	<pre>
// Store values:

$prefersColorScheme: '{$prefersColorScheme === ColorScheme.Dark ? 'dark':'light'}'

$documentSize: {'{'} width: {$documentSize.width}, height: {$documentSize.height} {'}'}

$screenSize: {'{'} width: {$screenSize.threshold}, name: '{$screenSize.name}', index: {$screenSize.index} {'}'}

$screenSizeAlt: {'{'} width: {$screenSizeAlt.threshold}, name: '{$screenSizeAlt.name}', index: {$screenSizeAlt.index} {'}'}

$viewportSize: {'{'} width: {$viewportSize.width}, height: {$viewportSize.height} {'}'}

$innerHeight: {$innerHeight}
$innerWidth: {$innerWidth}

$orientation: '{$orientation === Orientation.Landscape ? 'landscape' : 'portrait'}'

$windowScroll: {'{'} x: {$windowScroll.x}, y: {$windowScroll.y} {'}'}

$scrollX: {$scrollX}
$scrollY: {$scrollY}

// $documentSize.width {'<='} $windowSize.width
// and
// $documentSize.height {'<='} $windowSize.height
// because the former takes into account the
// potential presence of scrollbars that
// decrease the actual rendering space
</pre>
</div>
</div>
