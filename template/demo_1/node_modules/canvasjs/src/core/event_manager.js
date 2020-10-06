
import {createCanvas, getMouseCoordinates, isCanvasSupported} from '../helpers/utils';

function EventManager(chart) {
  this.chart = chart;
  this.lastObjectId = 0;
  var _this = this;
  this.objectMap = [];
  this.rectangularRegionEventSubscriptions = [];
  this.previousDataPointEventObject = null;
  //this.previousDataSeriesEventObject = null;

  this.ghostCanvas = createCanvas(this.chart.width, this.chart.height);
  //this.ghostCanvas.width = this.chart.width;
  //this.ghostCanvas.height = this.chart.height;

  this.ghostCtx = this.ghostCanvas.getContext("2d");

  var eventHandler = function (ev) {
    _this.mouseEventHandler.call(_this, ev);
  };

  this.mouseoveredObjectMaps = [];
  //this.chart.canvas.addEventListener("mouseover", eventHandler);
  //this.chart.canvas.addEventListener("mousemove", eventHandler);
  //this.chart.canvas.addEventListener("mouseout", eventHandler);
  //this.chart.canvas.addEventListener("click", eventHandler);
}

EventManager.prototype.reset = function () {
  this.lastObjectId = 0;
  this.objectMap = [];
  this.rectangularRegionEventSubscriptions = [];
  this.previousDataPointEventObject = null;

  this.eventObjects = [];
  //this.ghostCanvas.width = this.chart.width;
  //this.ghostCanvas.height = this.chart.height;

  if (isCanvasSupported) {
    this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height);
    this.ghostCtx.beginPath();
  }
}

EventManager.prototype.getNewObjectTrackingId = function () {
  return ++this.lastObjectId;
}

