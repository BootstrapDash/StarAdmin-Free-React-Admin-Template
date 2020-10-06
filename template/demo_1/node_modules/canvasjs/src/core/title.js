
import CanvasJSObject from './canvasjs';
import TextBlock from './text_block';
import {extend} from '../helpers/utils';

function Title(chart, options) {
	Title.base.constructor.call(this, "Title", options, chart.theme);

	this.chart = chart;
	this.canvas = chart.canvas;
	this.ctx = this.chart.ctx;


	if (typeof (this._options.fontSize) === "undefined") {

		this.fontSize = this.chart.getAutoFontSize(this.fontSize);

		//window.console.log("Chart Title fontSize: " + this.fontSize);
	}

	this.width = null,//read only
	this.height = null//read only
	this.bounds = {
		x1: null, y1: null, x2: null, y2: null
	};
}

extend(Title, CanvasJSObject);

Title.prototype.render = function () {

	if (!this.text) return;

	var container = (!this.dockInsidePlotArea ? this.chart : this.chart.plotArea);
	var freespace = container.layoutManager.getFreeSpace();
	var left = freespace.x1;
	var top = freespace.y1;
	var angle = 0;
	var maxHeight = 0;
	var containerMargin = 2; //Margin towards the container
	var rightOffset = this.chart._menuButton && this.chart.exportEnabled && this.verticalAlign === "top" ? 22 : 0; //So that Title doesn't overlap menu button.

	var textBlockHorizontalAlign;
	var position;

	if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
		if (this.maxWidth === null)
			this.maxWidth = freespace.width - containerMargin * 2 - rightOffset * (this.horizontalAlign === "center" ? 2 : 1);

		maxHeight = freespace.height * .5 - this.margin - containerMargin;
		angle = 0;
	}
	else if (this.verticalAlign === "center") {

		if (this.horizontalAlign === "left" || this.horizontalAlign === "right") {
			if (this.maxWidth === null)
				this.maxWidth = freespace.height - containerMargin * 2;

			maxHeight = freespace.width * .5 - this.margin - containerMargin;
		} else if (this.horizontalAlign === "center") {
			if (this.maxWidth === null)
				this.maxWidth = freespace.width - containerMargin * 2;

			maxHeight = freespace.height * .5 - containerMargin * 2;
		}
	}

	if (!this.wrap)
		maxHeight = Math.min(maxHeight, Math.max(this.fontSize * 1.5, this.fontSize + this.padding * 2.5));
	//console.log(this.maxWidth);

	var textBlock = new TextBlock(this.ctx, {
		fontSize: this.fontSize, fontFamily: this.fontFamily, fontColor: this.fontColor,
		fontStyle: this.fontStyle, fontWeight: this.fontWeight,
		horizontalAlign: this.horizontalAlign, verticalAlign: this.verticalAlign,
		borderColor: this.borderColor, borderThickness: this.borderThickness,
		backgroundColor: this.backgroundColor,
		maxWidth: this.maxWidth, maxHeight: maxHeight,
		cornerRadius: this.cornerRadius,
		text: this.text,
		padding: this.padding,
		textBaseline: "top"
	});

	var textBlockSize = textBlock.measureText();

	if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {

		if (this.verticalAlign === "top") {
			top = freespace.y1 + containerMargin;
			position = "top";
		}
		else if (this.verticalAlign === "bottom") {
			top = freespace.y2 - containerMargin - textBlockSize.height;
			position = "bottom";
		}

		if (this.horizontalAlign === "left") {
			left = freespace.x1 + containerMargin;
		}
		else if (this.horizontalAlign === "center") {
			left = freespace.x1 + freespace.width / 2 - textBlockSize.width / 2;
		}
		else if (this.horizontalAlign === "right") {
			left = freespace.x2 - containerMargin - textBlockSize.width - rightOffset;
		}

		textBlockHorizontalAlign = this.horizontalAlign;

		this.width = textBlockSize.width;
		this.height = textBlockSize.height;
	}
	else if (this.verticalAlign === "center") {

		if (this.horizontalAlign === "left") {

			left = freespace.x1 + containerMargin;
			top = freespace.y2 - containerMargin - (this.maxWidth / 2 - textBlockSize.width / 2);
			angle = -90;

			position = "left";
			this.width = textBlockSize.height;
			this.height = textBlockSize.width;
		}
		else if (this.horizontalAlign === "right") {
			left = freespace.x2 - containerMargin;
			top = freespace.y1 + containerMargin + (this.maxWidth / 2 - textBlockSize.width / 2);
			angle = 90;

			position = "right";
			this.width = textBlockSize.height;
			this.height = textBlockSize.width;
		}
		else if (this.horizontalAlign === "center") {
			top = container.y1 + (container.height / 2 - textBlockSize.height / 2);
			left = container.x1 + (container.width / 2 - textBlockSize.width / 2);

			position = "center";
			this.width = textBlockSize.width;
			this.height = textBlockSize.height;
		}

		textBlockHorizontalAlign = "center";
	}

	textBlock.x = left;
	textBlock.y = top;
	textBlock.angle = angle;
	textBlock.horizontalAlign = textBlockHorizontalAlign;
	textBlock.render(true);

	container.layoutManager.registerSpace(position, {
		width: this.width + (position === "left" || position === "right" ? this.margin + containerMargin : 0),
		height: this.height + (position === "top" || position === "bottom" ? this.margin + containerMargin : 0)
	});

	this.bounds = {
		x1: left, y1: top, x2: left + this.width, y2: top + this.height
	};

	this.ctx.textBaseline = "top";
}

export default Title;
