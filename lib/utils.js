'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultProps = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createRoute = createRoute;
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

var defaultOptions = {
    segmentNameCharset: 'a-zA-Z0-9_-'
};

var defaultProps = exports.defaultProps = {
    params: {},
    query: {}
};

function createRoute(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new _urlPattern2.default(path, _extends({}, defaultOptions, options));
}

function findMatch(path, routes) {
    var _path$split = path.split('?'),
        _path$split2 = _slicedToArray(_path$split, 2),
        rawPath = _path$split2[0],
        rawQuery = _path$split2[1];

    var query = _queryString2.default.parse(rawQuery);

    for (var name in routes) {
        var route = createRoute(routes[name].path);

        var params = route.match(rawPath);
        if (null === params) {
            continue;
        }

        return _extends({}, routes[name], {
            name: name,
            params: params,
            query: query
        });
    }

    return null;
}

function handle(url, props, routes) {
    var config = findMatch(url, routes);

    if (null === config) {
        return null;
    }

    var component = config.component,
        wrapper = config.wrapper,
        params = config.params,
        query = config.query;


    props = _extends({}, defaultProps, props, {
        params: params,
        query: query
    });

    return (0, _react.createElement)(wrapper ? wrapper : component, props, wrapper ? (0, _react.createElement)(component, props) : null);
}

function reverse(to) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!to || to.length === 0) {
        throw new Error('Route cannot be empty');
    }

    var queryString = Object.keys(query).length ? '?' + _queryString2.default.stringify(query) : '';

    return createRoute(_store2.default.get(to).path).stringify(params) + queryString;
}