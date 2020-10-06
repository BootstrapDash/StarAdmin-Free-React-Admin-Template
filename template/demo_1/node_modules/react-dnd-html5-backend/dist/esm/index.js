import HTML5Backend from './HTML5Backend';
import * as NativeTypes from './NativeTypes';
export { getEmptyImage } from './getEmptyImage';
export { NativeTypes };

var createHTML5Backend = function createHTML5Backend(manager, context) {
  return new HTML5Backend(manager, context);
};

export default createHTML5Backend;