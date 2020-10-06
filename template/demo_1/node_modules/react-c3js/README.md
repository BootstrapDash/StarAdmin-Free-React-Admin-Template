# react-c3js

[![NPM version][npm-image]][npm-url]

React component for [C3.js](http://c3js.org/). ([Demo])

![screenshot](screenshot.png)

```javascript
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ]
};

const mountNode = document.getElementById('react-c3js');

ReactDOM.render(<C3Chart data={data} />, mountNode);
```

You can see the `docs` for more details.

[Demo]: http://bcbcarl.github.io/react-c3js/

## Installation

```
$ npm install --save react-c3js
```

## Contributing

### Yarn / NPM

1. Modify `src/index.js`.
2. Build the lib by using `npm run build` or `make build`.
3. Import C3Chart from react-c3js.
4. See the result.

### Docker

```bash
docker build -t react-c3js .
docker run --rm -p 9966:9966 --name react-c3js react-c3js
docker stop react-c3js
```

## Properties

Check out [C3.js Reference](http://c3js.org/reference.html) for more details.

* data
* title
* size
* padding
* color
* interaction
* transition
* oninit
* onrendered
* onmouseover
* onmouseout
* onresize
* onresized
* axis
* grid
* regions
* legend
* tooltip
* subchart
* zoom
* point
* line
* area
* bar
* pie
* donut
* gauge
* className
* style
* unloadBeforeLoad

## License

MIT

[npm-image]: https://img.shields.io/npm/v/react-c3js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-c3js