EventManager.prototype.mouseEventHandler = function (ev) {

  if (ev.type !== "mousemove" && ev.type !== "click")
    return;

  var eventObjectMaps = [];
  var xy = getMouseCoordinates(ev);
  var id = null;

  //var dataPointInfo = this.chart.getDataPointAtXY(xy.x, xy.y, false);

  //if (dataPointInfo) {
  //	id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
  //} else if (isCanvasSupported) {//IE9+
  //	id = getObjectId(xy.x, xy.y, this.ghostCtx);
  //}
  id = this.chart.getObjectAtXY(xy.x, xy.y, false);

  if (id && typeof (this.objectMap[id]) !== "undefined") {

    var eventObjectMap = this.objectMap[id];

    if (eventObjectMap.objectType === "dataPoint") {
      var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
      var dataPoint = dataSeries.dataPoints[eventObjectMap.dataPointIndex];
      var dataPointIndex = eventObjectMap.dataPointIndex;

      //Event Parameter should not contain reference to dataSeries directly. But to its options.
      eventObjectMap.eventParameter = {
        x: xy.x, y: xy.y, dataPoint: dataPoint,
        dataSeries: dataSeries._options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index,
        chart: this.chart._publicChartReference
      };
      eventObjectMap.eventContext = {
        context: dataPoint, userContext: dataPoint, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click"
      };
      eventObjectMaps.push(eventObjectMap);

      //Add Dataseries too because mouse event on dataPoint also means there is an event on dataSeries. DataSeries is not present on ghost canvas
      eventObjectMap = this.objectMap[dataSeries.id];

      //Event Parameter should not contain reference to dataSeries directly. But to its options.
      eventObjectMap.eventParameter = {
        x: xy.x, y: xy.y,
        dataPoint: dataPoint, dataSeries: dataSeries._options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index,
        chart: this.chart._publicChartReference
      };

      eventObjectMap.eventContext = {
        context: dataSeries, userContext: dataSeries._options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click"
      };
      eventObjectMaps.push(this.objectMap[dataSeries.id]);
    }
      //else if (eventObjectMap.objectType === "stripLine") {

      //	//Event Parameter should not contain reference to stripLine directly. But to its options.
      //	eventObjectMap.eventParameter = { x: xy.x, y: xy.y, stripLine: eventObjectMap.stripLine._options, axis: eventObjectMap.axis._options, stripLineIndex: eventObjectMap.stripLineIndex };
      //	eventObjectMap.eventContext = { context: eventObjectMap.stripLine, userContext: eventObjectMap.stripLine._options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };

      //	eventObjectMaps.push(eventObjectMap);
      //}
    else if (eventObjectMap.objectType === "legendItem") {

      var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
      var dataPoint = eventObjectMap.dataPointIndex !== null ? dataSeries.dataPoints[eventObjectMap.dataPointIndex] : null;

      //Event Parameter should not contain reference to DataSeries directly. But to its options.
      eventObjectMap.eventParameter = {
        x: xy.x, y: xy.y,
        dataSeries: dataSeries._options, dataPoint: dataPoint, dataPointIndex: eventObjectMap.dataPointIndex, dataSeriesIndex: eventObjectMap.dataSeriesIndex,
        chart: this.chart._publicChartReference
      };
      eventObjectMap.eventContext = {
        context: this.chart.legend, userContext: this.chart.legend._options, mouseover: "itemmouseover", mousemove: "itemmousemove", mouseout: "itemmouseout", click: "itemclick"
      };
      eventObjectMaps.push(eventObjectMap);
    }
  }

  //Fire mouseout if existing mouseovered objects are not present in the objectmap.
  var mouseOutObjectMapsExcluded = [];
  for (var i = 0; i < this.mouseoveredObjectMaps.length; i++) {
    var mouseOut = true;

    for (var j = 0; j < eventObjectMaps.length; j++) {
      if (eventObjectMaps[j].id === this.mouseoveredObjectMaps[i].id) {
        mouseOut = false;
        break;
      }
    }

    if (mouseOut) {
      this.fireEvent(this.mouseoveredObjectMaps[i], "mouseout", ev);
    } else {
      mouseOutObjectMapsExcluded.push(this.mouseoveredObjectMaps[i]);
    }
  }

  this.mouseoveredObjectMaps = mouseOutObjectMapsExcluded;

  //Process new eventObectMaps
  //If they already don't exist, add them and fire mouseover
  //If ev.type is mousemove, then just fire mousemove
  //If ev.type is click, then fire two events - click followed by mousemove
  for (var i = 0; i < eventObjectMaps.length; i++) {

    var existing = false;

    for (var j = 0; j < this.mouseoveredObjectMaps.length; j++) {
      if (eventObjectMaps[i].id === this.mouseoveredObjectMaps[j].id) {
        existing = true;
        break;
      }
    }

    if (!existing) {
      this.fireEvent(eventObjectMaps[i], "mouseover", ev);
      this.mouseoveredObjectMaps.push(eventObjectMaps[i]);
    }

    if (ev.type === "click") {
      this.fireEvent(eventObjectMaps[i], "click", ev);
    } else if (ev.type === "mousemove") {
      this.fireEvent(eventObjectMaps[i], "mousemove", ev);
    }
  }
}

EventManager.prototype.fireEvent = function (eventObjectMap, eventType, ev) {

  if (!eventObjectMap || !eventType)
    return;

  var eventParameter = eventObjectMap.eventParameter;
  var eventContext = eventObjectMap.eventContext;
  //var context = eventObjectMap.eventContext.context;
  var userContext = eventObjectMap.eventContext.userContext

  if (userContext && eventContext && userContext[eventContext[eventType]])
    userContext[eventContext[eventType]].call(userContext, eventParameter);

  if (eventType !== "mouseout") {
    if (userContext.cursor && userContext.cursor !== ev.target.style.cursor) {
      ev.target.style.cursor = userContext.cursor;
    }
  } else {
    ev.target.style.cursor = this.chart._defaultCursor;
    delete eventObjectMap.eventParameter; // reference no longer required.
    delete eventObjectMap.eventContext; // reference no longer required.
  }

  //This is just a quick fix. Need to find a better way of calling internal event handlers.
  if (eventType === "click" && eventObjectMap.objectType === "dataPoint" && this.chart.pieDoughnutClickHandler) {
    this.chart.pieDoughnutClickHandler.call(this.chart.data[eventObjectMap.dataSeriesIndex], eventParameter);
  }
}

export default EventManager;
