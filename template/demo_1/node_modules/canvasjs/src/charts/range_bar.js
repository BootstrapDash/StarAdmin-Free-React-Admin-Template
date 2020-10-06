
import {isCanvasSupported} from '../helpers/utils';

export default function (plotUnit) {
	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
	var totalDataSeries = plotUnit.dataSeriesIndexes.length;

	if (totalDataSeries <= 0)
		return;

	var color = null;

	var plotArea = this.plotArea;

	var i = 0, x1, x2, y;
	var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

	//In case of Bar Chart, yZeroToPixel is x co-ordinate!
	var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

	var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : Math.min((this.height * .15), this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
	var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
	//var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.viewportMaximum - plotUnit.axisX.viewportMinimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;

	var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.viewportMaximum - plotUnit.axisX.viewportMinimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

	if (barWidth > maxBarWidth)
		barWidth = maxBarWidth;
	else if (xMinDiff === Infinity) {
		barWidth = maxBarWidth / plotUnit.plotType.totalDataSeries * .9;
	} else if (barWidth < 1)
		barWidth = 1;

	ctx.save();

	if (isCanvasSupported)
		this._eventManager.ghostCtx.save();

	ctx.beginPath();
	ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
	ctx.clip();

	if (isCanvasSupported) {
		this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		this._eventManager.ghostCtx.clip();
	}

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var isFirstDataPointInPlotArea = true;


		//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


		if (dataPoints.length > 0) {
			//var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

			var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

			ctx.strokeStyle = "#4572A7 ";

			for (i = 0; i < dataPoints.length; i++) {

				dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (dataPoints[i].y === null || !dataPoints[i].y.length
					|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number")
					continue;

				//x and y are pixel co-ordinates of point and should not be confused with X and Y values
				x1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
				x2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

				y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;


				var y1 = (y - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0;
				var y2 = y1 + barWidth << 0;

				if (x1 > x2) {
					var temp = x1;
					x1 = x2;
					x2 = temp;
				}

				//drawRect(ctx, x1, y1, plotArea.x2, y2, "#EEEEEE", 0, null, false, false, false, false);
				//drawRect(ctx, x1, y1, plotArea.x2, y2, "#BDCED3", 0, null, false, false, false, false);

				color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
				//color = "#1B4962";
				drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);


				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
				};
				color = intToHexColorString(id);

				if (isCanvasSupported)
					drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "rangeBar",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						indexKeyword: 0,
						point: {
							x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x1 : x2, y: y1 + (y2 - y1) / 2
						},
						direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
						bounds: {
							x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
						},
						color: color
					});

					this._indexLabels.push({
						chartType: "rangeBar",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						indexKeyword: 1,
						point: {
							x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x2 : x1, y: y1 + (y2 - y1) / 2
						},
						direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
						bounds: {
							x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
						},
						color: color
					});
				}
			}
		}
	}

	ctx.restore();

	if (isCanvasSupported)
		this._eventManager.ghostCtx.restore();

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
	};
	return animationInfo;
}
