'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reverse = undefined;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reverse = function reverse(to) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var query = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (!to || to.length == 0) {
        throw new Error('Route cannot be empty');
    }

    params = params || {};
    query = query || {};

    var queryString = Object.keys(query).length ? '?' + _queryString2.default.stringify(query) : '';

    var _store$get = _store2.default.get(to);

    var route = _store$get.route;

    return route.reverse(params) + queryString;
};

exports.reverse = reverse;