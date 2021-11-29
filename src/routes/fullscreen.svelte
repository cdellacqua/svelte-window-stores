<script>
	import {orientation, Orientation} from '$lib/viewport';

	let fullScreenElement;

	let previousOrientation = $orientation;
	/** @type {'exit'|'enter'|null}*/
	let btnAction = null;
	$: handleOrientationChange($orientation);
	function handleOrientationChange(currentOrientation) {
		if (previousOrientation === Orientation.Portrait && currentOrientation === Orientation.Landscape) {
			if (!document.fullscreenElement) {
				btnAction = 'enter';
			}
		} else if (previousOrientation === Orientation.Landscape && currentOrientation === Orientation.Portrait) {
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

	<button type="button" on:click={handleBtnAction} style="display: {btnAction ? 'inline-block' : 'none'};position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)">{btnAction === 'exit' ? 'Exit' : 'Enter'} full screen</button>
</div>
