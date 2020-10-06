import {themes} from '../constants/themes';
import {isDebugMode, defaultOptions} from '../constants/options';

function CanvasJSObject(defaultsKey, options, theme, parent) {
  this._defaultsKey = defaultsKey;

  this.parent = parent;

  this._eventListeners = [];//Multidimentional array with an array for each event type

  var currentThemeOptions = {};

  if (theme && themes[theme] && themes[theme][defaultsKey])
    currentThemeOptions = themes[theme][defaultsKey];

  this._options = options ? options : {};
  this.setOptions(this._options, currentThemeOptions);
}

CanvasJSObject.prototype.setOptions = function (options, currentThemeOptions) {

  if (!defaultOptions[this._defaultsKey]) {
    if (isDebugMode && window.console)
      console.log("defaults not set");
  }
  else {
    var defaults = defaultOptions[this._defaultsKey];

    for (var prop in defaults) {

      if (defaults.hasOwnProperty(prop)) {
      if (options && prop in options)
        this[prop] = options[prop];
      else if (currentThemeOptions && prop in currentThemeOptions)
        this[prop] = currentThemeOptions[prop];
      else this[prop] = defaults[prop];

      //if (typeof this[prop] === "function") {
      //    alert("function");
      //    this[prop] = this[prop]();
      //}
    }

  }
  }
};

// Update options. Returns true if changed or else false
CanvasJSObject.prototype.updateOption = function (prop) {

  if (!defaultOptions[this._defaultsKey] && isDebugMode && window.console)
    console.log("defaults not set");

  var defaults = defaultOptions[this._defaultsKey];
  var theme = this._options.theme ? this._options.theme : (this.chart && this.chart._options.theme) ? this.chart._options.theme : "theme1";

  var currentThemeOptions = {};
  var newValue = this[prop];

  if (theme && themes[theme] && themes[theme][this._defaultsKey])
    currentThemeOptions = themes[theme][this._defaultsKey];

  if (prop in defaults) {
    if (prop in this._options)
      newValue = this._options[prop];
    else if (currentThemeOptions && prop in currentThemeOptions)
      newValue = currentThemeOptions[prop];
    else newValue = defaults[prop];
  }

  if (newValue === this[prop])
    return false;

  this[prop] = newValue;
  return true;
}

//Stores values in _oldOptions so that it can be tracked for any changes
CanvasJSObject.prototype.trackChanges = function (option) {
  if (!this.sessionVariables)
    throw "Session Variable Store not set";

  this.sessionVariables[option] = this._options[option];
};

CanvasJSObject.prototype.isBeingTracked = function (option) {
  if (!this._options._oldOptions)
    this._options._oldOptions = {};

  if (this._options._oldOptions[option])
    return true;
  else
    return false;
};

CanvasJSObject.prototype.hasOptionChanged = function (option) {
  if (!this.sessionVariables)
    throw "Session Variable Store not set";

  var hasChanged = !(this.sessionVariables[option] === this._options[option]);

  return hasChanged;
};

CanvasJSObject.prototype.addEventListener = function (eventName, eventHandler, context) {
  if (!eventName || !eventHandler)
    return;

  context = context || this;

  this._eventListeners[eventName] = this._eventListeners[eventName] || [];

  this._eventListeners[eventName].push({ context: context, eventHandler: eventHandler });
}

CanvasJSObject.prototype.removeEventListener = function (eventName, eventHandler) {
  if (!eventName || !eventHandler || !this._eventListeners[eventName])
    return;

  var listeners = this._eventListeners[eventName];
  for (var i = 0; i < listeners.length; i++) {

    if (listeners[i].eventHandler === eventHandler) {
      listeners[i].splice(i, 1);
      break;
    }
  }
}

CanvasJSObject.prototype.removeAllEventListeners = function () {
  this._eventListeners = [];
}

CanvasJSObject.prototype.dispatchEvent = function (eventName, eventParameter, context) {

  //For Internal Events
  if (eventName && this._eventListeners[eventName]) {

  eventParameter = eventParameter || {};

  var listeners = this._eventListeners[eventName];
  for (var i = 0; i < listeners.length; i++) {

    listeners[i].eventHandler.call(listeners[i].context, eventParameter);
  }
}

  //External Events do not require registering as the property name is suffient to fire the event.
  if (typeof (this[eventName]) === "function") {
    this[eventName].call(context || this.chart._publicChartReference, eventParameter);
  }
}

export default CanvasJSObject;
