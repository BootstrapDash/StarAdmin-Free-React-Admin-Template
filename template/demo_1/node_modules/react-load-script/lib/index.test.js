'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* global document */

var props = void 0;
var wrapper = void 0;

beforeEach(function () {
  props = {
    onCreate: jest.fn(),
    onError: jest.fn(),
    onLoad: jest.fn(),
    url: 'dummy',
    attributes: {
      id: 'dummyId',
      dummy: 'non standard',
      'data-dummy': 'standard',
      async: false
    }
  };
  wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
});

test('renders null', function () {
  expect(wrapper.type()).toBe(null);
});

// constructor
test('constructor should assign incrementing scriptLoaderId', function () {
  wrapper.instance().constructor.idCount = 0;
  wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
  expect(wrapper.instance().scriptLoaderId).toBe('id0');

  wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
  expect(wrapper.instance().scriptLoaderId).toBe('id1');

  wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
  expect(wrapper.instance().scriptLoaderId).toBe('id2');
});

// componentDidMount
test('componentDidMount should run onLoad callback if script already loaded', function () {
  wrapper.instance().constructor.loadedScripts[props.url] = true;
  wrapper.instance().componentDidMount();
  expect(props.onLoad.mock.calls.length).toBe(1);
});

test('componentDidMount should not run onLoad callback if script not yet loaded', function () {
  wrapper.instance().constructor.loadedScripts[props.url] = false;
  wrapper.instance().componentDidMount();
  expect(props.onLoad.mock.calls.length).toBe(0);
});

test('componentDidMount should run onError callback if script has errored', function () {
  wrapper.instance().constructor.erroredScripts[props.url] = true;
  wrapper.instance().componentDidMount();
  expect(props.onError.mock.calls.length).toBe(1);
});

test('componentDidMount should not run onError callback if script has not errored', function () {
  wrapper.instance().constructor.erroredScripts[props.url] = false;
  wrapper.instance().componentDidMount();
  expect(props.onError.mock.calls.length).toBe(0);
});

test('componentDidMount: if the script is already loading, props should be passed to the observer', function () {
  wrapper.instance().constructor.scriptObservers[props.url] = {};
  wrapper.instance().scriptLoaderId = 'id0';
  wrapper.instance().componentDidMount();
  expect(wrapper.instance().constructor.scriptObservers[props.url].id0).toMatchObject(props);
});

// componentWillUnmount
test('componentWillUnmount should delete observers for the loader', function () {
  wrapper.instance().constructor.scriptObservers[props.url] = _defineProperty({}, wrapper.instance().scriptLoaderId, 'props');
  var getObserver = function getObserver() {
    return wrapper.instance().constructor.scriptObservers[props.url][wrapper.instance().scriptLoaderId];
  };
  expect(getObserver()).toBe('props');
  wrapper.instance().componentWillUnmount();
  expect(getObserver()).toBe(undefined);
});

test('custom attributes should be set on the script tag', function () {
  var script = document.getElementById('dummyId');
  expect(script.getAttribute('id')).toBe('dummyId');
  expect(script.getAttribute('dummy')).toBe('non standard');
  expect(script.getAttribute('data-dummy')).toBe('standard');
  expect(script.getAttribute('async')).toBe('false');
});