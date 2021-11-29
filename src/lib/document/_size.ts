import {derived, readable} from 'svelte/store';
import {debounce} from '@cdellacqua/debounce';
import {documentShim} from '../ssr-shim';

let referenceWindow:
	| {
			innerWidth: number;
			innerHeight: number;
			addEventListener: (eventName: string, cb: () => unknown) => void;
			removeEventListener: (eventName: string, cb: () => unknown) => void;
	  }
	| undefined;
function getReferenceWindow() {
	if (!referenceWindow) {
		const iframe = documentShim.createElement('iframe') as HTMLIFrameElement;
		iframe.style.display = 'block';
		iframe.style.position = 'absolute';
		iframe.style.top = '0px';
		iframe.style.left = '0px';
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.overflow = 'hidden';
		iframe.style.border = '0px';
		iframe.style.opacity = '0';
		iframe.style.pointerEvents = 'none';
		iframe.style.zIndex = '-1';
		iframe.src = 'about:blank';
		iframe.tabIndex = -1;
		iframe.setAttribute('aria-hidden', 'true');
		if (typeof document !== 'undefined') {
			document.body.appendChild(iframe as HTMLIFrameElement);
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		referenceWindow = iframe.contentWindow!;
	}

	return referenceWindow;
}

function makeSizeStore(debounced: boolean) {
	let previous: {width: number; height: number} | undefined;

	return readable<{width: number; height: number}>(undefined, (set) => {
		const update = () => {
			const currentWidth = getReferenceWindow().innerWidth;
			const currentHeight = getReferenceWindow().innerHeight;
			if (currentWidth !== previous?.width || currentHeight !== previous?.height) {
				previous = {width: currentWidth, height: currentHeight};
				set(previous);
			}
		};
		update();
		const resizeHandler = debounced ? debounce(update) : update;
		getReferenceWindow().addEventListener('resize', resizeHandler);
		return () => {
			getReferenceWindow().removeEventListener('resize', resizeHandler);
		};
	});
}

/**
 * A readable store that contains the size of the document (width and height) (debounced).
 */
export const documentSize = makeSizeStore(true);

/**
 * A readable store that contains the size of the document (width and height) (undebounced).
 */
export const documentSizeUndebounced = makeSizeStore(false);

/**
 * A readable store that contains the width of the document (debounced).
 */
export const documentWidth = derived(documentSize, ($documentSize) => $documentSize.width);

/**
 * A readable store that contains the width of the document (undebounced).
 */
export const documentWidthUndebounced = derived(
	documentSizeUndebounced,
	($documentSize) => $documentSize.width,
);

/**
 * A readable store that contains the height of the document (debounced).
 */
export const documentHeight = derived(documentSize, ($documentSize) => $documentSize.height);

/**
 * A readable store that contains the height of the document (undebounced).
 */
export const documentHeightUndebounced = derived(
	documentSizeUndebounced,
	($documentSize) => $documentSize.height,
);
