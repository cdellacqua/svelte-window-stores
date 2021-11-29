[svelte-window-stores](../README.md) / [viewport](../modules/viewport.md) / MakeScreenSizeStoreParams

# Interface: MakeScreenSizeStoreParams

[viewport](../modules/viewport.md).MakeScreenSizeStoreParams

## Table of contents

### Properties

- [debounced](viewport.MakeScreenSizeStoreParams.md#debounced)
- [dimension](viewport.MakeScreenSizeStoreParams.md#dimension)
- [names](viewport.MakeScreenSizeStoreParams.md#names)
- [strategy](viewport.MakeScreenSizeStoreParams.md#strategy)
- [thresholds](viewport.MakeScreenSizeStoreParams.md#thresholds)

## Properties

### debounced

• `Optional` **debounced**: `boolean`

(optional, default true) Determines if the store should be updated using requestAnimationFrame as a debouncing function or instantly react to the resize event

#### Defined in

viewport/_screen.ts:30

___

### dimension

• `Optional` **dimension**: ``"width"`` \| ``"height"``

(optional, default 'width') Determines which dimension should be compared to the thresholds, the width or the height of the viewport

#### Defined in

viewport/_screen.ts:26

___

### names

• `Optional` **names**: `string`[]

(optional) A list of names identifying the possible screen sizes and that will be associated to the thresholds

#### Defined in

viewport/_screen.ts:22

___

### strategy

• `Optional` **strategy**: ``"max"`` \| ``"min"``

(optional, default 'min') Determines if the thresholds describe the starting or the ending point of the screen size

#### Defined in

viewport/_screen.ts:28

___

### thresholds

• **thresholds**: `number`[]

A list of thresholds that will be used to determine the current screen size

#### Defined in

viewport/_screen.ts:24
