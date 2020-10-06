
import CanvasJSObject from './canvasjs';
import {extend, getProperty} from '../helpers/utils';

function DataSeries(chart, options, theme, index, id) {
  DataSeries.base.constructor.call(this, "DataSeries", options, theme);

  this.chart = chart;
  this.canvas = chart.canvas;
  this._ctx = chart.canvas.ctx;
  this.index = index;
  this.noDataPointsInPlotArea = 0;
  //this.maxWidthInX = 0;
  this.id = id;
  this.chart._eventManager.objectMap[id] = {
    id: id, objectType: "dataSeries", dataSeriesIndex: index
  }
  this.dataPointIds = [];
  this.plotUnit = [];

  this.axisX = null;
  this.axisY = null;

  if (this.fillOpacity === null) {
    if (this.type.match(/area/i))
      this.fillOpacity = .7;
    else
      this.fillOpacity = 1;
  }


  this.axisPlacement = this.getDefaultAxisPlacement();

  if (typeof (this._options.indexLabelFontSize) === "undefined") {

    this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize);
  }
}

extend(DataSeries, CanvasJSObject);

//Static Method that returns the axisPlacement for a given ChartType. Returns one of "normal", "xySwapped", "none"
DataSeries.prototype.getDefaultAxisPlacement = function () {

  //if (!this.visible)
  //	return "none";

  //type = this.type.toLowerCase();
  var type = this.type;

  if (type === "column" || type === "line" || type === "stepLine" || type === "spline" || type === "area" || type === "stepArea" || type === "splineArea" || type === "stackedColumn" || type === "stackedLine" || type === "bubble" || type === "scatter"
    || type === "stackedArea" || type === "stackedColumn100" || type === "stackedLine100" || type === "stackedArea100"
    || type === "candlestick" || type === "ohlc" || type === "rangeColumn" || type === "rangeArea" || type === "rangeSplineArea") {
    return "normal";
  }
  else if (type === "bar" || type === "stackedBar" || type === "stackedBar100" || type === "rangeBar") {

    return "xySwapped";
  }
  else if (type === "pie" || type === "doughnut" || type === "funnel") {
    return "none";
  } else {
    window.console.log("Unknown Chart Type: " + type);
    return null;
  }
}

DataSeries.getDefaultLegendMarker = function (type) {

  //type = type.toLowerCase();

  if (type === "column" || type === "stackedColumn" || type === "stackedLine" || type === "bar" || type === "stackedBar" || type === "stackedBar100"
    || type === "bubble" || type === "scatter"
    || type === "stackedColumn100" || type === "stackedLine100" || type === "stepArea"
    || type === "candlestick" || type === "ohlc" || type === "rangeColumn" || type === "rangeBar" || type === "rangeArea" || type === "rangeSplineArea") {
    return "square";
  }
  else if (type === "line" || type === "stepLine" || type === "spline" || type === "pie" || type === "doughnut" || type === "funnel") {
    return "circle";
  } else if (type === "area" || type === "splineArea" || type === "stackedArea" || type === "stackedArea100") {
    return "triangle"
  } else {
    window.console.log("Unknown Chart Type: " + type);
    return null;
  }
}

//Finds dataPoint with the given x value. If findClosest is set, finds dataPoint with closest x value.
//Returns searchResult object if found, else returns null
DataSeries.prototype.getDataPointAtX = function (x, findClosest) {

  if (!this.dataPoints || this.dataPoints.length === 0) return null;

  var searchResult = {
    dataPoint: null, distance: Infinity, index: NaN
  };
  var dataPoint = null;

  var j = 0;
  var i = 0;
  var direction = 1; // +1 for foward and -1 for backward.

  var minimumXDistance = Infinity;
  var forwardMissCount = 0, backwardMissCount = 0;
  var maxMissCount = 1000;
  var searchStartIndex = 0;

  if (this.chart.plotInfo.axisPlacement !== "none") {

    //var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

    //if (xRange > 0)
    //	searchStartIndex = ((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0;
    //else
    //	searchStartIndex = 0;

    var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

    if (xRange > 0)
      searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
    else
      searchStartIndex = 0;

    //searchStartIndex = ((this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x) / this.dataPoints.length * (x - this.dataPoints[0].x)) >> 0;
  }

  while (true) {

    i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

    if (i >= 0 && i < this.dataPoints.length) {

      dataPoint = this.dataPoints[i];

      var distance = Math.abs(dataPoint.x - x);

      if (distance < searchResult.distance) {
        searchResult.dataPoint = dataPoint;
        searchResult.distance = distance;
        searchResult.index = i;
      }

      var xDistance = Math.abs(dataPoint.x - x);
      if (xDistance <= minimumXDistance)
        minimumXDistance = xDistance;
      else {
        if (direction > 0)
          forwardMissCount++;
        else
          backwardMissCount++;
      }

      if (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount)
        break;


    } else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
      break;

    if (direction === -1) {
      j++;
      direction = 1;
    } else
      direction = -1;
  }


  if (!findClosest && searchResult.dataPoint.x === x)
    return searchResult;
  else if (findClosest && searchResult.dataPoint !== null)
    return searchResult;
  else
    return null;
}

