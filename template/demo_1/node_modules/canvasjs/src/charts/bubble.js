
import RenderHelper from '../helpers/render';
import AnimationHelper from '../helpers/animator';
import {isCanvasSupported, intToHexColorString} from '../helpers/utils';

export default function (plotUnit) {

	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

	var totalDataSeries = plotUnit.dataSeriesIndexes.length;

	if (totalDataSeries <= 0)
		return;

	var color = null;

	var plotArea = this.plotArea;

	var i = 0, x, y;
	var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

	var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

	var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : this.width * .15 << 0;
	var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
	var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.viewportMaximum - plotUnit.axisX.viewportMinimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;


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

	var maxZ = -Infinity;
	var minZ = Infinity;

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var z = 0;

		for (var i = 0; i < dataPoints.length; i++) {

			dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

			if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
				continue;
			}

			if (typeof (dataPoints[i].z) !== "undefined") {

				z = dataPoints[i].z;

				if (z > maxZ)
					maxZ = z;

				if (z < minZ)
					minZ = z;
			}
		}
	}

	var minArea = Math.PI * 5 * 5;
	var maxArea = Math.max(Math.pow(Math.min(plotArea.height, plotArea.width) * .25 / 2, 2) * Math.PI, minArea);

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var isFirstDataPointInPlotArea = true;

		if (dataPoints.length == 1)
			barWidth = maxBarWidth;

		if (barWidth < 1)
			barWidth = 1;
		else if (barWidth > maxBarWidth)
			barWidth = maxBarWidth;

		if (dataPoints.length > 0) {
			//var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);
			//var bevelEnabled = (barWidth > 5) ? false : false;

			ctx.strokeStyle = "#4572A7 ";



			for (var i = 0; i < dataPoints.length; i++) {

				dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (typeof (dataPoints[i].y) !== "number")
					continue;

				x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
				y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

				var z = dataPoints[i].z;

				var area = (maxZ === minZ) ? maxArea / 2 : minArea + (maxArea - minArea) / (maxZ - minZ) * (z - minZ);
				var radius = Math.max(Math.sqrt(area / Math.PI) << 0, 1);

				var markerSize = radius * 2;
				var markerProps = dataSeries.getMarkerProperties(i, ctx);
				markerProps.size = markerSize;


				ctx.globalAlpha = dataSeries.fillOpacity;
				RenderHelper.drawMarker(x, y, ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
				ctx.globalAlpha = 1;

				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y, size: markerSize
				};
				var markerColor = intToHexColorString(id);
				//RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerType, markerSize, markerColor, markerColor, dataSeries.markerBorderThickness);
				if (isCanvasSupported)
					RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerProps.type, markerProps.size, markerColor, markerColor, markerProps.borderThickness);


				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "bubble",
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						point: {
							x: x, y: y
						},
						direction: 1,
						bounds: {
							x1: x - markerProps.size / 2, y1: y - markerProps.size / 2, x2: x + markerProps.size / 2, y2: y + markerProps.size / 2
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
