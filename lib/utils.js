'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.findMatch = findMatch;
exports.handle = handle;
exports.reverse = reverse;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _react = require('react');

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = exports.defaultProps = {
    params: {},
    query: {}
};

function createRoute(path) {
    return new _urlPattern2.default(path, {
        segmentNameCharset: 'a-zA-Z0-9_-'
    });
}

function findMatch(path, routes) {
    for (var name in routes) {
        var route = createRoute(routes[name].path);

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

function handle(url, props, routes) {
    var config = findMatch(url, routes);
    if (!config) {
        return null;
    }

    var component = config.component,
        wrapper = config.wrapper,
        params = config.params;


    props = _extends({}, defaultProps, props, { params: params });

    return (0, _react.createElement)(wrapper ? wrapper : component, props, wrapper ? (0, _react.createElement)(component, props) : null);
}

function reverse(to) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!to || to.length === 0) {
        throw new Error('Route cannot be empty');
    }

    var queryString = Object.keys(query).length ? '?' + _queryString2.default.stringify(query) : '';

    var _store$get = _store2.default.get(to),
        path = _store$get.path;

    return createRoute(path).stringify(params) + queryString;
}