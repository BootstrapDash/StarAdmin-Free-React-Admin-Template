
import CanvasJSObject from './canvasjs';
import Animator from './animator';
import DataSeries from './data_series';
import TextBlock from './text_block';
import RenderHelper from '../helpers/render';
import LayoutManager from './layout_manager';
import EventManager from './event_manager';
import ToolTip from './tooltip';
import CultureInfo from '../core/culture_info';
import Axis from '../core/axis';
import Title from '../core/title';
import Legend from '../core/legend';
import AnimationHelper from '../helpers/animator';
import {colorSets} from '../constants/themes';
import {isDebugMode, defaultOptions} from '../constants/options';
// import {inherits} from 'util';

import {
	addEvent,
	setCanvasSize,
	addArrayIndexOf,
	hide,
	show,
	getMouseCoordinates,
	getProperty,
	isCanvasSupported,
	extend,
	createCanvas,
	extendCtx,
	getObjectId,
	getDevicePixelBackingStoreRatio,
	trimString,
	numberFormat,
	getLineDashArray,
	intToHexColorString,
	compareDataPointX
} from '../helpers/utils';

import {
	SplineChart,
	ColumnChart,
	StackedColumnChart,
	StackedColumn100Chart,
	BarChart,
	StackedBarChart,
	StackedBar100Chart,
	AreaChart,
	SplineAreaChart,
	StepAreaChart,
	StackedAreaChart,
	StackedArea100Chart,
	BubbleChart,
	ScatterChart,
	CandlestickChart,
	RangeColumnChart,
	RangeBarChart,
	RangeAreaChart,
	RangeSplineAreaChart,
	PieChart
} from '../charts/index';

var devicePixelBackingStoreRatio = getDevicePixelBackingStoreRatio();

function Chart(containerId, options, publicChartReference) {

	this._publicChartReference = publicChartReference;

	options = options || {};

	Chart.base.constructor.call(this, "Chart", options, options.theme ? options.theme : "theme1");

	var _this = this;

	this._containerId = containerId;
	this._objectsInitialized = false;
	this.ctx = null;
	this.overlaidCanvasCtx = null;
	this._indexLabels = [];
	this._panTimerId = 0;
	this._lastTouchEventType = "";
	this._lastTouchData = null;
	this.isAnimating = false;
	this.renderCount = 0;
	this.animatedRender = false;
	this.disableToolTip = false;


	this.panEnabled = false;
	this._defaultCursor = "default";
	this.plotArea = { canvas: null, ctx: null, x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
	this._dataInRenderedOrder = [];

	this._container = typeof (this._containerId) === "string" ? document.getElementById(this._containerId) : this._containerId;

	if (!this._container) {
		if (window.console)
			window.console.log("CanvasJS Error: Chart Container with id \"" + this._containerId + "\" was not found");
		return;
	}

	this._container.innerHTML = "";

	var width = 0;
	var height = 0;

	if (this._options.width)
		width = this.width;
	else
		width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

	if (this._options.height)
		height = this.height;
	else
		height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

	this.width = width;
	this.height = height;

	this.x1 = this.y1 = 0;
	this.x2 = this.width;
	this.y2 = this.height;


	this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

	this._canvasJSContainer = document.createElement("div");
	this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container");

	this._canvasJSContainer.style.position = "relative";
	this._canvasJSContainer.style.textAlign = "left";
	this._canvasJSContainer.style.cursor = "auto";

	if (!isCanvasSupported) {
		this._canvasJSContainer.style.height = "0px";//In IE6 toolTip doesn't show at proper position if not set.
	}
	this._container.appendChild(this._canvasJSContainer);


	this.canvas = createCanvas(width, height);

	this.canvas.style.position = "absolute";
	if (this.canvas.getContext) {
		//try {
		//	this.canvas.style.background = this.backgroundColor;
		//} catch (e) { }
		this._canvasJSContainer.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");
		this.ctx.textBaseline = "top";
		extendCtx(this.ctx);

	} else return;

	//this.canvas.style.cursor = "pointer";

	if (!isCanvasSupported) {
		this.plotArea.canvas = createCanvas(width, height);
		this.plotArea.canvas.style.position = "absolute";
		this.plotArea.canvas.setAttribute("class", "plotAreaCanvas");
		this._canvasJSContainer.appendChild(this.plotArea.canvas);

		this.plotArea.ctx = this.plotArea.canvas.getContext("2d");
	} else {
		this.plotArea.ctx = this.ctx;
	}

	this.overlaidCanvas = createCanvas(width, height);
	this.overlaidCanvas.style.position = "absolute";
	this._canvasJSContainer.appendChild(this.overlaidCanvas);
	this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d");
	this.overlaidCanvasCtx.textBaseline = "top";

	this._eventManager = new EventManager(this);

	addEvent(window, "resize", function () {
		//this._container.addEventListener("DOMSubtreeModified", function () {

		if (_this._updateSize())
			_this.render();
	});


	this._toolBar = document.createElement("div");
	this._toolBar.setAttribute("class", "canvasjs-chart-toolbar");
	this._toolBar.style.cssText = "position: absolute; right: 1px; top: 1px;";
	this._canvasJSContainer.appendChild(this._toolBar);


	this.bounds = { x1: 0, y1: 0, x2: this.width, y2: this.height };

	addEvent(this.overlaidCanvas, 'click', function (e) {
		_this._mouseEventHandler(e);
	});

	addEvent(this.overlaidCanvas, 'mousemove', function (e) {
		_this._mouseEventHandler(e);
	});

	addEvent(this.overlaidCanvas, 'mouseup', function (e) {
		_this._mouseEventHandler(e);
	});

	addEvent(this.overlaidCanvas, 'mousedown', function (e) {
		_this._mouseEventHandler(e);
		hide(_this._dropdownMenu);
	});

	addEvent(this.overlaidCanvas, 'mouseout', function (e) {
		_this._mouseEventHandler(e);
	});


	addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function (e) {
		_this._touchEventHandler(e);
	});

	addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : 'touchmove', function (e) {
		_this._touchEventHandler(e);
	});

	addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : 'touchend', function (e) {
		_this._touchEventHandler(e);
	});

	addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : 'touchcancel', function (e) {
		_this._touchEventHandler(e);
	});

	if (!this._creditLink) {

		this._creditLink = document.createElement("a");
		this._creditLink.setAttribute("class", "canvasjs-chart-credit");
		this._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:3px;top:" + (this.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif");

		this._creditLink.setAttribute("tabIndex", -1);

		this._creditLink.setAttribute("target", "_blank");
	}

	this._toolTip = new ToolTip(this, this._options.toolTip, this.theme);

	this.data = null;
	this.axisX = null;
	this.axisY = null;
	this.axisY2 = null;

	this.sessionVariables = {
		axisX: {},
		axisY: {},
		axisY2: {}
	};
}

extend(Chart, CanvasJSObject);

//Update Chart Properties
Chart.prototype._updateOptions = function () {

	var _this = this;

	this.updateOption("width");
	this.updateOption("height");
	this.updateOption("dataPointMaxWidth");
	this.updateOption("interactivityEnabled");
	this.updateOption("theme");

	if (this.updateOption("colorSet"))
		this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

	this.updateOption("backgroundColor");
	if (!this.backgroundColor)
		this.backgroundColor = "rgba(0,0,0,0)";

	this.updateOption("culture");
	this._cultureInfo = new CultureInfo(this._options.culture);

	this.updateOption("animationEnabled");
	this.animationEnabled = this.animationEnabled && isCanvasSupported;
	this.updateOption("animationDuration");

	this.updateOption("rangeChanging");
	this.updateOption("rangeChanged");

	//Need to check this._options.zoomEnabled because this.zoomEnabled is used internally to keep track of state - and hence changes.
	if (this._options.zoomEnabled) {

		if (!this._zoomButton) {

			hide(this._zoomButton = document.createElement("button"));

			setButtonState(this, this._zoomButton, "pan");

			this._toolBar.appendChild(this._zoomButton);
			addEvent(this._zoomButton, "click", function () {
				if (_this.zoomEnabled) {
					_this.zoomEnabled = false;
					_this.panEnabled = true;

					setButtonState(_this, _this._zoomButton, "zoom");

				} else {
					_this.zoomEnabled = true;
					_this.panEnabled = false;

					setButtonState(_this, _this._zoomButton, "pan");
				}

				_this.render();
			});
		}


		if (!this._resetButton) {
			hide(this._resetButton = document.createElement("button"));
			setButtonState(this, this._resetButton, "reset");
			this._toolBar.appendChild(this._resetButton);

			addEvent(this._resetButton, "click", function () {

				_this._toolTip.hide();

				if (_this.zoomEnabled || _this.panEnabled) {
					_this.zoomEnabled = true;
					_this.panEnabled = false;
					setButtonState(_this, _this._zoomButton, "pan");

					_this._defaultCursor = "default";
					_this.overlaidCanvas.style.cursor = _this._defaultCursor;
				} else {
					_this.zoomEnabled = false;
					_this.panEnabled = false;
				}
				//Reset axisX
				if (_this.sessionVariables.axisX) {
					_this.sessionVariables.axisX.newViewportMinimum = null;
					_this.sessionVariables.axisX.newViewportMaximum = null;
				}

				//Reset axisY
				if (_this.sessionVariables.axisY) {
					_this.sessionVariables.axisY.newViewportMinimum = null;
					_this.sessionVariables.axisY.newViewportMaximum = null;
				}

				//Reset axisY2
				if (_this.sessionVariables.axisY2) {
					_this.sessionVariables.axisY2.newViewportMinimum = null;
					_this.sessionVariables.axisY2.newViewportMaximum = null;
				}

				_this.resetOverlayedCanvas();

				hide(_this._zoomButton, _this._resetButton);

				_this._dispatchRangeEvent("rangeChanging", "reset");
				_this.render();
				_this._dispatchRangeEvent("rangeChanged", "reset");
			});

			this.overlaidCanvas.style.cursor = _this._defaultCursor;
		}

		if (!this.zoomEnabled && !this.panEnabled) {
			if (!this._zoomButton) {
				this.zoomEnabled = true;
				this.panEnabled = false;
			} else {

				if (_this._zoomButton.getAttribute("state") === _this._cultureInfo.zoomText) {
					this.panEnabled = true;
					this.zoomEnabled = false;
				}
				else {
					this.zoomEnabled = true;
					this.panEnabled = false;
				}

				show(_this._zoomButton, _this._resetButton);
			}
		}



	} else {
		this.zoomEnabled = false;
		this.panEnabled = false;
	}



	if (this._menuButton) {
		if (this.exportEnabled)
			show(this._menuButton);
		else
			hide(this._menuButton);
	} else if (this.exportEnabled && isCanvasSupported) {
		this._menuButton = document.createElement("button");
		setButtonState(this, this._menuButton, "menu");
		this._toolBar.appendChild(this._menuButton);

		addEvent(this._menuButton, "click", function () {
			if (_this._dropdownMenu.style.display === "none") {

				if (_this._dropDownCloseTime && ((new Date()).getTime() - _this._dropDownCloseTime.getTime() <= 500))
					return;

				_this._dropdownMenu.style.display = "block";
				_this._menuButton.blur();
				_this._dropdownMenu.focus();
			}

		}, true);
	}


	if (!this._dropdownMenu && this.exportEnabled && isCanvasSupported) {
		this._dropdownMenu = document.createElement("div");
		this._dropdownMenu.setAttribute("tabindex", -1);
		this._dropdownMenu.style.cssText = "position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 1px;top: 25px;min-width: 120px;outline: 0;border: 1px solid silver;font-size: 14px;font-family: Calibri, Verdana, sans-serif;padding: 5px 0px 5px 0px;text-align: left;background-color: #fff;line-height: 20px;box-shadow: 2px 2px 10px #888888;";
		_this._dropdownMenu.style.display = "none";
		this._toolBar.appendChild(this._dropdownMenu);

		addEvent(this._dropdownMenu, "blur", function () {
			hide(_this._dropdownMenu);

			_this._dropDownCloseTime = new Date();
		}, true);

		var exportOption = document.createElement("div");
		exportOption.style.cssText = "padding: 2px 15px 2px 10px"
		exportOption.innerHTML = this._cultureInfo.saveJPGText;
		this._dropdownMenu.appendChild(exportOption);

		addEvent(exportOption, "mouseover", function () {
			this.style.backgroundColor = "#EEEEEE";
		}, true);

		addEvent(exportOption, "mouseout", function () {
			this.style.backgroundColor = "transparent";
		}, true);

		addEvent(exportOption, "click", function () {
			exportCanvas(_this.canvas, "jpg", _this.exportFileName);
			hide(_this._dropdownMenu);
		}, true);

		var exportOption = document.createElement("div");
		exportOption.style.cssText = "padding: 2px 15px 2px 10px"
		exportOption.innerHTML = this._cultureInfo.savePNGText;
		this._dropdownMenu.appendChild(exportOption);

		addEvent(exportOption, "mouseover", function () {
			this.style.backgroundColor = "#EEEEEE";
		}, true);

		addEvent(exportOption, "mouseout", function () {
			this.style.backgroundColor = "transparent";
		}, true);

		addEvent(exportOption, "click", function () {
			exportCanvas(_this.canvas, "png", _this.exportFileName);
			hide(_this._dropdownMenu);
		}, true);
	}


	if (this._toolBar.style.display !== "none" && this._zoomButton) {

		this.panEnabled ? setButtonState(_this, _this._zoomButton, "zoom") : setButtonState(_this, _this._zoomButton, "pan");


		if (_this._resetButton.getAttribute("state") !== _this._cultureInfo.resetText)
			setButtonState(_this, _this._resetButton, "reset");
	}

	if (typeof (defaultOptions.Chart.creditHref) === "undefined") {
		this.creditHref = "http://canvasjs.com/";
		this.creditText = "CanvasJS.com";
	} else {
		var creditTextChanged = this.updateOption("creditText");
		var creditHrefChanged = this.updateOption("creditHref");
	}

	if (this.renderCount === 0 || (creditTextChanged || creditHrefChanged)) {
		this._creditLink.setAttribute("href", this.creditHref);
		this._creditLink.innerHTML = this.creditText;
	}

	if (this.creditHref && this.creditText) {
		if (!this._creditLink.parentElement)
			this._canvasJSContainer.appendChild(this._creditLink);
	}
	else if (this._creditLink.parentElement)
		this._canvasJSContainer.removeChild(this._creditLink);

	if (this._options.toolTip && this._toolTip._options !== this._options.toolTip)
		this._toolTip._options = this._options.toolTip

	for (var prop in this._toolTip._options) {

		if (this._toolTip._options.hasOwnProperty(prop)) {
			this._toolTip.updateOption(prop);
		}
	}

}

Chart.prototype._updateSize = function () {
	var width = 0;
	var height = 0;

	if (this._options.width)
		width = this.width;
	else
		this.width = width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

	if (this._options.height)
		height = this.height;
	else
		this.height = height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

	if (this.canvas.width !== width * devicePixelBackingStoreRatio || this.canvas.height !== height * devicePixelBackingStoreRatio) {
		setCanvasSize(this.canvas, width, height);

		setCanvasSize(this.overlaidCanvas, width, height);
		setCanvasSize(this._eventManager.ghostCanvas, width, height);

		return true;
	}

	return false;
}

// initialize chart objects
Chart.prototype._initialize = function () {
	///<signature>
	///<summary>Initializes Chart objects/state. Creates DataSeries class instance for each DataSeries provided by ther user. Sets the Axis Type based on the user data</summary>
	///</signature>
	//this.width = this.width;

	if (!this._animator)
		this._animator = new Animator(this);
	else {
		this._animator.cancelAllAnimations();
	}

	this.removeAllEventListeners();

	this.disableToolTip = false;

	this._axes = [];

	this.pieDoughnutClickHandler = null;
	//this._touchCurrentCoordinates = null;

	if (this.animationRequestId)
		this.cancelRequestAnimFrame.call(window, this.animationRequestId);

	this._updateOptions();

	this.animatedRender = isCanvasSupported && this.animationEnabled && (this.renderCount === 0);

	this._updateSize();

	//this._selectedColorSet = colorSets["colorSet2"];

	//this.ctx.clearRect(0, 0, this.width, this.height);
	this.clearCanvas();
	this.ctx.beginPath();

	this.axisX = null;
	this.axisY = null;
	this.axisY2 = null;
	this._indexLabels = [];
	this._dataInRenderedOrder = [];

	this._events = [];
	if (this._eventManager)
		this._eventManager.reset();

	this.plotInfo = {
		axisPlacement: null,
		axisXValueType: null,
		plotTypes: []//array of plotType: {type:"", axisYType: "primary", dataSeriesIndexes:[]}
	};

	this.layoutManager = new LayoutManager(0, 0, this.width, this.height, 2);

	if (this.plotArea.layoutManager)
		this.plotArea.layoutManager.reset();


	this.data = [];
	var dataSeriesIndex = 0;

	for (var series = 0; series < this._options.data.length; series++) {
		//for (series in this._options.data) {

		dataSeriesIndex++;

		if (!(!this._options.data[series].type || Chart._supportedChartTypes.indexOf(this._options.data[series].type) >= 0))
			continue;

		var dataSeries = new DataSeries(this, this._options.data[series], this.theme, dataSeriesIndex - 1, ++this._eventManager.lastObjectId);
		if (dataSeries.name === null)
			dataSeries.name = "DataSeries " + (dataSeriesIndex);

		if (dataSeries.color === null) {
			if (this._options.data.length > 1) {
				dataSeries._colorSet = [this._selectedColorSet[dataSeries.index % this._selectedColorSet.length]];
				dataSeries.color = this._selectedColorSet[dataSeries.index % this._selectedColorSet.length];
			} else {
				if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area"
					|| dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"
					|| dataSeries.type === "rangeArea" || dataSeries.type === "rangeSplineArea" || dataSeries.type === "candlestick" || dataSeries.type === "ohlc") {
					dataSeries._colorSet = [this._selectedColorSet[0]];
				}
				else
					dataSeries._colorSet = this._selectedColorSet;
			}
		} else {
			dataSeries._colorSet = [dataSeries.color];
		}

		if (dataSeries.markerSize === null) {
			if (((dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline") && dataSeries.dataPoints && dataSeries.dataPoints.length < this.width / 16) || dataSeries.type === "scatter") {
				//if (dataSeries.type === "line") {
				dataSeries.markerSize = 8;
			}
		}

		if ((dataSeries.type === "bubble" || dataSeries.type === "scatter") && dataSeries.dataPoints) {
			dataSeries.dataPoints.sort(compareDataPointX)
		}

		//if (dataSeries.markerBorderThickness === null && dataSeries.type === "scatter") {
		//    dataSeries.markerBorderThickness = 2;
		//}

		//if (dataSeries.markerType === null) {
		//    if (dataSeries.type === "line" & dataSeries.dataPoints.length < 500) {
		//        dataSeries.markerType = "circle";
		//    }
		//}

		this.data.push(dataSeries);

		var seriesAxisPlacement = dataSeries.axisPlacement;

		//if (isDebugMode && window.console)
		//    window.console.log(dataSeries.type);

		var errorMessage;

		if (seriesAxisPlacement === "normal") {

			if (this.plotInfo.axisPlacement === "xySwapped") {
				errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
			} else if (this.plotInfo.axisPlacement === "none") {
				errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
			} else if (this.plotInfo.axisPlacement === null)
				this.plotInfo.axisPlacement = "normal";
		}
		else if (seriesAxisPlacement === "xySwapped") {

			if (this.plotInfo.axisPlacement === "normal") {
				errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or pie chart";
			} else if (this.plotInfo.axisPlacement === "none") {
				errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
			} else if (this.plotInfo.axisPlacement === null)
				this.plotInfo.axisPlacement = "xySwapped";
		}
		else if (seriesAxisPlacement == "none") {

			if (this.plotInfo.axisPlacement === "normal") {
				errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or bar chart";
			} else if (this.plotInfo.axisPlacement === "xySwapped") {
				errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
			} else if (this.plotInfo.axisPlacement === null)
				this.plotInfo.axisPlacement = "none";
		}

		if (errorMessage && window.console) {
			window.console.log(errorMessage);
			return;
		}
	}

	//if (isDebugMode && window.console) {
	//    window.console.log("xMin: " + this.plotInfo.viewPortXMin + "; xMax: " + this.plotInfo.viewPortXMax + "; yMin: " + this.plotInfo.yMin + "; yMax: " + this.plotInfo.yMax);
	//}

	this._objectsInitialized = true;
}

//indexOf is not supported in IE8-
Chart._supportedChartTypes = addArrayIndexOf(["line", "stepLine", "spline", "column", "area", "stepArea", "splineArea", "bar", "bubble", "scatter",
	"stackedColumn", "stackedColumn100", "stackedBar", "stackedBar100",
	"stackedArea", "stackedArea100",
	"candlestick",
	"ohlc",
	"rangeColumn",
	"rangeBar",
	"rangeArea",
	"rangeSplineArea",
	"pie", "doughnut", "funnel"
]);

Chart.prototype.render = function (options) {

	if (options)
		this._options = options;

	this._initialize();
	var plotAreaElements = []; //Elements to be rendered inside the plotArea

	//Create Primary and Secondary axis and assign them to the series
	for (var i = 0; i < this.data.length; i++) {

		if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
			if (!this.data[i].axisYType || this.data[i].axisYType === "primary") {
				if (!this.axisY) {

					if (this.plotInfo.axisPlacement === "normal") {
						this._axes.push(this.axisY = new Axis(this, this._options.axisY, "axisY", "left"));
					}
					else if (this.plotInfo.axisPlacement === "xySwapped") {
						this._axes.push(this.axisY = new Axis(this, this._options.axisY, "axisY", "bottom"));
					}
				}
				this.data[i].axisY = this.axisY;
			}
			else if (this.data[i].axisYType === "secondary") {
				if (!this.axisY2) {
					if (this.plotInfo.axisPlacement === "normal") {
						this._axes.push(this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "right"));
					}
					else if (this.plotInfo.axisPlacement === "xySwapped") {
						this._axes.push(this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "top"));
					}
				}
				this.data[i].axisY = this.axisY2;
			}

			if (!this.axisX) {
				if (this.plotInfo.axisPlacement === "normal") {
					this._axes.push(this.axisX = new Axis(this, this._options.axisX, "axisX", "bottom"));
				} else if (this.plotInfo.axisPlacement === "xySwapped") {
					this._axes.push(this.axisX = new Axis(this, this._options.axisX, "axisX", "left"));
				}
			}

			this.data[i].axisX = this.axisX;
		}
	}

	//If Both Primary and Secondary axis are present, disable gridlines for one of them unless the user has set value for both
	if (this.axisY && this.axisY2) {
		if (this.axisY.gridThickness > 0 && typeof (this.axisY2._options.gridThickness) === "undefined")
			this.axisY2.gridThickness = 0;
		else if (this.axisY2.gridThickness > 0 && typeof (this.axisY._options.gridThickness) === "undefined")
			this.axisY.gridThickness = 0;
	}


	//Show toolBar when viewportMinimum/viewportMaximum are set
	var showToolBar = false;
	if (this._axes.length > 0 && (this.zoomEnabled || this.panEnabled)) {
		for (var i = 0; i < this._axes.length; i++) {
			if (this._axes[i].viewportMinimum !== null || this._axes[i].viewportMaximum !== null) {
				showToolBar = true;
				break;
			}
		}
	}

	if (showToolBar) {
		show(this._zoomButton, this._resetButton);
	} else {
		hide(this._zoomButton, this._resetButton);
	}


	this._processData();// Categorises the dataSeries and calculates min, max and other values

	if (this._options.title) {
		this._title = new Title(this, this._options.title);

		if (!this._title.dockInsidePlotArea)
			this._title.render();
		else
			plotAreaElements.push(this._title);
	}

	if (this._options.subtitles) {
		for (var i = 0; i < this._options.subtitles.length; i++) {

			this.subtitles = [];

			var subtitle = new Subtitle(this, this._options.subtitles[i]);
			this.subtitles.push(subtitle);

			if (!subtitle.dockInsidePlotArea)
				subtitle.render();
			else
				plotAreaElements.push(subtitle);
		}
	}

	this.legend = new Legend(this, this._options.legend, this.theme);
	for (var i = 0; i < this.data.length; i++) {
		if (this.data[i].showInLegend || this.data[i].type === "pie" || this.data[i].type === "doughnut") {
			this.legend.dataSeries.push(this.data[i]);
		}
	}

	if (!this.legend.dockInsidePlotArea)
		this.legend.render();
	else
		plotAreaElements.push(this.legend);

	//TBI: Revisit and check if the functionality is enough.
	if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {

		//var freeSpace = this.layoutManager.getFreeSpace();

		Axis.setLayoutAndRender(this.axisX, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
	} else if (this.plotInfo.axisPlacement === "none") {
		//In case of charts with axis this method is called inside setLayoutAndRender
		this.preparePlotArea();
	}
	else {
		return;
	}

	var index = 0;
	for (index in plotAreaElements) {
		if(plotAreaElements.hasOwnProperty(index))
		plotAreaElements[index].render();
	}

	var animations = [];
	if (this.animatedRender) {
		var initialState = createCanvas(this.width, this.height);
		var initialStateCtx = initialState.getContext("2d");
		initialStateCtx.drawImage(this.canvas, 0, 0, this.width, this.height);
	}

	for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
		var plotType = this.plotInfo.plotTypes[i];

		for (var j = 0; j < plotType.plotUnits.length; j++) {

			var plotUnit = plotType.plotUnits[j];
			var animationInfo = null;

			plotUnit.targetCanvas = null; //In case chart updates before the animation is complete, previous canvases need to be removed

			if (this.animatedRender) {
				plotUnit.targetCanvas = createCanvas(this.width, this.height);
				plotUnit.targetCanvasCtx = plotUnit.targetCanvas.getContext("2d");
			}

			if (plotUnit.type === "line")
				animationInfo = this.renderLine(plotUnit);
			else if (plotUnit.type === "stepLine")
				animationInfo = this.renderStepLine(plotUnit);
			else if (plotUnit.type === "spline")
				animationInfo = this.renderSpline(plotUnit);
			else if (plotUnit.type === "column")
				animationInfo = this.renderColumn(plotUnit);
			else if (plotUnit.type === "bar")
				animationInfo = this.renderBar(plotUnit);
			else if (plotUnit.type === "area")
				animationInfo = this.renderArea(plotUnit);
			else if (plotUnit.type === "stepArea")
				animationInfo = this.renderStepArea(plotUnit);
			else if (plotUnit.type === "splineArea")
				animationInfo = this.renderSplineArea(plotUnit);
			else if (plotUnit.type === "stackedColumn")
				animationInfo = this.renderStackedColumn(plotUnit);
			else if (plotUnit.type === "stackedColumn100")
				animationInfo = this.renderStackedColumn100(plotUnit);
			else if (plotUnit.type === "stackedBar")
				animationInfo = this.renderStackedBar(plotUnit);
			else if (plotUnit.type === "stackedBar100")
				animationInfo = this.renderStackedBar100(plotUnit);
			else if (plotUnit.type === "stackedArea")
				animationInfo = this.renderStackedArea(plotUnit);
			else if (plotUnit.type === "stackedArea100")
				animationInfo = this.renderStackedArea100(plotUnit);
			else if (plotUnit.type === "bubble")
				animationInfo = animationInfo = this.renderBubble(plotUnit);
			else if (plotUnit.type === "scatter")
				animationInfo = this.renderScatter(plotUnit);
			else if (plotUnit.type === "pie")
				this.renderPie(plotUnit);
			else if (plotUnit.type === "doughnut")
				this.renderPie(plotUnit);
			else if (plotUnit.type === "candlestick")
				animationInfo = this.renderCandlestick(plotUnit);
			else if (plotUnit.type === "ohlc")
				animationInfo = this.renderCandlestick(plotUnit);
			else if (plotUnit.type === "rangeColumn")
				animationInfo = this.renderRangeColumn(plotUnit);
			else if (plotUnit.type === "rangeBar")
				animationInfo = this.renderRangeBar(plotUnit);
			else if (plotUnit.type === "rangeArea")
				animationInfo = this.renderRangeArea(plotUnit);
			else if (plotUnit.type === "rangeSplineArea")
				animationInfo = this.renderRangeSplineArea(plotUnit);

			for (var k = 0; k < plotUnit.dataSeriesIndexes.length; k++) {
				this._dataInRenderedOrder.push(this.data[plotUnit.dataSeriesIndexes[k]]);
			}

			if (this.animatedRender && animationInfo)
				animations.push(animationInfo);
		}
	}

	if (this.animatedRender && this._indexLabels.length > 0) {
		var indexLabelCanvas = createCanvas(this.width, this.height);
		var indexLabelCanvasCtx = indexLabelCanvas.getContext("2d");
		animations.push(this.renderIndexLabels(indexLabelCanvasCtx));
	}

	var _this = this;

	if (animations.length > 0) {
		//var animationCount = 0;
		_this.disableToolTip = true;
		_this._animator.animate(200, _this.animationDuration, function (fractionComplete) {

			//console.log(fractionComplete);
			//animationCount++;

			_this.ctx.clearRect(0, 0, _this.width, _this.height);


			//  _this.ctx.drawImage(initialState, 0, 0, _this.width * devicePixelBackingStoreRatio, _this.height * devicePixelBackingStoreRatio, 0, 0, _this.width, _this.height);
			_this.ctx.drawImage(initialState, 0, 0, Math.floor(_this.width * devicePixelBackingStoreRatio), Math.floor(_this.height * devicePixelBackingStoreRatio), 0, 0, _this.width, _this.height);

			for (var l = 0; l < animations.length; l++) {

				animationInfo = animations[l];

				if (fractionComplete < 1 && typeof (animationInfo.startTimePercent) !== "undefined") {
					if (fractionComplete >= animationInfo.startTimePercent) {
						//animationInfo.animationCallback(AnimationHelper.easing.linear(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo);

						animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo);
					}
				} else {

					animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete, 0, 1, 1), animationInfo);
				}
			}

			_this.dispatchEvent("dataAnimationIterationEnd",
								{
									chart: _this
								});

		}, function () {

			animations = [];

			var count = 0;

			//Delete all render target canvases used for animation.
			for (var i = 0; i < _this.plotInfo.plotTypes.length; i++) {
				var plotType = _this.plotInfo.plotTypes[i];

				for (var j = 0; j < plotType.plotUnits.length; j++) {
					var plotUnit = plotType.plotUnits[j];
					plotUnit.targetCanvas = null;
				}
			}

			initialState = null;
			_this.disableToolTip = false;
			//console.log("*********** Animation Complete - " + animationCount + " ***********");

		});
	} else {
		if (_this._indexLabels.length > 0)
			_this.renderIndexLabels();

		_this.dispatchEvent("dataAnimationIterationEnd",
				{
					chart: _this
				});
	}

	this.attachPlotAreaEventHandlers();

	if (!this.zoomEnabled && !this.panEnabled && this._zoomButton && this._zoomButton.style.display !== "none") {
		hide(this._zoomButton, this._resetButton);
	}

	this._toolTip._updateToolTip();

	this.renderCount++;

	//if (window.console) {
	//    window.console.log(new Date().getTime() - dt);
	//}

	if (isDebugMode) {

		var _this = this;
		setTimeout(function () {
			var ghostCanvasCopy = document.getElementById("ghostCanvasCopy");

			if (ghostCanvasCopy) {
				//console.log(ghostCanvasCopy.clientWidth);
				setCanvasSize(ghostCanvasCopy, _this.width, _this.height);
				var ghostCanvasCopyCtx = ghostCanvasCopy.getContext("2d");

				//ghostCanvasCopyCtx.scale(1, 1);
				//var imageData = this._eventManager.ghostCtx.getImageData(0, 0, this._container.clientWidth, this._container.clientHeight);
				//this._eventManager.ghostCtx.drawImage(this._eventManager.ghostCanvas, 0, 0);
				//this.ctx.drawImage(this._eventManager.ghostCanvas, 0, 0);

				ghostCanvasCopyCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
				//_this._canvasJSContainer.appendChild(_this._eventManager.ghostCanvas);
				//_this.overlaidCanvasCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
			}
		}, 2000);
	}
}

Chart.prototype.attachPlotAreaEventHandlers = function () {

	//this._toolBar.style.display = "inline";

	this.attachEvent({
		context: this,
		chart: this,
		mousedown: this._plotAreaMouseDown,
		mouseup: this._plotAreaMouseUp,
		mousemove: this._plotAreaMouseMove,
		cursor: this.zoomEnabled ? "col-resize" : "move",
		cursor: this.panEnabled ? "move" : "default",
		capture: true,
		bounds: this.plotArea
	});

}

Chart.prototype.categoriseDataSeries = function () {
	var dataSeries = "";

	for (var i = 0; i < this.data.length; i++) {
		dataSeries = this.data[i]
		if (!dataSeries.dataPoints || dataSeries.dataPoints.length === 0 || !dataSeries.visible)
			continue;

		if (Chart._supportedChartTypes.indexOf(dataSeries.type) >= 0) {

			var plotType = null;
			var plotTypeExists = false;

			var plotUnit = null;
			var plotUnitExists = false;

			for (var j = 0; j < this.plotInfo.plotTypes.length; j++) {
				if (this.plotInfo.plotTypes[j].type === dataSeries.type) {
					plotTypeExists = true;
					var plotType = this.plotInfo.plotTypes[j];
					break;
				}
			}

			if (!plotTypeExists) {
				plotType = {
					type: dataSeries.type,
					totalDataSeries: 0,
					plotUnits: []
				};
				this.plotInfo.plotTypes.push(plotType)
			}

			for (var j = 0; j < plotType.plotUnits.length; j++) {
				if (plotType.plotUnits[j].axisYType === dataSeries.axisYType) {
					plotUnitExists = true;
					var plotUnit = plotType.plotUnits[j];
					break;
				}
			}

			if (!plotUnitExists) {
				plotUnit = {
					type: dataSeries.type,
					previousDataSeriesCount: 0, //to be set next
					index: plotType.plotUnits.length,
					plotType: plotType,
					axisYType: dataSeries.axisYType,
					axisY: dataSeries.axisYType === "primary" ? this.axisY : this.axisY2,
					axisX: this.axisX,
					dataSeriesIndexes: [], //index of dataSeries
					yTotals: []
				}
				plotType.plotUnits.push(plotUnit);
			}

			plotType.totalDataSeries++;

			plotUnit.dataSeriesIndexes.push(i);

			dataSeries.plotUnit = plotUnit;
		}
	}

	for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
		var plotType = this.plotInfo.plotTypes[i];
		var previousDataSeriesCount = 0;

		for (var j = 0; j < plotType.plotUnits.length; j++) {

			plotType.plotUnits[j].previousDataSeriesCount = previousDataSeriesCount;

			previousDataSeriesCount += plotType.plotUnits[j].dataSeriesIndexes.length;
		}
	}
}

Chart.prototype.assignIdToDataPoints = function () {

	for (var i = 0; i < this.data.length; i++) {
		var dataSeries = this.data[i];

		if (!dataSeries.dataPoints)
			continue;

		var length = dataSeries.dataPoints.length;

		for (var j = 0; j < length; j++) {
			dataSeries.dataPointIds[j] = ++this._eventManager.lastObjectId;
		}
	}
}

Chart.prototype._processData = function () {
	this.assignIdToDataPoints();
	this.categoriseDataSeries();

	for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
		var plotType = this.plotInfo.plotTypes[i];

		for (var j = 0; j < plotType.plotUnits.length; j++) {

			var plotUnit = plotType.plotUnits[j];

			if (plotUnit.type === "line" || plotUnit.type === "stepLine" || plotUnit.type === "spline" || plotUnit.type === "column" || plotUnit.type === "area" || plotUnit.type === "stepArea" || plotUnit.type === "splineArea" || plotUnit.type === "bar" || plotUnit.type === "bubble" || plotUnit.type === "scatter")
				this._processMultiseriesPlotUnit(plotUnit);
			else if (plotUnit.type === "stackedColumn" || plotUnit.type === "stackedBar" || plotUnit.type === "stackedArea")
				this._processStackedPlotUnit(plotUnit);
			else if (plotUnit.type === "stackedColumn100" || plotUnit.type === "stackedBar100" || plotUnit.type === "stackedArea100")
				this._processStacked100PlotUnit(plotUnit);
			else if (plotUnit.type === "candlestick" || plotUnit.type === "ohlc" || plotUnit.type === "rangeColumn" || plotUnit.type === "rangeBar" || plotUnit.type === "rangeArea" || plotUnit.type === "rangeSplineArea")
				this._processMultiYPlotUnit(plotUnit);
		}
	}

}

Chart.prototype._processMultiseriesPlotUnit = function (plotUnit) {
	if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
		return;

	var axisYDataInfo = plotUnit.axisY.dataInfo;
	var axisXDataInfo = plotUnit.axisX.dataInfo;
	var dataPointX, dataPointY;
	var isDateTime = false;


	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
		var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
		var i = 0;
		var isFirstDPInViewPort = false;
		var isLastDPInViewPort = false;

		if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

			var plotAreaXMin = this.sessionVariables.axisX.newViewportMinimum ? this.sessionVariables.axisX.newViewportMinimum : (this._options.axisX && this._options.axisX.viewportMinimum) ?
				this._options.axisX.viewportMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;

			var plotAreaXMax = this.sessionVariables.axisX.newViewportMaximum ? this.sessionVariables.axisX.newViewportMaximum : (this._options.axisX && this._options.axisX.viewportMaximum) ?
				this._options.axisX.viewportMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
		}


		if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
			isDateTime = true;
		}

		for (i = 0; i < dataSeries.dataPoints.length; i++) {

			if (typeof dataSeries.dataPoints[i].x === "undefined") {
				dataSeries.dataPoints[i].x = i;
			}

			if (dataSeries.dataPoints[i].x.getTime) {
				isDateTime = true;
				dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
			}
			else
				dataPointX = dataSeries.dataPoints[i].x;

			dataPointY = dataSeries.dataPoints[i].y;


			if (dataPointX < axisXDataInfo.min)
				axisXDataInfo.min = dataPointX;
			if (dataPointX > axisXDataInfo.max)
				axisXDataInfo.max = dataPointX;

			if (dataPointY < axisYDataInfo.min)
				axisYDataInfo.min = dataPointY;

			if (dataPointY > axisYDataInfo.max)
				axisYDataInfo.max = dataPointY;


			if (i > 0) {
				var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
				xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

				if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
					axisXDataInfo.minDiff = xDiff;
				}

				if (dataPointY !== null && dataSeries.dataPoints[i - 1].y !== null) {
					var yDiff = dataPointY - dataSeries.dataPoints[i - 1].y;
					yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

					if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
						axisYDataInfo.minDiff = yDiff;
			}
				}
			}

			// This section makes sure that partially visible dataPoints are included in the begining
			if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
				continue;
			} else if (!isFirstDPInViewPort) {
				isFirstDPInViewPort = true;

				if (i > 0) {
					i -= 2;
					continue;
				}
			}

			// This section makes sure that partially visible dataPoints are included at the end
			if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
				isLastDPInViewPort = true;
			} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
				continue;
			}

			if (dataSeries.dataPoints[i].label)
				plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


			if (dataPointX < axisXDataInfo.viewPortMin)
				axisXDataInfo.viewPortMin = dataPointX;
			if (dataPointX > axisXDataInfo.viewPortMax)
				axisXDataInfo.viewPortMax = dataPointX;

			if (dataPointY === null)
				continue;

			if (dataPointY < axisYDataInfo.viewPortMin)
				axisYDataInfo.viewPortMin = dataPointY;
			if (dataPointY > axisYDataInfo.viewPortMax)
				axisYDataInfo.viewPortMax = dataPointY;
		}

		this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
	}

	//this.dataPoints.sort(compareDataPointX);
	//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
}

Chart.prototype._processStackedPlotUnit = function (plotUnit) {

	if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
		return;

	var axisYDataInfo = plotUnit.axisY.dataInfo;
	var axisXDataInfo = plotUnit.axisX.dataInfo;

	var dataPointX, dataPointY;
	var isDateTime = false;

	var dataPointYPositiveSums = [];
	var dataPointYNegativeSums = [];

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
		var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
		var i = 0;
		var isFirstDPInViewPort = false;
		var isLastDPInViewPort = false;

		if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

			var plotAreaXMin = this.sessionVariables.axisX.newViewportMinimum ? this.sessionVariables.axisX.newViewportMinimum : (this._options.axisX && this._options.axisX.viewportMinimum) ?
				this._options.axisX.viewportMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;

			var plotAreaXMax = this.sessionVariables.axisX.newViewportMaximum ? this.sessionVariables.axisX.newViewportMaximum : (this._options.axisX && this._options.axisX.viewportMaximum) ?
				this._options.axisX.viewportMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
		}


		if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
			isDateTime = true;
		}

		for (i = 0; i < dataSeries.dataPoints.length; i++) {

			// Requird when no x values are provided
			if (typeof dataSeries.dataPoints[i].x === "undefined") {
				dataSeries.dataPoints[i].x = i;
			}

			if (dataSeries.dataPoints[i].x.getTime) {
				isDateTime = true;
				dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
			}
			else
				dataPointX = dataSeries.dataPoints[i].x;

			dataPointY = dataSeries.dataPoints[i].y;



			if (dataPointX < axisXDataInfo.min)
				axisXDataInfo.min = dataPointX;
			if (dataPointX > axisXDataInfo.max)
				axisXDataInfo.max = dataPointX;

			if (i > 0) {
				var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
				xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

				if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
					axisXDataInfo.minDiff = xDiff;
				}

				if (dataPointY !== null && dataSeries.dataPoints[i - 1].y !== null) {
					var yDiff = dataPointY - dataSeries.dataPoints[i - 1].y;
					yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

					if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
						axisYDataInfo.minDiff = yDiff;
			}
				}
			}

			// This section makes sure that partially visible dataPoints are included in the begining
			if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
				continue;
			} else if (!isFirstDPInViewPort) {
				isFirstDPInViewPort = true;

				if (i > 0) {
					i -= 2;
					continue;
				}
			}

			// This section makes sure that partially visible dataPoints are included at the end
			if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
				isLastDPInViewPort = true;
			} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
				continue;
			}


			if (dataSeries.dataPoints[i].label)
				plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

			if (dataPointX < axisXDataInfo.viewPortMin)
				axisXDataInfo.viewPortMin = dataPointX;
			if (dataPointX > axisXDataInfo.viewPortMax)
				axisXDataInfo.viewPortMax = dataPointX;

			if (dataPointY === null)
				continue;

			plotUnit.yTotals[dataPointX] = (!plotUnit.yTotals[dataPointX] ? 0 : plotUnit.yTotals[dataPointX]) + Math.abs(dataPointY);

			if (dataPointY >= 0) {
				if (dataPointYPositiveSums[dataPointX])
					dataPointYPositiveSums[dataPointX] += dataPointY;
				else
					dataPointYPositiveSums[dataPointX] = dataPointY;
			} else {
				if (dataPointYNegativeSums[dataPointX])
					dataPointYNegativeSums[dataPointX] += dataPointY;
				else
					dataPointYNegativeSums[dataPointX] = dataPointY;
			}
		}

		this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
	}

	for (i in dataPointYPositiveSums) {
		if (dataPointYPositiveSums.hasOwnProperty(i)) {
		if (isNaN(i)) {
			continue;
		}
		var ySum = dataPointYPositiveSums[i];

		if (ySum < axisYDataInfo.min)
			axisYDataInfo.min = ySum;

		if (ySum > axisYDataInfo.max)
			axisYDataInfo.max = ySum;

		if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
			continue;

		if (ySum < axisYDataInfo.viewPortMin)
			axisYDataInfo.viewPortMin = ySum;
		if (ySum > axisYDataInfo.viewPortMax)
			axisYDataInfo.viewPortMax = ySum;
	}

	}

	for (i in dataPointYNegativeSums) {

		if (dataPointYNegativeSums.hasOwnProperty(i)) {
		if (isNaN(i)) {
			continue;
		}

		var ySum = dataPointYNegativeSums[i];

		if (ySum < axisYDataInfo.min)
			axisYDataInfo.min = ySum;

		if (ySum > axisYDataInfo.max)
			axisYDataInfo.max = ySum;

		if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
			continue;

		if (ySum < axisYDataInfo.viewPortMin)
			axisYDataInfo.viewPortMin = ySum;
		if (ySum > axisYDataInfo.viewPortMax)
			axisYDataInfo.viewPortMax = ySum;
	}

	}


	//this.dataPoints.sort(compareDataPointX);
	//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

	//window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
}

Chart.prototype._processStacked100PlotUnit = function (plotUnit) {
	if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
		return;

	var axisYDataInfo = plotUnit.axisY.dataInfo;
	var axisXDataInfo = plotUnit.axisX.dataInfo;

	var dataPointX, dataPointY;
	var isDateTime = false;
	var containsPositiveY = false;
	var containsNegativeY = false;

	var dataPointYSums = [];

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
		var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
		var i = 0;
		var isFirstDPInViewPort = false;
		var isLastDPInViewPort = false;

		if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

			var plotAreaXMin = this.sessionVariables.axisX.newViewportMinimum ? this.sessionVariables.axisX.newViewportMinimum : (this._options.axisX && this._options.axisX.viewportMinimum) ?
				this._options.axisX.viewportMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;

			var plotAreaXMax = this.sessionVariables.axisX.newViewportMaximum ? this.sessionVariables.axisX.newViewportMaximum : (this._options.axisX && this._options.axisX.viewportMaximum) ?
				this._options.axisX.viewportMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
		}


		if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
			isDateTime = true;
		}

		for (i = 0; i < dataSeries.dataPoints.length; i++) {

			// Requird when no x values are provided
			if (typeof dataSeries.dataPoints[i].x === "undefined") {
				dataSeries.dataPoints[i].x = i;
			}

			if (dataSeries.dataPoints[i].x.getTime) {
				isDateTime = true;
				dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
			}
			else
				dataPointX = dataSeries.dataPoints[i].x;

			dataPointY = dataSeries.dataPoints[i].y;



			if (dataPointX < axisXDataInfo.min)
				axisXDataInfo.min = dataPointX;
			if (dataPointX > axisXDataInfo.max)
				axisXDataInfo.max = dataPointX;

			if (i > 0) {
				var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
				xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

				if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
					axisXDataInfo.minDiff = xDiff;
				}

				if (dataPointY !== null && dataSeries.dataPoints[i - 1].y !== null) {
					var yDiff = dataPointY - dataSeries.dataPoints[i - 1].y;
					yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

					if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
						axisYDataInfo.minDiff = yDiff;
			}
				}
			}

			// This section makes sure that partially visible dataPoints are included in the begining
			if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
				continue;
			} else if (!isFirstDPInViewPort) {
				isFirstDPInViewPort = true;

				if (i > 0) {
					i -= 2;
					continue;
				}
			}

			// This section makes sure that partially visible dataPoints are included at the end
			if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
				isLastDPInViewPort = true;
			} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
				continue;
			}

			if (dataSeries.dataPoints[i].label)
				plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

			if (dataPointX < axisXDataInfo.viewPortMin)
				axisXDataInfo.viewPortMin = dataPointX;
			if (dataPointX > axisXDataInfo.viewPortMax)
				axisXDataInfo.viewPortMax = dataPointX;

			if (dataPointY === null)
				continue;

			plotUnit.yTotals[dataPointX] = (!plotUnit.yTotals[dataPointX] ? 0 : plotUnit.yTotals[dataPointX]) + Math.abs(dataPointY);

			if (dataPointY >= 0) {
				containsPositiveY = true;
			} else {
				containsNegativeY = true;
			}

			if (dataPointYSums[dataPointX])
				dataPointYSums[dataPointX] += Math.abs(dataPointY);
			else
				dataPointYSums[dataPointX] = Math.abs(dataPointY);
		}

		this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
	}


	if (containsPositiveY && !containsNegativeY) {
		axisYDataInfo.max = 99;
		axisYDataInfo.min = 1;
	} else if (containsPositiveY && containsNegativeY) {
		axisYDataInfo.max = 99;
		axisYDataInfo.min = -99;
	} else if (!containsPositiveY && containsNegativeY) {
		axisYDataInfo.max = -1;
		axisYDataInfo.min = -99;
	}

	axisYDataInfo.viewPortMin = axisYDataInfo.min;
	axisYDataInfo.viewPortMax = axisYDataInfo.max;

	plotUnit.dataPointYSums = dataPointYSums;

	//this.dataPoints.sort(compareDataPointX);
	//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

	//window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
}

