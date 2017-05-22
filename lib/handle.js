'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.findMatch = findMatch;

var _react = require('react');

var _routeParser = require('route-parser');

var _routeParser2 = _interopRequireDefault(_routeParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
    params: {},
    query: {}
};

function findMatch(path, routes) {
    for (var name in routes) {
        var route = new _routeParser2.default(routes[name].path);

        var params = route.match(path);
        if (!params) {
            continue;
        }

        return _extends({}, routes[name], {
            name: name,
            params: params
        });
    }

    return null;
}

exports.default = function (url, props, routes) {
    var config = findMatch(url, routes);
    if (!config) {
        return null;
    }

    var component = config.component,
        wrapper = config.wrapper,
        params = config.params;


    props = _extends({}, defaultProps, props, { params: params });

    return (0, _react.createElement)(wrapper ? wrapper : component, props, wrapper ? (0, _react.createElement)(component, props) : null);
};