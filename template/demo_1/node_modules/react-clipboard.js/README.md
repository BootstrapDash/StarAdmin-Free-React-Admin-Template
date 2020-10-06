# React-Clipboard

React wrapper for [clipboard.js](http://zenorocha.github.io/clipboard.js/)

[![Build
Status](https://travis-ci.org/nihey/react-clipboard.js.svg)](https://travis-ci.org/nihey/react-clipboard.js)
[![Dependency
Status](https://david-dm.org/nihey/react-clipboard.js.png)](https://david-dm.org/nihey/react-clipboard.js)

# Installation
```
$ npm i --save react-clipboard.js
```

# Usage
You can use `clipboard.js` original `data-*` attributes:
```javascript
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';

class MyView extends Component {
  render() {
    return (
      <Clipboard data-clipboard-text="I'll be copied">
        copy to clipboard
      </Clipboard>
    );
  }
}

ReactDOM.render(<MyView/>, document.getElementById('app'));
```

- If you want to provide any constructor option as in `new Clipboard('#id', options)`,
  you may use `option-*` attributes

- callbacks will be connected via `on*` attributes (such as onSuccess)
```javascript
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';

class MyView extends Component {
  constructor() {
    super();

    this.onSuccess = this.onSuccess.bind(this);
    this.getText = this.getText.bind(this);
  }

  onSuccess() {
    console.info('successfully copied');
  }

  getText() {
    return 'I\'ll be copied';
  }

  render() {
    // Providing option-text as this.getText works the same way as providing:
    //
    // var clipboard = new Clipboard('#anything', {
    //   text: this.getText,
    // });
    //
    // onSuccess works as a 'success' callback:
    //
    // clipboard.on('success', this.onSuccess);
    return (
      <Clipboard option-text={this.getText} onSuccess={this.onSuccess}>
        copy to clipboard
      </Clipboard>
    );
  }
}

ReactDOM.render(<MyView/>, document.getElementById('app'));
```

Custom HTML tags may be used as well (you can use custom components as well):
**Beware: Stateless/Functional components are yet to be added**
```javascript
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';

class MyView extends Component {
  render() {
    // Clipboard is now rendered as an '<a>'
    return (
      <Clipboard component="a" button-href="#" data-clipboard-text="I'll be copied">
        copy to clipboard
      </Clipboard>
    );
  }
}

ReactDOM.render(<MyView/>, document.getElementById('app'));
```

Default html properties may be passed with the `button-*` pattern:
```javascript
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';

class MyView extends Component {
  render() {
    return (
      <Clipboard data-clipboard-text="I'll be copied" button-title="I'm a tooltip">
        copy to clipboard
      </Clipboard>
    );
  }
}

ReactDOM.render(<MyView/>, document.getElementById('react-body'));
```

# License

This code is released under
[CC0](http://creativecommons.org/publicdomain/zero/1.0/) (Public Domain)
