'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (React, ReactDOM) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var WastageTesterMounting = function (_React$Component) {
    _inherits(WastageTesterMounting, _React$Component);

    function WastageTesterMounting() {
      _classCallCheck(this, WastageTesterMounting);

      return _possibleConstructorReturn(this, (WastageTesterMounting.__proto__ || Object.getPrototypeOf(WastageTesterMounting)).apply(this, arguments));
    }

    _createClass(WastageTesterMounting, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        (0, _htmlChecker2.default)(this._reactInternalInstance.constructor.prototype, this.props.options);
        (0, _reuseChecker2.default)(this._reactInternalInstance.constructor.prototype, this.props.options);
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement('div', { className: 'WastageTesterMounting' });
      }
    }]);

    return WastageTesterMounting;
  }(React.Component);

  console.log('%cReact Wastage Tester Mounting', 'font-weight: bold;');
  var div = document.createElement('div');
  document.body.appendChild(div);

  var out = ReactDOM.render(React.createElement(WastageTesterMounting, { options: options }), div);

  ReactDOM.unmountComponentAtNode(div);
};

var _htmlChecker = require('./htmlChecker');

var _htmlChecker2 = _interopRequireDefault(_htmlChecker);

var _reuseChecker = require('./reuseChecker');

var _reuseChecker2 = _interopRequireDefault(_reuseChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }