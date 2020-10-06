# React DnD Multi Backend [![NPM Version][npm-image]][npm-url] [![dependencies Status][deps-image]][deps-url] [![devDependencies Status][deps-dev-image]][deps-dev-url]

[Try it here!](https://louisbrunner.github.io/dnd-multi-backend/examples/react-dnd-multi-backend.html)

This project is a Drag'n'Drop backend compatible with [React DnD](https://github.com/gaearon/react-dnd).
It enables your application to use different DnD backends depending on the situation.
You can either generate your own backend pipeline or use the default one (`HTML5toTouch`).

[HTML5toTouch](src/HTML5toTouch.js) starts by using the [React DnD HTML5 Backend](https://github.com/gaearon/react-dnd-html5-backend), but switches to the [React DnD Touch Backend](https://github.com/yahoo/react-dnd-touch-backend) if a touch event is triggered.
You application can smoothly use the nice HTML5 compatible backend and fallback on the Touch one on mobile devices!

Moreover, because some backends don't support preview, a `Preview` component has been added to make it easier to mock the Drag'n'Drop "ghost".

See the [migration section](#migrating) for instructions when switching from `react-dnd-multi-backend@2.x.x` or `react-dnd-multi-backend@3.1.2`.


## Installation

### Node Installation

```sh
npm install react-dnd-multi-backend
```

You can then `MultiBackend = require('react-dnd-multi-backend')` or `import MultiBackend from 'react-dnd-multi-backend'`.
To get the `HTML5toTouch` pipeline, just require/import `react-dnd-multi-backend/lib/HTML5toTouch`.

### Browser Installation

Use the minified UMD build in the `dist` folder: [here](dist/ReactDnDMultiBackend.min.js).
It exports a global `window.ReactDnDMultiBackend` when imported as a `<script>` tag.

If you want to use the `HTML5toTouch` pipeline, also include [RDMBHTML5toTouch.min.js](dist/RDMBHTML5toTouch.min.js).
It exports a global `window.RDMBHTML5toTouch` when imported as a `<script>` tag.
This file also includes the `HTML5` and `Touch` backends, so no need to include them as well.


## Usage

Every code snippet will be presented in 3 different styles: Node.js `require`, Node.js `import` and Browser Javascript (with required HTML `<script>`s).

### Backend

You can plug this backend in the `DragDropContext` the same way you do for any backend (e.g. `ReactDnDHTML5Backend`), you can see [the docs](http://gaearon.github.io/react-dnd/docs-html5-backend.html) for more information.

You must pass a 'pipeline' to use as argument. This package includes `HTML5toTouch`, but you can write your own.
Note that if you include this file, you will have to add `react-dnd-html5-backend` and `react-dnd-touch-backend` to your `package.json` `dependencies`.

 - *require*:
```js
  var ReactDnD = require('react-dnd');
  var MultiBackend = require('react-dnd-multi-backend').default;
  var HTML5toTouch = require('react-dnd-multi-backend/lib/HTML5toTouch').default; // or any other pipeline
  ...
  module.exports = ReactDnD.DragDropContext(MultiBackend(HTML5toTouch))(App);
```

 - *import*:
```js
  import { DragDropContext } from 'react-dnd';
  import MultiBackend from 'react-dnd-multi-backend';
  import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; // or any other pipeline
  ...
  export default DragDropContext(MultiBackend(HTML5toTouch))(App);
```

 - *browser*:
```js
  <script src="ReactDnDMultiBackend.min.js"></script>
  <script src="RDMBHTML5toTouch.min.js"></script> <!-- or any other pipeline -->
  ...
  var AppDnD = ReactDnD.DragDropContext(ReactDnDMultiBackend.default(RDMBHTML5toTouch.default))(App); // `.default` is only used to get the ES6 module default export
```

### Create a custom pipeline

Creating a pipeline is fairly easy. A pipeline is composed of a list of backends, the first one will be the default one, loaded at the start of the **MultiBackend**, the order of the rest isn't important.

Each backend entry must specify one property: `backend`, containing the class of the Backend to instantiate.
But other options are available:
- `preview` (a boolean indicating if `Preview` components should be shown)
- `transition` (an object returned by the `createTransition` function)
- `skipDispatchOnTransition` (a boolean indicating transition events should not be dispatched to new backend, defaults to `false`. See [note below](#note-on-skipdispatchontransition) for details and use cases.)

Here is the `HTML5toTouch` pipeline code as an example:
```js
...
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
...
const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({enableMouseEvents: true}), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};
...
export default DragDropContext(MultiBackend(HTML5toTouch))(App);
```

`TouchTransition` is a predefined transition that you can use in your own pipelines, it is triggered when a *touchstart* is received. Transitions rea really easy to write, here is an example:

```js
import { createTransition } from 'react-dnd-multi-backend';

const TouchTransition = createTransition('touchstart', (event) => {
  return event.touches != null;
});
```

You can also import `HTML5DragTransition` which works the same way, but detects when a HTML5 DragEvent is received.

#### Note on `skipDispatchOnTransition`

By default, when an event triggers a transition, `dnd-multi-backend` dispatches a cloned version of the event after setting up the new backend. This allows the newly activated backend to handle the original event.

If your app code or another library has registered event listeners for the same events that are being used for transitions, this duplicate event may cause problems.

You can optionally disable this behavior per backend:

```js
const CustomHTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition
      // by default, will dispatch a duplicate `mousedown` event when this backend is activated
    },
    {
      backend: TouchBackend({enableMouseEvents: true}), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition,
      // will not dispatch a duplicate `touchstart` event when this backend is activated
      skipDispatchOnTransition: true
    }
  ]
};
```

**WARNING:** if you enable `skipDispatchOnTransition`, the backend transition will happen as expected, but the new backend may not handle the first event!

In this example, the first `touchstart` event would trigger the `TouchBackend` to replace the `HTML5Backend`—but the user would have to start a new touch event for the `TouchBackend` to register a drag.


### Preview

Concerning the `Preview` class, it is created using the following snippet:

 - *require*:
```js
  var MultiBackend = require('react-dnd-multi-backend').default;
  ...
  <MultiBackend.Preview generator={this.generatePreview} />
```

 - *import*:
```js
  import MultiBackend, { Preview } from 'react-dnd-multi-backend';
  ...
  <Preview generator={this.generatePreview} />
```

 - *browser*:
```js
  <script src="ReactDnDMultiBackend.min.js"></script>
  ...
  <ReactDnDMultiBackend.Preview generator={this.generatePreview} />
```

You must pass a function as the `generator` prop which takes 3 arguments:

 - `type`: the type of the item (`monitor.getItemType()`)
 - `item`: the item (`monitor.getItem()`)
 - `style`: an object representing the style (used for positioning), it should be passed to the `style` property of your preview component

Note that this component will only be showed while using a backend flagged with `preview: true` (see [Create a custom pipeline](#create-a-custom-pipeline)) which is the case for the Touch backend in the default `HTML5toTouch` pipeline.


### Examples

You can see an example [here](examples/) (Node.js style with `import`s).


## Migrating

### Migrating from 2.x.x

In 2.x.x, the pipeline was static but corresponded with the behavior of `HTML5toTouch`, so just [including and passing this pipeline as a parameter](#backend) would give you the same experience as before.

If you used the `start` option, it's a bit different.
With `start: 0` or `start: Backend.HTML5`, **MultiBackend** simply used the default pipeline, so you can also just pass `HTML5toTouch`.
With `start: 1` or `start: Backend.TOUCH`, **MultiBackend** would only use the TouchBackend, so you can replace **MultiBackend** with **TouchBackend** (however, you would lose the `Preview` component) or create a simple pipeline (see [Create a custom pipeline](#create-a-custom-pipeline)) and pass it as a parameter:
```js
var TouchOnly = { backends: [{ backend: TouchBackend, preview: true }] };
```

### Migrating from 3.1.2

Starting with `3.1.8`, the dependencies of `react-dnd-multi-backend` changed. `react`, `react-dom`, `react-dnd` become peer dependencies and you need to install them manually as `dependencies` in your project `package.json`.

Note that if you use the `HTML5toTouch` pipeline, the same is true for `react-dnd-html5-backend` and `react-dnd-touch-backend`.


## License

MIT, Copyright (c) 2016-2018 Louis Brunner



[npm-image]: https://img.shields.io/npm/v/react-dnd-multi-backend.svg
[npm-url]: https://npmjs.org/package/react-dnd-multi-backend
[deps-image]: https://david-dm.org/louisbrunner/react-dnd-multi-backend/status.svg
[deps-url]: https://david-dm.org/louisbrunner/react-dnd-multi-backend
[deps-dev-image]: https://david-dm.org/louisbrunner/react-dnd-multi-backend/dev-status.svg
[deps-dev-url]: https://david-dm.org/louisbrunner/react-dnd-multi-backend?type=dev
