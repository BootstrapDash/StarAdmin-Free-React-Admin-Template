'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultButton = function defaultButton(props) {
  return _react2.default.createElement(
    'button',
    _extends({ type: 'button' }, props, { className: '-btn' }),
    props.children
  );
};

var ReactTablePagination = function (_Component) {
  _inherits(ReactTablePagination, _Component);

  function ReactTablePagination(props) {
    _classCallCheck(this, ReactTablePagination);

    var _this = _possibleConstructorReturn(this, (ReactTablePagination.__proto__ || Object.getPrototypeOf(ReactTablePagination)).call(this, props));

    _this.getSafePage = _this.getSafePage.bind(_this);
    _this.changePage = _this.changePage.bind(_this);
    _this.applyPage = _this.applyPage.bind(_this);

    _this.state = {
      page: props.page
    };
    return _this;
  }

  _createClass(ReactTablePagination, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.page !== this.props.page && prevState.page !== this.state.page) {
        // this is probably safe because we only update when old/new state.page are different
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          page: this.props.page
        });
      }
    }
  }, {
    key: 'getSafePage',
    value: function getSafePage(page) {
      if (Number.isNaN(page)) {
        page = this.props.page;
      }
      return Math.min(Math.max(page, 0), this.props.pages - 1);
    }
  }, {
    key: 'changePage',
    value: function changePage(page) {
      page = this.getSafePage(page);
      this.setState({ page: page });
      if (this.props.page !== page) {
        this.props.onPageChange(page);
      }
    }
  }, {
    key: 'applyPage',
    value: function applyPage(e) {
      if (e) {
        e.preventDefault();
      }
      var page = this.state.page;
      this.changePage(page === '' ? this.props.page : page);
    }
  }, {
    key: 'getPageJumpProperties',
    value: function getPageJumpProperties() {
      var _this2 = this;

      return {
        onKeyPress: function onKeyPress(e) {
          if (e.which === 13 || e.keyCode === 13) {
            _this2.applyPage();
          }
        },
        onBlur: this.applyPage,
        value: this.state.page === '' ? '' : this.state.page + 1,
        onChange: function onChange(e) {
          var val = e.target.value;
          var page = val - 1;
          if (val === '') {
            return _this2.setState({ page: val });
          }
          _this2.setState({ page: _this2.getSafePage(page) });
        },
        inputType: this.state.page === '' ? 'text' : 'number',
        pageJumpText: this.props.pageJumpText
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          pages = _props.pages,
          page = _props.page,
          showPageSizeOptions = _props.showPageSizeOptions,
          pageSizeOptions = _props.pageSizeOptions,
          pageSize = _props.pageSize,
          showPageJump = _props.showPageJump,
          canPrevious = _props.canPrevious,
          canNext = _props.canNext,
          onPageSizeChange = _props.onPageSizeChange,
          className = _props.className,
          PreviousComponent = _props.PreviousComponent,
          NextComponent = _props.NextComponent,
          renderPageJump = _props.renderPageJump,
          renderCurrentPage = _props.renderCurrentPage,
          renderTotalPagesCount = _props.renderTotalPagesCount,
          renderPageSizeOptions = _props.renderPageSizeOptions;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, '-pagination'), style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: '-previous' },
          _react2.default.createElement(
            PreviousComponent,
            {
              onClick: function onClick() {
                if (!canPrevious) return;
                _this3.changePage(page - 1);
              },
              disabled: !canPrevious
            },
            this.props.previousText
          )
        ),
        _react2.default.createElement(
          'div',
          { className: '-center' },
          _react2.default.createElement(
            'span',
            { className: '-pageInfo' },
            this.props.pageText,
            ' ',
            showPageJump ? renderPageJump(this.getPageJumpProperties()) : renderCurrentPage(page),
            ' ',
            this.props.ofText,
            ' ',
            renderTotalPagesCount(pages)
          ),
          showPageSizeOptions && renderPageSizeOptions({
            pageSize: pageSize,
            rowsSelectorText: this.props.rowsSelectorText,
            pageSizeOptions: pageSizeOptions,
            onPageSizeChange: onPageSizeChange,
            rowsText: this.props.rowsText
          })
        ),
        _react2.default.createElement(
          'div',
          { className: '-next' },
          _react2.default.createElement(
            NextComponent,
            {
              onClick: function onClick() {
                if (!canNext) return;
                _this3.changePage(page + 1);
              },
              disabled: !canNext
            },
            this.props.nextText
          )
        )
      );
    }
  }]);

  return ReactTablePagination;
}(_react.Component);

