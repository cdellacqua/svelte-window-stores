[svelte-window-stores](../README.md) / viewport

# Module: viewport

## Table of contents

### Enumerations

- [Orientation](../enums/viewport.Orientation.md)

### Interfaces

- [MakeScreenSizeStoreParams](../interfaces/viewport.MakeScreenSizeStoreParams.md)
- [ScreenSize](../interfaces/viewport.ScreenSize.md)

### Variables

- [innerHeight](viewport.md#innerheight)
- [innerHeightUndebounced](viewport.md#innerheightundebounced)
- [innerWidth](viewport.md#innerwidth)
- [innerWidthUndebounced](viewport.md#innerwidthundebounced)
- [orientation](viewport.md#orientation)
- [orientationUndebounced](viewport.md#orientationundebounced)
- [scrollX](viewport.md#scrollx)
- [scrollXUndebounced](viewport.md#scrollxundebounced)
- [scrollY](viewport.md#scrolly)
- [scrollYUndebounced](viewport.md#scrollyundebounced)
- [viewportSize](viewport.md#viewportsize)
- [viewportSizeUndebounced](viewport.md#viewportsizeundebounced)
- [windowScroll](viewport.md#windowscroll)
- [windowScrollUndebounced](viewport.md#windowscrollundebounced)

### Functions

- [makeScreenSizeStore](viewport.md#makescreensizestore)

## Variables

### innerHeight

• **innerHeight**: `Readable`<`number`\>

A readable store that contains the innerHeight of the window (debounced).

#### Defined in

[viewport/_size.ts:52](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_size.ts#L52)

___

### innerHeightUndebounced

• **innerHeightUndebounced**: `Readable`<`number`\>

A readable store that contains the innerHeight of the window (undebounced).

#### Defined in

[viewport/_size.ts:57](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_size.ts#L57)

___

### innerWidth

• **innerWidth**: `Readable`<`number`\>

A readable store that contains the innerWidth of the window (debounced).

#### Defined in

[viewport/_size.ts:39](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_size.ts#L39)

___

### innerWidthUndebounced

• **innerWidthUndebounced**: `Readable`<`number`\>

A readable store that contains the innerWidth of the window (undebounced).

#### Defined in

[viewport/_size.ts:44](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_size.ts#L44)

___

### orientation

• **orientation**: `Readable`<[`Orientation`](../enums/viewport.Orientation.md)\>

A readable store that indicates whether the viewport is in landscape or portrait mode (debounced).

#### Defined in

[viewport/_orientation.ts:51](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_orientation.ts#L51)

___

### orientationUndebounced

• **orientationUndebounced**: `Readable`<[`Orientation`](../enums/viewport.Orientation.md)\>

A readable store that indicates whether the viewport is in landscape or portrait mode (undebounced).

#### Defined in

[viewport/_orientation.ts:56](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_orientation.ts#L56)

___

### scrollX

• **scrollX**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the X axis (debounced).

#### Defined in

[viewport/_scroll.ts:39](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_scroll.ts#L39)

___

### scrollXUndebounced

• **scrollXUndebounced**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the X axis (undebounced).

#### Defined in

[viewport/_scroll.ts:44](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_scroll.ts#L44)

___

### scrollY

• **scrollY**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the Y axis (debounced).

#### Defined in

[viewport/_scroll.ts:52](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_scroll.ts#L52)

___

### scrollYUndebounced

• **scrollYUndebounced**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the Y axis (undebounced).

#### Defined in

[viewport/_scroll.ts:57](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_scroll.ts#L57)

___

### viewportSize

• **viewportSize**: `Readable`<{ `height`: `number` ; `width`: `number`  }\>

A readable store that contains the size of the viewport (innerWidth and innerHeight of the window) (debounced).

#### Defined in

[viewport/_size.ts:29](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_size.ts#L29)

___

### viewportSizeUndebounced

• **viewportSizeUndebounced**: `Readable`<{ `height`: `number` ; `width`: `number`  }\>

A readable store that contains the size of the viewport (innerWidth and innerHeight of the window) (undebounced).

#### Defined in

[viewport/_size.ts:34](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_size.ts#L34)

___

### windowScroll

• **windowScroll**: `Readable`<{ `x`: `number` ; `y`: `number`  }\>

A readable store that contains the current scrolling position (x and y) (debounced).

#### Defined in

[viewport/_scroll.ts:29](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_scroll.ts#L29)

___

### windowScrollUndebounced

• **windowScrollUndebounced**: `Readable`<{ `x`: `number` ; `y`: `number`  }\>

A readable store that contains the current scrolling position (x and y) (undebounced).

#### Defined in

[viewport/_scroll.ts:34](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_scroll.ts#L34)

## Functions

### makeScreenSizeStore

▸ **makeScreenSizeStore**(`__namedParameters`): `Readable`<[`ScreenSize`](../interfaces/viewport.ScreenSize.md)\>

Creates a store that indicates the screen size based on the width or height of the viewport

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MakeScreenSizeStoreParams`](../interfaces/viewport.MakeScreenSizeStoreParams.md) |

#### Returns

`Readable`<[`ScreenSize`](../interfaces/viewport.ScreenSize.md)\>

a readable store

#### Defined in

[viewport/_screen.ts:42](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/viewport/_screen.ts#L42)