Chart.prototype._processMultiYPlotUnit = function (plotUnit) {
	if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
		return;

	var axisYDataInfo = plotUnit.axisY.dataInfo;
	var axisXDataInfo = plotUnit.axisX.dataInfo;
	var dataPointX, dataPointY, dataPointYMin, dataPointYMax;
	var isDateTime = false;


	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
		var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
		var i = 0;
		var isFirstDPInViewPort = false;
		var isLastDPInViewPort = false;

		if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

			var plotAreaXMin = this.sessionVariables.axisX.newViewportMinimum ? this.sessionVariables.axisX.newViewportMinimum : (this._options.axisX && this._options.axisX.viewportMinimum) ?
				this._options.axisX.viewportMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;

			var plotAreaXMax = this.sessionVariables.axisX.newViewportMaximum ? this.sessionVariables.axisX.newViewportMaximum : (this._options.axisX && this._options.axisX.viewportMaximum) ?
				this._options.axisX.viewportMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
		}


		if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
			isDateTime = true;
		}

		for (i = 0; i < dataSeries.dataPoints.length; i++) {

			if (typeof dataSeries.dataPoints[i].x === "undefined") {
				dataSeries.dataPoints[i].x = i;
			}

			if (dataSeries.dataPoints[i].x.getTime) {
				isDateTime = true;
				dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
			}
			else
				dataPointX = dataSeries.dataPoints[i].x;

			dataPointY = dataSeries.dataPoints[i].y;

			if (dataPointY && dataPointY.length) {
				dataPointYMin = Math.min.apply(null, dataPointY);
				dataPointYMax = Math.max.apply(null, dataPointY);
			}


			if (dataPointX < axisXDataInfo.min)
				axisXDataInfo.min = dataPointX;
			if (dataPointX > axisXDataInfo.max)
				axisXDataInfo.max = dataPointX;

			if (dataPointYMin < axisYDataInfo.min)
				axisYDataInfo.min = dataPointYMin;

			if (dataPointYMax > axisYDataInfo.max)
				axisYDataInfo.max = dataPointYMax;


			if (i > 0) {
				var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
				xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

				if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
					axisXDataInfo.minDiff = xDiff;
				}

				if (dataPointY[0] !== null && dataSeries.dataPoints[i - 1].y[0] !== null) {
					var yDiff = dataPointY[0] - dataSeries.dataPoints[i - 1].y[0];
					yDiff < 0 && (yDiff = yDiff * -1); //If Condition shortcut

					if (axisYDataInfo.minDiff > yDiff && yDiff !== 0) {
						axisYDataInfo.minDiff = yDiff;
			}
				}
			}

			// This section makes sure that partially visible dataPoints are included in the begining
			if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
				continue;
			} else if (!isFirstDPInViewPort) {
				isFirstDPInViewPort = true;

				if (i > 0) {
					i -= 2;
					continue;
				}
			}

			// This section makes sure that partially visible dataPoints are included at the end
			if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
				isLastDPInViewPort = true;
			} else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
				continue;
			}

			if (dataSeries.dataPoints[i].label)
				plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


			if (dataPointX < axisXDataInfo.viewPortMin)
				axisXDataInfo.viewPortMin = dataPointX;
			if (dataPointX > axisXDataInfo.viewPortMax)
				axisXDataInfo.viewPortMax = dataPointX;

			if (dataPointY === null)
				continue;

			if (dataPointYMin < axisYDataInfo.viewPortMin)
				axisYDataInfo.viewPortMin = dataPointYMin;
			if (dataPointYMax > axisYDataInfo.viewPortMax)
				axisYDataInfo.viewPortMax = dataPointYMax;
		}

		this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
	}

	//this.dataPoints.sort(compareDataPointX);
	//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
}

//getClosest returns objects nearby and hence shouldn't be used for events like click, mouseover, mousemove, etc which require object that is exactly under the mouse.
Chart.prototype.getDataPointAtXY = function (mouseX, mouseY, getClosest) {

	getClosest = getClosest || false;
	var results = [];

	for (var i = this._dataInRenderedOrder.length - 1; i >= 0; i--) {
		var dataSeries = this._dataInRenderedOrder[i];

		var result = null;

		result = dataSeries.getDataPointAtXY(mouseX, mouseY, getClosest);
		if (result)
			results.push(result);
	}

	var closestResult = null;
	var onlyLineAreaTypes = false;

	for (var m = 0; m < results.length; m++) {

		if (results[m].dataSeries.type === "line" || results[m].dataSeries.type === "stepLine" || results[m].dataSeries.type === "area" || results[m].dataSeries.type === "stepArea") {
			var markerSize = getProperty("markerSize", results[m].dataPoint, results[m].dataSeries) || 8;
			if (results[m].distance <= markerSize / 2) {
				onlyLineAreaTypes = true;
				break;
			}
		}
	}

	for (m = 0; m < results.length; m++) {

		if (onlyLineAreaTypes && results[m].dataSeries.type !== "line" && results[m].dataSeries.type !== "stepLine" && results[m].dataSeries.type !== "area" && results[m].dataSeries.type !== "stepArea")
			continue;

		if (!closestResult) {
			closestResult = results[m];
		} else if (results[m].distance <= closestResult.distance) {
			closestResult = results[m];
		}
	}

	return closestResult;
}

Chart.prototype.getObjectAtXY = function (mouseX, mouseY, getClosest) {
	getClosest = getClosest || false;

	var id = null;

	var dataPointInfo = this.getDataPointAtXY(mouseX, mouseY, getClosest);

	if (dataPointInfo) {
		id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
	} else if (isCanvasSupported) {//IE9+
		id = getObjectId(mouseX, mouseY, this._eventManager.ghostCtx);
	}
	else {
		for (var i = 0; i < this.legend.items.length; i++) {
			var item = this.legend.items[i];

			if (mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2) {
				id = item.id;
			}
		}
	}

	return id;
}

/// <summary>Calculates Font Size based on standardSize and Chart Size</summary>
/// <param name="standardSize" type="Number">Standard font size for a Chart with min(width,height) = 400px</param>
/// <returns type="Number">The area.</returns>
Chart.prototype.getAutoFontSize = function (standardSize, width, height) {

	width = width || this.width;
	height = height || this.height;

	var fontSizeScaleFactor = standardSize / 400;

	return Math.round(Math.min(this.width, this.height) * fontSizeScaleFactor);
}

//#region Events

Chart.prototype.resetOverlayedCanvas = function () {
	//var width = this.overlaidCanvas.width;
	//this.overlaidCanvas.width = 0;
	//this.overlaidCanvas.width = width;
	this.overlaidCanvasCtx.clearRect(0, 0, this.width, this.height);
}

Chart.prototype.clearCanvas = function () {
	this.ctx.clearRect(0, 0, this.width, this.height);

	if (this.backgroundColor) {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}

Chart.prototype.attachEvent = function (param) {
	this._events.push(param);
}

Chart.prototype._touchEventHandler = function (ev) {
	if (!ev.changedTouches || !this.interactivityEnabled)
		return;

	var mouseEvents = [];
	var touches = ev.changedTouches;
	var first = touches ? touches[0] : ev;
	var touchCurrentCoordinates = null;

	//window.console.log(touches.length);

	switch (ev.type) {
		case "touchstart": case "MSPointerDown":
			mouseEvents = ["mousemove", "mousedown"];
			this._lastTouchData = getMouseCoordinates(first);
			this._lastTouchData.time = new Date();
			break;
		case "touchmove": case "MSPointerMove": mouseEvents = ["mousemove"]; break;
		case "touchend": case "MSPointerUp": mouseEvents = (this._lastTouchEventType === "touchstart" || this._lastTouchEventType === "MSPointerDown") ? ["mouseup", "click"] : ["mouseup"];
			break;
		default: return;
	}

	if (touches && touches.length > 1) return;


	touchCurrentCoordinates = getMouseCoordinates(first);
	touchCurrentCoordinates.time = new Date();
	try {
		var dy = touchCurrentCoordinates.y - this._lastTouchData.y;
		var dx = touchCurrentCoordinates.x - this._lastTouchData.x;
		var dt = touchCurrentCoordinates.time - this._lastTouchData.time;

		if (Math.abs(dy) > 15 && (!!this._lastTouchData.scroll || dt < 200)) {
			//this._lastTouchData.y = touchCurrentCoordinates.y;
			this._lastTouchData.scroll = true;

			var win = window.parent || window;
			if (win && win.scrollBy)
				win.scrollBy(0, -dy);
		}
	} catch (e) { };

	this._lastTouchEventType = ev.type;

	if (!!this._lastTouchData.scroll && this.zoomEnabled) {
		if (this.isDrag)
			this.resetOverlayedCanvas();

		this.isDrag = false;
		return;
	}

	for (var i = 0; i < mouseEvents.length; i++) {

		var type = mouseEvents[i];
		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1,
								  first.screenX, first.screenY,
								  first.clientX, first.clientY, false,
								  false, false, false, 0, null);

		first.target.dispatchEvent(simulatedEvent);

		if (ev.preventManipulation) {
			//alert("preventManipulation");
			ev.preventManipulation();
		}

		if (ev.preventDefault) {
			//alert("preventDefault");
			ev.preventDefault();
		}
	}
}

Chart.prototype._dispatchRangeEvent = function (eventName, triggerSource) {
	var eventParameter = {};

	eventParameter.chart = this._publicChartReference;
	eventParameter.type = eventName;
	eventParameter.trigger = triggerSource;

	var axes = [];

	if (this.axisX)
		axes.push("axisX");
	if (this.axisY)
		axes.push("axisY");
	if (this.axisY2)
		axes.push("axisY2");

	for (var i = 0; i < axes.length; i++) {
		eventParameter[axes[i]] = {
			viewportMinimum: this[axes[i]].sessionVariables.newViewportMinimum,
			viewportMaximum: this[axes[i]].sessionVariables.newViewportMaximum
		}
	}

	this.dispatchEvent(eventName, eventParameter, this._publicChartReference);
}

Chart.prototype._mouseEventHandler = function (ev) {

	if (!this.interactivityEnabled)
		return;

	if (this._ignoreNextEvent) {
		this._ignoreNextEvent = false;
		return;
	}

	// stop panning and zooming so we can draw
	if (ev.preventManipulation) {
		//alert("preventManipulation");
		ev.preventManipulation();
	}

	// we are handling this event
	if (ev.preventDefault) {
		//alert("preventDefault");
		ev.preventDefault();
	}

	//IE8- uses srcElement instead of target. So instead of checking this condition everytime, its better to create a reference called target.
	if (typeof (ev.target) === "undefined" && ev.srcElement)
		ev.target = ev.srcElement;

	//console.log(ev.type);

	var xy = getMouseCoordinates(ev);
	var type = ev.type;
	var eventParam;
	var rightclick;

	if (!ev) var e = window.event;
	if (ev.which) rightclick = (ev.which == 3);
	else if (ev.button) rightclick = (ev.button == 2);

	//window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);

	//if (type === "mouseout") {
	//    this._toolTip.hide();
	//}

	if (isDebugMode && window.console) {
		window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);
		if (rightclick)
			window.console.log(ev.which);

		if (type === "mouseup")
			window.console.log("mouseup");
	}

	if (rightclick)
		return;

	//if (this.plotInfo.axisPlacement === "xySwapped") {
	//    //var temp = xy.x;
	//    //xy.x = xy.y;
	//    //xy.y = temp;
	//    xy = {x: xy.y, y: xy.x};
	//}

	if (Chart.capturedEventParam) {
		eventParam = Chart.capturedEventParam;

		if (type === "mouseup") {
			Chart.capturedEventParam = null;

			if (eventParam.chart.overlaidCanvas.releaseCapture)
				eventParam.chart.overlaidCanvas.releaseCapture();
			else
				document.body.removeEventListener("mouseup", eventParam.chart._mouseEventHandler, false);

		}

		if (eventParam.hasOwnProperty(type))
			eventParam[type].call(eventParam.context, xy.x, xy.y);



	}
	else if (this._events) {

		for (var i = 0; i < this._events.length; i++) {
			if (!this._events[i].hasOwnProperty(type))
				continue;

			eventParam = this._events[i];
			var bounds = eventParam.bounds;

			if (xy.x >= bounds.x1 && xy.x <= bounds.x2 && xy.y >= bounds.y1 && xy.y <= bounds.y2) {
				eventParam[type].call(eventParam.context, xy.x, xy.y);

				if (type === "mousedown" && eventParam.capture === true) {
					Chart.capturedEventParam = eventParam;

					if (this.overlaidCanvas.setCapture)
						this.overlaidCanvas.setCapture();
					else {
						document.body.addEventListener("mouseup", this._mouseEventHandler, false);
						//addEvent(document.body, "mouseup", this._mouseEventHandler);
					}
				} else if (type === "mouseup") {
					if (eventParam.chart.overlaidCanvas.releaseCapture)
						eventParam.chart.overlaidCanvas.releaseCapture();
					else
						document.body.removeEventListener("mouseup", this._mouseEventHandler, false);
				}

				break;
			}
			else
				eventParam = null;
		}

		if (eventParam && eventParam.cursor) {
			ev.target.style.cursor = eventParam.cursor;
		}
		else
			ev.target.style.cursor = this._defaultCursor;

		//eventParam =
	}

	if (this._toolTip && this._toolTip.enabled) {

		var plotArea = this.plotArea;

		if (xy.x < plotArea.x1 || xy.x > plotArea.x2 || xy.y < plotArea.y1 || xy.y > plotArea.y2)
			this._toolTip.hide();
	}


	if ((!this.isDrag || !this.zoomEnabled) && this._eventManager) {

		this._eventManager.mouseEventHandler(ev);
		//this._updateToolTip(ev.x, ev.y);
	}

	//if (this._toolTip.enabled)
	//    this._toolTip.mouseMoveHandler(ev.x, ev.y);
}

