# Canvas LMS Only Show Selected Module Plug-in

Plugin for the [Canvas LMS theme app](https://github.com/ahsdile/canvas-lms-app) that hides other modules when linked directly to module via URL hash.

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-only-show-selected-module-plugin

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-only-show-selected-module-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import onlyShowSelectedModulePlugin from '@artevelde-uas/canvas-lms-only-show-selected-module-plugin';

canvas.addPlugin(onlyShowSelectedModulePlugin);

canvas.run();
```
