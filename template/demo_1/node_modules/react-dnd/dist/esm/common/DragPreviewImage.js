import * as React from 'react';
/*
 * A utility for rendering a drag preview image
 */

export var DragPreviewImage = React.memo(function (_ref) {
  var connect = _ref.connect,
      src = _ref.src;

  if (typeof Image !== 'undefined') {
    var img = new Image();
    img.src = src;

    img.onload = function () {
      return connect(img);
    };
  }

  return null;
});
DragPreviewImage.displayName = 'DragPreviewImage';