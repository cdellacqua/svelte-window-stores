[svelte-window-stores](../README.md) / ssr-shim

# Module: ssr-shim

## Table of contents

### Variables

- [documentShim](ssr_shim.md#documentshim)
- [windowShim](ssr_shim.md#windowshim)

## Variables

### documentShim

• **documentShim**: `Document` \| { `addEventListener`: () => `undefined` ; `appendChild`: () => `undefined` ; `createElement`: () => { `contentWindow`: `Window` & typeof `globalThis` \| { `addEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void` ; `innerHeight`: `number` = 1080; `innerWidth`: `number` = 1920; `matchMedia`: () => { `addEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void` ; `matches`: `boolean` = false; `removeEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void`  } ; `removeEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void` ; `scrollX`: `number` = 0; `scrollY`: `number` = 0 } = windowShim; `setAttribute`: () => `undefined` ; `src`: `string` = ''; `style`: `Record`<`string`, `string`\> ; `tabIndex`: `number` = -1 } ; `removeEventListener`: () => `undefined`  }

Shim that provides support for server-side rendering
by emulating the document behavior on specific
properties and methods used in this library.

#### Defined in

[ssr-shim.ts:28](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/ssr-shim.ts#L28)

___

### windowShim

• **windowShim**: `Window` & typeof `globalThis` \| { `addEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void` ; `innerHeight`: `number` = 1080; `innerWidth`: `number` = 1920; `matchMedia`: () => { `addEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void` ; `matches`: `boolean` = false; `removeEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void`  } ; `removeEventListener`: (`eventName`: `string`, `cb`: () => `unknown`) => `void` ; `scrollX`: `number` = 0; `scrollY`: `number` = 0 }

Shim that provides support for server-side rendering
by emulating the window behavior on specific
properties and methods used in this library.

#### Defined in

[ssr-shim.ts:6](https://github.com/cdellacqua/svelte-window-stores/blob/main/src/lib/ssr-shim.ts#L6)