// x & y should be in pixels. Can be used only after rendering the chart.
DataSeries.prototype.getDataPointAtXY = function (x, y, getClosest) {

  if (!this.dataPoints || this.dataPoints.length === 0) return null;

  getClosest = getClosest || false;
  var results = [];
  var j = 0, i = 0;
  var direction = 1; // +1 for foward and -1 for backward.
  var foundDataPoint = false;
  var minimumXDistance = Infinity;
  var forwardMissCount = 0, backwardMissCount = 0;
  var maxMissCount = 1000;
  var searchStartIndex = 0;

  if (this.chart.plotInfo.axisPlacement !== "none") {
    var xval = this.chart.axisX.getXValueAt({ x: x, y: y });

    var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

    if (xRange > 0)
      searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (xval - this.dataPoints[0].x)) >> 0, 0), this.dataPoints.length);
    else
      searchStartIndex = 0;

    //var xRange = (this.axisX._absoluteMaximum - this.axisX._absoluteMinimum);

    //if (xRange > 0)
    //	searchStartIndex = Math.min(Math.max(((this.dataPoints.length - 1) / xRange * (xval - this.axisX._absoluteMinimum)) >> 0, 0), this.dataPoints.length);
    //else
    //	searchStartIndex = 0;
  }

  while (true) {

    //i = searchStartIndex + (j * direction);
    i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

    if (i >= 0 && i < this.dataPoints.length) {

      var id = this.dataPointIds[i];
      var visualInfo = this.chart._eventManager.objectMap[id];
      var dataPoint = this.dataPoints[i];
      var distance = null;

      if (visualInfo) {

        switch (this.type) {

          case "column":
          case "stackedColumn":
          case "stackedColumn100":
          case "bar":
          case "stackedBar":
          case "stackedBar100":
          case "rangeColumn":
          case "rangeBar":

            if (x >= visualInfo.x1 && x <= visualInfo.x2 && y >= visualInfo.y1 && y <= visualInfo.y2) {
              results.push({
                dataPoint: dataPoint,
                dataPointIndex: i,
                dataSeries: this,
                distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y1 - y), Math.abs(visualInfo.y2 - y))
                //distance:0
              });

              foundDataPoint = true;
            }
            break;

          case "line":
          case "stepLine":
          case "spline":
          case "area":
          case "stepArea":
          case "stackedArea":
          case "stackedArea100":
          case "splineArea":
          case "scatter":
            var markerSize = getProperty("markerSize", dataPoint, this) || 4;
            var snapDistance = getClosest ? 20 : markerSize;

            distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
            if (distance <= snapDistance) {
              results.push({
                dataPoint: dataPoint,
                dataPointIndex: i,
                dataSeries: this,
                distance: distance
              });
            }

            var xDistance = Math.abs(visualInfo.x1 - x);
            if (xDistance <= minimumXDistance)
              minimumXDistance = xDistance;
            else {
              if (direction > 0)
                forwardMissCount++;
              else
                backwardMissCount++;
            }

            if (distance <= markerSize / 2) {
              foundDataPoint = true;
            }

            break;

          case "rangeArea":
          case "rangeSplineArea":

            var markerSize = getProperty("markerSize", dataPoint, this) || 4;
            var snapDistance = getClosest ? 20 : markerSize;

            distance = Math.min(Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2)), Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y2 - y, 2)));
            if (distance <= snapDistance) {
              results.push({
                dataPoint: dataPoint,
                dataPointIndex: i,
                dataSeries: this,
                distance: distance
              });
            }

            var xDistance = Math.abs(visualInfo.x1 - x);
            if (xDistance <= minimumXDistance)
              minimumXDistance = xDistance;
            else {
              if (direction > 0)
                forwardMissCount++;
              else
                backwardMissCount++;
            }

            if (distance <= markerSize / 2) {
              foundDataPoint = true;
            }

            break;

          case "bubble":
            var markerSize = visualInfo.size;
            distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
            if (distance <= markerSize / 2) {
              results.push({
                dataPoint: dataPoint,
                dataPointIndex: i,
                dataSeries: this,
                distance: distance
              });

              foundDataPoint = true;
            }
            break;

          case "pie":
          case "doughnut":
            var center = visualInfo.center;
            var innerRadius = this.type === "doughnut" ? visualInfo.percentInnerRadius * visualInfo.radius : 0;

            distance = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
            if (distance < visualInfo.radius && distance > innerRadius) {

              var deltaY = y - center.y;
              var deltaX = x - center.x;
              var angle = Math.atan2(deltaY, deltaX);

              if (angle < 0)
                angle += Math.PI * 2;

              angle = Number((((angle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));
              //console.log(angle);


              var startAngle = Number((((visualInfo.startAngle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));
              var endAngle = Number((((visualInfo.endAngle / Math.PI * 180 % 360) + 360) % 360).toFixed(12));

              //So that data point is detected when there is only one dataPoint
              if (endAngle === 0 && visualInfo.endAngle > 1) {
                endAngle = 360;
              }

              if (startAngle >= endAngle && dataPoint.y !== 0) {
                endAngle += 360;

                if (angle < startAngle)
                  angle += 360;
              }


              if (angle > startAngle && angle < endAngle) {
                results.push({
                  dataPoint: dataPoint,
                  dataPointIndex: i,
                  dataSeries: this,
                  distance: 0
                });

                foundDataPoint = true;
              }

            }

            break;

          case "candlestick":
            if (((x >= (visualInfo.x1 - visualInfo.borderThickness / 2)) && (x <= (visualInfo.x2 + visualInfo.borderThickness / 2))
              && (y >= visualInfo.y2 - visualInfo.borderThickness / 2) && (y <= visualInfo.y3 + visualInfo.borderThickness / 2))
              || (Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y1 && y <= visualInfo.y4))) {
              results.push({
                dataPoint: dataPoint,
                dataPointIndex: i,
                dataSeries: this,
                distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
                //distance:0
              });

              foundDataPoint = true;
            }
            break;

          case "ohlc":

            if ((Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && (y >= visualInfo.y2 && y <= visualInfo.y3))

              || (x >= visualInfo.x1 && (x <= (visualInfo.x2 + visualInfo.x1) / 2)
                && (y >= visualInfo.y1 - visualInfo.borderThickness / 2) && (y <= visualInfo.y1 + visualInfo.borderThickness / 2))

              || ((x >= (visualInfo.x1 + visualInfo.x2) / 2) && (x <= visualInfo.x2)
                && (y >= visualInfo.y4 - visualInfo.borderThickness / 2) && (y <= visualInfo.y4 + visualInfo.borderThickness / 2))) {

              results.push({
                dataPoint: dataPoint,
                dataPointIndex: i,
                dataSeries: this,
                distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
                //distance:0
              });

              foundDataPoint = true;
            }
            break;

        }

        if (foundDataPoint || (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount))
          break;
      }

    } else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
      break;

    if (direction === -1) {
      j++;
      direction = 1;
    } else
      direction = -1;

  }



  var closestResult = null;

  for (var m = 0; m < results.length; m++) {
    if (!closestResult) {
      closestResult = results[m];
    } else if (results[m].distance <= closestResult.distance) {
      closestResult = results[m];
    }
  }

  //if (window.console)
  //	window.console.log("forwardMissCount: " + forwardMissCount + "; backwardMissCount: " + backwardMissCount + "; getClosest: " + getClosest);

  //if (window.console && closestResult)
  //    window.console.log(j + ": distance = " + closestResult.distance);

  return closestResult;
}

DataSeries.prototype.getMarkerProperties = function (index, x, y, ctx) {
  var dataPoints = this.dataPoints;
  var dataSeries = this;

  var markerColor = dataPoints[index].markerColor ? dataPoints[index].markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoints[index].color ? dataPoints[index].color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];
  var markerBorderColor = dataPoints[index].markerBorderColor ? dataPoints[index].markerBorderColor : dataSeries.markerBorderColor ? dataSeries.markerBorderColor : null;
  var markerBorderThickness = dataPoints[index].markerBorderThickness ? dataPoints[index].markerBorderThickness : dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : null;
  var markerType = dataPoints[index].markerType ? dataPoints[index].markerType : dataSeries.markerType;
  var markerSize = dataPoints[index].markerSize ? dataPoints[index].markerSize : dataSeries.markerSize;


  return {
    x: x, y: y, ctx: ctx,
    type: markerType,
    size: markerSize,
    color: markerColor,
    borderColor: markerBorderColor,
    borderThickness: markerBorderThickness
  }
}

export default DataSeries;
