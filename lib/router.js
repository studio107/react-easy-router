'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routeParser = require('route-parser');

var _routeParser2 = _interopRequireDefault(_routeParser);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_Component) {
    _inherits(Router, _Component);

    function Router() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Router);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Router)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._unlisten = null, _this.state = {
            route: {
                component: null,
                wrapper: null,
                params: {}
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Router, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                router: {
                    to: this.transitionTo.bind(this),
                    transitionTo: this.transitionTo.bind(this),
                    reverse: _utils.reverse.bind(this),
                    navigate: this.navigate.bind(this)
                }
            };
        }
    }, {
        key: 'transitionTo',
        value: function transitionTo(to) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var query = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            this.navigate((0, _utils.reverse)(to, params, query));
        }
    }, {
        key: 'navigate',
        value: function navigate(url) {
            this.props.history.push({
                pathname: url
            });
        }
    }, {
        key: 'createRoutes',
        value: function createRoutes() {
            var routes = this.props.routes;

            for (var name in routes) {
                var _routes$name = routes[name];
                var path = _routes$name.path;
                var component = _routes$name.component;
                var wrapper = _routes$name.wrapper;

                _store2.default.set(name, {
                    route: new _routeParser2.default(path),
                    component: component,
                    wrapper: wrapper
                });
            }
        }
    }, {
        key: 'urlFromLocation',
        value: function urlFromLocation(location) {
            if (location.search.length > 0) {
                return (0, _urlJoin2.default)(location.pathname, location.search);
            } else {
                return (0, _urlJoin2.default)(location.pathname);
            }
        }
    }, {
        key: 'parseUrl',
        value: function parseUrl(url) {
            var routes = _store2.default.all();

            for (var name in routes) {
                var _routes$name2 = routes[name];
                var route = _routes$name2.route;
                var component = _routes$name2.component;
                var wrapper = _routes$name2.wrapper;
                var params = route.match(url);

                if (params) {
                    return { params: params, component: component, wrapper: wrapper };
                }
            }

            if (this.props.notFound) {
                return { params: {}, component: this.props.notFound, wrapper: null };
            } else {
                throw new Error('Unknown route');
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._unlisten();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.createRoutes();

            var history = this.props.history;

            this._unlisten = history.listen(function (location) {
                if (_this2.props.historyCallback) {
                    _this2.props.historyCallback();
                }
                _this2.setState({
                    location: location,
                    route: _this2.parseUrl(_this2.urlFromLocation(location))
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var route = _state.route;
            var location = _state.location;


            var query = _queryString2.default.parse(location.search.substring(1)),
                newLocation = _extends({}, location, { query: query }),
                props = {
                params: route.params,
                query: query,
                location: newLocation
            };

            if (route.wrapper) {
                var children = _react2.default.createElement(route.component, props);
                return _react2.default.createElement(route.wrapper, props, children);
            } else {
                return _react2.default.createElement(route.component, props);
            }
        }
    }]);

    return Router;
}(_react.Component);

Router.propTypes = {
    history: _react.PropTypes.object.isRequired,
    routes: _react.PropTypes.object.isRequired,
    notFound: _react.PropTypes.func,
    historyCallback: _react.PropTypes.func
};
Router.defaultProps = {
    notFound: null
};
Router.childContextTypes = {
    router: _react.PropTypes.object
};
exports.default = Router;