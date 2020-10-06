
import AnimationHelper from '../helpers/animator';
import RenderHelper from '../helpers/render';
import CanvasJSObject from './canvasjs';
import {extend, isCanvasSupported, getObjectId, drawRect, drawSegment} from '../helpers/utils';

function ToolTip(chart, options, theme) {

  ToolTip.base.constructor.call(this, "ToolTip", options, theme);

  this.chart = chart;
  this.canvas = chart.canvas;
  this.ctx = this.chart.ctx;
  this.currentSeriesIndex = -1;
  this.currentDataPointIndex = -1;
  this._timerId = 0;
  this._prevX = NaN;
  this._prevY = NaN;

  this._initialize();
}

extend(ToolTip, CanvasJSObject);

ToolTip.prototype._initialize = function () {

  if (this.enabled) {
    this.container = document.createElement("div");
    this.container.setAttribute("class", "canvasjs-chart-tooltip");
    this.container.style.position = "absolute";
    this.container.style.height = "auto";
    this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
    this.container.style.zIndex = "1000";
    //this.container.style.pointerEvents = "none";
    this.container.style.display = "none";
    //this.container.style.whiteSpace = "no-wrap";

    var toolTipHtml = "<div style=\" width: auto;";
    toolTipHtml += "height: auto;";
    toolTipHtml += "min-width: 50px;";
    toolTipHtml += "line-height: auto;";
    toolTipHtml += "margin: 0px 0px 0px 0px;";
    toolTipHtml += "padding: 5px;";
    toolTipHtml += "font-family: Calibri, Arial, Georgia, serif;";
    toolTipHtml += "font-weight: normal;";
    toolTipHtml += "font-style: " + (isCanvasSupported ? "italic;" : "normal;");
    toolTipHtml += "font-size: 14px;";
    toolTipHtml += "color: #000000;";
    toolTipHtml += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
    toolTipHtml += "text-align: left;";
    toolTipHtml += "border: 2px solid gray;";

    //Older browsers like IE8- don't support alpha values
    toolTipHtml += isCanvasSupported ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";

    toolTipHtml += "text-indent: 0px;";
    toolTipHtml += "white-space: nowrap;";
    //toolTipHtml += "pointer-events:none;";
    toolTipHtml += "border-radius: 5px;";

    //Disable Text Selection
    toolTipHtml += "-moz-user-select:none;";
    toolTipHtml += "-khtml-user-select: none;";
    toolTipHtml += "-webkit-user-select: none;";
    toolTipHtml += "-ms-user-select: none;";
    toolTipHtml += "user-select: none;";

    //toolTipHtml += "opacity: 0;";
    //toolTipHtml += "filter: progid: DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = '#4cffffff', endColorstr = '#4cffffff');";

    if (!isCanvasSupported) {
      //toolTipHtml += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)'";
      //-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')";
      /* For IE 5.5 - 7 */
      toolTipHtml += "filter: alpha(opacity = 90);";
      toolTipHtml += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');";
    }

    toolTipHtml += "} \"> Sample Tooltip</div>";

    this.container.innerHTML = toolTipHtml;
    this.contentDiv = this.container.firstChild;


    this.container.style.borderRadius = this.contentDiv.style.borderRadius;
    this.chart._canvasJSContainer.appendChild(this.container);
  }
}

ToolTip.prototype.mouseMoveHandler = function (x, y) {

  if (!(this._lastUpdated && (new Date().getTime() - this._lastUpdated) < 40)) {
    this._lastUpdated = new Date().getTime();
    this._updateToolTip(x, y);
  }
}

