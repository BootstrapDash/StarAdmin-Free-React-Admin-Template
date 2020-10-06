[![Build Status](https://travis-ci.org/mmarkelov/react-nouislider.svg?branch=master)](https://travis-ci.org/mmarkelov/react-nouislider)
[![Coverage Status](https://coveralls.io/repos/github/mmarkelov/react-nouislider/badge.svg)](https://coveralls.io/github/mmarkelov/react-nouislider)

**This project is created as react-nouislider package is not well maintained.
Also you can have a look at other natives react sliders: https://www.google.com/search?q=react+slider**

# nouislider-react

Wraps [leongersen/noUiSlider](https://github.com/leongersen/noUiSlider) in a [react component](https://facebook.github.io/react/docs/component-api.html).

## Documentation

All the options used in nouislider-react are then passed to noUiSlider. See the [noUiSlider documentation](http://refreshless.com/nouislider/) before opening issues.

### Also there are extra options to implement new features:

**clickablePips** use to move the slider by clicking pips

## Usage

```sh
npm install nouislider-react
```

or

```sh
yarn add nouislider-react
```

```js
import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Slider = () => (
  <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
);
```

## Examples

### Colorpicker:

```js
import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import "./colorpicker.css";

const COLORS = ["red", "green", "blue"];

class Colorpicker extends React.Component {
  state = {
    color: "rgb(127, 127, 127)"
  };

  onUpdate = index => (render, handle, value, un, percent) => {
    colors[index] = value[0];
    this.setState({ color: `rgb(${colors.join(",")})` });
  };

  render() {
    const { color } = this.state;
    return (
      <div className="slider" id="colorpicker">
        {COLORS.map((item, index) => (
          <Nouislider
            key={item}
            id={item}
            start={127}
            connect={[true, false]}
            orientation="vertical"
            range={{
              min: 0,
              max: 255
            }}
            onUpdate={this.onUpdate(index)}
          />
        ))}
        <div id="result" style={{ background: color, color }} />
      </div>
    );
  }
}
```

### Non linear slider:

```js
import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class Slider extends React.Component {
  state = {
    textValue: null,
    percent: null
  };

  onSlide = (render, handle, value, un, percent) => {
    this.setState({
      textValue: value[0].toFixed(2),
      percent: percent[0].toFixed(2)
    });
  };

  render() {
    const { textValue, percent } = this.state;
    return (
      <div>
        <Nouislider
          connect
          start={[500, 4000]}
          behaviour="tap"
          range={{
            min: [0],
            "10%": [500, 500],
            "50%": [4000, 1000],
            max: [10000]
          }}
          onSlide={this.onSlide}
        />
        {textValue && percent && (
          <div>
            Value: {textValue}, {percent} %
          </div>
        )}
      </div>
    );
  }
}
```

### Adding keyboard support:

```js
import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const KeyboardSlider = () => (
  <Nouislider
    accessibility
    start={10}
    step={10}
    range={{
      min: 0,
      max: 100
    }}
  />
);
```

### Using with ref:

```js
class KeyboardSlider extends React.Component {
  state = { ref: null };

  changeByRef = () => {
    const { ref } = this.state;
    if (ref && ref.noUiSlider) {
      ref.noUiSlider.set(20);
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.changeByRef}>Change with ref</button>
        <Nouislider
          instanceRef={instance => {
            if (instance && !ref) {
              this.setState({ ref: instance });
            }
          }}
          start={0}
          range={{
            min: 0,
            max: 100
          }}
        />
      </div>
    );
  }
}
```

### Moving the slider by clicking pips:

```js
import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const KeyboardSlider = () => (
  <Nouislider
    start={[50]}
    pips={{ mode: "count", values: 5 }}
    clickablePips
    range={{
      min: 0,
      max: 100
    }}
  />
);
```

### Change start:

```js
import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class KeyboardSlider extends React.Component {
  state = { value: 0 };

  handleClick = () => {
    this.setState(prevState => ({ value: prevState + 10 }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Change state</button>
        <Nouislider
          start={this.state.value}
          range={{
            min: 0,
            max: 100
          }}
        />
      </div>
    );
  }
}
```

## Examples

1. Fork this repository and clone your version of the repo
2. Install dependencies

```sh
npm install
```

3. Install example dependencies

```sh
cd example && npm install
```

4. Start example server locally

```sh
npm run dev
```

## TODO

- [ ] Find solution for auto release process
- [ ] Replace custom example process with **docz**
- [ ] Rewrite Typescript declaration

You now have examples running on
`http://localhost:3004`

Also you can check them [here](https://mmarkelov.github.io/react-nouislider/)
