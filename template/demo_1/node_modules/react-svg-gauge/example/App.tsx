import React, { Component } from 'react';
import Gauge from '../src/Gauge';

function getHexColor(value: number) {
  let string = value.toString(16);
  return (string.length === 1) ? '0' + string : string;
}

interface AppProps {

}

interface AppState {
  value: number;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      value: 50,
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: parseInt(e.currentTarget.value, 10) });
  };

  render() {
    let r = Math.floor(this.state.value * 2.55);
    let g = Math.floor(255 - (this.state.value * 2.55));
    let b = 0;
    let colorHex = '#' + getHexColor(r) + getHexColor(g) + getHexColor(b);

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>React-Svg-Gauge</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <nav className="navbar navbar-default">
              <div className="container">
                <ul className="nav nav-pills navbar-nav">
                  <li role="presentation" className=""><a
                    href="https://github.com/reggino/react-svg-gauge/blob/master/example/App.js">Example Source</a></li>
                  <li role="presentation" className=""><a href="https://github.com/reggino/react-svg-gauge">Documentation
                    on Github</a></li>
                  <li role="presentation" className=""><a href="https://www.npmjs.com/package/react-svg-gauge">NPM
                    Package</a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Gauge value={this.state.value} width={400} height={320} color={colorHex} label="This is a big one" valueFormatter={value => `${value}%`} />
          </div>
          <div className="col-sm-6">
            <div>
              <Gauge value={this.state.value} width={200} height={160} label="This is a smaller one" color="#123456" />
            </div>
            <hr />
            <div>
              <Gauge
                value={this.state.value}
                width={200}
                height={160}
                label="Custom label format"
                valueFormatter={value => {
                  if (value > 80) {
                    return '😁';
                  }

                  if (value > 20) {
                    return '😒';
                  }

                  return '😣';
                }

              } />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <input style={{ width: 400 }} type="range" min="0" max="100" value={this.state.value}
                   onChange={this.onChange}/>
          </div>
        </div>
      </div>
    );
  }
}