ToolTip.prototype._updateToolTip = function (mouseX, mouseY) {
  //return;

  if (this.chart.disableToolTip) // Disabled during animation, etc
    return;

  if (typeof (mouseX) === "undefined" || typeof (mouseY) === "undefined") {
    if (isNaN(this._prevX) || isNaN(this._prevY))
      return;
    else {
      mouseX = this._prevX;
      mouseY = this._prevY;
    }
  } else {
    this._prevX = mouseX;
    this._prevY = mouseY;
  }


  var dataPoint = null;
  var dataSeries = null;
  var toolTipContent = "";
  var entries = [];
  var toolTipRight;
  var toolTipBottom;
  var x = 0;

  if (this.shared && this.enabled && this.chart.plotInfo.axisPlacement !== "none") {
    // && this.chart.plotInfo.axisPlacement !== "none"
    if (this.chart.plotInfo.axisPlacement === "xySwapped") {
      x = (this.chart.axisX.viewportMaximum - this.chart.axisX.viewportMinimum) / this.chart.axisX.lineCoordinates.height * ((this.chart.axisX.lineCoordinates.y2 - mouseY)) + this.chart.axisX.viewportMinimum;
    }
    else {
      x = (this.chart.axisX.viewportMaximum - this.chart.axisX.viewportMinimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.viewportMinimum;
    }

    var nearbyEntries = [];

    for (var i = 0; i < this.chart.data.length; i++) {
      var entry = this.chart.data[i].getDataPointAtX(x, true);

      if (entry && entry.index >= 0) {
        entry.dataSeries = this.chart.data[i];

        if (entry.dataPoint.y !== null)
          nearbyEntries.push(entry);
      }
    }

    if (nearbyEntries.length === 0)
      return;

    nearbyEntries.sort(function (entry1, entry2) {
      return entry1.distance - entry2.distance;
    });

    var closest = nearbyEntries[0];

    for (i = 0; i < nearbyEntries.length; i++) {

      if (nearbyEntries[i].dataPoint.x.valueOf() === closest.dataPoint.x.valueOf())
        entries.push(nearbyEntries[i]);
    }

    nearbyEntries = null;

  } else {

    var dataPointInfo = this.chart.getDataPointAtXY(mouseX, mouseY, true);
    //dataPointInfo = null;

    if (dataPointInfo) {
      this.currentDataPointIndex = dataPointInfo.dataPointIndex;
      this.currentSeriesIndex = dataPointInfo.dataSeries.index;
    } else if (isCanvasSupported) {

      var id = getObjectId(mouseX, mouseY, this.chart._eventManager.ghostCtx);
      if (id > 0 && typeof this.chart._eventManager.objectMap[id] !== "undefined") {//DataPoint/DataSeries event
        var eventObject = this.chart._eventManager.objectMap[id];

        if (eventObject.objectType === "legendItem")
          return;

        //if (this.currentSeriesIndex === eventObject.dataSeriesIndex && this.currentDataPointIndex === eventObject.dataPointIndex)
        //  return;
        //else {
        this.currentSeriesIndex = eventObject.dataSeriesIndex;
        this.currentDataPointIndex = eventObject.dataPointIndex >= 0 ? eventObject.dataPointIndex : -1;
        //}

        //window.console.log("id: " + id + "; hex: " + intToHexColorString(id));
      } else
        this.currentDataPointIndex = -1;

    } else
      this.currentDataPointIndex = -1;


    if (this.currentSeriesIndex >= 0) {

      dataSeries = this.chart.data[this.currentSeriesIndex];

      var entry = {
      };

      if (this.currentDataPointIndex >= 0) {
        dataPoint = dataSeries.dataPoints[this.currentDataPointIndex];

        entry.dataSeries = dataSeries;
        entry.dataPoint = dataPoint;
        entry.index = this.currentDataPointIndex;
        entry.distance = Math.abs(dataPoint.x - x);
      } else if (this.enabled && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea"
          || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
          || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea"
          || dataSeries.type === "candlestick" || dataSeries.type === "ohlc")) {

        //var x = (this.chart.axisX.viewportMaximum - this.chart.axisX.viewportMinimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.viewportMinimum.valueOf();
        var x = dataSeries.axisX.conversionParameters.minimum + (mouseX - dataSeries.axisX.conversionParameters.reference) / dataSeries.axisX.conversionParameters.pixelPerUnit;


        entry = dataSeries.getDataPointAtX(x, true);
        entry.dataSeries = dataSeries;
        this.currentDataPointIndex = entry.index;
        dataPoint = entry.dataPoint;
      } else {
        //this.hide();
        return;
      }

      if (entry.dataPoint.y !== null) {
        if (entry.dataSeries.axisY) {
          if (entry.dataPoint.y.length > 0) {
            var unboundToViewport = 0;
            for (var i = 0; i < entry.dataPoint.y.length; i++)
              if (entry.dataPoint.y[i] < entry.dataSeries.axisY.viewportMinimum)
                unboundToViewport--;
              else if (entry.dataPoint.y[i] > entry.dataSeries.axisY.viewportMaximum)
                unboundToViewport++;
            if (unboundToViewport < entry.dataPoint.y.length && unboundToViewport > -entry.dataPoint.y.length)
              entries.push(entry);
          } else {
            if (entry.dataPoint.y >= entry.dataSeries.axisY.viewportMinimum && entry.dataPoint.y <= entry.dataSeries.axisY.viewportMaximum)
              entries.push(entry);
          }
        } else
        entries.push(entry);
    }

    }
  }


  if (entries.length > 0) {

    this.highlightObjects(entries);

    if (this.enabled) {

      var toolTipInnerHtml = "";

      toolTipInnerHtml = this.getToolTipInnerHTML({ entries: entries });

      if (toolTipInnerHtml !== null) {
        this.contentDiv.innerHTML = toolTipInnerHtml;

        this.contentDiv.innerHTML = toolTipInnerHtml;

        var previouslyHidden = false;
        if (this.container.style.display === "none") {
          previouslyHidden = true;
          this.container.style.display = "block";
        }

        try {
          this.contentDiv.style.background = this.backgroundColor ? this.backgroundColor : isCanvasSupported ? "rgba(255,255,255,.9)" : "rgb(255,255,255)";

          this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.borderColor ? this.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[entries[0].index % entries[0].dataSeries._colorSet.length];

          this.contentDiv.style.borderWidth = (this.borderThickness || this.borderThickness === 0) ? this.borderThickness + "px" : 2 + "px";

          this.contentDiv.style.borderRadius = (this.cornerRadius || this.cornerRadius === 0) ? this.cornerRadius + "px" : 5 + "px";
          this.container.style.borderRadius = this.contentDiv.style.borderRadius;


          this.contentDiv.style.fontSize = (this.fontSize || this.fontSize === 0) ? this.fontSize + "px" : 14 + "px";
          this.contentDiv.style.color = this.fontColor ? this.fontColor : "#000000";
          this.contentDiv.style.fontFamily = this.fontFamily ? this.fontFamily : "Calibri, Arial, Georgia, serif;";
          this.contentDiv.style.fontWeight = this.fontWeight ? this.fontWeight : "normal";
          this.contentDiv.style.fontStyle = this.fontStyle ? this.fontStyle : isCanvasSupported ? "italic" : "normal";

        } catch (e) {
        }

        var toolTipLeft;

        if (entries[0].dataSeries.type === "pie" || entries[0].dataSeries.type === "doughnut" || entries[0].dataSeries.type === "funnel" || entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "rangeBar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
          toolTipLeft = mouseX - 10 - this.container.clientWidth;
        } else {
          //toolTipLeft = (((this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.viewportMaximum - this.chart.axisX.viewportMinimum)) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.viewportMinimum)) + this.chart.axisX.lineCoordinates.x1 + .5) - this.container.clientWidth << 0;
          toolTipLeft = entries[0].dataSeries.axisX.conversionParameters.reference + entries[0].dataSeries.axisX.conversionParameters.pixelPerUnit * (entries[0].dataPoint.x - entries[0].dataSeries.axisX.conversionParameters.minimum) - this.container.clientWidth << 0;
          toolTipLeft -= 10;
        }


        if (toolTipLeft < 0) {
          toolTipLeft += this.container.clientWidth + 20;
        }

        if (toolTipLeft + this.container.clientWidth > this.chart._container.clientWidth)
          toolTipLeft = Math.max(0, this.chart._container.clientWidth - this.container.clientWidth);

        toolTipLeft += "px";

        if (entries.length === 1 && !this.shared && (entries[0].dataSeries.type === "line" || entries[0].dataSeries.type === "stepLine" || entries[0].dataSeries.type === "spline" || entries[0].dataSeries.type === "area" || entries[0].dataSeries.type === "stepArea" || entries[0].dataSeries.type === "splineArea" || entries[0].dataSeries.type === "stackedArea" || entries[0].dataSeries.type === "stackedArea100")) {
          //toolTipBottom = (entries[0].dataSeries.axisY.lineCoordinates.y2 - entries[0].dataSeries.axisY.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisY.maximum - entries[0].dataSeries.axisY.viewportMinimum) * Math.abs(entries[0].dataPoint.y - entries[0].dataSeries.axisY.viewportMinimum) + .5) << 0;
          toolTipBottom = entries[0].dataSeries.axisY.conversionParameters.reference + entries[0].dataSeries.axisY.conversionParameters.pixelPerUnit * (entries[0].dataPoint.y - entries[0].dataSeries.axisY.viewportMinimum) + .5 << 0;
        } else if (entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "rangeBar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
          //toolTipBottom = (entries[0].dataSeries.axisX.lineCoordinates.y2 - entries[0].dataSeries.axisX.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisX.maximum - entries[0].dataSeries.axisX.viewportMinimum) * Math.abs(entries[0].dataPoint.x - entries[0].dataSeries.axisX.viewportMinimum) + .5) << 0;
          toolTipBottom = entries[0].dataSeries.axisX.conversionParameters.reference + entries[0].dataSeries.axisX.conversionParameters.pixelPerUnit * (entries[0].dataPoint.x - entries[0].dataSeries.axisX.viewportMinimum) + .5 << 0;
        }
        else {
          toolTipBottom = mouseY;
        }

        toolTipBottom = (-toolTipBottom + 10);

        if (toolTipBottom + this.container.clientHeight + 5 > 0) {
          toolTipBottom -= toolTipBottom + this.container.clientHeight + 5 - 0
        }

        toolTipBottom += "px";

        //this.container.style.right = toolTipRight;
        this.container.style.left = toolTipLeft;
        this.container.style.bottom = toolTipBottom;

        if (!this.animationEnabled || previouslyHidden) {
          this.disableAnimation();
        }
        else
          this.enableAnimation();
      } else {
        this.hide(false);
      }

    }

    //if (isDebugMode)
    //  console.log("searchX: " + x + " x: " + searchResult.dataPoint.x + "; y: " + searchResult.dataPoint.y + "; distance: " + searchResult.distance + "; steps: " + steps);
  }
}


