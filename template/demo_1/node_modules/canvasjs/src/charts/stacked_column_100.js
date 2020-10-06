
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

	var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.width * .15 << 0;
	var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
	var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.viewportMaximum - plotUnit.axisX.viewportMinimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

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

			//ctx.strokeStyle = "#4572A7 ";

			for (i = 0; i < dataPoints.length; i++) {

				dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (typeof (dataPoints[i].y) !== "number")
					continue;

				x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

				var yPercent;
				if (plotUnit.dataPointYSums[dataPointX] !== 0)
					yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
				else
					yPercent = 0;

				//y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
				y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum));

				var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
				var x2 = x1 + barWidth << 0;
				var y1;
				var y2;


				if (dataPoints[i].y >= 0) {
					var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

					y1 = y - offset;
					y2 = yZeroToPixel - offset;

					offsetPositiveY[dataPointX] = offset + (y2 - y1);

				} else {
					var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

					y2 = y + offset;
					y1 = yZeroToPixel + offset;

					offsetNegativeY[dataPointX] = offset + (y2 - y1);
				}


				color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
				drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false, dataSeries.fillOpacity);

				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2
				};
				color = intToHexColorString(id);

				if (isCanvasSupported)
					drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);


				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "stackedColumn100",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						point: {
							x: x, y: dataPoints[i].y >= 0 ? y1 : y2
						},
						direction: dataPoints[i].y >= 0 ? 1 : -1,
						bounds: {
							x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2)
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
	var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.yScaleAnimation, easingFunction: AnimationHelper.easing.easeOutQuart, animationBase: animationBase
	};
	return animationInfo;
}
