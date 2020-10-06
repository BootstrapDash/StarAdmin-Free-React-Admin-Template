
import {isCanvasSupported} from '../helpers/utils';

export default function (plotUnit) {
	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
	var totalDataSeries = plotUnit.dataSeriesIndexes.length;

	if (totalDataSeries <= 0)
		return;

	var color = null;

	var plotArea = this.plotArea;

	var offsetPositiveY = [];
	var offsetNegativeY = [];

	var i = 0, x, y;
	var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

	//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
	var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

	var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.height * .15 << 0;
	var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
	var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.viewportMaximum - plotUnit.axisX.viewportMinimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

	if (barWidth > maxBarWidth)
		barWidth = maxBarWidth;
	else if (xMinDiff === Infinity) {
		barWidth = maxBarWidth;
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

				dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (typeof (dataPoints[i].y) !== "number")
					continue;

				y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

				var yPercent;
				if (plotUnit.dataPointYSums[dataPointX] !== 0)
					yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
				else
					yPercent = 0;

				//x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
				x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum));

				var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
				var y2 = y1 + barWidth << 0;
				var x1;
				var x2;


				if (dataPoints[i].y >= 0) {
					var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

					x1 = yZeroToPixel + offset;
					x2 = x + offset;

					offsetPositiveY[dataPointX] = offset + (x2 - x1);

				} else {
					var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

					x1 = x - offset;
					x2 = yZeroToPixel - offset;

					offsetNegativeY[dataPointX] = offset + (x2 - x1);
				}


				color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
				drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);

				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
				};
				color = intToHexColorString(id);

				if (isCanvasSupported)
					drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);

				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter)
					this._indexLabels.push({
						chartType: "stackedBar100",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						point: {
							x: dataPoints[i].y >= 0 ? x2 : x1, y: y
						},
						direction: dataPoints[i].y >= 0 ? 1 : -1,
						bounds: {
							x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2
						},
						color: color
					});
			}
		}
	}

	ctx.restore();

	if (isCanvasSupported)
		this._eventManager.ghostCtx.restore();

	//source and dest would be same when animation is not enabled
	var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
	};
	return animationInfo;
}
