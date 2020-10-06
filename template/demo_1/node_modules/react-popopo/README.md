# react-popopo

Smart popover component for React. Closes when you click away, no need to reclick the trigger button to close it. 

Uses `styled-components` to make independent styled.

For full docs and demo see https://dapi.github.io/react-popopo/

Originaly based on https://github.com/terebentina/react-popover

## Installation

```bash
npm i react-popopo -S
```

or 

```bash
yarn add react-popopo
```

## Usage

```javascript
import React from 'react';
import Popover from 'react-popopo';

class MyComponent extends React.Component {
 render() {
    return (
      <div>
        If you want to see a nice popover 
        <Popover position="bottom" className="awesome" trigger="click me">
          here I am in all my glory!
        </Popover>
      </div>
    );
```


## Alternatives

* https://github.com/littlebits/react-popover

## License

[The MIT License](./LICENSE)

* Copyright (c) 2019 Danil Pismenny
* Copyright (c) 2016 Dan Caragea