ToolTip.prototype.highlightObjects = function (entries) {
  //if (!this.enabled)
  //	return;

  //this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
  var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
  this.chart.resetOverlayedCanvas();

  overlaidCanvasCtx.clearRect(0,0,this.chart.width, this.chart.height);
  overlaidCanvasCtx.save();


  var plotArea = this.chart.plotArea;
  var offset = 0;

  overlaidCanvasCtx.rect(plotArea.x1, plotArea.y1, plotArea.x2 - plotArea.x1, plotArea.y2 - plotArea.y1);
  overlaidCanvasCtx.clip();


  for (var i = 0; i < entries.length; i++) {

    var entry = entries[i];

    var eventObject = this.chart._eventManager.objectMap[entry.dataSeries.dataPointIds[entry.index]];

    if (!eventObject || !eventObject.objectType || eventObject.objectType !== "dataPoint")
      continue;

    var dataSeries = this.chart.data[eventObject.dataSeriesIndex];
    var dataPoint = dataSeries.dataPoints[eventObject.dataPointIndex];
    var index = eventObject.dataPointIndex;

    if (dataPoint.highlightEnabled !== false && (dataSeries.highlightEnabled === true || dataPoint.highlightEnabled === true)) {

      if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter"
        || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea"
        || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
        || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
        var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
        markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

        markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
        markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

        //overlaidCanvasCtx.globalAlpha = .8;
        RenderHelper.drawMarkers([markerProps]);
        //overlaidCanvasCtx.globalAlpha = .8;

        if (typeof (eventObject.y2) !== "undefined") {

          var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y2, this.chart.overlaidCanvasCtx);
          markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

          markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
          markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

          //overlaidCanvasCtx.globalAlpha = .8;
          RenderHelper.drawMarkers([markerProps]);
          //overlaidCanvasCtx.globalAlpha = .8;
        }
      } else if (dataSeries.type === "bubble") {
        var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
        markerProps.size = eventObject.size;
        markerProps.color = "white";
        markerProps.borderColor = "white";
        //markerProps.borderThickness = 2;
        overlaidCanvasCtx.globalAlpha = .3;
        RenderHelper.drawMarkers([markerProps]);
        overlaidCanvasCtx.globalAlpha = 1;
      } else if (dataSeries.type === "column" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100"
        || dataSeries.type === "bar" || dataSeries.type === "rangeBar" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
        || dataSeries.type === "rangeColumn") {
        drawRect(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", 0, null, false, false, false, false, .3);
      }
      else if (dataSeries.type === "pie" || dataSeries.type === "doughnut") {
        drawSegment(overlaidCanvasCtx, eventObject.center, eventObject.radius, "white", dataSeries.type, eventObject.startAngle, eventObject.endAngle, .3, eventObject.percentInnerRadius);
      } else if (dataSeries.type === "candlestick") {

        overlaidCanvasCtx.globalAlpha = 1;
        overlaidCanvasCtx.strokeStyle = eventObject.color;
        overlaidCanvasCtx.lineWidth = eventObject.borderThickness * 2;
        offset = (overlaidCanvasCtx.lineWidth) % 2 === 0 ? 0 : .5;

        overlaidCanvasCtx.beginPath();
        overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
        overlaidCanvasCtx.lineTo(eventObject.x3 - offset, Math.min(eventObject.y1, eventObject.y4));
        overlaidCanvasCtx.stroke();

        overlaidCanvasCtx.beginPath();
        overlaidCanvasCtx.moveTo(eventObject.x3 - offset, Math.max(eventObject.y1, eventObject.y4));
        overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
        overlaidCanvasCtx.stroke();

        drawRect(overlaidCanvasCtx, eventObject.x1, Math.min(eventObject.y1, eventObject.y4), eventObject.x2, Math.max(eventObject.y1, eventObject.y4), "transparent", eventObject.borderThickness * 2, eventObject.color, false, false, false, false);
        overlaidCanvasCtx.globalAlpha = 1;

      } else if (dataSeries.type === "ohlc") {
        overlaidCanvasCtx.globalAlpha = 1;

        overlaidCanvasCtx.strokeStyle = eventObject.color;
        overlaidCanvasCtx.lineWidth = eventObject.borderThickness * 2;

        offset = (overlaidCanvasCtx.lineWidth) % 2 === 0 ? 0 : .5;

        overlaidCanvasCtx.beginPath();
        overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
        overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
        overlaidCanvasCtx.stroke();

        overlaidCanvasCtx.beginPath();
        overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y1);
        overlaidCanvasCtx.lineTo(eventObject.x1, eventObject.y1);
        overlaidCanvasCtx.stroke();

        overlaidCanvasCtx.beginPath();
        overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y4);
        overlaidCanvasCtx.lineTo(eventObject.x2, eventObject.y4);
        overlaidCanvasCtx.stroke();

        overlaidCanvasCtx.globalAlpha = 1;

      }
    }
  }

  overlaidCanvasCtx.restore();
  overlaidCanvasCtx.globalAlpha = 1;
  overlaidCanvasCtx.beginPath();

  return;
}

