export function extend(derived, base) {
  derived.prototype = inherit(base.prototype);
  derived.prototype.constructor = derived;
  derived.base = base.prototype;
}

export function inherit(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

export function addToDateTime(dateTime, num, type) {
  if (type === "millisecond")
    dateTime.setMilliseconds(dateTime.getMilliseconds() + 1 * num);
  else if (type === "second")
    dateTime.setSeconds(dateTime.getSeconds() + 1 * num);
  else if (type === "minute")
    dateTime.setMinutes(dateTime.getMinutes() + 1 * num);
  else if (type === "hour") dateTime.setHours(dateTime.getHours() + 1 * num);
  else if (type === "day") dateTime.setDate(dateTime.getDate() + 1 * num);
  else if (type === "week") dateTime.setDate(dateTime.getDate() + 7 * num);
  else if (type === "month") dateTime.setMonth(dateTime.getMonth() + 1 * num);
  else if (type === "year")
    dateTime.setFullYear(dateTime.getFullYear() + 1 * num);

  return dateTime;
}

export function convertToNumber(num, type) {
  return constants[type + "Duration"] * num;
}

export function pad(value, length) {
  var isNegative = false;
  if (value < 0) {
    isNegative = true;
    value *= -1;
  }

  value = "" + value;
  length = !length ? 1 : length;

  while (value.length < length) value = "0" + value;

  return isNegative ? "-" + value : value;
}

export function trimString(str) {
  if (!str) return str;

  str = str.replace(/^\s\s*/, "");
  var ws = /\s/;
  var i = str.length;
  while (ws.test(str.charAt(--i))) {}
  return str.slice(0, i + 1);
}

export function extendCtx(context) {
  context.roundRect = function(
    x,
    y,
    width,
    height,
    radius,
    borderThickness,
    backgroundColor,
    borderColor
  ) {
    ///<signature>
    ///<summary>Creates a rounded rectangle with given fill/stroke parameters</summary>
    ///<param name="x" type="number">x value</param>
    ///<param name="y" type="number">y value</param>
    ///<param name="width" type="number">Border Width</param>
    ///<param name="height" type="number">Border Height</param>
    ///<param name="radius" type="number">Border CornerRadius</param>
    ///<param name="borderThickness" type="number">Border Thickess</param>
    ///<param name="backgroundColor" type="number">Background Color</param>
    ///<param name="borderColor" type="number">Border Color</param>
    ///</signature>

    if (backgroundColor) {
      this.fillStyle = backgroundColor;
    }

    if (borderColor) {
      this.strokeStyle = borderColor;
    }

    //if (typeof stroke == "undefined") {
    //	stroke = true;
    //}

    if (typeof radius === "undefined") {
      radius = 5;
    }

    this.lineWidth = borderThickness;

    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();

    if (backgroundColor) {
      this.fill();
    }

    if (borderColor && borderThickness > 0) {
      this.stroke();
    }
  };
}

export function compareNumbers(a, b) {
  return a - b;
}

export function compareDataPointX(dataPoint1, dataPoint2) {
  return dataPoint1.x - dataPoint2.x;
}

export function intToHexColorString(num) {
  var r = ((num & 0xff0000) >> 16).toString(16);
  var g = ((num & 0x00ff00) >> 8).toString(16);
  var b = ((num & 0x0000ff) >> 0).toString(16);

  r = r.length < 2 ? "0" + r : r;
  g = g.length < 2 ? "0" + g : g;
  b = b.length < 2 ? "0" + b : b;

  return "#" + r + g + b;
}

export function RGBToInt(r, g, b) {
  var num = (r << 16) | (g << 8) | b;

  return num;
}

export function intToRGB(num) {
  var rgb = [];
  var r = (num & 0xff0000) >> 16;
  var g = (num & 0x00ff00) >> 8;
  var b = (num & 0x0000ff) >> 0;

  //r = r.length < 2 ? "0" + r : r;
  //g = g.length < 2 ? "0" + g : g;
  //b = b.length < 2 ? "0" + b : b;

  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;

  return rgb;
}

export function arrayIndexOf(elt /*, from*/) {
  var len = this.length >>> 0;

  var from = Number(arguments[1]) || 0;
  from = from < 0 ? Math.ceil(from) : Math.floor(from);
  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in this && this[from] === elt) return from;
  }
  return -1;
}

//IE8- Fix: indexOf is not supported in IE8- for arrays
export function addArrayIndexOf(obj) {
  if (!obj.indexOf) {
    obj.indexOf = arrayIndexOf;
  }

  return obj;
}

var fontHeightInPixels = {};
var textMeasureEl = null;

export function getFontHeightInPixels(fontFamily, fontSize, fontWeight) {
  //return fontSize;

  fontWeight = fontWeight || "normal";

  var entry = fontFamily + "_" + fontSize + "_" + fontWeight;
  var height = fontHeightInPixels[entry];

  if (isNaN(height)) {
    try {
      var style =
        "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;" +
        "font-family:" +
        fontFamily +
        "; " +
        "font-size:" +
        fontSize +
        "px; font-weight:" +
        fontWeight +
        ";";
      //console.log(style);
      if (!textMeasureEl) {
        var body = document.body;
        textMeasureEl = document.createElement("span");
        textMeasureEl.innerHTML = "";
        var textNode = document.createTextNode("Mpgyi");
        textMeasureEl.appendChild(textNode);
        body.appendChild(textMeasureEl);
      }

      textMeasureEl.style.display = "";
      textMeasureEl.setAttribute("style", style);

      height = Math.round(textMeasureEl.offsetHeight);
      textMeasureEl.style.display = "none";
      //body.removeChild(tempDiv);

      //if (window.console)
      //	window.console.log(fontSize + ": " + height);
    } catch (e) {
      height = Math.ceil(fontSize * 1.1);
    }

    height = Math.max(height, fontSize);

    fontHeightInPixels[entry] = height;
  }

  return height;
}

export function getLineDashArray(lineDashType, lineThickness) {
  lineDashType = lineDashType || "solid";

  var lineDashArray = [];

  var lineDashTypeMap = {
    solid: [],
    shortDash: [3, 1],
    shortDot: [1, 1],
    shortDashDot: [3, 1, 1, 1],
    shortDashDotDot: [3, 1, 1, 1, 1, 1],
    dot: [1, 2],
    dash: [4, 2],
    dashDot: [4, 2, 1, 2],
    longDash: [8, 2],
    longDashDot: [8, 2, 1, 2],
    longDashDotDot: [8, 2, 1, 2, 1, 2]
  };

  lineDashArray = lineDashTypeMap[lineDashType];

  if (lineDashArray) {
    for (var i = 0; i < lineDashArray.length; i++) {
      lineDashArray[i] *= lineThickness;
    }
  } else lineDashArray = [];

  return lineDashArray;
}

//userCapture is optional. Defaults to false
export function addEvent(obj, eventType, fn, useCapture) {
  if (obj.addEventListener) {
    obj.addEventListener(eventType, fn, useCapture || false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + eventType, function(e) {
      e = e || window.event;
      e.preventDefault =
        e.preventDefault ||
        function() {
          e.returnValue = false;
        };
      e.stopPropagation =
        e.stopPropagation ||
        function() {
          e.cancelBubble = true;
        };
      fn.call(obj, e);
    });
  } else return false;
}

//#region formatting functions/methods
export function dateFormat() {
  var reg = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;

  var defDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var defShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var defMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var defShortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
  var timezoneClip = /[^-+\dA-Z]/g;

  return function(dt, formatString, cultureInfo) {
    var days = cultureInfo ? cultureInfo.days : defDays;
    var months = cultureInfo ? cultureInfo.months : defMonths;

    var shortDays = cultureInfo ? cultureInfo.shortDays : defShortDays;
    var shortMonths = cultureInfo ? cultureInfo.shortMonths : defShortMonths;

    var result = "";
    var utc = false;

    dt = dt && dt.getTime ? dt : dt ? new Date(dt) : new Date();
    if (isNaN(dt)) throw SyntaxError("invalid date");

    if (formatString.slice(0, 4) === "UTC:") {
      formatString = formatString.slice(4);
      utc = true;
    }

    var pre = utc ? "getUTC" : "get";
    var date = dt[pre + "Date"]();
    var day = dt[pre + "Day"]();
    var month = dt[pre + "Month"]();
    var year = dt[pre + "FullYear"]();
    var hours = dt[pre + "Hours"]();
    var minutes = dt[pre + "Minutes"]();
    var seconds = dt[pre + "Seconds"]();
    var milliseconds = dt[pre + "Milliseconds"]();
    var offset = utc ? 0 : dt.getTimezoneOffset();

    result = formatString.replace(reg, function(key) {
      switch (key) {
        case "D":
          return date;
        case "DD":
          return pad(date, 2);
        case "DDD":
          return shortDays[day];
        case "DDDD":
          return days[day];

        case "M":
          return month + 1;
        case "MM":
          return pad(month + 1, 2);
        case "MMM":
          return shortMonths[month];
        case "MMMM":
          return months[month];

        case "Y":
          return parseInt(String(year).slice(-2));
        case "YY":
          return pad(String(year).slice(-2), 2);
        case "YYY":
          return pad(String(year).slice(-3), 3);
        case "YYYY":
          return pad(year, 4);

        case "h":
          return hours % 12 || 12;
        case "hh":
          return pad(hours % 12 || 12, 2);

        case "H":
          return hours;
        case "HH":
          return pad(hours, 2);

        case "m":
          return minutes;
        case "mm":
          return pad(minutes, 2);

        case "s":
          return seconds;
        case "ss":
          return pad(seconds, 2);

        case "f":
          return String(milliseconds).slice(0, 1);
        case "ff":
          return pad(String(milliseconds).slice(0, 2), 2);
        case "fff":
          return pad(String(milliseconds).slice(0, 3), 3);

        case "t":
          return hours < 12 ? "a" : "p";
        case "tt":
          return hours < 12 ? "am" : "pm";
        case "T":
          return hours < 12 ? "A" : "P";
        case "TT":
          return hours < 12 ? "AM" : "PM";

        case "K":
          return utc
            ? "UTC"
            : (String(dt).match(timezone) || [""])
                .pop()
                .replace(timezoneClip, ""); // Time Zone;
        case "z":
          return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60); // Hour Offset from UTC without padding
        case "zz":
          return (
            (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2)
          ); // Hour Offset from UTC with padding
        case "zzz":
          return (
            (offset > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(offset) / 60), 2) +
            pad(Math.abs(offset) % 60, 2)
          ); // Hour and Minute Offset from UTC with padding

        default:
          return key.slice(1, key.length - 1);
      }
    });

    return result;
  };
}

export function numberFormat(v, fs, cultureInfo) {
  if (v === null) return "";

  v = Number(v);
  var isNegative = v < 0 ? true : false;
  if (isNegative) v *= -1;

  var decimalSeparator = cultureInfo ? cultureInfo.decimalSeparator : ".";
  var digitGroupSeparator = cultureInfo ? cultureInfo.digitGroupSeparator : ",";

  var vString = "";
  fs = String(fs);
  var multiplier = 1;
  var temp;
  var result = "";

  var matches = "";
  var decimalPosition = -1;
  var fsBeforeDecimal = [];
  var fsAfterDecimal = [];
  var noPhBeforeDecimal = 0; // Number of Placeholders before Decimal
  var noPhAfterDecimal = 0; // Number of Placeholders after Decimal
  var noComma = 0;
  var isScientificNotation = false;
  var exponent = 0;

  matches = fs.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|‰|./g);
  //window.console.log(matches + " = " + matches.length);
  var match = null;

  for (var i = 0; matches && i < matches.length; i++) {
    match = matches[i];

    if (match === "." && decimalPosition < 0) {
      decimalPosition = i;
      continue;
    } else if (match === "%") {
      multiplier *= 100;
    } else if (match === "‰") {
      multiplier *= 1000;
      continue;
    } else if (match[0] === "," && match[match.length - 1] === ".") {
      multiplier /= Math.pow(1000, match.length - 1);
      decimalPosition = i + match.length - 1;
      continue;
    } else if (
      (match[0] === "E" || match[0] === "e") &&
      match[match.length - 1] === "0"
    ) {
      isScientificNotation = true;
    }

    if (decimalPosition < 0) {
      fsBeforeDecimal.push(match);
      if (match === "#" || match === "0") noPhBeforeDecimal++;
      else if (match === ",") noComma++;
    } else {
      fsAfterDecimal.push(match);
      if (match === "#" || match === "0") noPhAfterDecimal++;
    }
  }

  if (isScientificNotation) {
    var integer = Math.floor(v);
    exponent =
      (integer === 0 ? "" : String(integer)).length - noPhBeforeDecimal;
    multiplier /= Math.pow(10, exponent);
  }

  v *= multiplier;

  if (decimalPosition < 0) decimalPosition = i;

  vString = v.toFixed(noPhAfterDecimal);
  var split = vString.split(".");
  //window.console.log(split);
  var vStringBeforeDecimal = (split[0] + "").split("");
  var vStringAfterDecimal = (split[1] + "").split("");

  if (vStringBeforeDecimal && vStringBeforeDecimal[0] === "0")
    vStringBeforeDecimal.shift();

  //window.console.log(fsBeforeDecimal + "<---------->" + fsAfterDecimal + " &        " + vStringBeforeDecimal + "<---------->" + vStringAfterDecimal);

  var noPhProcessed = 0;
  var noDigitsAdded = 0;
  var noCommaAdded = 0;
  var commaDistance = 0;
  var distanceFromLastComma = 0;

  while (fsBeforeDecimal.length > 0) {
    match = fsBeforeDecimal.pop();

    if (match === "#" || match === "0") {
      noPhProcessed++;

      if (noPhProcessed === noPhBeforeDecimal) {
        var digits = vStringBeforeDecimal;
        vStringBeforeDecimal = [];

        if (match === "0") {
          //var totalDigits = result.match(/[0-9]/g).length;
          var toPad =
            noPhBeforeDecimal - noDigitsAdded - (digits ? digits.length : 0);

          while (toPad > 0) {
            digits.unshift("0");
            toPad--;
          }
        }

        while (digits.length > 0) {
          result = digits.pop() + result;
          distanceFromLastComma++;

          if (
            distanceFromLastComma % commaDistance === 0 &&
            noCommaAdded === noComma &&
            digits.length > 0
          )
            result = digitGroupSeparator + result;
        }

        if (isNegative) result = "-" + result;
      } else {
        if (vStringBeforeDecimal.length > 0) {
          result = vStringBeforeDecimal.pop() + result;
          noDigitsAdded++;
          distanceFromLastComma++;
        } else if (match === "0") {
          result = "0" + result;
          noDigitsAdded++;
          distanceFromLastComma++;
        }

        if (
          distanceFromLastComma % commaDistance === 0 &&
          noCommaAdded === noComma &&
          vStringBeforeDecimal.length > 0
        )
          result = digitGroupSeparator + result;
      }
    } else if (
      (match[0] === "E" || match[0] === "e") &&
      match[match.length - 1] === "0" &&
      /[eE][+-]*[0]+/.test(match)
    ) {
      if (exponent < 0) match = match.replace("+", "").replace("-", "");
      else match = match.replace("-", "");

      result += match.replace(/[0]+/, function($0) {
        return pad(exponent, $0.length);
      });
    } else {
      if (match === ",") {
        noCommaAdded++;
        commaDistance = distanceFromLastComma;
        distanceFromLastComma = 0;

        if (vStringBeforeDecimal.length > 0)
          result = digitGroupSeparator + result;
      } else if (
        match.length > 1 &&
        ((match[0] === '"' && match[match.length - 1] === '"') ||
          (match[0] === "'" && match[match.length - 1] === "'"))
      ) {
        result = match.slice(1, match.length - 1) + result;
      } else result = match + result;
    }
  }

  var charCount = 0;
  var resultAfterDecimal = "";
  var addDecimalSeparator = false;

  while (fsAfterDecimal.length > 0) {
    match = fsAfterDecimal.shift();

    if (match === "#" || match === "0") {
      if (
        vStringAfterDecimal.length > 0 &&
        Number(vStringAfterDecimal.join("")) !== 0
      ) {
        resultAfterDecimal += vStringAfterDecimal.shift();
        addDecimalSeparator = true;
      } else if (match === "0") {
        resultAfterDecimal += "0";
        addDecimalSeparator = true;
      }
    } else if (
      match.length > 1 &&
      ((match[0] === '"' && match[match.length - 1] === '"') ||
        (match[0] === "'" && match[match.length - 1] === "'"))
    ) {
      resultAfterDecimal += match.slice(1, match.length - 1);
      //addDecimalSeparator = true;
    } else if (
      (match[0] === "E" || match[0] === "e") &&
      match[match.length - 1] === "0" &&
      /[eE][+-]*[0]+/.test(match)
    ) {
      if (exponent < 0) match = match.replace("+", "").replace("-", "");
      else match = match.replace("-", "");
      resultAfterDecimal += match.replace(/[0]+/, function($0) {
        return pad(exponent, $0.length);
      });
    } else {
      resultAfterDecimal += match;
      //addDecimalSeparator = true;
    }
  }

  result += (addDecimalSeparator ? decimalSeparator : "") + resultAfterDecimal;
  //window.console.log(result);
  return result;
}

//#endregion formatting functions/methods

export function getObjectId(x, y, ctx) {
  x *= devicePixelBackingStoreRatio;
  y *= devicePixelBackingStoreRatio;
  var pixels = ctx.getImageData(x, y, 2, 2).data;
  var isObject = true;

  for (var i = 0; i < 4; i++) {
    if (
      (pixels[i] !== pixels[i + 4]) |
      (pixels[i] !== pixels[i + 8]) |
      (pixels[i] !== pixels[i + 12])
    ) {
      isObject = false;
      break;
    }
  }

  if (isObject) {
    return RGBToInt(pixels[0], pixels[1], pixels[2]);
  } else {
    return 0;
  }

  //window.console.log(pixels);
}

//extracts mouse coordinates from the event parameters
export function getMouseCoordinates(ev) {
  var x = 0;
  var y = 0;

  ev = ev || window.event;

  if (ev.offsetX || ev.offsetX === 0) {
    x = ev.offsetX;
    y = ev.offsetY;
  } else if (ev.layerX || ev.layerX == 0) {
    // Firefox
    x = ev.layerX;
    y = ev.layerY;
  } else {
    x = ev.pageX - ev.target.offsetLeft;
    y = ev.pageY - ev.target.offsetTop;
  }

  return { x: x, y: y };
}

export function getFontString(prefix, object, fallbackObject) {
  var fontString = "";

  var fontStyleString = prefix ? prefix + "FontStyle" : "fontStyle";
  var fontWeightString = prefix ? prefix + "FontWeight" : "fontWeight";
  var fontSizeString = prefix ? prefix + "FontSize" : "fontSize";
  var fontFamilyString = prefix ? prefix + "FontFamily" : "fontFamily";

  fontString += object[fontStyleString]
    ? object[fontStyleString] + " "
    : fallbackObject && fallbackObject[fontStyleString]
    ? fallbackObject[fontStyleString] + " "
    : "";
  fontString += object[fontWeightString]
    ? object[fontWeightString] + " "
    : fallbackObject && fallbackObject[fontWeightString]
    ? fallbackObject[fontWeightString] + " "
    : "";
  fontString += object[fontSizeString]
    ? object[fontSizeString] + "px "
    : fallbackObject && fallbackObject[fontSizeString]
    ? fallbackObject[fontSizeString] + "px "
    : "";

  var fontFamily = object[fontFamilyString]
    ? object[fontFamilyString] + ""
    : fallbackObject && fallbackObject[fontFamilyString]
    ? fallbackObject[fontFamilyString] + ""
    : "";

  if (!isCanvasSupported && fontFamily) {
    var firstFontFamily = fontFamily.split(",")[0];

    if (firstFontFamily[0] !== "'" && firstFontFamily[0] !== '"')
      firstFontFamily = "'" + firstFontFamily + "'";

    fontString += firstFontFamily;
  } else fontString += fontFamily;

  return fontString;
}

export function getProperty(propertyName, object, fallbackObject) {
  var value =
    propertyName in object
      ? object[propertyName]
      : fallbackObject[propertyName];

  return value;
}

var optimizeForHiDPI = true;
//optimizeForHiDPI = false;
var devicePixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = 1;

export function getDevicePixelBackingStoreRatio() {
  return optimizeForHiDPI ? devicePixelRatio / backingStoreRatio : 1;
}

var devicePixelBackingStoreRatio = getDevicePixelBackingStoreRatio();

export function setCanvasSize(canvas, width, height) {
  if (isCanvasSupported && !!optimizeForHiDPI) {
    var ctx = canvas.getContext("2d");
    backingStoreRatio =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

    devicePixelBackingStoreRatio = getDevicePixelBackingStoreRatio();

    canvas.width = width * devicePixelBackingStoreRatio;
    canvas.height = height * devicePixelBackingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.scale(devicePixelBackingStoreRatio, devicePixelBackingStoreRatio);
    }

    //window.alert(backingStoreRatio);
    //window.alert(devicePixelRatio);
  } else {
    canvas.width = width;
    canvas.height = height;
  }
}

export function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.setAttribute("class", "canvasjs-chart-canvas");

  setCanvasSize(canvas, width, height);

  if (!isCanvasSupported && typeof G_vmlCanvasManager !== "undefined") {
    G_vmlCanvasManager.initElement(canvas);
  }

  return canvas;
}

export function exportCanvas(canvas, format, fileName) {
  if (!canvas || !format || !fileName) return;

  var fullFileName = fileName + "." + (format === "jpeg" ? "jpg" : format);
  var mimeType = "image/" + format;
  var img = canvas.toDataURL(mimeType);
  var saved = false;

  var downloadLink = document.createElement("a");
  downloadLink.download = fullFileName;
  downloadLink.href = img;
  downloadLink.target = "_blank";
  var e;

  if (typeof Blob !== "undefined" && !!new Blob()) {
    //alert("blob");
    var imgData = img.replace(/^data:[a-z/]*;base64,/, "");

    var byteString = atob(imgData);
    var buffer = new ArrayBuffer(byteString.length);
    var intArray = new Uint8Array(buffer);
    for (var i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    var blob = new Blob([buffer], { type: "image/" + format });

    // Save the blob
    try {
      window.navigator.msSaveBlob(blob, fullFileName);
      saved = true;
    } catch (e) {
      downloadLink.dataset.downloadurl = [
        mimeType,
        downloadLink.download,
        downloadLink.href
      ].join(":");
      downloadLink.href = window.URL.createObjectURL(blob);
    }
  }

  if (!saved) {
    try {
      event = document.createEvent("MouseEvents");

      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );

      if (downloadLink.dispatchEvent) {
        //alert("dispatchEvent");
        downloadLink.dispatchEvent(event);
      } else if (downloadLink.fireEvent) {
        //alert("fireEvent");
        downloadLink.fireEvent("onclick");
      }
    } catch (e) {
      var win = window.open();
      //alert("<IE10");
      //window.console.log("IE");
      win.document.write(
        "<img src='" +
          img +
          "'></img><div>Please right click on the image and save it to your device</div>"
      );
      win.document.close();
    }
  }
}

var base64Images = {
  reset: {
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAKRSURBVEiJrdY/iF1FFMfxzwnZrGISUSR/JLGIhoh/QiRNBLWxMLIWEkwbgiAoFgoW2mhlY6dgpY2IlRBRxBSKhSAKIklWJRYuMZKAhiyopAiaTY7FvRtmZ+/ed9/zHRjezLw5v/O9d86cuZGZpmURAfdn5o9DfdZNLXpjz+LziPgyIl6MiG0jPTJzZBuyDrP4BVm0P/AKbljTb4ToY/gGewYA7KyCl+1b3DUYANvwbiHw0gCAGRzBOzjTAXEOu0cC4Ch+r5x/HrpdrcZmvIDFSucMtnYCYC++6HmNDw8FKDT34ETrf639/azOr5vwRk/g5fbeuABtgC04XWk9VQLciMP4EH/3AFzErRNC7MXlQmsesSoHsGPE23hmEoBW+61K66HMXFmIMvN8myilXS36R01ub+KfYvw43ZXwYDX+AHP4BAci4pFJomfmr/ihmNofESsBImJGk7mlncrM45n5JPbhz0kAWpsv+juxaX21YIPmVJS2uNzJMS6ZNexC0d+I7fUWXLFyz2kSZlpWPvASlmqAf/FXNXf3FAF2F/1LuFifAlionB6dRuSI2IwHi6lzmXmp6xR8XY0fiIh7psAwh+3FuDkRHQVjl+a8lkXjo0kLUKH7XaV5oO86PmZ1FTzyP4K/XGl9v/zwfbW7BriiuETGCP5ch9bc9f97HF/vcFzCa5gdEPgWq+t/4v0V63oE1uF4h0DiFJ7HnSWMppDdh1dxtsPvJ2wcBNAKbsJXa0Ck5opdaBPsRNu/usba09i1KsaAVzmLt3sghrRjuK1Tf4xkegInxwy8gKf7dKMVH2QRsV5zXR/Cftyu+aKaKbbkQrsdH+PTzLzcqzkOQAVzM+7FHdiqqe2/YT4zF/t8S/sPmawyvC974vcAAAAASUVORK5CYII="
  },
  pan: {
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJVSURBVFiFvZe7a1RBGMV/x2hWI4JpfKCIiSBKOoOCkID/wP4BFqIIFkE02ChIiC8QDKlSiI3YqRBsBVGwUNAUdiIEUgjiAzQIIsuKJsfizsXr5t7d+8jmwLDfzHz3nLOzc7+ZxTZlGyDgZiWOCuJ9wH2gCUyuqQFgF/AGcKJNrYkBYBj40CIet+muGQi/96kM4WS7C/Tm5VUg7whJg8BkEGkCR4BDYfodsADUgP6wErO5iCtswsuJb32hdbXy8qzL5TIdmzJinHdZoZIBZcSFkGlAKs1Z3YCketZcBtouuaQNkrblMiBpBrhme7mAgU4wMCvpcFsDkq4C54DFVRTH9h+i6vlE0r5UA5ImgCuh28jB28iIs7BIVCOeStoZD64P4uPAjUTygKSx2FsK2TIwkugfk9Qkfd/E+yMWHQCeSRqx/R3gOp3LazfaS2C4B5gHDgD7U9x3E3uAH7KNpC3AHHAwTL4FHgM9GQ8vAaPA0dB/Abxqk2/gBLA9MXba9r1k/d4LfA3JtwueBeM58ucS+edXnAW23wP10N3advEi9CXizTnyN4bPS7Zn4sH/dq3t18AY4e1YLYSy3g/csj2VnFshZPuOpOeSKHCodUINuGj7YetE6je1PV9QoNPJ9StNHKodx7nRbiWrGHBGXAi5DUiqtQwtpcWK0Jubt8CltA5MEV1IfwO7+VffPwGfia5m34CT4bXujIIX0Qna1/cGMNqV/wUJE2czxD8CQ4X5Sl7Jz7SILwCDpbjKPBRMHAd+EtX4HWV5Spdc2w8kDQGPbH8py/MXMygM69/FKz4AAAAASUVORK5CYII="
  },
  zoom: {
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMqSURBVFiFvdfbj91TFMDxz57U6GUEMS1aYzyMtCSSDhWjCZMInpAI3khE/QHtgzdRkXgSCS8SES9epKLi0oRKNETjRahREq2KS1stdRujtDPtbA97n5zdn9+5zJxTK9k5v3POXmt991p7r71+IcaoGwkhTOIebMRqzOBTvIG3Y4zTXRmqSoyx5cAKbMJOHMFJnMZ8/jyFaXyMR7G6nb1aH22cP4BvcBxziG3GKfyTIR9D6BYg1KUghPBCDveFlb/24Av8iuUYw41YVsz5G7uxKcZ4aMEpwGt5NY3V/YbHsQ6rcAHOw/kYxigewr5CZw4fYGxBKcCLOFEYehXrMdRhr5yLETxVScsOLOkKAPfn1TYMPIvLFrShUlS2FDZm8XRHACzFAWl3R2xbqPMCYhmeLCAOYEMngAczbcTvuHYxzguIy/FesR9e6gSwU/OoPYHBHgHgviIKX2Flq7k34KhmcVnbi/PC8JX4MgMcxb118wZwdz5aISscqx7VRcox7MrPQ7i+btIAJrAkf9+bI9EPmZY2IAxiTSuAldLq4Y9+AcSUh78KP0tbAcwU35cXMD1JCIFUoGiehlqAz6TNB1f1C0DK+0h+nsNPrQC2a4bqGmlD9kOGcWt+Po6pVgDvSxfJaSkFd4UQBvoAsBYbCoB3a2flM7slA0R8iyt6rAFDeDPbm8eOTpVwGD9qVq7nLbIaZnmksPU1JtsCZMXNmpdRxFasWITzh6Xj3LCzra1OxcD2QjHiGVzdpfORnMqZio2PcF23ABdJF1Np4BPptlyPi6WzPYBzpJZtHe7A6xW9cnyP8TqA//SEIYRL8Bxul7rihvwgtVn78WcGGZXa9HGd5TDujDHuOePXNiHdKjWgZX/YbsxLx/ktqbjVzTlcjUSnvI5JrdlUVp6WesZZ6R1hRrpq9+EVTGS9jTjYAuKIouGpbcurEkIYxC051KNSamazsc+xK8b4S0VnEi/j0hqTP+M27O258egQwZuzs7pI7Mf4WQXIEDc5s9sux+5+1Py2EmP8UOq6GvWhIScxfdYjUERiAt9Jd84J6a16zf8JEKT3yCm8g1UxRv8CC4pyRhzR1uUAAAAASUVORK5CYII="
  },
  menu: {
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTUvMTTPsvU0AAAAP0lEQVRIie2SMQoAIBDDUvH/X667g8sJJ9KOhYYOkW0qGaU1MPdC0vGSbV19EACo3YMPAFH5BUBUjsqfAPpVXtNgGDfxEDCtAAAAAElFTkSuQmCC"
  }
};