Chart.prototype._plotAreaMouseDown = function (x, y) {
	this.isDrag = true;

	if (this.plotInfo.axisPlacement !== "none") {
		this.dragStartPoint = { x: x, y: y };
	} else {
		this.dragStartPoint = { x: x, y: y };
	}
}

Chart.prototype._plotAreaMouseUp = function (x, y) {

	if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
		if (this.isDrag) {
			var dragDelta = 0,
				dragDeltaPY = y - this.dragStartPoint.y,
				dragDeltaPX = x - this.dragStartPoint.x,
				zoomPX = this.zoomType.indexOf("x") >= 0, //Whether to zoom horizontally
				zoomPY = this.zoomType.indexOf("y") >= 0, //Whether to zoom vertically
				reRender = false;

			this.resetOverlayedCanvas();

			if (this.plotInfo.axisPlacement === "xySwapped") {
				var temp = zoomPY;
				zoomPY = zoomPX;
				zoomPX = temp;
			}

			if (this.panEnabled || this.zoomEnabled) {
				if (this.panEnabled) {

					var overflow = 0;

					for (var i = 0; i < this._axes.length; i++) {
						var axis = this._axes[i];

						if (axis.viewportMinimum < axis.minimum) {

							overflow = axis.minimum - axis.viewportMinimum;

							axis.sessionVariables.newViewportMinimum = axis.viewportMinimum + overflow;
							axis.sessionVariables.newViewportMaximum = axis.viewportMaximum + overflow;

						reRender = true;
						} else if (axis.viewportMaximum > axis.maximum) {

							overflow = axis.viewportMaximum - axis.maximum;
							axis.sessionVariables.newViewportMinimum = axis.viewportMinimum - overflow;
							axis.sessionVariables.newViewportMaximum = axis.viewportMaximum - overflow;

						reRender = true;
					}
					}

				}
				else if (((!zoomPX || Math.abs(dragDeltaPX) > 2) && (!zoomPY || Math.abs(dragDeltaPY) > 2)) && this.zoomEnabled) {

					if (!this.dragStartPoint)
						return;

					var selectedRegion = {
						x1: zoomPX ? this.dragStartPoint.x : this.plotArea.x1,
						y1: zoomPY ? this.dragStartPoint.y : this.plotArea.y1,
						x2: zoomPX ? x : this.plotArea.x2,
						y2: zoomPY ? y : this.plotArea.y2
					};

					if (Math.abs(selectedRegion.x1 - selectedRegion.x2) > 2 && Math.abs(selectedRegion.y1 - selectedRegion.y2) > 2) {

						if (this._zoomPanToSelectedRegion(selectedRegion.x1, selectedRegion.y1, selectedRegion.x2, selectedRegion.y2)) {

							reRender = true;

								}
							}
						}

				if (reRender) {
					this._ignoreNextEvent = true;//Required so that click event doesn't fire after zooming into a section of the chart.

					this._dispatchRangeEvent("rangeChanging", "zoom");
								this.render();
					this._dispatchRangeEvent("rangeChanged", "zoom");

					if (reRender && this.zoomEnabled && this._zoomButton.style.display === "none") {
					show(this._zoomButton, this._resetButton);
					setButtonState(this, this._zoomButton, "pan");
					setButtonState(this, this._resetButton, "reset");
				}
			}
		}
		}

	}

	this.isDrag = false;
}

Chart.prototype._plotAreaMouseMove = function (x, y) {
	if (this.isDrag && this.plotInfo.axisPlacement !== "none") {

		var dragDeltaPX = 0,
			dragDeltaPY = 0,
			alpha = null,
			selectedRegion = null,
			zoomPX = this.zoomType.indexOf("x") >= 0, //Whether to zoom horizontally
			zoomPY = this.zoomType.indexOf("y") >= 0, //Whether to zoom vertically
			_this = this;

		if (this.plotInfo.axisPlacement === "xySwapped") {
			var temp = zoomPY;
			zoomPY = zoomPX;
			zoomPX = temp;
		}

		dragDeltaPX = this.dragStartPoint.x - x;
		dragDeltaPY = this.dragStartPoint.y - y;

		if (Math.abs(dragDeltaPX) > 2 && Math.abs(dragDeltaPX) < 8 && (this.panEnabled || this.zoomEnabled)) {
			this._toolTip.hide();
		} else if (!this.panEnabled && !this.zoomEnabled) {
			this._toolTip.mouseMoveHandler(x, y);
		}

		if (((!zoomPX || Math.abs(dragDeltaPX) > 2) || (!zoomPY || Math.abs(dragDeltaPY) > 2)) && (this.panEnabled || this.zoomEnabled)) {
			if (this.panEnabled) {

				selectedRegion =
					{
						x1: zoomPX ? this.plotArea.x1 + dragDeltaPX : this.plotArea.x1,
						y1: zoomPY ? this.plotArea.y1 + dragDeltaPY : this.plotArea.y1,
						x2: zoomPX ? this.plotArea.x2 + dragDeltaPX : this.plotArea.x2,
						y2: zoomPY ? this.plotArea.y2 + dragDeltaPY : this.plotArea.y2
					};

				if (this._zoomPanToSelectedRegion(selectedRegion.x1, selectedRegion.y1, selectedRegion.x2, selectedRegion.y2, true)) {
					this._dispatchRangeEvent("rangeChanging", "pan");
					this.render();
					this._dispatchRangeEvent("rangeChanged", "pan");

					this.dragStartPoint.x = x;
					this.dragStartPoint.y = y;

					//clearTimeout(this._panTimerId);
					//this._panTimerId = setTimeout(function () {
					//	_this._dispatchRangeEvent("rangeChanging", "pan");
					//	_this.render();
					//	_this._dispatchRangeEvent("rangeChanged", "pan");
					//}, 0);
				}

			} else if (this.zoomEnabled) {

				this.resetOverlayedCanvas();

				alpha = this.overlaidCanvasCtx.globalAlpha;

				this.overlaidCanvasCtx.globalAlpha = .7;
				this.overlaidCanvasCtx.fillStyle = "#A0ABB8";

				var rect = {
					x1: zoomPX ? this.dragStartPoint.x : this.plotArea.x1,
					y1: zoomPY ? this.dragStartPoint.y : this.plotArea.y1,
					x2: zoomPX ? x - this.dragStartPoint.x : this.plotArea.x2 - this.plotArea.x1,
					y2: zoomPY ? y - this.dragStartPoint.y : this.plotArea.y2 - this.plotArea.y1
				};

				this.overlaidCanvasCtx.fillRect(rect.x1, rect.y1, rect.x2, rect.y2);

				this.overlaidCanvasCtx.globalAlpha = alpha;
			}
		}

	} else
		this._toolTip.mouseMoveHandler(x, y);
}

//#endregion Events

//Sets the viewport range of Axis based on the given rect bounds (pixels). Also limits the zooming/panning based on axis bounds. Returns a boolean to indicate whether it was succesful or not based on the selected region.
Chart.prototype._zoomPanToSelectedRegion = function (px1, py1, px2, py2, keepAxisIndependent) {

	keepAxisIndependent = keepAxisIndependent || false;

	var zoomPX = this.zoomType.indexOf("x") >= 0, //Whether to zoom horizontally
		zoomPY = this.zoomType.indexOf("y") >= 0, //Whether to zoom vertically
		validRegion = false;

	var axes = [], axesWithValidRange = [];
	if (this.axisX && zoomPX)
		axes.push(this.axisX);
	if (this.axisY && zoomPY)
		axes.push(this.axisY);
	if (this.axisY2 && zoomPY)
		axes.push(this.axisY2);

	var params = [];

	for (var i = 0; i < axes.length; i++) {
		var axis = axes[i];
		//var range = Math.abs(axis.viewportMaximum - axis.viewportMinimum);

		var val1 = axis.convertPixelToValue({ x: px1, y: py1 });
		var val2 = axis.convertPixelToValue({ x: px2, y: py2 });

		if (val1 > val2) {
			var temp = val2;
			val2 = val1;
			val1 = temp;
		}

		if (isFinite(axis.dataInfo.minDiff)) {
			if (!(Math.abs(val2 - val1) < 3 * Math.abs(axis.dataInfo.minDiff)
			|| (val1 < axis.minimum) || (val2 > axis.maximum))) {
				axesWithValidRange.push(axis);
				params.push({ val1: val1, val2: val2 });

				validRegion = true;
			} else if (!keepAxisIndependent) {
				validRegion = false;
				break;
			}
		}
	}

	if (validRegion) {
		for (var i = 0; i < axesWithValidRange.length; i++) {
			var axis = axesWithValidRange[i];
			var param = params[i];

			axis.setViewPortRange(param.val1, param.val2);
		}
	}

	return validRegion;
}

Chart.prototype.preparePlotArea = function () {

	var plotArea = this.plotArea;

	var yAxis = this.axisY ? this.axisY : this.axisY2;

	if (!isCanvasSupported && (plotArea.x1 > 0 || plotArea.y1 > 0)) {
		plotArea.ctx.translate(plotArea.x1, plotArea.y1);
	}

	if (this.axisX && yAxis) {
		plotArea.x1 = this.axisX.lineCoordinates.x1 < this.axisX.lineCoordinates.x2 ? this.axisX.lineCoordinates.x1 : yAxis.lineCoordinates.x1;
		plotArea.y1 = (this.axisX.lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? this.axisX.lineCoordinates.y1 : yAxis.lineCoordinates.y1);

		plotArea.x2 = (this.axisX.lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? this.axisX.lineCoordinates.x2 : yAxis.lineCoordinates.x2);
		plotArea.y2 = this.axisX.lineCoordinates.y2 > this.axisX.lineCoordinates.y1 ? this.axisX.lineCoordinates.y2 : yAxis.lineCoordinates.y2;

		plotArea.width = plotArea.x2 - plotArea.x1;
		plotArea.height = plotArea.y2 - plotArea.y1;
		//plotArea = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
	} else {
		//ToDo: @sunil
		var freeSpace = this.layoutManager.getFreeSpace();
		plotArea.x1 = freeSpace.x1;
		plotArea.x2 = freeSpace.x2;
		plotArea.y1 = freeSpace.y1;
		plotArea.y2 = freeSpace.y2;

		plotArea.width = freeSpace.width;
		plotArea.height = freeSpace.height;
	}

	if (!isCanvasSupported) {

		plotArea.canvas.width = plotArea.width;
		plotArea.canvas.height = plotArea.height;

		plotArea.canvas.style.left = plotArea.x1 + "px";
		plotArea.canvas.style.top = plotArea.y1 + "px";

		if (plotArea.x1 > 0 || plotArea.y1 > 0) {
			plotArea.ctx.translate(-plotArea.x1, -plotArea.y1);
		}
	}

	plotArea.layoutManager = new LayoutManager(plotArea.x1, plotArea.y1, plotArea.x2, plotArea.y2, 2);
}