ToolTip.prototype.getToolTipInnerHTML = function (e) {
  var entries = e.entries;
  var toolTipInnerHtml = null;
  var dataSeries = null;
  var dataPoint = null;
  var index = 0;
  var color = null;
  var toolTipContent = "";

  var isToolTipDefinedInData = true;
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].dataSeries.toolTipContent || entries[i].dataPoint.toolTipContent) {
      isToolTipDefinedInData = false;
      break;
    }
  }

  if (isToolTipDefinedInData && ((this.content && typeof (this.content) === "function") || this.contentFormatter)) {

    var param = {
      chart: this.chart, toolTip: this._options, entries: entries
    };
    toolTipInnerHtml = this.contentFormatter ? this.contentFormatter(param) : this.content(param);

  } else {

    if (this.shared && this.chart.plotInfo.axisPlacement !== "none") {

      var toolTipInnerHtmlPrefix = "";

      for (var i = 0; i < entries.length; i++) {
        dataSeries = entries[i].dataSeries;
        dataPoint = entries[i].dataPoint;
        index = entries[i].index;

        toolTipContent = "";

        if (i === 0 && isToolTipDefinedInData && !this.content) {
          toolTipInnerHtmlPrefix += typeof (this.chart.axisX.labels[dataPoint.x]) !== "undefined" ? this.chart.axisX.labels[dataPoint.x] : "{x}";
          toolTipInnerHtmlPrefix += "</br>";
          toolTipInnerHtmlPrefix = this.chart.replaceKeywordsWithValue(toolTipInnerHtmlPrefix, dataPoint, dataSeries, index);
        }

        //Allows disabling of toolTip for individual dataPoints/dataSeries
        if (dataPoint.toolTipContent === null || (typeof (dataPoint.toolTipContent) === "undefined" && dataSeries._options.toolTipContent === null))
          continue;


        if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
        || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
        || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
          toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}";
        }
        else if (dataSeries.type === "bubble") {
          toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
        } else if (dataSeries.type === "pie" || dataSeries.type === "doughnut" || dataSeries.type === "funnel") {
          toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "&nbsp;&nbsp;{y}";
        } else if (dataSeries.type === "rangeColumn" || dataSeries.type === "rangeBar" || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
          toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}";
        } else if (dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
          toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>"
                  + "<br/>Open: &nbsp;&nbsp;{y[0]}"
                  + "<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}"
                  + "<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}"
                  + "<br/>Close: &nbsp;&nbsp;{y[3]}";
        }

        if (toolTipInnerHtml === null)
          toolTipInnerHtml = "";


        if (this.reversed === true) {

          toolTipInnerHtml = this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index) + toolTipInnerHtml;

          if (i < entries.length - 1)
            toolTipInnerHtml = "</br>" + toolTipInnerHtml;

        } else {

          toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);

          if (i < entries.length - 1)
            toolTipInnerHtml += "</br>";

        }

      }

      if (toolTipInnerHtml !== null)
        toolTipInnerHtml = toolTipInnerHtmlPrefix + toolTipInnerHtml;

    } else {

      dataSeries = entries[0].dataSeries;
      dataPoint = entries[0].dataPoint;
      index = entries[0].index;

      //Allows disabling of toolTip for individual dataPoints/dataSeries
      if (dataPoint.toolTipContent === null || (typeof (dataPoint.toolTipContent) === "undefined" && dataSeries._options.toolTipContent === null))
        return null;


      if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
        || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
        || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
        toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y}";
      } else if (dataSeries.type === "bubble") {
        toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
      } else if (dataSeries.type === "pie" || dataSeries.type === "doughnut" || dataSeries.type === "funnel") {
        toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : (dataPoint.name ? "{name}:&nbsp;&nbsp;" : dataPoint.label ? "{label}:&nbsp;&nbsp;" : "") + "{y}";
      } else if (dataSeries.type === "rangeColumn" || dataSeries.type === "rangeBar" || dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea") {
        toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}";
      } else if (dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
        toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + "</span>"
          + "<br/>Open: &nbsp;&nbsp;{y[0]}"
          + "<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}"
          + "<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}"
          + "<br/>Close: &nbsp;&nbsp;{y[3]}";
      }

      if (toolTipInnerHtml === null)
        toolTipInnerHtml = "";

      toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
    }
  }

  return toolTipInnerHtml;
}

ToolTip.prototype.enableAnimation = function () {
  if (this.container.style.WebkitTransition)
    return;

  this.container.style.WebkitTransition = "left .2s ease-out, bottom .2s ease-out";
  this.container.style.MozTransition = "left .2s ease-out, bottom .2s ease-out";
  this.container.style.MsTransition = "left .2s ease-out, bottom .2s ease-out";
  this.container.style.transition = "left .2s ease-out, bottom .2s ease-out";
}

ToolTip.prototype.disableAnimation = function () {
  if (!this.container.style.WebkitTransition)
    return;

  this.container.style.WebkitTransition = "";
  this.container.style.MozTransition = "";
  this.container.style.MsTransition = "";
  this.container.style.transition = "";
}

ToolTip.prototype.hide = function (resetOverlayedCanvas) {
  if (!this.enabled)
    return;

  resetOverlayedCanvas = typeof (resetOverlayedCanvas) === "undefined" ? true : resetOverlayedCanvas;

  this.container.style.display = "none";
  this.currentSeriesIndex = -1;
  this._prevX = NaN;
  this._prevY = NaN;
  //this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
  if (resetOverlayedCanvas)
    this.chart.resetOverlayedCanvas();
}

export default ToolTip;
