
import {isCanvasSupported} from '../helpers/utils';

export default function (plotUnit) {
	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
	var ghostCtx = this._eventManager.ghostCtx;

	var totalDataSeries = plotUnit.dataSeriesIndexes.length;
	if (totalDataSeries <= 0)
		return;

	var color = null;

	var plotArea = this.plotArea;

	var i = 0, x, y1, y2, y3, y4;
	var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

	var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

	var maxBarWidth = this.dataPointMaxWidth ? this.dataPointMaxWidth : (this.width * .015);
	var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
	var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.viewportMaximum - plotUnit.axisX.viewportMinimum)) * Math.abs(xMinDiff)) * .7) << 0;

	if (barWidth > maxBarWidth)
		barWidth = maxBarWidth;
	else if (xMinDiff === Infinity) {
		barWidth = maxBarWidth;
	} else if (barWidth < 1)
		barWidth = 1;

	ctx.save();
	if (isCanvasSupported)
		ghostCtx.save();

	ctx.beginPath();
	ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
	ctx.clip();

	if (isCanvasSupported) {
		ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		ghostCtx.clip();
	}
	//ctx.beginPath();

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];
		var dataPoints = dataSeries.dataPoints;
		var isFirstDataPointInPlotArea = true;


		// Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
		//dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

		//var offsetX = barWidth * plotUnit.index << 0;


		if (dataPoints.length > 0) {
			//var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

			var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

			for (i = 0; i < dataPoints.length; i++) {

				dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (dataPoints[i].y === null || !dataPoints[i].y.length
					|| typeof (dataPoints[i].y[0]) !== "number" || typeof (dataPoints[i].y[1]) !== "number"
					|| typeof (dataPoints[i].y[2]) !== "number" || typeof (dataPoints[i].y[3]) !== "number")
					continue;

				x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
				y1 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
				y2 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

				y3 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[2] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
				y4 = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[3] - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

				var x1 = (x - barWidth / 2) << 0;
				var x2 = (x1 + barWidth) << 0;


				color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[0];


				//var borderThickness = Math.max(2, ((barWidth * .1) / 2 << 0) * 2); // Set only even numbers for border
				var borderThickness = Math.round(Math.max(1, (barWidth * .15)));
				//borderThickness = (borderThickness / 2 << 0) * 2;
				//borderThickness = 2;
				var offset = borderThickness % 2 === 0 ? 0 : .5;


				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2,
					x3: x, y3: y3, x4: x, y4: y4, borderThickness: borderThickness, color: color
				};

				ctx.strokeStyle = color;
				ctx.beginPath();
				ctx.lineWidth = borderThickness;
				ghostCtx.lineWidth = Math.max(borderThickness, 4);

				if (dataSeries.type === "candlestick") {

					ctx.moveTo(x - offset, y2);
					ctx.lineTo(x - offset, Math.min(y1, y4));
					ctx.stroke();
					ctx.moveTo(x - offset, Math.max(y1, y4));
					ctx.lineTo(x - offset, y3);
					ctx.stroke();

					drawRect(ctx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), dataPoints[i].y[0] <= dataPoints[i].y[3] ? dataSeries.risingColor : color, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);


					if (isCanvasSupported) {
						color = intToHexColorString(id);
						ghostCtx.strokeStyle = color;

						ghostCtx.moveTo(x - offset, y2);
						ghostCtx.lineTo(x - offset, Math.min(y1, y4));
						ghostCtx.stroke();
						ghostCtx.moveTo(x - offset, Math.max(y1, y4));
						ghostCtx.lineTo(x - offset, y3);
						ghostCtx.stroke();
						drawRect(ghostCtx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), color, 0, null, false, false, false, false);
					}
				}
				else if (dataSeries.type === "ohlc") {

					ctx.moveTo(x - offset, y2);
					ctx.lineTo(x - offset, y3);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x, y1);
					ctx.lineTo(x1, y1);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x, y4);
					ctx.lineTo(x2, y4);
					ctx.stroke();

					if (isCanvasSupported) {

						color = intToHexColorString(id);
						ghostCtx.strokeStyle = color;

						ghostCtx.moveTo(x - offset, y2);
						ghostCtx.lineTo(x - offset, y3);
						ghostCtx.stroke();

						ghostCtx.beginPath();
						ghostCtx.moveTo(x, y1);
						ghostCtx.lineTo(x1, y1);
						ghostCtx.stroke();

						ghostCtx.beginPath();
						ghostCtx.moveTo(x, y4);
						ghostCtx.lineTo(x2, y4);
						ghostCtx.stroke();
					}
				}

				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: dataSeries.type,
						dataPoint: dataPoints[i],
						dataSeries: dataSeries,
						point: {
							x: x1 + (x2 - x1) / 2, y: y2
						},
						direction: 1,
						bounds: {
							x1: x1, y1: Math.min(y2, y3), x2: x2, y2: Math.max(y2, y3)
						},
						color: color
					});

				}
			}
		}
	}

	ctx.restore();

	if (isCanvasSupported)
		ghostCtx.restore();

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.fadeInAnimation, easingFunction: AnimationHelper.easing.easeInQuad, animationBase: 0
	};
	return animationInfo;
}
