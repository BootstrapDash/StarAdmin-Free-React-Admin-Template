'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sheet = require('./sheet');

var _sheet2 = _interopRequireDefault(_sheet);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isBrowser = typeof window !== 'undefined';


var cache = new WeakMap();

var Glam = function () {
  function Glam() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Glam);

    this.props = props;
    if (isBrowser) {
      var doc = this.props.document;
      var cached = cache.get(doc);
      if (cached) {
        return cached;
      }
      cache.set(doc, this);
      this.sheet = new _sheet2.default({ document: doc });
    }

    this.inserted = {};
    this.tagged = {};
  }

  _createClass(Glam, [{
    key: 'hydrate',
    value: function hydrate(ids) {
      var _this = this;

      ids.forEach(function (id) {
        return _this.inserted[id] = true;
      });
    }
  }, {
    key: 'tag',
    value: function tag(id) {
      this.tagged[id] = true;
    }
  }, {
    key: 'isTagged',
    value: function isTagged(id) {
      return this.tagged[id];
    }
  }, {
    key: 'insert',
    value: function insert(ast) {
      var _this2 = this;

      if (!this.inserted[ast.className]) {
        var _rules = (0, _generate2.default)(ast);
        if (isBrowser) {
          _rules.forEach(function (rule) {
            return _this2.sheet.insert(rule);
          });
        }
        this.inserted[ast.className] = true; // on server, add rules instead
      }
    }
  }]);

  return Glam;
}();

exports.default = Glam;