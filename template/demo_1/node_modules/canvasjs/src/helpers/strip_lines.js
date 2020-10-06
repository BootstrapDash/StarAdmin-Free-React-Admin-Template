
import CanvasJSObject from './canvasjs';
import {extend} from '../helpers/utils';

function StripLine(chart, options, theme, id, axis) {
  StripLine.base.constructor.call(this, "StripLine", options, theme, axis);


  this.id = id;
  this.chart = chart;
  this.ctx = this.chart.ctx;

  this.label = this.label;

  this._thicknessType = "pixel";
  if (this.startValue !== null && this.endValue !== null) {

    this.value = ((this.startValue.getTime ? this.startValue.getTime() : this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2;
    this.thickness = Math.max(this.endValue - this.startValue);
    this._thicknessType = "value";
  }
}

extend(StripLine, CanvasJSObject);

StripLine.prototype.render = function () {

  var xy = this.parent.getPixelCoordinatesOnAxis(this.value);

  var lineWidth = Math.abs(this._thicknessType === "pixel" ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness);

  if (lineWidth > 0) {
    //var opacity = this.opacity === null ? ( this.showOnTop && this._thicknessType === "pixel" ? 1 : 1) : this.opacity;
    var opacity = this.opacity === null ? 1 : this.opacity;

    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();

    var oldGlobalAlpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = opacity;

    var hexColor = intToHexColorString(this.id);
    var x1, x2, y1, y2;

    this.ctx.lineWidth = lineWidth;


    if (this.ctx.setLineDash) {
      this.ctx.setLineDash(getLineDashArray(this.lineDashType, lineWidth));
    }

    if (this.parent._position === "bottom" || this.parent._position === "top") {

      var stripX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

      x1 = x2 = stripX;
      y1 = this.chart.plotArea.y1;
      y2 = this.chart.plotArea.y2;
    }
    else if (this.parent._position === "left" || this.parent._position === "right") {
      var stripY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

      y1 = y2 = stripY;
      x1 = this.chart.plotArea.x1;
      x2 = this.chart.plotArea.x2;
    }

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    this.ctx.globalAlpha = oldGlobalAlpha;
  }
};

export default StripLine;
