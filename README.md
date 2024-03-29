# Canvas LMS Only Show Selected Module Plug-in

Plugin for the [Canvas LMS theme app](https://github.com/@artevelde-uas/canvas-lms-app) that
hides other modules when linked directly to module via URL hash.

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-only-show-selected-module-plugin

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-only-show-selected-module-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import { run, addPlugin } from '@artevelde-uas/canvas-lms-app';
import onlyShowSelectedModulePlugin from '@artevelde-uas/canvas-lms-only-show-selected-module-plugin';

addPlugin(onlyShowSelectedModulePlugin);

run();
```

## Translations

The plug-in is currently translated in the following languages: English, Dutch, French, German, Spanish, Italian,
Chinese and Japanese. (Some of these are done with a translation tool so they may not be accurate.)
