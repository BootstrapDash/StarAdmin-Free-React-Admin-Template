import React from 'react';

//global unique key for every gauge (needed for SVG groups to stay separated)
let uniqueId = 0;

export interface GaugeProps {
  label: string;
  min: number;
  max: number;
  value: number;
  width: number;
  height: number;
  color: string;
  backgroundColor: string;
  topLabelStyle: any;
  valueLabelStyle: any;
  minMaxLabelStyle: any;
  valueFormatter: (value:number) => string;
}

export default class Gauge extends React.Component<GaugeProps> {
  static defaultProps = {
    label: "React SVG Gauge",
    min: 0,
    max: 100,
    value: 40,
    width: 400,
    height: 320,
    color: '#fe0400',
    backgroundColor: "#edebeb",
    topLabelStyle: {
      textAnchor: "middle",
      fill: "#999999",
      stroke: "none",
      fontStyle: "normal",
      fontVariant: "normal",
      fontWeight: 'bold',
      fontStretch: 'normal',
      lineHeight: 'normal',
      fillOpacity: 1
    },
    valueLabelStyle: {
      textAnchor: "middle",
      fill: "#010101",
      stroke: "none",
      fontStyle: "normal",
      fontVariant: "normal",
      fontWeight: 'bold',
      fontStretch: 'normal',
      lineHeight: 'normal',
      fillOpacity: 1
    },
    minMaxLabelStyle: {
      textAnchor: "middle",
      fill: "#999999",
      stroke: "none",
      fontStyle: "normal",
      fontVariant: "normal",
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontSize: 20,
      lineHeight: 'normal',
      fillOpacity: 1
    },
    valueFormatter: (value:number) => `${value}`
  };

  _getPathValues = (value: number) => {
    if (value < this.props.min) value = this.props.min;
    if (value > this.props.max) value = this.props.max;

    let dx = 0;
    let dy = 0;

    let alpha = (1 - (value - this.props.min) / (this.props.max - this.props.min)) * Math.PI;
    let Ro = this.props.width / 2 - this.props.width / 10;
    let Ri = Ro - this.props.width / 6.666666666666667;

    let Cx = this.props.width / 2 + dx;
    let Cy = this.props.height / 1.25 + dy;

    let Xo = this.props.width / 2 + dx + Ro * Math.cos(alpha);
    let Yo = this.props.height - (this.props.height - Cy) - Ro * Math.sin(alpha);
    let Xi = this.props.width / 2 + dx + Ri * Math.cos(alpha);
    let Yi = this.props.height - (this.props.height - Cy) - Ri * Math.sin(alpha);

    return { alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi };
  };

  _getPath = (value: number) => {
    let { Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi } = this._getPathValues(value);

    let path = "M" + (Cx - Ri) + "," + Cy + " ";
    path += "L" + (Cx - Ro) + "," + Cy + " ";
    path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
    path += "L" + Xi + "," + Yi + " ";
    path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
    path += "Z ";

    return path;
  };

  private uniqueFilterId: string;

  render() {
    let topLabelStyle = (this.props.topLabelStyle.fontSize
      ? this.props.topLabelStyle
      : { ...this.props.topLabelStyle, fontSize: (this.props.width / 10) });
    let valueLabelStyle = (this.props.valueLabelStyle.fontSize
      ? this.props.valueLabelStyle
      : { ...this.props.valueLabelStyle, fontSize: (this.props.width / 5) });
    let { Cx, Ro, Ri, Xo, Cy, Xi } = this._getPathValues(this.props.max);
    if (!this.uniqueFilterId) this.uniqueFilterId = "filter_" + uniqueId++;
    return (
      <svg height="100%" version="1.1" width="100%" xmlns="http://www.w3.org/2000/svg" style={{
        width: this.props.width,
        height: this.props.height,
        overflow: 'hidden',
        position: 'relative',
        left: 0,
        top: 0
      }}>
        <defs>
          <filter id={this.uniqueFilterId}>
            <feOffset dx="0" dy="3"/>
            <feGaussianBlur result="offset-blur" stdDeviation="5"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="black" floodOpacity="0.2" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
        </defs>
        <path fill={this.props.backgroundColor} stroke="none" d={this._getPath(this.props.max)}
              filter={"url(#" + this.uniqueFilterId + ")"}/>
        <path fill={this.props.color} stroke="none" d={this._getPath(this.props.value)}
              filter={"url(#" + this.uniqueFilterId + ")"}/>
        <text x={this.props.width / 2} y={this.props.height / 8} textAnchor="middle" style={topLabelStyle}>
          {this.props.label}
        </text>
        <text x={this.props.width / 2} y={this.props.height / 5 * 4} textAnchor="middle" style={valueLabelStyle}>
          { this.props.valueFormatter(this.props.value) }
        </text>
        <text x={((Cx - Ro) + (Cx - Ri)) / 2} y={Cy + 25} textAnchor="middle" style={this.props.minMaxLabelStyle}>
          {this.props.min}
        </text>
        <text x={(Xo + Xi) / 2} y={Cy + 25} textAnchor="middle" style={this.props.minMaxLabelStyle}>
          {this.props.max}
        </text>
      </svg>
    );
  }
}
