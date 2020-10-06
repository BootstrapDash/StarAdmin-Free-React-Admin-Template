import TouchBackend from './TouchBackend';

var createTouchBackendFactory = function createTouchBackendFactory(manager, context) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new TouchBackend(manager, context, options);
};

export default createTouchBackendFactory;