"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _Container = _interopRequireDefault(require("../dnd/Container"));

var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));

var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));

class Lane extends _react.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "state", {
      loading: false,
      currentPage: this.props.currentPage,
      addCardMode: false,
      collapsed: false,
      isDraggingOver: false
    });
    (0, _defineProperty2.default)(this, "handleScroll", evt => {
      const node = evt.target;
      const elemScrollPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      const onLaneScroll = this.props.onLaneScroll;

      if (elemScrollPosition <= 0 && onLaneScroll && !this.state.loading) {
        const currentPage = this.state.currentPage;
        this.setState({
          loading: true
        });
        const nextPage = currentPage + 1;
        onLaneScroll(nextPage, this.props.id).then(moreCards => {
          if (!moreCards || moreCards.length === 0) {
            // if no cards present, stop retrying until user action
            node.scrollTop = node.scrollTop - 100;
          } else {
            this.props.actions.paginateLane({
              laneId: this.props.id,
              newCards: moreCards,
              nextPage: nextPage
            });
          }

          this.setState({
            loading: false
          });
        });
      }
    });
    (0, _defineProperty2.default)(this, "laneDidMount", node => {
      if (node) {
        node.addEventListener('scroll', this.handleScroll);
      }
    });
    (0, _defineProperty2.default)(this, "removeCard", cardId => {
      if (this.props.onBeforeCardDelete && typeof this.props.onBeforeCardDelete === 'function') {
        this.props.onBeforeCardDelete(() => {
          this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id);
          this.props.actions.removeCard({
            laneId: this.props.id,
            cardId: cardId
          });
        });
      } else {
        this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id);
        this.props.actions.removeCard({
          laneId: this.props.id,
          cardId: cardId
        });
      }
    });
    (0, _defineProperty2.default)(this, "handleCardClick", (e, card) => {
      const onCardClick = this.props.onCardClick;
      onCardClick && onCardClick(card.id, card.metadata, card.laneId);
      e.stopPropagation();
    });
    (0, _defineProperty2.default)(this, "showEditableCard", () => {
      this.setState({
        addCardMode: true
      });
    });
    (0, _defineProperty2.default)(this, "hideEditableCard", () => {
      this.setState({
        addCardMode: false
      });
    });
    (0, _defineProperty2.default)(this, "addNewCard", params => {
      const laneId = this.props.id;
      const id = (0, _v.default)();
      this.hideEditableCard();
      let card = (0, _objectSpread2.default)({
        id
      }, params);
      this.props.actions.addCard({
        laneId,
        card
      });
      this.props.onCardAdd(card, laneId);
    });
    (0, _defineProperty2.default)(this, "onDragStart", ({
      payload
    }) => {
      const handleDragStart = this.props.handleDragStart;
      handleDragStart && handleDragStart(payload.id, payload.laneId);
    });
    (0, _defineProperty2.default)(this, "shouldAcceptDrop", sourceContainerOptions => {
      return this.props.droppable && sourceContainerOptions.groupName === this.groupName;
    });
    (0, _defineProperty2.default)(this, "onDragEnd", (laneId, result) => {
      const handleDragEnd = this.props.handleDragEnd;
      const addedIndex = result.addedIndex,
            payload = result.payload;

      if (this.state.isDraggingOver) {
        this.setState({
          isDraggingOver: false
        });
      }

      if (addedIndex != null) {
        const newCard = (0, _objectSpread2.default)({}, (0, _cloneDeep.default)(payload), {
          laneId
        });
        const response = handleDragEnd ? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard) : true;

        if (response === undefined || !!response) {
          this.props.actions.moveCardAcrossLanes({
            fromLaneId: payload.laneId,
            toLaneId: laneId,
            cardId: payload.id,
            index: addedIndex
          });
          this.props.onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex);
        }

        return response;
      }
    });
    (0, _defineProperty2.default)(this, "renderDragContainer", isDraggingOver => {
      const _this$props = this.props,
            id = _this$props.id,
            cards = _this$props.cards,
            laneSortFunction = _this$props.laneSortFunction,
            editable = _this$props.editable,
            hideCardDeleteIcon = _this$props.hideCardDeleteIcon,
            cardDraggable = _this$props.cardDraggable,
            cardDragClass = _this$props.cardDragClass,
            cardDropClass = _this$props.cardDropClass,
            tagStyle = _this$props.tagStyle,
            cardStyle = _this$props.cardStyle,
            components = _this$props.components,
            t = _this$props.t;
      const _this$state = this.state,
            addCardMode = _this$state.addCardMode,
            collapsed = _this$state.collapsed;
      const showableCards = collapsed ? [] : cards;
      const cardList = this.sortCards(showableCards, laneSortFunction).map((card, idx) => {
        const onDeleteCard = () => this.removeCard(card.id);

        const cardToRender = _react.default.createElement(components.Card, (0, _extends2.default)({
          key: card.id,
          index: idx,
          style: card.style || cardStyle,
          className: "react-trello-card",
          onDelete: onDeleteCard,
          onClick: e => this.handleCardClick(e, card),
          showDeleteButton: !hideCardDeleteIcon,
          tagStyle: tagStyle,
          cardDraggable: cardDraggable
        }, card));

        return cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? _react.default.createElement(_Draggable.default, {
          key: card.id
        }, cardToRender) : _react.default.createElement("span", {
          key: card.id
        }, cardToRender);
      });
      return _react.default.createElement(components.ScrollableLane, {
        ref: this.laneDidMount,
        isDraggingOver: isDraggingOver
      }, _react.default.createElement(_Container.default, {
        orientation: "vertical",
        groupName: this.groupName,
        dragClass: cardDragClass,
        dropClass: cardDropClass,
        onDragStart: this.onDragStart,
        onDrop: e => this.onDragEnd(id, e),
        onDragEnter: () => this.setState({
          isDraggingOver: true
        }),
        onDragLeave: () => this.setState({
          isDraggingOver: false
        }),
        shouldAcceptDrop: this.shouldAcceptDrop,
        getChildPayload: index => this.props.getCardDetails(id, index)
      }, cardList), editable && !addCardMode && _react.default.createElement(components.AddCardLink, {
        onClick: this.showEditableCard,
        t: t
      }), addCardMode && _react.default.createElement(components.NewCardForm, {
        onCancel: this.hideEditableCard,
        t: t,
        laneId: id,
        onAdd: this.addNewCard
      }));
    });
    (0, _defineProperty2.default)(this, "removeLane", () => {
      const id = this.props.id;
      this.props.actions.removeLane({
        laneId: id
      });
      this.props.onLaneDelete(id);
    });
    (0, _defineProperty2.default)(this, "updateTitle", value => {
      this.props.actions.updateLane({
        id: this.props.id,
        title: value
      });
      this.props.onLaneUpdate(this.props.id, {
        title: value
      });
    });
    (0, _defineProperty2.default)(this, "renderHeader", pickedProps => {
      const components = this.props.components;
      return _react.default.createElement(components.LaneHeader, (0, _extends2.default)({}, pickedProps, {
        onDelete: this.removeLane,
        onDoubleClick: this.toggleLaneCollapsed,
        updateTitle: this.updateTitle
      }));
    });
    (0, _defineProperty2.default)(this, "toggleLaneCollapsed", () => {
      this.props.collapsibleLanes && this.setState(state => ({
        collapsed: !state.collapsed
      }));
    });
  }

  sortCards(cards, sortFunction) {
    if (!cards) return [];
    if (!sortFunction) return cards;
    return cards.concat().sort(function (card1, card2) {
      return sortFunction(card1, card2);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!(0, _isEqual.default)(this.props.cards, nextProps.cards)) {
      this.setState({
        currentPage: nextProps.currentPage
      });
    }
  }

  get groupName() {
    const boardId = this.props.boardId;
    return "TrelloBoard".concat(boardId, "Lane");
  }

  render() {
    const _this$state2 = this.state,
          loading = _this$state2.loading,
          isDraggingOver = _this$state2.isDraggingOver,
          collapsed = _this$state2.collapsed;
    const _this$props2 = this.props,
          id = _this$props2.id,
          cards = _this$props2.cards,
          collapsibleLanes = _this$props2.collapsibleLanes,
          components = _this$props2.components,
          onLaneClick = _this$props2.onLaneClick,
          onLaneScroll = _this$props2.onLaneScroll,
          onCardClick = _this$props2.onCardClick,
          onCardAdd = _this$props2.onCardAdd,
          onBeforeCardDelete = _this$props2.onBeforeCardDelete,
          onCardDelete = _this$props2.onCardDelete,
          onLaneDelete = _this$props2.onLaneDelete,
          onLaneUpdate = _this$props2.onLaneUpdate,
          onCardMoveAcrossLanes = _this$props2.onCardMoveAcrossLanes,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props2, ["id", "cards", "collapsibleLanes", "components", "onLaneClick", "onLaneScroll", "onCardClick", "onCardAdd", "onBeforeCardDelete", "onCardDelete", "onLaneDelete", "onLaneUpdate", "onCardMoveAcrossLanes"]);
    const allClassNames = (0, _classnames.default)('react-trello-lane', this.props.className || '');
    const showFooter = collapsibleLanes && cards.length > 0;
    return _react.default.createElement(components.Section, (0, _extends2.default)({}, otherProps, {
      key: id,
      onClick: () => onLaneClick && onLaneClick(id),
      draggable: false,
      className: allClassNames
    }), this.renderHeader((0, _objectSpread2.default)({
      id,
      cards
    }, otherProps)), this.renderDragContainer(isDraggingOver), loading && _react.default.createElement(components.Loader, null), showFooter && _react.default.createElement(components.LaneFooter, {
      onClick: this.toggleLaneCollapsed,
      collapsed: collapsed
    }));
  }

}

