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

viewport/_size.ts:52

___

### innerHeightUndebounced

• **innerHeightUndebounced**: `Readable`<`number`\>

A readable store that contains the innerHeight of the window (undebounced).

#### Defined in

viewport/_size.ts:57

___

### innerWidth

• **innerWidth**: `Readable`<`number`\>

A readable store that contains the innerWidth of the window (debounced).

#### Defined in

viewport/_size.ts:39

___

### innerWidthUndebounced

• **innerWidthUndebounced**: `Readable`<`number`\>

A readable store that contains the innerWidth of the window (undebounced).

#### Defined in

viewport/_size.ts:44

___

### orientation

• **orientation**: `Readable`<[`Orientation`](../enums/viewport.Orientation.md)\>

A readable store that indicates whether the viewport is in landscape or portrait mode (debounced).

#### Defined in

viewport/_orientation.ts:51

___

### orientationUndebounced

• **orientationUndebounced**: `Readable`<[`Orientation`](../enums/viewport.Orientation.md)\>

A readable store that indicates whether the viewport is in landscape or portrait mode (undebounced).

#### Defined in

viewport/_orientation.ts:56

___

### scrollX

• **scrollX**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the X axis (debounced).

#### Defined in

viewport/_scroll.ts:39

___

### scrollXUndebounced

• **scrollXUndebounced**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the X axis (undebounced).

#### Defined in

viewport/_scroll.ts:44

___

### scrollY

• **scrollY**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the Y axis (debounced).

#### Defined in

viewport/_scroll.ts:52

___

### scrollYUndebounced

• **scrollYUndebounced**: `Readable`<`number`\>

A readable store that contains the current scrolling position on the Y axis (undebounced).

#### Defined in

viewport/_scroll.ts:57

___

### viewportSize

• **viewportSize**: `Readable`<{ `height`: `number` ; `width`: `number`  }\>

A readable store that contains the size of the viewport (innerWidth and innerHeight of the window) (debounced).

#### Defined in

viewport/_size.ts:29

___

### viewportSizeUndebounced

• **viewportSizeUndebounced**: `Readable`<{ `height`: `number` ; `width`: `number`  }\>

A readable store that contains the size of the viewport (innerWidth and innerHeight of the window) (undebounced).

#### Defined in

viewport/_size.ts:34

___

### windowScroll

• **windowScroll**: `Readable`<{ `x`: `number` ; `y`: `number`  }\>

A readable store that contains the current scrolling position (x and y) (debounced).

#### Defined in

viewport/_scroll.ts:29

___

### windowScrollUndebounced

• **windowScrollUndebounced**: `Readable`<{ `x`: `number` ; `y`: `number`  }\>

A readable store that contains the current scrolling position (x and y) (undebounced).

#### Defined in

viewport/_scroll.ts:34

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

viewport/_screen.ts:42
