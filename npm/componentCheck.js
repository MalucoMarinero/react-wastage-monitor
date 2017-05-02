'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (inst, options) {
  var componentName = inst.constructor.displayName || inst.constructor.name;
  var excluded = false;

  if (options.exclude) {
    excluded = options.exclude.some(function (name) {
      if (_lodash2.default.isRegExp(name)) {
        return name.test(componentName);
      } else {
        return name === componentName;
      }
    });
  }

  return {
    componentName: componentName,
    excluded: excluded
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }