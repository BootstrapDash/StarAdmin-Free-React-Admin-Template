function LayoutManager(x1, y1, x2, y2, padding) {

  if (typeof (padding) === "undefined")
    padding = 0;

  this._padding = padding;

  this._x1 = x1;
  this._y1 = y1;
  this._x2 = x2;
  this._y2 = y2;

  this._topOccupied = this._padding;
  this._bottomOccupied = this._padding;
  this._leftOccupied = this._padding;
  this._rightOccupied = this._padding;
}

LayoutManager.prototype.registerSpace = function (position, size) {
  if (position === "top") {
    this._topOccupied += size.height;
  }
  else if (position === "bottom") {
    this._bottomOccupied += size.height;
  } else if (position === "left") {
    this._leftOccupied += size.width; // this is width when seen upright/vertically
  } else if (position === "right") {
    this._rightOccupied += size.width;// this is width when seen upright/vertically
  }
}

LayoutManager.prototype.unRegisterSpace = function (position, size) {
  if (position === "top") {
    this._topOccupied -= size.height;
  }
  else if (position === "bottom") {
    this._bottomOccupied -= size.height;
  } else if (position === "left") {
    this._leftOccupied -= size.width;// this is width when seen upright/vertically
  } else if (position === "right") {
    this._rightOccupied -= size.width;// this is width when seen upright/vertically
  }
}

LayoutManager.prototype.getFreeSpace = function () {
  ///<signature>
  ///<summary>Returns available free space {x1:number, y1:number, x2:number, y2:number}</summary>
  ///</signature>

  return {
    x1: this._x1 + this._leftOccupied,
    y1: this._y1 + this._topOccupied,
    x2: this._x2 - this._rightOccupied,
    y2: this._y2 - this._bottomOccupied,
    width: (this._x2 - this._x1) - this._rightOccupied - this._leftOccupied,
    height: (this._y2 - this._y1) - this._bottomOccupied - this._topOccupied
  };
}

LayoutManager.prototype.reset = function () {
  //so that there is enough padding.
  this._topOccupied = this._padding;
  this._bottomOccupied = this._padding;
  this._leftOccupied = this._padding;
  this._rightOccupied = this._padding;
}

export default LayoutManager;
