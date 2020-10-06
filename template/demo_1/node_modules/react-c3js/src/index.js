import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
let c3;

class C3Chart extends React.Component {
  static get displayName() {
    return 'C3Chart';
  }

  static get propTypes() {
    return {
      data: PropTypes.object.isRequired,
      title: PropTypes.object,
      size: PropTypes.object,
      padding: PropTypes.object,
      color: PropTypes.object,
      interaction: PropTypes.object,
      transition: PropTypes.object,
      oninit: PropTypes.func,
      onrendered: PropTypes.func,
      onmouseover: PropTypes.func,
      onmouseout: PropTypes.func,
      onresize: PropTypes.func,
      onresized: PropTypes.func,
      axis: PropTypes.object,
      grid: PropTypes.object,
      regions: PropTypes.array,
      legend: PropTypes.object,
      tooltip: PropTypes.object,
      subchart: PropTypes.object,
      zoom: PropTypes.object,
      point: PropTypes.object,
      line: PropTypes.object,
      area: PropTypes.object,
      bar: PropTypes.object,
      pie: PropTypes.object,
      donut: PropTypes.object,
      gauge: PropTypes.object,
      className: PropTypes.string,
      style: PropTypes.object,
      unloadBeforeLoad: PropTypes.bool,
    };
  }

  componentDidMount() {
    c3 = require('c3');
    this.updateChart(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  destroyChart() {
    try {
      this.chart = this.chart.destroy();
    } catch (err) {
      throw new Error('Internal C3 error', err);
    }
  }

  generateChart(mountNode, config) {
    const newConfig = Object.assign({ bindto: mountNode }, config);
    return c3.generate(newConfig);
  }

  loadNewData(data) {
    this.chart.load(data);
  }

  unloadData() {
      this.chart.unload();
  }

  updateChart(config) {
    if (!this.chart) {
      this.chart = this.generateChart(findDOMNode(this), config);
    }

    if (config.unloadBeforeLoad) {
        this.unloadData();
    }

    this.loadNewData(config.data);
  }

  render() {
    const className = this.props.className
      ? ` ${this.props.className}`
      : '';
    const style = this.props.style
      ? this.props.style
      : {};
    return <div className={className} style={style} />;
  }
}

export default C3Chart;
