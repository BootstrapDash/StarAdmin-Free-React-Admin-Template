
import CanvasJSObject from './canvasjs';
import {extend, getFontHeightInPixels, trimString, getFontString} from '../helpers/utils';

function TextBlock(ctx, options) {

  TextBlock.base.constructor.call(this, "TextBlock", options);

  this.ctx = ctx;
  this._isDirty = true;
  this._wrappedText = null;
  this._lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
}

extend(TextBlock, CanvasJSObject);

TextBlock.prototype.render = function (preserveContext) {
  if (preserveContext)
    this.ctx.save();

  var font = this.ctx.font;
  this.ctx.textBaseline = this.textBaseline;

  var offsetY = 0;

  if (this._isDirty)
    this.measureText(this.ctx);

  this.ctx.translate(this.x, this.y + offsetY);

  if (this.textBaseline === "middle") {
    offsetY = -this._lineHeight / 2;
  }

  this.ctx.font = this._getFontString();

  this.ctx.rotate(Math.PI / 180 * this.angle);

  var textLeft = 0;
  var textTop = this.padding;
  //var textTop = this.padding;
  var line = null;

  if ((this.borderThickness > 0 && this.borderColor) || this.backgroundColor) {
    this.ctx.roundRect(0, offsetY, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);

    //if (this.textBaseline === "middle") {
    //	//textTop += this.fontSize / 2;
    //	textTop += this._lineHeight / 2;
    //}
  }

  this.ctx.fillStyle = this.fontColor;

  for (var i = 0; i < this._wrappedText.lines.length; i++) {

    line = this._wrappedText.lines[i];
    if (this.horizontalAlign === "right")
      textLeft = this.width - line.width - this.padding;
    else if (this.horizontalAlign === "left")
      textLeft = this.padding;
    else if (this.horizontalAlign === "center")
      textLeft = (this.width - this.padding * 2) / 2 - line.width / 2 + this.padding;

    this.ctx.fillText(line.text, textLeft, textTop);

    textTop += line.height;
  }

  this.ctx.font = font;

  if (preserveContext)
    this.ctx.restore();
}

TextBlock.prototype.setText = function (text) {
  this.text = text;
  this._isDirty = true;
  this._wrappedText = null;
}

TextBlock.prototype.measureText = function () {
  if (this.maxWidth === null) {
    throw ("Please set maxWidth and height for TextBlock");
  }

  this._wrapText(this.ctx);
  this._isDirty = false;

  return {
    width: this.width, height: this.height
  }
}

TextBlock.prototype._getLineWithWidth = function (text, width, clipWord) {
  text = String(text);
  clipWord = clipWord || false;

  if (!text)
    return {
      text: "", width: 0
    };

  var textWidth = 0,
    min = 0,
    max = text.length - 1,
    mid = Infinity;

  this.ctx.font = this._getFontString();

  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    var tempText = text.substr(0, mid + 1);

    textWidth = this.ctx.measureText(tempText).width;

    if (textWidth < width) {
      min = mid + 1;
    } else if (textWidth > width) {
      max = mid - 1;
    } else {
      break;
    }
  }

  //edge cases
  if (textWidth > width && tempText.length > 1) {
    tempText = tempText.substr(0, tempText.length - 1);
    textWidth = this.ctx.measureText(tempText).width;
  }

  var isClipped = true;

  if (tempText.length === text.length || text[tempText.length] === " ")
    isClipped = false;

  if (isClipped) {
    var resultWords = tempText.split(" ");
    if (resultWords.length > 1)
      resultWords.pop();

    tempText = resultWords.join(" ");
    textWidth = this.ctx.measureText(tempText).width;
  }

  return {
    text: tempText, width: textWidth
  };
}

TextBlock.prototype._wrapText = function wrapText() {
  //this.ctx.save();
  var text = new String(trimString(String(this.text)));
  var lines = [];
  var font = this.ctx.font; // Save the current Font
  var height = 0;
  var width = 0;

  this.ctx.font = this._getFontString();

  while (text.length > 0) {

    var maxWidth = this.maxWidth - this.padding * 2;
    var maxHeight = this.maxHeight - this.padding * 2;

    var line = this._getLineWithWidth(text, maxWidth, false);
    line.height = this._lineHeight;

    lines.push(line);

    width = Math.max(width, line.width);
    height += line.height;
    text = trimString(text.slice(line.text.length, text.length));

    if (maxHeight && height > maxHeight) {
      var line = lines.pop();
      height -= line.height;
    }
  }

  this._wrappedText = {
    lines: lines, width: width, height: height
  };
  this.width = width + this.padding * 2;
  this.height = height + this.padding * 2;

  this.ctx.font = font; // Restore the font
}

TextBlock.prototype._getFontString = function () {
  //return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily
  return getFontString("", this, null);
}

export default TextBlock;
