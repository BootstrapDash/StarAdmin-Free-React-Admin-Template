import TouchBackend from './TouchBackend';
const createTouchBackendFactory = (manager, context, options = {}) => new TouchBackend(manager, context, options);
export default createTouchBackendFactory;