Lane.propTypes = {
  actions: _propTypes.default.object,
  id: _propTypes.default.string.isRequired,
  boardId: _propTypes.default.string,
  title: _propTypes.default.node,
  index: _propTypes.default.number,
  laneSortFunction: _propTypes.default.func,
  style: _propTypes.default.object,
  cardStyle: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  titleStyle: _propTypes.default.object,
  labelStyle: _propTypes.default.object,
  cards: _propTypes.default.array,
  label: _propTypes.default.string,
  currentPage: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  collapsibleLanes: _propTypes.default.bool,
  droppable: _propTypes.default.bool,
  onCardMoveAcrossLanes: _propTypes.default.func,
  onCardClick: _propTypes.default.func,
  onBeforeCardDelete: _propTypes.default.func,
  onCardDelete: _propTypes.default.func,
  onCardAdd: _propTypes.default.func,
  onLaneDelete: _propTypes.default.func,
  onLaneUpdate: _propTypes.default.func,
  onLaneClick: _propTypes.default.func,
  onLaneScroll: _propTypes.default.func,
  editable: _propTypes.default.bool,
  laneDraggable: _propTypes.default.bool,
  cardDraggable: _propTypes.default.bool,
  cardDragClass: _propTypes.default.string,
  cardDropClass: _propTypes.default.string,
  canAddLanes: _propTypes.default.bool,
  t: _propTypes.default.func.isRequired
};
Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onLaneUpdate: () => {},
  onCardAdd: () => {}
};

const mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(laneActions, dispatch)
});

var _default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Lane);

exports.default = _default;