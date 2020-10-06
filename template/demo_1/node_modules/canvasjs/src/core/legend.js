
import DataSeries from './data_series';
import CanvasJSObject from './canvasjs';
import TextBlock from './text_block';
import RenderHelper from '../helpers/render';
import {extend, getFontHeightInPixels} from '../helpers/utils';

function Legend(chart, options, theme) {
  Legend.base.constructor.call(this, "Legend", options, theme);

  this.chart = chart;
  this.canvas = chart.canvas;
  this.ctx = this.chart.ctx;
  this.ghostCtx = this.chart._eventManager.ghostCtx;
  this.items = [];

  this.width = 0,
  //this.fontSize = 12,
  this.height = 0,
  this.orientation = null,
  this.dataSeries = [];
  this.bounds = {
    x1: null, y1: null, x2: null, y2: null
  };

  if (typeof (this._options.fontSize) === "undefined") {
    this.fontSize = this.chart.getAutoFontSize(this.fontSize);
    //window.console.log("fontSize: " + this.fontSize);
  }

  this.lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);

  this.horizontalSpacing = this.fontSize;
}

extend(Legend, CanvasJSObject);

Legend.prototype.render = function () {

  var container = (!this.dockInsidePlotArea ? this.chart : this.chart.plotArea);
  var freeSpace = container.layoutManager.getFreeSpace();
  var position = null;
  var top = 0;
  var left = 0;
  var maxWidth = 0;
  var maxHeight = 0;
  var itemMargin = 5;

  var items = [];
  var rows = [];

  //this.ctx.font = getFontString("", this, null);
  //this.ctx.fontColor = this.fontColor;

  if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
    this.orientation = "horizontal";
    position = this.verticalAlign;

    maxWidth = this.maxWidth !== null ? this.maxWidth : freeSpace.width * .7;
    maxHeight = this.maxHeight !== null ? this.maxHeight : freeSpace.height * .5;
  }
  else if (this.verticalAlign === "center") {
    this.orientation = "vertical";
    position = this.horizontalAlign;

    maxWidth = this.maxWidth !== null ? this.maxWidth : freeSpace.width * .5;
    maxHeight = this.maxHeight !== null ? this.maxHeight : freeSpace.height * .7;
  }

  for (var i = 0; i < this.dataSeries.length; i++) {
    var dataSeries = this.dataSeries[i];


    if (dataSeries.type !== "pie" && dataSeries.type !== "doughnut" && dataSeries.type !== "funnel") {

      var markerType = dataSeries.legendMarkerType ? dataSeries.legendMarkerType : (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter" || dataSeries.type === "bubble") && dataSeries.markerType ? dataSeries.markerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
      var legendText = dataSeries.legendText ? dataSeries.legendText : this.itemTextFormatter ? this.itemTextFormatter({ chart: this.chart, legend: this._options, dataSeries: dataSeries, dataPoint: null })
        : dataSeries.name;
      var markerColor = dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataSeries.markerColor ? dataSeries.markerColor : dataSeries._colorSet[0];
      var markerSize = (!dataSeries.markerSize && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.lineHeight * .6;
      var markerBorderColor = dataSeries.legendMarkerBorderColor ? dataSeries.legendMarkerBorderColor : dataSeries.markerBorderColor;
      var markerBorderThickness = dataSeries.legendMarkerBorderThickness ? dataSeries.legendMarkerBorderThickness : dataSeries.markerBorderThickness ? Math.max(1, Math.round(markerSize * .2)) : 0;
      var lineColor = dataSeries._colorSet[0];

      legendText = this.chart.replaceKeywordsWithValue(legendText, dataSeries.dataPoints[0], dataSeries, i);
      var item = {
        markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize, lineColor: dataSeries._colorSet[0],
        dataSeriesIndex: dataSeries.index, dataPointIndex: null, markerBorderColor: markerBorderColor, markerBorderThickness: markerBorderThickness
      };

      items.push(item);
    } else {
      for (var dataPointIndex = 0; dataPointIndex < dataSeries.dataPoints.length; dataPointIndex++) {

        var dataPoint = dataSeries.dataPoints[dataPointIndex];

        var markerType = dataPoint.legendMarkerType ? dataPoint.legendMarkerType : dataSeries.legendMarkerType ? dataSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
        var legendText = dataPoint.legendText ? dataPoint.legendText : dataSeries.legendText ? dataSeries.legendText : this.itemTextFormatter ? this.itemTextFormatter({ chart: this.chart, legend: this._options, dataSeries: dataSeries, dataPoint: dataPoint })
          : dataPoint.name ? dataPoint.name : "DataPoint: " + (dataPointIndex + 1);
        var markerColor = dataPoint.legendMarkerColor ? dataPoint.legendMarkerColor : dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[dataPointIndex % dataSeries._colorSet.length];
        var markerSize = this.lineHeight * .6;
        var markerBorderColor = dataPoint.legendMarkerBorderColor ? dataPoint.legendMarkerBorderColor : dataSeries.legendMarkerBorderColor ? dataSeries.legendMarkerBorderColor : dataPoint.markerBorderColor ? dataPoint.markerBorderColor : dataSeries.markerBorderColor;
        var markerBorderThickness = dataPoint.legendMarkerBorderThickness ? dataPoint.legendMarkerBorderThickness : dataSeries.legendMarkerBorderThickness ? dataSeries.legendMarkerBorderThickness : dataPoint.markerBorderThickness || dataSeries.markerBorderThickness ? Math.max(1, Math.round(markerSize * .2)) : 0;

        legendText = this.chart.replaceKeywordsWithValue(legendText, dataPoint, dataSeries, dataPointIndex);

        var item = {
          markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize,
          dataSeriesIndex: i, dataPointIndex: dataPointIndex, markerBorderColor: markerBorderColor, markerBorderThickness: markerBorderThickness
        };

        if (dataPoint.showInLegend || (dataSeries.showInLegend && dataPoint.showInLegend !== false)) {
          items.push(item);
        }
      }
    }
    item = null;
  }
  if (this.reversed === true) {
    items.reverse();
  }

  // Find out the required width and height of Legend and position the items relative to the container
  if (items.length > 0) {
    var row = null;
    var rowIndex = 0; // required for vertical orientation
    var textMaxWidth = 0;
    var columnHeight = 0;

    if (this.itemWidth !== null) {
      if (this.itemMaxWidth !== null) {
        textMaxWidth = Math.min(this.itemWidth, this.itemMaxWidth, maxWidth);
      } else {
        textMaxWidth = Math.min(this.itemWidth, maxWidth);
      }
    } else {
      if (this.itemMaxWidth !== null) {
        textMaxWidth = Math.min(this.itemMaxWidth, maxWidth);
      } else {
        textMaxWidth = maxWidth;
      }
    }

    markerSize = (markerSize === 0 ? this.lineHeight * .6 : markerSize);
    textMaxWidth = textMaxWidth - (markerSize + this.horizontalSpacing * .1);

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      if (item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") {
        textMaxWidth = textMaxWidth - 2 * (this.lineHeight * .1);
      }

      if (maxHeight <= 0 || typeof (maxHeight) === "undefined" || textMaxWidth <= 0 || typeof (textMaxWidth) === "undefined") {
        continue;
      }

      if (this.orientation === "horizontal") {

        item.textBlock = new TextBlock(this.ctx, {
          x: 0,
          y: 0,//TBI
          maxWidth: textMaxWidth,
          maxHeight: this.itemWrap ? maxHeight : this.lineHeight, //TBI: FontSize
          angle: 0,
          text: item.text,
          horizontalAlign: "left",//left, center, right
          fontSize: this.fontSize,//in pixels
          fontFamily: this.fontFamily,
          fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
          fontColor: this.fontColor,
          fontStyle: this.fontStyle, // normal, italic, oblique
          textBaseline: "top"
        });
        item.textBlock.measureText();

        if (this.itemWidth !== null) {
          item.textBlock.width = this.itemWidth - (markerSize + this.horizontalSpacing * .1 + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
        }

        if (!row || row.width + Math.round(item.textBlock.width + this.horizontalSpacing * .1 + markerSize + (row.width === 0 ? 0 : (this.horizontalSpacing)) + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0)) > maxWidth) {
          row = {
            items: [], width: 0
          };
          rows.push(row);
          this.height += columnHeight;
          columnHeight = 0;
        }

        columnHeight = Math.max(columnHeight, item.textBlock.height);

        item.textBlock.x = row.width;
        item.textBlock.y = 0;

        row.width += Math.round(item.textBlock.width + this.horizontalSpacing * .1 + markerSize + (row.width === 0 ? 0 : this.horizontalSpacing) + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
        row.items.push(item);

        this.width = Math.max(row.width, this.width);
      } else {

        item.textBlock = new TextBlock(this.ctx, {
          x: 0,
          y: 0,//TBI
          maxWidth: textMaxWidth,
          maxHeight: this.itemWrap === true ? maxHeight : this.fontSize * 1.5, //TBI: FontSize
          angle: 0,
          text: item.text,
          horizontalAlign: "left",//left, center, right
          fontSize: this.fontSize,//in pixels
          fontFamily: this.fontFamily,
          fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
          fontColor: this.fontColor,
          fontStyle: this.fontStyle, // normal, italic, oblique
          textBaseline: "top"
        });

        item.textBlock.measureText();

        if (this.itemWidth !== null) {
          item.textBlock.width = this.itemWidth - (markerSize + this.horizontalSpacing * .1 + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
        }

        if (this.height <= maxHeight) {
          row = {
            items: [], width: 0
          };
          rows.push(row);
        } else {
          row = rows[rowIndex];
          rowIndex = (rowIndex + 1) % rows.length;
        }

        this.height += item.textBlock.height;

        item.textBlock.x = row.width; // relative to the row
        item.textBlock.y = 0; // relative to the row

        row.width += Math.round(item.textBlock.width + this.horizontalSpacing * .1 + markerSize + (row.width === 0 ? 0 : this.horizontalSpacing) + ((item.chartType === "line" || item.chartType === "spline" || item.chartType === "stepLine") ? 2 * (this.lineHeight * .1) : 0));
        row.items.push(item);

        this.width = Math.max(row.width, this.width);
      }
    }

    if (this.itemWrap === false) {
      this.height = rows.length * (this.lineHeight);
    } else {
      this.height += columnHeight;
    }

    this.height = Math.min(maxHeight, this.height);
    this.width = Math.min(maxWidth, this.width);
  }

  if (this.verticalAlign === "top") {
    if (this.horizontalAlign === "left")
      left = freeSpace.x1;
    else if (this.horizontalAlign === "right")
      left = freeSpace.x2 - this.width;
    else
      left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

    top = freeSpace.y1;
  } else if (this.verticalAlign === "center") {
    if (this.horizontalAlign === "left")
      left = freeSpace.x1;
    else if (this.horizontalAlign === "right")
      left = freeSpace.x2 - this.width;
    else
      left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

    top = freeSpace.y1 + freeSpace.height / 2 - this.height / 2;
  } else if (this.verticalAlign === "bottom") {
    if (this.horizontalAlign === "left")
      left = freeSpace.x1;
    else if (this.horizontalAlign === "right")
      left = freeSpace.x2 - this.width;
    else
      left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

    top = freeSpace.y2 - this.height;
  }

  this.items = items;

  //Assign ids to all legendItems
  for (var i = 0; i < this.items.length; i++) {

    var item = items[i];

    item.id = ++this.chart._eventManager.lastObjectId;
    this.chart._eventManager.objectMap[item.id] = {
      id: item.id, objectType: "legendItem", legendItemIndex: i, dataSeriesIndex: item.dataSeriesIndex, dataPointIndex: item.dataPointIndex
    };
    //delete item.textBlock;// Not Required anymore
  }

  var rowHeight = 0;
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var columnHeight = 0;
    for (var itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
      var item = row.items[itemIndex];

      var itemX = item.textBlock.x + left + (itemIndex === 0 ? markerSize * .2 : this.horizontalSpacing);
      var itemY = top + rowHeight;

      var ghostX = itemX;

      if (!this.chart.data[item.dataSeriesIndex].visible)
        this.ctx.globalAlpha = .5;

      this.ctx.save();
      this.ctx.rect(left, top, maxWidth, maxHeight);
      this.ctx.clip();

      if (item.chartType === "line" || item.chartType === "stepLine" || item.chartType === "spline") {
        this.ctx.strokeStyle = item.lineColor;
        this.ctx.lineWidth = Math.ceil(this.lineHeight / 8);
        this.ctx.beginPath();
        this.ctx.moveTo(itemX - this.lineHeight * .1, itemY + this.lineHeight / 2);
        this.ctx.lineTo(itemX + this.lineHeight * .7, itemY + this.lineHeight / 2);
        this.ctx.stroke();

        ghostX -= this.lineHeight * .1;
      }

      RenderHelper.drawMarker(itemX + markerSize / 2, itemY + (this.lineHeight / 2), this.ctx, item.markerType, item.markerSize, item.markerColor, item.markerBorderColor, item.markerBorderThickness);

      item.textBlock.x = itemX + this.horizontalSpacing * .1 + markerSize;

      if (item.chartType === "line" || item.chartType === "stepLine" || item.chartType === "spline") {
        item.textBlock.x = item.textBlock.x + this.lineHeight * .1;
      }

      item.textBlock.y = itemY;

      item.textBlock.render(true);

      this.ctx.restore();

      if (itemIndex > 0) {
        columnHeight = Math.max(columnHeight, item.textBlock.height);
      } else {
        columnHeight = item.textBlock.height;
      }

      if (!this.chart.data[item.dataSeriesIndex].visible)
        this.ctx.globalAlpha = 1;

      var hexColor = intToHexColorString(item.id);
      this.ghostCtx.fillStyle = hexColor;
      this.ghostCtx.beginPath();
      this.ghostCtx.fillRect(ghostX, item.textBlock.y, item.textBlock.x + item.textBlock.width - ghostX, item.textBlock.height);

      item.x1 = this.chart._eventManager.objectMap[item.id].x1 = ghostX;
      item.y1 = this.chart._eventManager.objectMap[item.id].y1 = item.textBlock.y;
      item.x2 = this.chart._eventManager.objectMap[item.id].x2 = item.textBlock.x + item.textBlock.width;
      item.y2 = this.chart._eventManager.objectMap[item.id].y2 = item.textBlock.y + item.textBlock.height;
    }
    rowHeight = rowHeight + columnHeight;
  }

  //this.ctx.beginPath();
  //this.ctx.lineWidth = 2;
  //this.ctx.strokeStyle = "red";
  //this.ctx.rect(left, top, this.width, this.height);
  //this.ctx.stroke();

  container.layoutManager.registerSpace(position, { width: this.width + 2 + 2, height: this.height + 5 + 5 });

  this.bounds = {
    x1: left, y1: top, x2: left + this.width, y2: top + this.height
  };
}

export default Legend;
