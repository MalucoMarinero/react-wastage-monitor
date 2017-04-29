'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (proto, options) {
  var oldMethod = proto.updateComponent;

  proto.updateComponent = function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;
    var nextContext = void 0;
    var prevContext = inst.context;

    if (this._context === nextUnmaskedContext) {
      nextContext = inst.context;
    } else {
      nextContext = this._processContext(nextUnmaskedContext);
    }

    var prevState = inst.state || {};
    var prevProps = prevParentElement.props;
    var nextProps = nextParentElement.props;
    var nextState = _lodash2.default.assign({}, prevState);

    var oldSetState = inst.setState;

    inst.constructor.prototype.setState = function (updates) {
      _lodash2.default.assign(nextState, updates);
    };

    if (prevParentElement !== nextParentElement && inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps, nextContext);
    }

    inst.constructor.prototype.setState = oldSetState;
    // not getting next state yet, it messes up react because it fetches new data
    // const nextState = this._processPendingState(nextProps, nextContext)

    if (inst.shouldComponentUpdate || inst.constructor.prototype.isPureReactComponent) {
      var shouldUpdate = inst.shouldComponentUpdate ? inst.shouldComponentUpdate(nextProps, !inst.state ? inst.state : nextState, nextContext) : (0, _reactAddonsShallowCompare2.default)(inst, nextProps, !inst.state ? inst.state : nextState);

      if (shouldUpdate && _lodash2.default.isEqual(prevProps, nextProps) && _lodash2.default.isEqual(prevState, nextState)) {
        console.group((inst.constructor.displayName || inst.constructor.name) + " updated when it shouldn't need to");
        var keys = _lodash2.default.union(_lodash2.default.keys(prevProps), _lodash2.default.keys(nextProps));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (_lodash2.default.isEqual(prevProps[key], nextProps[key]) && prevProps[key] !== nextProps[key]) {
              (0, _showChange2.default)('ref inequality:' + key, key, prevProps, nextProps);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var skeys = _lodash2.default.union(_lodash2.default.keys(prevState), _lodash2.default.keys(nextState));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = skeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _key = _step2.value;

            if (_lodash2.default.isEqual(prevState[_key], nextState[_key]) && prevState[_key] !== nextState[_key]) {
              (0, _showChange2.default)('ref inequality state:' + _key, _key, prevState, nextState);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        console.groupEnd();
      }
    } else {
      console.log('%c' + (inst.constructor.displayName || inst.constructor.name), 'font-weight: bold;', "is impure and will ALWAYS update when a component above it does");
    }

    var result = oldMethod.bind(this)(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext);

    return result;
  };
};

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _showChange = require('./showChange');

var _showChange2 = _interopRequireDefault(_showChange);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }