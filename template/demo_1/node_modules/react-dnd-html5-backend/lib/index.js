import HTML5Backend from './HTML5Backend';
import * as NativeTypes from './NativeTypes';
export { getEmptyImage } from './getEmptyImage';
export { NativeTypes };
const createHTML5Backend = (manager, context) => new HTML5Backend(manager, context);
export default createHTML5Backend;
