'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizePerPageDropdownWithAdapter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pageResolver2 = require('./page-resolver');

var _pageResolver3 = _interopRequireDefault(_pageResolver2);

var _sizePerPageDropdown = require('./size-per-page-dropdown');

var _sizePerPageDropdown2 = _interopRequireDefault(_sizePerPageDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


var sizePerPageDropdownAdapter = function sizePerPageDropdownAdapter(WrappedComponent) {
  return function (_pageResolver) {
    _inherits(SizePerPageDropdownAdapter, _pageResolver);

    function SizePerPageDropdownAdapter(props) {
      _classCallCheck(this, SizePerPageDropdownAdapter);

      var _this = _possibleConstructorReturn(this, (SizePerPageDropdownAdapter.__proto__ || Object.getPrototypeOf(SizePerPageDropdownAdapter)).call(this, props));

      _this.closeDropDown = _this.closeDropDown.bind(_this);
      _this.toggleDropDown = _this.toggleDropDown.bind(_this);
      _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_this);
      _this.state = { dropdownOpen: false };
      return _this;
    }

    _createClass(SizePerPageDropdownAdapter, [{
      key: 'toggleDropDown',
      value: function toggleDropDown() {
        var dropdownOpen = !this.state.dropdownOpen;
        this.setState(function () {
          return { dropdownOpen: dropdownOpen };
        });
      }
    }, {
      key: 'closeDropDown',
      value: function closeDropDown() {
        this.setState(function () {
          return { dropdownOpen: false };
        });
      }
    }, {
      key: 'handleChangeSizePerPage',
      value: function handleChangeSizePerPage(sizePerPage) {
        this.props.onSizePerPageChange(sizePerPage);
        this.closeDropDown();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            tableId = _props.tableId,
            bootstrap4 = _props.bootstrap4,
            sizePerPageList = _props.sizePerPageList,
            currSizePerPage = _props.currSizePerPage,
            hideSizePerPage = _props.hideSizePerPage,
            sizePerPageRenderer = _props.sizePerPageRenderer,
            sizePerPageOptionRenderer = _props.sizePerPageOptionRenderer;
        var open = this.state.dropdownOpen;


        if (sizePerPageList.length > 1 && !hideSizePerPage) {
          if (sizePerPageRenderer) {
            return sizePerPageRenderer({
              options: this.calculateSizePerPageStatus(),
              currSizePerPage: '' + currSizePerPage,
              onSizePerPageChange: this.handleChangeSizePerPage
            });
          }
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
            currSizePerPage: '' + currSizePerPage,
            options: this.calculateSizePerPageStatus(),
            optionRenderer: sizePerPageOptionRenderer,
            onSizePerPageChange: this.handleChangeSizePerPage,
            onClick: this.toggleDropDown,
            onBlur: this.closeDropDown,
            open: open,
            tableId: tableId,
            bootstrap4: bootstrap4
          }));
        }
        return null;
      }
    }]);

    return SizePerPageDropdownAdapter;
  }((0, _pageResolver3.default)(_react.Component));
};

var SizePerPageDropdownWithAdapter = exports.SizePerPageDropdownWithAdapter = sizePerPageDropdownAdapter(_sizePerPageDropdown2.default);
exports.default = sizePerPageDropdownAdapter;