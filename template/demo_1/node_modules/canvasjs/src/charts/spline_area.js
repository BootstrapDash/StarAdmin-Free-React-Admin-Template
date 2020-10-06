
import {isCanvasSupported} from '../helpers/utils';

export default function (plotUnit) {
	var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;

	var totalDataSeries = plotUnit.dataSeriesIndexes.length;

	if (totalDataSeries <= 0)
		return;

	var ghostCtx = this._eventManager.ghostCtx;

	var axisXProps = plotUnit.axisX.lineCoordinates;
	var axisYProps = plotUnit.axisY.lineCoordinates;
	var markers = [];

	var plotArea = this.plotArea;
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

	for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

		var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

		var dataSeries = this.data[dataSeriesIndex];

		var dataPoints = dataSeries.dataPoints;

		var seriesId = dataSeries.id;
		this._eventManager.objectMap[seriesId] = {
			objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex
		};

		var hexColor = intToHexColorString(seriesId);
		ghostCtx.fillStyle = hexColor;
		//ghostCtx.lineWidth = dataSeries.lineThickness;
		//ghostCtx.lineWidth = 20;

		markers = [];

		var isFirstDataPointInPlotArea = true;
		var i = 0, x, y;
		var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

		var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
		var baseY;

		var startPoint = null;

		var pixels = [];

		if (dataPoints.length > 0) {
			//ctx.strokeStyle = "#4572A7 ";
			color = dataSeries._colorSet[i % dataSeries._colorSet.length];
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.lineWidth = dataSeries.lineThickness;

			if (ctx.setLineDash) {
				ctx.setLineDash(getLineDashArray(dataSeries.lineDashType, dataSeries.lineThickness));
			}

			for (; i < dataPoints.length; i++) {

				dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

				if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
					continue;
				}

				if (typeof (dataPoints[i].y) !== "number") {
					if (i > 0) {
						renderBezierArea();
						pixels = [];
					}
					continue;
				}

				x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
				y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;


				var id = dataSeries.dataPointIds[i];
				this._eventManager.objectMap[id] = {
					id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y
				};

				pixels[pixels.length] = {
					x: x, y: y
				};

				//Render Marker
				if (dataPoints[i].markerSize !== 0) {
					if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
						var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
						markers.push(markerProps);

						//if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
						//	dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
						//}

						var markerColor = intToHexColorString(id);

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


				//Render Index Labels
				if (dataPoints[i].indexLabel || dataSeries.indexLabel || dataPoints[i].indexLabelFormatter || dataSeries.indexLabelFormatter) {

					this._indexLabels.push({
						chartType: "splineArea",
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

			renderBezierArea();

			RenderHelper.drawMarkers(markers);
		}
	}

	ctx.restore();

	if (isCanvasSupported)
		this._eventManager.ghostCtx.restore();

	function renderBezierArea() {
		var bp = getBezierPoints(pixels, 2);

		if (bp.length > 0) {
			ctx.beginPath();
			ctx.moveTo(bp[0].x, bp[0].y);

			if (isCanvasSupported) {
				ghostCtx.beginPath();
				ghostCtx.moveTo(bp[0].x, bp[0].y);
			}


			for (var i = 0; i < bp.length - 3; i += 3) {

				ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

				if (isCanvasSupported)
					ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

			}

			if (dataSeries.lineThickness > 0)
				ctx.stroke();

			if (plotUnit.axisY.viewportMinimum <= 0 && plotUnit.axisY.viewportMaximum >= 0) {
				baseY = yZeroToPixel;
			}
			else if (plotUnit.axisY.viewportMaximum < 0)
				baseY = axisYProps.y1;
			else if (plotUnit.axisY.viewportMinimum > 0)
				baseY = axisXProps.y2;

			startPoint = {
				x: bp[0].x, y: bp[0].y
			};

			ctx.lineTo(bp[bp.length - 1].x, baseY);
			ctx.lineTo(startPoint.x, baseY);
			ctx.closePath();

			ctx.globalAlpha = dataSeries.fillOpacity;
			ctx.fill();
			ctx.globalAlpha = 1;

			if (isCanvasSupported) {
				ghostCtx.lineTo(bp[bp.length - 1].x, baseY);
				ghostCtx.lineTo(startPoint.x, baseY);
				ghostCtx.closePath();
				ghostCtx.fill();
			}
		}
	}

	//source and dest would be same when animation is not enabled
	var animationInfo = {
		source: ctx, dest: this.plotArea.ctx, animationCallback: AnimationHelper.xClipAnimation, easingFunction: AnimationHelper.easing.linear, animationBase: 0
	};
	return animationInfo;
}
