[svelte-window-stores](../README.md) / document

# Module: document

## Table of contents

### Variables

- [documentHeight](document.md#documentheight)
- [documentHeightUndebounced](document.md#documentheightundebounced)
- [documentSize](document.md#documentsize)
- [documentSizeUndebounced](document.md#documentsizeundebounced)
- [documentWidth](document.md#documentwidth)
- [documentWidthUndebounced](document.md#documentwidthundebounced)

## Variables

### documentHeight

• **documentHeight**: `Readable`<`number`\>

A readable store that contains the height of the document (debounced).
The body position is automatically set to "relative" to measure the
scrollHeight of the document.

#### Defined in

[document/_size.ts:92](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/document/_size.ts#L92)

___

### documentHeightUndebounced

• **documentHeightUndebounced**: `Readable`<`number`\>

A readable store that contains the height of the document (undebounced).
The body position is automatically set to "relative" to measure the
scrollHeight of the document.

#### Defined in

[document/_size.ts:99](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/document/_size.ts#L99)

___

### documentSize

• **documentSize**: `Readable`<{ `height`: `number` ; `width`: `number`  }\>

A readable store that contains the size of the document (width and height) (debounced).
The body position is automatically set to "relative" to measure the
scrollHeight of the document.

#### Defined in

[document/_size.ts:65](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/document/_size.ts#L65)

___

### documentSizeUndebounced

• **documentSizeUndebounced**: `Readable`<{ `height`: `number` ; `width`: `number`  }\>

A readable store that contains the size of the document (width and height) (undebounced).
The body position is automatically set to "relative" to measure the
scrollHeight of the document.

#### Defined in

[document/_size.ts:72](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/document/_size.ts#L72)

___

### documentWidth

• **documentWidth**: `Readable`<`number`\>

A readable store that contains the width of the document (debounced).

#### Defined in

[document/_size.ts:77](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/document/_size.ts#L77)

___

### documentWidthUndebounced

• **documentWidthUndebounced**: `Readable`<`number`\>

A readable store that contains the width of the document (undebounced).

#### Defined in

[document/_size.ts:82](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/document/_size.ts#L82)