ReactTablePagination.defaultProps = {
  PreviousComponent: defaultButton,
  NextComponent: defaultButton,
  renderPageJump: function renderPageJump(_ref) {
    var onChange = _ref.onChange,
        value = _ref.value,
        onBlur = _ref.onBlur,
        onKeyPress = _ref.onKeyPress,
        inputType = _ref.inputType,
        pageJumpText = _ref.pageJumpText;
    return _react2.default.createElement(
      'div',
      { className: '-pageJump' },
      _react2.default.createElement('input', {
        'aria-label': pageJumpText,
        type: inputType,
        onChange: onChange,
        value: value,
        onBlur: onBlur,
        onKeyPress: onKeyPress
      })
    );
  },
  renderCurrentPage: function renderCurrentPage(page) {
    return _react2.default.createElement(
      'span',
      { className: '-currentPage' },
      page + 1
    );
  },
  renderTotalPagesCount: function renderTotalPagesCount(pages) {
    return _react2.default.createElement(
      'span',
      { className: '-totalPages' },
      pages || 1
    );
  },
  renderPageSizeOptions: function renderPageSizeOptions(_ref2) {
    var pageSize = _ref2.pageSize,
        pageSizeOptions = _ref2.pageSizeOptions,
        rowsSelectorText = _ref2.rowsSelectorText,
        onPageSizeChange = _ref2.onPageSizeChange,
        rowsText = _ref2.rowsText;
    return _react2.default.createElement(
      'span',
      { className: 'select-wrap -pageSizeOptions' },
      _react2.default.createElement(
        'select',
        {
          'aria-label': rowsSelectorText,
          onChange: function onChange(e) {
            return onPageSizeChange(Number(e.target.value));
          },
          value: pageSize
        },
        pageSizeOptions.map(function (option, i) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            _react2.default.createElement(
              'option',
              { key: i, value: option },
              option + ' ' + rowsText
            )
          );
        })
      )
    );
  }
};
exports.default = ReactTablePagination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiUmVhY3RUYWJsZVBhZ2luYXRpb24iLCJnZXRTYWZlUGFnZSIsImJpbmQiLCJjaGFuZ2VQYWdlIiwiYXBwbHlQYWdlIiwic3RhdGUiLCJwYWdlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic2V0U3RhdGUiLCJOdW1iZXIiLCJpc05hTiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwYWdlcyIsIm9uUGFnZUNoYW5nZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm9uS2V5UHJlc3MiLCJ3aGljaCIsImtleUNvZGUiLCJvbkJsdXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidmFsIiwidGFyZ2V0IiwiaW5wdXRUeXBlIiwicGFnZUp1bXBUZXh0Iiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY2FuUHJldmlvdXMiLCJjYW5OZXh0Iiwib25QYWdlU2l6ZUNoYW5nZSIsImNsYXNzTmFtZSIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsInJlbmRlclBhZ2VKdW1wIiwicmVuZGVyQ3VycmVudFBhZ2UiLCJyZW5kZXJUb3RhbFBhZ2VzQ291bnQiLCJyZW5kZXJQYWdlU2l6ZU9wdGlvbnMiLCJzdHlsZSIsInByZXZpb3VzVGV4dCIsInBhZ2VUZXh0IiwiZ2V0UGFnZUp1bXBQcm9wZXJ0aWVzIiwib2ZUZXh0Iiwicm93c1NlbGVjdG9yVGV4dCIsInJvd3NUZXh0IiwibmV4dFRleHQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJtYXAiLCJvcHRpb24iLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFNBQ3BCO0FBQUE7QUFBQSxlQUFRLE1BQUssUUFB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QUtFLGdCQUFRRCxNQUxWO0FBTUUsb0JBQVlIO0FBTmQ7QUFERixLQUhjO0FBQUEsR0FISTtBQWlCcEJxQixxQkFBbUI7QUFBQSxXQUFRO0FBQUE7QUFBQSxRQUFNLFdBQVUsY0FBaEI7QUFBZ0NsQyxhQUFPO0FBQXZDLEtBQVI7QUFBQSxHQWpCQztBQWtCcEJtQyx5QkFBdUI7QUFBQSxXQUFTO0FBQUE7QUFBQSxRQUFNLFdBQVUsYUFBaEI7QUFBK0IxQixlQUFTO0FBQXhDLEtBQVQ7QUFBQSxHQWxCSDtBQW1CcEIyQix5QkFBdUI7QUFBQSxRQUNyQlgsUUFEcUIsU0FDckJBLFFBRHFCO0FBQUEsUUFFckJELGVBRnFCLFNBRXJCQSxlQUZxQjtBQUFBLFFBR3JCa0IsZ0JBSHFCLFNBR3JCQSxnQkFIcUI7QUFBQSxRQUlyQmIsZ0JBSnFCLFNBSXJCQSxnQkFKcUI7QUFBQSxRQUtyQmMsUUFMcUIsU0FLckJBLFFBTHFCO0FBQUEsV0FPckI7QUFBQTtBQUFBLFFBQU0sV0FBVSw4QkFBaEI7QUFDRTtBQUFBO0FBQUE7QUFDRSx3QkFBWUQsZ0JBRGQ7QUFFRSxvQkFBVTtBQUFBLG1CQUFLYixpQkFBaUJ6QixPQUFPTyxFQUFFUyxNQUFGLENBQVNILEtBQWhCLENBQWpCLENBQUw7QUFBQSxXQUZaO0FBR0UsaUJBQU9RO0FBSFQ7QUFLR0Qsd0JBQWdCdUIsR0FBaEIsQ0FBb0IsVUFBQ0MsTUFBRCxFQUFTQyxDQUFUO0FBQUE7QUFDbkI7QUFDQTtBQUFBO0FBQUEsZ0JBQVEsS0FBS0EsQ0FBYixFQUFnQixPQUFPRCxNQUF2QjtBQUNNQSxvQkFETixTQUNnQkw7QUFEaEI7QUFGbUI7QUFBQSxTQUFwQjtBQUxIO0FBREYsS0FQcUI7QUFBQTtBQW5CSCxDO2tCQURIakQsb0IiLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5cbmNvbnN0IGRlZmF1bHRCdXR0b24gPSBwcm9wcyA9PiAoXG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwiLWJ0blwiPlxuICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgPC9idXR0b24+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWN0VGFibGVQYWdpbmF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBQcmV2aW91c0NvbXBvbmVudDogZGVmYXVsdEJ1dHRvbixcbiAgICBOZXh0Q29tcG9uZW50OiBkZWZhdWx0QnV0dG9uLFxuICAgIHJlbmRlclBhZ2VKdW1wOiAoe1xuICAgICAgb25DaGFuZ2UsIHZhbHVlLCBvbkJsdXIsIG9uS2V5UHJlc3MsIGlucHV0VHlwZSwgcGFnZUp1bXBUZXh0LFxuICAgIH0pID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiLXBhZ2VKdW1wXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGFyaWEtbGFiZWw9e3BhZ2VKdW1wVGV4dH1cbiAgICAgICAgICB0eXBlPXtpbnB1dFR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICBvbktleVByZXNzPXtvbktleVByZXNzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKSxcbiAgICByZW5kZXJDdXJyZW50UGFnZTogcGFnZSA9PiA8c3BhbiBjbGFzc05hbWU9XCItY3VycmVudFBhZ2VcIj57cGFnZSArIDF9PC9zcGFuPixcbiAgICByZW5kZXJUb3RhbFBhZ2VzQ291bnQ6IHBhZ2VzID0+IDxzcGFuIGNsYXNzTmFtZT1cIi10b3RhbFBhZ2VzXCI+e3BhZ2VzIHx8IDF9PC9zcGFuPixcbiAgICByZW5kZXJQYWdlU2l6ZU9wdGlvbnM6ICh7XG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHBhZ2VTaXplT3B0aW9ucyxcbiAgICAgIHJvd3NTZWxlY3RvclRleHQsXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlLFxuICAgICAgcm93c1RleHQsXG4gICAgfSkgPT4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VsZWN0LXdyYXAgLXBhZ2VTaXplT3B0aW9uc1wiPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgYXJpYS1sYWJlbD17cm93c1NlbGVjdG9yVGV4dH1cbiAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBvblBhZ2VTaXplQ2hhbmdlKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgIHZhbHVlPXtwYWdlU2l6ZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtwYWdlU2l6ZU9wdGlvbnMubWFwKChvcHRpb24sIGkpID0+IChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17b3B0aW9ufT5cbiAgICAgICAgICAgICAge2Ake29wdGlvbn0gJHtyb3dzVGV4dH1gfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICksXG4gIH1cblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuZ2V0U2FmZVBhZ2UgPSB0aGlzLmdldFNhZmVQYWdlLmJpbmQodGhpcylcbiAgICB0aGlzLmNoYW5nZVBhZ2UgPSB0aGlzLmNoYW5nZVBhZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuYXBwbHlQYWdlID0gdGhpcy5hcHBseVBhZ2UuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6IHByb3BzLnBhZ2UsXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChwcmV2UHJvcHMucGFnZSAhPT0gdGhpcy5wcm9wcy5wYWdlICYmIHByZXZTdGF0ZS5wYWdlICE9PSB0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgIC8vIHRoaXMgaXMgcHJvYmFibHkgc2FmZSBiZWNhdXNlIHdlIG9ubHkgdXBkYXRlIHdoZW4gb2xkL25ldyBzdGF0ZS5wYWdlIGFyZSBkaWZmZXJlbnRcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBhZ2U6IHRoaXMucHJvcHMucGFnZSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZ2V0U2FmZVBhZ2UgKHBhZ2UpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHBhZ2UpKSB7XG4gICAgICBwYWdlID0gdGhpcy5wcm9wcy5wYWdlXG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwYWdlLCAwKSwgdGhpcy5wcm9wcy5wYWdlcyAtIDEpXG4gIH1cblxuICBjaGFuZ2VQYWdlIChwYWdlKSB7XG4gICAgcGFnZSA9IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSlcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFnZSB9KVxuICAgIGlmICh0aGlzLnByb3BzLnBhZ2UgIT09IHBhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25QYWdlQ2hhbmdlKHBhZ2UpXG4gICAgfVxuICB9XG5cbiAgYXBwbHlQYWdlIChlKSB7XG4gICAgaWYgKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgICBjb25zdCBwYWdlID0gdGhpcy5zdGF0ZS5wYWdlXG4gICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgPT09ICcnID8gdGhpcy5wcm9wcy5wYWdlIDogcGFnZSlcbiAgfVxuXG4gIGdldFBhZ2VKdW1wUHJvcGVydGllcyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uS2V5UHJlc3M6IGUgPT4ge1xuICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHRoaXMuYXBwbHlQYWdlKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQmx1cjogdGhpcy5hcHBseVBhZ2UsXG4gICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5wYWdlID09PSAnJyA/ICcnIDogdGhpcy5zdGF0ZS5wYWdlICsgMSxcbiAgICAgIG9uQ2hhbmdlOiBlID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3QgcGFnZSA9IHZhbCAtIDFcbiAgICAgICAgaWYgKHZhbCA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7IHBhZ2U6IHZhbCB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlOiB0aGlzLmdldFNhZmVQYWdlKHBhZ2UpIH0pXG4gICAgICB9LFxuICAgICAgaW5wdXRUeXBlOiB0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJ3RleHQnIDogJ251bWJlcicsXG4gICAgICBwYWdlSnVtcFRleHQ6IHRoaXMucHJvcHMucGFnZUp1bXBUZXh0LFxuICAgIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge1xuICAgICAgLy8gQ29tcHV0ZWRcbiAgICAgIHBhZ2VzLFxuICAgICAgLy8gUHJvcHNcbiAgICAgIHBhZ2UsXG4gICAgICBzaG93UGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzaG93UGFnZUp1bXAsXG4gICAgICBjYW5QcmV2aW91cyxcbiAgICAgIGNhbk5leHQsXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgUHJldmlvdXNDb21wb25lbnQsXG4gICAgICBOZXh0Q29tcG9uZW50LFxuICAgICAgcmVuZGVyUGFnZUp1bXAsXG4gICAgICByZW5kZXJDdXJyZW50UGFnZSxcbiAgICAgIHJlbmRlclRvdGFsUGFnZXNDb3VudCxcbiAgICAgIHJlbmRlclBhZ2VTaXplT3B0aW9ucyxcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzTmFtZSwgJy1wYWdpbmF0aW9uJyl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCItcHJldmlvdXNcIj5cbiAgICAgICAgICA8UHJldmlvdXNDb21wb25lbnRcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFjYW5QcmV2aW91cykgcmV0dXJuXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlIC0gMSlcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhblByZXZpb3VzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZpb3VzVGV4dH1cbiAgICAgICAgICA8L1ByZXZpb3VzQ29tcG9uZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCItY2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiLXBhZ2VJbmZvXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wYWdlVGV4dH17JyAnfVxuICAgICAgICAgICAge3Nob3dQYWdlSnVtcCA/IHJlbmRlclBhZ2VKdW1wKHRoaXMuZ2V0UGFnZUp1bXBQcm9wZXJ0aWVzKCkpIDogcmVuZGVyQ3VycmVudFBhZ2UocGFnZSl9eycgJ31cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm9mVGV4dH0ge3JlbmRlclRvdGFsUGFnZXNDb3VudChwYWdlcyl9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIHtzaG93UGFnZVNpemVPcHRpb25zICYmXG4gICAgICAgICAgICByZW5kZXJQYWdlU2l6ZU9wdGlvbnMoe1xuICAgICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgICAgcm93c1NlbGVjdG9yVGV4dDogdGhpcy5wcm9wcy5yb3dzU2VsZWN0b3JUZXh0LFxuICAgICAgICAgICAgICBwYWdlU2l6ZU9wdGlvbnMsXG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2UsXG4gICAgICAgICAgICAgIHJvd3NUZXh0OiB0aGlzLnByb3BzLnJvd3NUZXh0LFxuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1uZXh0XCI+XG4gICAgICAgICAgPE5leHRDb21wb25lbnRcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFjYW5OZXh0KSByZXR1cm5cbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgKyAxKVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshY2FuTmV4dH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0VGV4dH1cbiAgICAgICAgICA8L05leHRDb21wb25lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG4iXX0=