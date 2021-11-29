<script>
	import {viewportSize} from '$lib/viewport';
</script>

<div style="background-color: blue; color: white; width: 100%; height: {$viewportSize.height}px">
	This DIV height takes into account collapsible navigation menus and/or the search bar on a mobile
	browser.
</div>
<div style="background: linear-gradient(orange, black); width: 100%; height: 1000vh">Filler</div>
