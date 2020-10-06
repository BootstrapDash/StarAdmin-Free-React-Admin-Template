
import RenderHelper from '../helpers/render';
import AnimationHelper from '../helpers/animator';
import {isCanvasSupported, compareNumbers, intToHexColorString, getLineDashArray} from '../helpers/utils';

export default function (plotUnit) {
	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

	var totalDataSeries = plotUnit.dataSeriesIndexes.length;

	if (totalDataSeries <= 0)
		return;

	var color = null;
	var markers = [];

	var plotArea = this.plotArea;

	var offsetY = [];

	var allXValues = [];
	//var offsetNegativeY = [];

	var i = 0, x, y;
	var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

	//var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.viewportMinimum) + .5) << 0;
	var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

	var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

	var ghostCtx = this._eventManager.ghostCtx;

	if (isCanvasSupported)
		ghostCtx.beginPath();

	ctx.save();

	if (isCanvasSupported)
		ghostCtx.save();

	ctx.beginPath();
	ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
	ctx.clip();

	if (isCanvasSupported) {
		ghostCtx.beginPath();
		ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ghostCtx.clip();
	}

	var xValuePresent = [];
	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var xValue;

		dataSeries.dataPointIndexes = [];

		for (i = 0; i < dataPoints.length; i++) {
			xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
			dataSeries.dataPointIndexes[xValue] = i;

			if (!xValuePresent[xValue]) {
				allXValues.push(xValue);
				xValuePresent[xValue] = true;
			}
		}

		allXValues.sort(compareNumbers);
	}

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var isFirstDataPointInPlotArea = true;

		var currentBaseValues = [];


		var seriesId = dataSeries.id;
		this._eventManager.objectMap[seriesId] = {
			objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
		};
		var hexColor = intToHexColorString(seriesId);
		ghostCtx.fillStyle = hexColor;



		if (allXValues.length > 0) {

			color = dataSeries._colorSet[0];
			//ctx.strokeStyle = "red";
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.lineWidth = dataSeries.lineThickness;

			if (ctx.setLineDash) {
				ctx.setLineDash(getLineDashArray(dataSeries.lineDashType, dataSeries.lineThickness));
			}

			for (i = 0; i < allXValues.length; i++) {

				dataPointX = allXValues[i];
				var dataPoint = null;

				if (dataSeries.dataPointIndexes[dataPointX] >= 0)
					dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
				else
					dataPoint = {
						x: dataPointX, y: 0
					};

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (typeof (dataPoint.y) !== "number")
					continue;

				var x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
				//var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
				var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum));

				var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

				y = y - offset;
				currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
				offsetY[dataPointX] = yZeroToPixel - y;

				if (isFirstDataPointInPlotArea) {
					ctx.beginPath();
					ctx.moveTo(x, y);

					if (isCanvasSupported) {
						ghostCtx.beginPath();
						ghostCtx.moveTo(x, y);
					}

					isFirstDataPointInPlotArea = false;
				}
				else {

					ctx.lineTo(x, y);

					if (isCanvasSupported)
						ghostCtx.lineTo(x, y);

					if (i % 250 == 0) {

						if (dataSeries.lineThickness > 0)
							ctx.stroke();

						while (currentBaseValues.length > 0) {
							var point = currentBaseValues.pop();
							ctx.lineTo(point.x, point.y);

							if (isCanvasSupported)
								ghostCtx.lineTo(point.x, point.y);

						}

						ctx.closePath();

						ctx.globalAlpha = dataSeries.fillOpacity;
						ctx.fill();
						ctx.globalAlpha = 1;

						ctx.beginPath();
						ctx.moveTo(x, y);

						if (isCanvasSupported) {
							ghostCtx.closePath();
							ghostCtx.fill();

							ghostCtx.beginPath();
							ghostCtx.moveTo(x, y);
						}

						currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
					}

				}

				if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
					var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
					this._eventManager.objectMap[id] = {
						id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y
					};
				}

				//Render Marker
				if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
					if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {

						var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
						markers.push(markerProps);

						//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
						//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
						//}

						markerColor = intToHexColorString(id);

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
				}

				if (dataPoint.indexLabel || dataSeries.indexLabel || dataPoint.indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "stackedArea",
						dataPoint: dataPoint,
						dataSeries: dataSeries,
						point: {
							x: x, y: y
						},
						direction: dataPoints[i].y >= 0 ? 1 : -1,
						color: color
					});

				}
			}

			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			while (currentBaseValues.length > 0) {
				var point = currentBaseValues.pop();
				ctx.lineTo(point.x, point.y);

				if (isCanvasSupported)
					ghostCtx.lineTo(point.x, point.y);
			}

			ctx.closePath();

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			ctx.beginPath();
			ctx.moveTo(x, y);

			if (isCanvasSupported) {
				ghostCtx.closePath();
				ghostCtx.fill();
				ghostCtx.beginPath();
				ghostCtx.moveTo(x, y);
			}
		}

		delete (dataSeries.dataPointIndexes);
	}

	RenderHelper.drawMarkers(markers);


	ctx.restore();

	if (isCanvasSupported)
		ghostCtx.restore();

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
	};
	return animationInfo;
}
