# sweetalert2-react

[![npm version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

> Declarative SweetAlert in React

## Introduction

This is a React SweetAlert wrapper for https://github.com/limonte/sweetalert2

## Install

```
$ npm install sweetalert2-react
```

## Usage

```js
import React, { Component } from 'react';
import SweetAlert from 'sweetalert2-react';

// ...

render() {
  return (
    <div>
      <button onClick={() => this.setState({ show: true })}>Alert</button>
      <SweetAlert
        show={this.state.show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => this.setState({ show: false })}
      />
    </div>
  );
}
```

Since 0.6, you can wrap your own sweetalert2 (swal) instance:

```js
import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

// ...

render() {
  return (
    <div>
      <button onClick={() => this.setState({ show: true })}>Alert</button>
      <SweetAlert
        show={this.state.show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => this.setState({ show: false })}
      />
    </div>
  );
}
```

## Tests

Tests were not updated to support sweetalert2. PRs are welcome.

## License

MIT © [C.T. Lin](https://github.com/alex-shamshurin/sweetalert2-react)


[npm-url]: https://npmjs.org/package/sweetalert2-react
[travis-image]: https://img.shields.io/travis/alex-shamshurin/sweetalert2-react.svg?style=flat-square
[travis-url]: https://travis-ci.org/alex-shamshurin/sweetalert2-react
[coveralls-image]: https://img.shields.io/coveralls/alex-shamshurin/sweetalert2-react.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/alex-shamshurin/sweetalert2-react
[npm-image]: https://img.shields.io/npm/v/sweetalert2-react.svg?style=flat-square
[downloads-image]: http://img.shields.io/npm/dm/sweetalert2-react.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/sweetalert2-react