export function setButtonState(chart, button, state) {
  if (button.getAttribute("state") !== state) {
    button.setAttribute("state", state);
    button.setAttribute("type", "button");
    button.style.position = "relative";
    button.style.margin = "0px 0px 0px 0px";
    button.style.padding = "3px 4px 0px 4px";
    button.style.cssFloat = "left";
    button.setAttribute("title", chart._cultureInfo[state + "Text"]);
    button.innerHTML =
      "<img style='height:16px;' src='" +
      base64Images[state].image +
      "' alt='" +
      chart._cultureInfo[state + "Text"] +
      "' />";
  }
}

export function show() {
  var element = null;

  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (element.style) element.style.display = "inline";
  }
}

export function hide() {
  var element = null;

  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (element && element.style) element.style.display = "none";
  }
}

export const isCanvasSupported = !!document.createElement("canvas").getContext;

export function getBezierPoints(points, tension) {
  var bezierPoints = [];

  for (var i = 0; i < points.length; i++) {
    if (i == 0) {
      bezierPoints.push(points[0]);
      continue;
    }

    var i1, i2, pointIndex;

    pointIndex = i - 1;
    i1 = pointIndex === 0 ? 0 : pointIndex - 1;
    i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

    var drv1 = {
      x: (points[i2].x - points[i1].x) / tension,
      y: (points[i2].y - points[i1].y) / tension
    };
    var cp1 = {
      x: points[pointIndex].x + drv1.x / 3,
      y: points[pointIndex].y + drv1.y / 3
    };
    bezierPoints[bezierPoints.length] = cp1;

    pointIndex = i;
    i1 = pointIndex === 0 ? 0 : pointIndex - 1;
    i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

    var drv2 = {
      x: (points[i2].x - points[i1].x) / tension,
      y: (points[i2].y - points[i1].y) / tension
    };
    var cp2 = {
      x: points[pointIndex].x - drv2.x / 3,
      y: points[pointIndex].y - drv2.y / 3
    };
    bezierPoints[bezierPoints.length] = cp2;

    bezierPoints[bezierPoints.length] = points[i];
  }

  return bezierPoints;
}

export function convertPercentToValue(input, referenceValue) {
  //input can be a number or string
  if (input === null || typeof input === "undefined") return referenceValue;

  var result =
    parseFloat(input.toString()) *
    (input.toString().indexOf("%") >= 0 ? referenceValue / 100 : 1);

  // limit to plot area
  if (!isNaN(result) && result <= referenceValue && result >= 0) return result;

  return referenceValue;
}

export function drawRect(
  ctx,
  x1,
  y1,
  x2,
  y2,
  color,
  borderThickness,
  borderColor,
  top,
  bottom,
  left,
  right,
  fillOpacity
) {
  if (typeof fillOpacity === "undefined") fillOpacity = 1;

  borderThickness = borderThickness || 0;
  borderColor = borderColor || "black";
  //alert("top"+ top + "bottom" + bottom + " lt" + left+ "rt" + right )
  var a1 = x1,
    a2 = x2,
    b1 = y1,
    b2 = y2,
    edgeY,
    edgeX;
  if (x2 - x1 > 15 && y2 - y1 > 15) var bevelDepth = 8;
  else var bevelDepth = 0.35 * Math.min(x2 - x1, y2 - y1);
  //alert(a1 + "" + a2);
  var color2 = "rgba(255, 255, 255, .4)";
  var color3 = "rgba(255, 255, 255, 0.1)";
  //color1 = "rgba(" + r + "," + g + ", " + b + ",1)";
  var color1 = color;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.save();
  ctx.fillStyle = color1;

  ctx.globalAlpha = fillOpacity;
  ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  ctx.globalAlpha = 1;

  if (borderThickness > 0) {
    var offset = borderThickness % 2 === 0 ? 0 : 0.5;
    ctx.beginPath();
    ctx.lineWidth = borderThickness;
    ctx.strokeStyle = borderColor;
    ctx.moveTo(x1, y1);
    ctx.rect(
      x1 - offset,
      y1 - offset,
      x2 - x1 + 2 * offset,
      y2 - y1 + 2 * offset
    );
    ctx.stroke();
  }

  ctx.restore();
  //   ctx.beginPath();
  if (top === true) {
    // alert(x1 + "" + x2 + " " + bevelDepth);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
    ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
    ctx.lineTo(x2, y1);
    ctx.closePath();
    var grd = ctx.createLinearGradient(
      (x2 + x1) / 2,
      b1 + bevelDepth,
      (x2 + x1) / 2,
      b1
    );
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    ctx.fillStyle = grd;
    ctx.fill();
    //              ctx.stroke();
    ctx.restore();
  }

  if (bottom === true) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y2);
    ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
    ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    var grd = ctx.createLinearGradient(
      (x2 + x1) / 2,
      b2 - bevelDepth,
      (x2 + x1) / 2,
      b2
    );
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    ctx.fillStyle = grd;
    //       ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  if (left === true) {
    //   alert(x1)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
    ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
    ctx.lineTo(x1, y2);
    ctx.closePath();
    var grd = ctx.createLinearGradient(
      a1 + bevelDepth,
      (y2 + y1) / 2,
      a1,
      (y2 + y1) / 2
    );
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color3);
    ctx.fillStyle = grd;
    ctx.fill();
    //     ctx.stroke();
    ctx.restore();
  }

  if (right === true) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x2, y1);
    ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
    ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
    ctx.lineTo(x2, y2);
    var grd = ctx.createLinearGradient(
      a2 - bevelDepth,
      (y2 + y1) / 2,
      a2,
      (y2 + y1) / 2
    );
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color3);
    ctx.fillStyle = grd;
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color3);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
    //          ctx.stroke();
    ctx.restore();
  }
  //
}

export function drawSegment(
  ctx,
  center,
  radius,
  color,
  type,
  theta1,
  theta2,
  fillOpacity,
  percentInnerRadius
) {
  if (typeof fillOpacity === "undefined") fillOpacity = 1;

  //IE8- FIX: In IE8- segment doesn't get draw if theta2 is equal to theta1 + 2*PI.
  if (!isCanvasSupported) {
    var theta2Mod = Number((theta2 % (2 * Math.PI)).toFixed(8));
    var theta1Mod = Number((theta1 % (2 * Math.PI)).toFixed(8));
    if (theta1Mod === theta2Mod) theta2 -= 0.0001;
  }

  ctx.save();
  ctx.globalAlpha = fillOpacity;

  if (type === "pie") {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius, theta1, theta2, false);
    ctx.fillStyle = color;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    //    ctx.shadowOffsetX = 2;
    //    ctx.shadowOffsetY = 1;
    //     ctx.shadowBlur = 2;
    //    ctx.shadowColor = '#BFBFBF';
    ctx.closePath();
    //ctx.stroke();
    ctx.fill();
  } else if (type === "doughnut") {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, theta1, theta2, false);
    ctx.arc(
      center.x,
      center.y,
      percentInnerRadius * radius,
      theta2,
      theta1,
      true
    );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    // shadow properties
    //     ctx.shadowOffsetX = 1;
    //    ctx.shadowOffsetY = 1;
    //     ctx.shadowBlur = 1;
    //    ctx.shadowColor = '#BFBFBF';  //grey shadow
    //ctx.stroke();
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  ctx.restore();
}