Chart.prototype.getPixelCoordinatesOnPlotArea = function (x, y) {
	return {
		x: this.axisX.getPixelCoordinatesOnAxis(x).x, y: this.axisY.getPixelCoordinatesOnAxis(y).y
	}
	//return { x: 5, y: 10 };
}

//#region Render Methods

Chart.prototype.renderIndexLabels = function (targetCtx) {
	var ctx = targetCtx || this.plotArea.ctx;

	var plotArea = this.plotArea;

	var mid = 0;
	var yMinLimit = 0;
	var yMaxLimit = 0;
	var xMinLimit = 0;
	var xMaxLimit = 0;
	var marginX = 0, marginY = 0; // Margin between label and dataPoint / PlotArea
	var offSetX = 0, offSetY = 0; // Distance to offSet textBlock (top) from dataPoint inorder to position it
	var visibleWidth = 0;
	var visibleHeight = 0;

	for (var i = 0; i < this._indexLabels.length; i++) {

		var indexLabel = this._indexLabels[i];
		var chartTypeLower = indexLabel.chartType.toLowerCase();

		var x, y, angle;

		var fontColor = getProperty("indexLabelFontColor", indexLabel.dataPoint, indexLabel.dataSeries);
		var fontSize = getProperty("indexLabelFontSize", indexLabel.dataPoint, indexLabel.dataSeries);
		var fontFamily = getProperty("indexLabelFontFamily", indexLabel.dataPoint, indexLabel.dataSeries);
		var fontStyle = getProperty("indexLabelFontStyle", indexLabel.dataPoint, indexLabel.dataSeries);
		var fontWeight = getProperty("indexLabelFontWeight", indexLabel.dataPoint, indexLabel.dataSeries);
		var backgroundColor = getProperty("indexLabelBackgroundColor", indexLabel.dataPoint, indexLabel.dataSeries);
		var maxWidth = getProperty("indexLabelMaxWidth", indexLabel.dataPoint, indexLabel.dataSeries);
		var indexLabelWrap = getProperty("indexLabelWrap", indexLabel.dataPoint, indexLabel.dataSeries);

		var percentAndTotal = {
			percent: null, total: null
		};
		var formatterParameter = null;

		if (indexLabel.dataSeries.type.indexOf("stacked") >= 0 || indexLabel.dataSeries.type === "pie" || indexLabel.dataSeries.type === "doughnut")
			percentAndTotal = this.getPercentAndTotal(indexLabel.dataSeries, indexLabel.dataPoint);

		if (indexLabel.dataSeries.indexLabelFormatter || indexLabel.dataPoint.indexLabelFormatter)
			formatterParameter = {
				chart: this._options, dataSeries: indexLabel.dataSeries, dataPoint: indexLabel.dataPoint, index: indexLabel.indexKeyword, total: percentAndTotal.total, percent: percentAndTotal.percent
			};


		var indexLabelText = indexLabel.dataPoint.indexLabelFormatter ? indexLabel.dataPoint.indexLabelFormatter(formatterParameter)
			: indexLabel.dataPoint.indexLabel ? this.replaceKeywordsWithValue(indexLabel.dataPoint.indexLabel, indexLabel.dataPoint, indexLabel.dataSeries, null, indexLabel.indexKeyword)
			: indexLabel.dataSeries.indexLabelFormatter ? indexLabel.dataSeries.indexLabelFormatter(formatterParameter)
			: indexLabel.dataSeries.indexLabel ? this.replaceKeywordsWithValue(indexLabel.dataSeries.indexLabel, indexLabel.dataPoint, indexLabel.dataSeries, null, indexLabel.indexKeyword) : null;

		if (indexLabelText === null || indexLabelText === "")
			continue;

		var placement = getProperty("indexLabelPlacement", indexLabel.dataPoint, indexLabel.dataSeries);
		var orientation = getProperty("indexLabelOrientation", indexLabel.dataPoint, indexLabel.dataSeries);
		var angle = 0;

		var direction = indexLabel.direction; // +1 for above the point and -1 for below the point

		var axisX = indexLabel.dataSeries.axisX;
		var axisY = indexLabel.dataSeries.axisY;


		var textBlock = new TextBlock(ctx, {
			x: 0,
			y: 0,
			maxWidth: maxWidth ? maxWidth : this.width * .5,
			maxHeight: indexLabelWrap ? fontSize * 5 : fontSize * 1.5,
			angle: orientation === "horizontal" ? 0 : -90,
			text: indexLabelText,
			padding: 0,
			backgroundColor: backgroundColor,
			horizontalAlign: "left",//left, center, right
			fontSize: fontSize,//in pixels
			fontFamily: fontFamily,
			fontWeight: fontWeight, //normal, bold, bolder, lighter,
			fontColor: fontColor,
			fontStyle: fontStyle, // normal, italic, oblique
			textBaseline: "top"
		});

		var textSize = textBlock.measureText();

		//if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || indexLabel.dataPoint.y < axisY.viewportMinimum || indexLabel.dataPoint.y > axisY.viewportMaximum)
		//	continue;

		if (chartTypeLower.indexOf("line") >= 0 || chartTypeLower.indexOf("area") >= 0
				|| chartTypeLower.indexOf("bubble") >= 0 || chartTypeLower.indexOf("scatter") >= 0) {

			if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum || indexLabel.dataPoint.y < axisY.viewportMinimum || indexLabel.dataPoint.y > axisY.viewportMaximum)
				continue;
		}
		else {
			if (indexLabel.dataPoint.x < axisX.viewportMinimum || indexLabel.dataPoint.x > axisX.viewportMaximum)
				continue;
		}

		marginY = 2;
		marginX = 2;

		if (orientation === "horizontal") {
			visibleWidth = textBlock.width;
			visibleHeight = textBlock.height;
		} else {
			visibleHeight = textBlock.width;
			visibleWidth = textBlock.height;
		}

		if (this.plotInfo.axisPlacement === "normal") {

			if (chartTypeLower.indexOf("line") >= 0 || chartTypeLower.indexOf("area") >= 0) {

				placement = "auto";
				marginY = 4;

			} else if (chartTypeLower.indexOf("stacked") >= 0) {

				if (placement === "auto")
					placement = "inside";

			} else if (chartTypeLower === "bubble" || chartTypeLower === "scatter") {

				placement = "inside";

			}

			x = indexLabel.point.x - visibleWidth / 2;

			if (placement !== "inside") {	//outside or auto

				yMinLimit = plotArea.y1;
				yMaxLimit = plotArea.y2;

				if (direction > 0) {
					y = indexLabel.point.y - visibleHeight - marginY;

					if (y < yMinLimit) {
						if (placement === "auto") {
							y = Math.max(indexLabel.point.y, yMinLimit) + marginY;
						}
						else {
							y = yMinLimit + marginY;
						}
					}
				}
				else {
					y = indexLabel.point.y + marginY;

					if (y > yMaxLimit - visibleHeight - marginY) {
						if (placement === "auto") {
							y = Math.min(indexLabel.point.y, yMaxLimit) - visibleHeight - marginY;
						}
						else {
							y = yMaxLimit - visibleHeight - marginY;
						}
					}
				}

			} else {


				yMinLimit = Math.max(indexLabel.bounds.y1, plotArea.y1);
				yMaxLimit = Math.min(indexLabel.bounds.y2, plotArea.y2);


				if (chartTypeLower.indexOf("range") >= 0) {
					if (direction > 0)
						mid = Math.max(indexLabel.bounds.y1, plotArea.y1) + visibleHeight / 2 + marginY;
					else
						mid = Math.min(indexLabel.bounds.y2, plotArea.y2) - visibleHeight / 2 - marginY;
				}
				else
					mid = (Math.max(indexLabel.bounds.y1, plotArea.y1) + Math.min(indexLabel.bounds.y2, plotArea.y2)) / 2

				if (direction > 0) {
					y = Math.max(indexLabel.point.y, mid) - visibleHeight / 2;

					if (y < yMinLimit && (chartTypeLower === "bubble" || chartTypeLower === "scatter")) {
						y = Math.max(indexLabel.point.y - visibleHeight - marginY, plotArea.y1 + marginY);
					}
				}
				else {
					y = Math.min(indexLabel.point.y, mid) - visibleHeight / 2;

					if (y > yMaxLimit - visibleHeight - marginY && (chartTypeLower === "bubble" || chartTypeLower === "scatter")) {
						y = Math.min(indexLabel.point.y + marginY, plotArea.y2 - visibleHeight - marginY);
					}
				}

                  // Make Sure that it does not overlap the axis line
				y = Math.min(y, yMaxLimit - visibleHeight);
			}
		}
		else {

			if (chartTypeLower.indexOf("line") >= 0 || chartTypeLower.indexOf("area") >= 0
				|| chartTypeLower.indexOf("scatter") >= 0) {

				placement = "auto";
				marginX = 4;

			} else if (chartTypeLower.indexOf("stacked") >= 0) {

				if (placement === "auto")
					placement = "inside";

			} else if (chartTypeLower === "bubble") {

				placement = "inside";

			}

			y = indexLabel.point.y - visibleHeight / 2;

			if (placement !== "inside") {	//outside or auto

				xMinLimit = plotArea.x1;
				xMaxLimit = plotArea.x2;

				if (direction < 0) {
					x = indexLabel.point.x - visibleWidth - marginX;

					if (x < xMinLimit) {
						if (placement === "auto") {
							x = Math.max(indexLabel.point.x, xMinLimit) + marginX;
						}
						else {
							x = xMinLimit + marginX;
						}
					}
				}
				else {
					x = indexLabel.point.x + marginX;

					if (x > xMaxLimit - visibleWidth - marginX) {
						if (placement === "auto") {
							x = Math.min(indexLabel.point.x, xMaxLimit) - visibleWidth - marginX;
						}
						else {
							x = xMaxLimit - visibleWidth - marginX;
						}
					}
				}

			} else {

				xMinLimit = Math.max(indexLabel.bounds.x1, plotArea.x1);
				xMaxLimit = Math.min(indexLabel.bounds.x2, plotArea.x2);

				if (chartTypeLower.indexOf("range") >= 0) {
					if (direction < 0)
						mid = Math.max(indexLabel.bounds.x1, plotArea.x1) + visibleWidth / 2 + marginX;
					else
						mid = Math.min(indexLabel.bounds.x2, plotArea.x2) - visibleWidth / 2 - marginX;
				}
				else
					var mid = (Math.max(indexLabel.bounds.x1, plotArea.x1) + Math.min(indexLabel.bounds.x2, plotArea.x2)) / 2;

				if (direction < 0) {
					x = Math.max(indexLabel.point.x, mid) - visibleWidth / 2;

					//if (y < xMinLimit) {
					//	y = Math.max(indexLabel.point.y - visibleHeight - marginY, plotArea.y1 + marginY);
					//}
				}
				else {
					x = Math.min(indexLabel.point.x, mid) - visibleWidth / 2;

					//if (y > xMaxLimit - visibleHeight - marginY) {
					//	y = Math.min(indexLabel.point.y + marginY, plotArea.y2 - visibleHeight - marginY);
					//}
				}

			    // Make Sure that it does not overlap the axis line
			    x = Math.max(x, xMinLimit);
			}
		}


		if (orientation === "vertical") {
			y += visibleHeight;
		}

		textBlock.x = x;
		textBlock.y = y;

		//console.log(textBlock.text + ": " + textBlock.x + "; " + textBlock.y);

		textBlock.render(true);
	}

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0, startTimePercent: .7
	};
	return animationInfo;
}

