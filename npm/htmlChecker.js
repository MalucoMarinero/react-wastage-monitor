'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (proto, options) {
  var oldMethod = proto._performComponentUpdate;
  var htmlHistory = {};

  proto._performComponentUpdate = function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var _this = this;

    var inst = this._instance;

    var _componentCheck = (0, _componentCheck3.default)(inst, options),
        componentName = _componentCheck.componentName,
        excluded = _componentCheck.excluded;

    var node = _reactDom2.default.findDOMNode(this._instance);
    var prevProps = inst.props;
    var prevState = inst.state;
    if (node && !excluded) {
      htmlHistory[this._debugID] = node.outerHTML;
    }

    var result = oldMethod.bind(this)(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext);

    if (node && !excluded && (inst.shouldComponentUpdate || inst.constructor.prototype.isPureReactComponent)) {
      transaction.getReactMountReady().enqueue(function () {
        var node = _reactDom2.default.findDOMNode(_this._instance);
        if (htmlHistory[_this._debugID] === node.outerHTML) {
          console.group(componentName + " props/state changed and updated but HTML didn't");
          var keys = _lodash2.default.union(_lodash2.default.keys(prevProps), _lodash2.default.keys(nextProps));
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              if (prevProps[key] !== nextProps[key]) {
                (0, _showChange2.default)('changed:' + key, key, prevProps, nextProps);
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

          var prvState = prevState || {};
          var nxtState = nextState || {};

          var skeys = _lodash2.default.union(_lodash2.default.keys(prvState), _lodash2.default.keys(nxtState));
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = skeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _key = _step2.value;

              if (prvState[_key] !== nxtState[_key]) {
                (0, _showChange2.default)('state changed:' + _key, _key, prvState, nxtState);
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
      });
    }

    return result;
  };
};

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _showChange = require('./showChange');

var _showChange2 = _interopRequireDefault(_showChange);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _componentCheck2 = require('./componentCheck');

var _componentCheck3 = _interopRequireDefault(_componentCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }