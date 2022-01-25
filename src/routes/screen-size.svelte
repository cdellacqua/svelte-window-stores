<script>
	/* eslint "import/extensions": off */
	import { makeScreenSizeStore } from "$lib/viewport";

	export const screenSize = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
	});
</script>
Your screen is categorized as {$screenSize.name}