Chart.prototype.renderLine = function (plotUnit) {

	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

	var totalDataSeries = plotUnit.dataSeriesIndexes.length;
	if (totalDataSeries <= 0)
		return;

	var ghostCtx = this._eventManager.ghostCtx;
	//var ghostCtx = this.overlaidCanvasCtx;

	ctx.save();

	var plotArea = this.plotArea;

	ctx.beginPath();
	ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
	ctx.clip();

	var markers = [];

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];
		ctx.lineWidth = dataSeries.lineThickness;
		var dataPoints = dataSeries.dataPoints;


		if (ctx.setLineDash) {
			ctx.setLineDash(getLineDashArray(dataSeries.lineDashType, dataSeries.lineThickness));
		}

		var seriesId = dataSeries.id;
		this._eventManager.objectMap[seriesId] = {
			objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
		};
		var hexColor = intToHexColorString(seriesId);
		ghostCtx.strokeStyle = hexColor;
		//ghostCtx.lineWidth = dataSeries.lineThickness;
		ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

		var colorSet = dataSeries._colorSet;
		var color = colorSet[0];
		ctx.strokeStyle = color;

		var isFirstDataPointInPlotArea = true;
		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

		//if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
		//    dataSeries.markerSize = 8;
		ctx.beginPath();
		if (dataPoints.length > 0) {
			//var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

			//dataSeries.noDataPointsInPlotArea = 0
			var prevDataNull = false;
			for (i = 0; i < dataPoints.length; i++) {

				dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
					continue;

				//if (!isFinite(dataPoints[i].y))
				//    continue;

				if (typeof (dataPoints[i].y) !== "number") {
					if (i > 0) {// if first dataPoint is null then no need to call stroke method
						ctx.stroke();

						if (isCanvasSupported) {
							ghostCtx.stroke();
						}
					}


					prevDataNull = true;
					continue;
				}

				x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
				y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
				};


				//dataSeries.noDataPointsInPlotArea++;

				if (isFirstDataPointInPlotArea || prevDataNull) {
					ctx.beginPath();
					ctx.moveTo(x, y);


					if (isCanvasSupported) {
						ghostCtx.beginPath();
						ghostCtx.moveTo(x, y);
					}

					isFirstDataPointInPlotArea = false;
					prevDataNull = false;
				} else {

					ctx.lineTo(x, y);

					if (isCanvasSupported)
						ghostCtx.lineTo(x, y);

					if (i % 500 == 0) {
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(x, y);

						if (isCanvasSupported) {
							ghostCtx.stroke();
							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y);
						}
					}
				}

				//Render Marker
				if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

					var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
					markers.push(markerProps);

					//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
					//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
					//}

					var markerColor = intToHexColorString(id);

					//window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);

					if (isCanvasSupported) {
						markers.push({
							x: x, y: y, ctx: ghostCtx,
							type: markerProps.type,
							size: markerProps.size,
							color: markerColor,
							borderColor: markerColor,
							borderThickness: markerProps.borderThickness
						});
					}
				}

				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "line",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						point: {
							x: x, y: y
						},
						direction: dataPoints[i].y >= 0 ? 1 : -1,
						color: color
					});

				}

			}

			ctx.stroke();

			if (isCanvasSupported)
				ghostCtx.stroke();
		}

	}


	RenderHelper.drawMarkers(markers);
	ctx.restore();

	ctx.beginPath();

	if (isCanvasSupported)
		ghostCtx.beginPath();

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
	};
	return animationInfo;
}

Chart.prototype.renderStepLine = function (plotUnit) {
	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

	var totalDataSeries = plotUnit.dataSeriesIndexes.length;
	if (totalDataSeries <= 0)
		return;

	var ghostCtx = this._eventManager.ghostCtx;
	//var ghostCtx = this.overlaidCanvasCtx;

	ctx.save();

	var plotArea = this.plotArea;

	ctx.beginPath();
	ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
	ctx.clip();

	var markers = [];

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];
		ctx.lineWidth = dataSeries.lineThickness;
		var dataPoints = dataSeries.dataPoints;

		if (ctx.setLineDash) {
			ctx.setLineDash(getLineDashArray(dataSeries.lineDashType, dataSeries.lineThickness));
		}

		var seriesId = dataSeries.id;
		this._eventManager.objectMap[seriesId] = {
			objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
		};
		var hexColor = intToHexColorString(seriesId);
		ghostCtx.strokeStyle = hexColor;
		//ghostCtx.lineWidth = dataSeries.lineThickness;
		ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

		var colorSet = dataSeries._colorSet;
		var color = colorSet[0];
		ctx.strokeStyle = color;

		var isFirstDataPointInPlotArea = true;
		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

		//if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
		//    dataSeries.markerSize = 8;
		ctx.beginPath();
		if (dataPoints.length > 0) {
			//var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

			//dataSeries.noDataPointsInPlotArea = 0
			var prevDataNull = false;
			for (i = 0; i < dataPoints.length; i++) {

				dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
					continue;

				//if (!isFinite(dataPoints[i].y))
				//    continue;

				if (typeof (dataPoints[i].y) !== "number") {
					if (i > 0) {// if first dataPoint is null then no need to call stroke method
						ctx.stroke();

						if (isCanvasSupported) {
							ghostCtx.stroke();
						}
					}

					prevDataNull = true;
					continue;
				}

				var prevY = y;

				x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
				y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
				};


				//dataSeries.noDataPointsInPlotArea++;

				if (isFirstDataPointInPlotArea || prevDataNull) {
					ctx.beginPath();
					ctx.moveTo(x, y);

					if (isCanvasSupported) {
						ghostCtx.beginPath();
						ghostCtx.moveTo(x, y);
					}

					isFirstDataPointInPlotArea = false;
					prevDataNull = false;
				} else {

					ctx.lineTo(x, prevY);
					if (isCanvasSupported)
						ghostCtx.lineTo(x, prevY);

					ctx.lineTo(x, y);
					if (isCanvasSupported)
						ghostCtx.lineTo(x, y);

					if (i % 500 == 0) {
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(x, y);

						if (isCanvasSupported) {
							ghostCtx.stroke();
							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y);
						}
					}
				}

				//Render Marker
				if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

					var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
					markers.push(markerProps);

					//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
					//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
					//}

					var markerColor = intToHexColorString(id);

					//window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
					if (isCanvasSupported) {
						markers.push({
							x: x, y: y, ctx: ghostCtx,
							type: markerProps.type,
							size: markerProps.size,
							color: markerColor,
							borderColor: markerColor,
							borderThickness: markerProps.borderThickness
						});
					}
				}

				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "stepLine",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						point: {
							x: x, y: y
						},
						direction: dataPoints[i].y >= 0 ? 1 : -1,
						color: color
					});

				}

			}

			ctx.stroke();
			if (isCanvasSupported)
				ghostCtx.stroke();
		}
	}


	RenderHelper.drawMarkers(markers);
	ctx.restore();

	ctx.beginPath();

	if (isCanvasSupported)
		ghostCtx.beginPath();

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
	};
	return animationInfo;
}

Chart.prototype.animationRequestId = null;

Chart.prototype.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

Chart.prototype.cancelRequestAnimFrame = (function () {
	return window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout
})();

Chart.prototype.getPercentAndTotal = function (ds, dp) {

	var dpX = null;
	var total = null;
	var percent = null;

	if (ds.type.indexOf("stacked") >= 0) {
		total = 0;
		dpX = dp.x.getTime ? dp.x.getTime() : dp.x;
		if (dpX in ds.plotUnit.yTotals) {
			total = ds.plotUnit.yTotals[dpX];

			if (!isNaN(dp.y)) {
			    if (total === 0)
			        percent = 0;
                  else
			        percent = (dp.y / total) * 100;
			}
			else
			    percent = 0;
		}
	} else if (ds.type === "pie" || ds.type === "doughnut") {
		total = 0;
		for (var i = 0; i < ds.dataPoints.length; i++) {

			if (!isNaN(ds.dataPoints[i].y))
				total += ds.dataPoints[i].y;
		}

		if (!isNaN(dp.y))
			percent = (dp.y / total) * 100;
		else
			percent = 0;
	}

	return {
		percent: percent, total: total
	};
}

Chart.prototype.replaceKeywordsWithValue = function (str, dp, ds, dpIndex, indexKeywordValue) {
	//var regex = /\{\s*[a-zA-Z]+\s*\}|"[^"]*"|'[^']*'/g;
	var regex = /\{.*?\}|"[^"]*"|'[^']*'/g;
	var chart = this;
	indexKeywordValue = typeof (indexKeywordValue) === "undefined" ? 0 : indexKeywordValue;

	if ((ds.type.indexOf("stacked") >= 0 || (ds.type === "pie" || ds.type === "doughnut")) && (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0)) {
		var percent = "#percent";
		var total = "#total";
		var dpX = null;

		var percentAndTotal = this.getPercentAndTotal(ds, dp);

		total = isNaN(percentAndTotal.total) ? total : percentAndTotal.total;
		percent = isNaN(percentAndTotal.percent) ? percent : percentAndTotal.percent;

		do {
			var percentFormatString = "";
			if (ds.percentFormatString)
				percentFormatString = ds.percentFormatString;
			else {
				percentFormatString = "#,##0.";
				var numberOfDecimals = Math.max(Math.ceil(Math.log(1 / Math.abs(percent)) / Math.LN10), 2);

				if (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals))
					numberOfDecimals = 2;

				for (var n = 0; n < numberOfDecimals; n++) {
					percentFormatString += "#";
				}
			}

			str = str.replace("#percent", numberFormat(percent, percentFormatString, chart._cultureInfo));
			str = str.replace("#total", numberFormat(total, ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########"));
		} while (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0);
	}


	var fcn = function ($0) {
		if (($0[0] === "\"" && $0[$0.length - 1] === "\"") || ($0[0] === "\'" && $0[$0.length - 1] === "\'"))
			return $0.slice(1, $0.length - 1);

		var key = trimString($0.slice(1, $0.length - 1));
		key = key.replace("#index", indexKeywordValue);

		var index = null;

		try {
			var match = key.match(/(.*?)\s*\[\s*(.*?)\s*\]/);
			if (match && match.length > 0) {
				index = trimString(match[2]);
				key = trimString(match[1]);
			}
		} catch (e) {
		};


		var obj = null;

		if (key === "color") {
			return dp.color ? dp.color : ds.color ? ds.color : ds._colorSet[dpIndex % ds._colorSet.length];
		}

		if (dp.hasOwnProperty(key))
			obj = dp;
		else if (ds.hasOwnProperty(key))
			obj = ds;
		else return "";

		var value = obj[key];
		if (index !== null)
			value = value[index];

		if (key === "x") {
			if (chart.axisX && chart.plotInfo.axisXValueType === "dateTime")
				return dateFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : chart.axisX && chart.axisX.valueFormatString ? chart.axisX.valueFormatString : "DD MMM YY", chart._cultureInfo);
			else
				return numberFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : "#,##0.########", chart._cultureInfo);
		} else if (key === "y")
			return numberFormat(value, dp.yValueFormatString ? dp.yValueFormatString : ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########", chart._cultureInfo);
		else if (key === "z")
			return numberFormat(value, dp.zValueFormatString ? dp.zValueFormatString : ds.zValueFormatString ? ds.zValueFormatString : "#,##0.########", chart._cultureInfo);
		else
			return value;
	}

	return str.replace(regex, fcn);
}


Chart.prototype.renderSpline = SplineChart;

Chart.prototype.renderColumn = ColumnChart

Chart.prototype.renderStackedColumn = StackedColumnChart;

Chart.prototype.renderStackedColumn100 = StackedColumn100Chart;

Chart.prototype.renderBar = BarChart;

Chart.prototype.renderStackedBar = StackedBarChart;

Chart.prototype.renderStackedBar100 = StackedBar100Chart;

Chart.prototype.renderArea = AreaChart;

Chart.prototype.renderSplineArea = SplineAreaChart;

Chart.prototype.renderStepArea = StepAreaChart;

Chart.prototype.renderStackedArea = StackedAreaChart;

Chart.prototype.renderStackedArea100 = StackedArea100Chart;

Chart.prototype.renderBubble = BubbleChart;

Chart.prototype.renderScatter = ScatterChart;

Chart.prototype.renderCandlestick = CandlestickChart;

Chart.prototype.renderRangeColumn = RangeColumnChart;

Chart.prototype.renderRangeBar = RangeBarChart;

Chart.prototype.renderRangeArea = RangeAreaChart;

Chart.prototype.renderRangeSplineArea = RangeSplineAreaChart;

Chart.prototype.renderPie = PieChart;

export default Chart;
