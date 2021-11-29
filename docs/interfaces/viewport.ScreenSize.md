[svelte-window-stores](../README.md) / [viewport](../modules/viewport.md) / ScreenSize

# Interface: ScreenSize

[viewport](../modules/viewport.md).ScreenSize

A screen size descriptor consists of a name indicating the category (e.g. 'sm', 'md', 'lg', ...),
a threshold indicating its validity and an index with
respect to other registered breakpoints. The lower
the index, the lower the corresponding threshold.

## Table of contents

### Properties

- [index](viewport.ScreenSize.md#index)
- [name](viewport.ScreenSize.md#name)
- [threshold](viewport.ScreenSize.md#threshold)

## Properties

### index

• **index**: `number`

Index of the breakpoint, from 0 (lower threshold) to n. of names - 1

#### Defined in

viewport/_screen.ts:13

___

### name

• **name**: `string`

A name that identifies the screen size (e.g. 'sm', 'md', 'lg', ...)

#### Defined in

viewport/_screen.ts:17

___

### threshold

• **threshold**: `number`

A value in pixel

#### Defined in

viewport/_screen.ts:15
