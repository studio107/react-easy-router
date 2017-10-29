'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _urljoin = require('urljoin');

var _urljoin2 = _interopRequireDefault(_urljoin);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isServer = typeof window === 'undefined';

var Router = (_temp2 = _class = function (_Component) {
    _inherits(Router, _Component);

    function Router() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Router);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Router.__proto__ || Object.getPrototypeOf(Router)).call.apply(_ref, [this].concat(args))), _this), _this._unlisten = null, _this.state = {
            initialData: {},
            location: undefined,
            url: '/'
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Router, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var _props = this.props,
                history = _props.history,
                routes = _props.routes;


            _store2.default.set(routes);

            this.parseLocation(history.location);

            if (false === isServer) {
                this._unlisten = history.listen(function (location) {
                    _this2.parseLocation(location);
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var routes = nextProps.routes;


            if (false === (0, _shallowequal2.default)(routes, this.props.routes)) {
                _store2.default.set(routes);
            }

            // TODO add redux version for v3
            /*
             const { location } = nextProps;
             if (false === shallowequal(location, this.props.location)) {
             this.parseLocation(location);
             }
             */
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (false === isServer) {
                this._unlisten();
            }
        }
    }, {
        key: 'parseLocation',
        value: function parseLocation(location) {
            var _this3 = this;

            var historyCallback = this.props.historyCallback;


            this.setState({
                location: location,
                url: (0, _urljoin2.default)(location.pathname, location.search)
            }, function () {
                if (historyCallback) {
                    historyCallback(_this3.state.url);
                }
            });
        }
    }, {
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
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.navigate((0, _utils.reverse)(to, params, query));
        }
    }, {
        key: 'navigate',
        value: function navigate(url) {
            this.props.history.push(url);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                fallback = _props2.fallback,
                routes = _props2.routes,
                initialData = _props2.initialData,
                children = _props2.children;


            var component = (0, _utils.handle)(this.state.url, initialData, this.props.routes);

            if (component) {
                return component;
            } else if (fallback) {
                return fallback(_utils.defaultProps);
            } else if (_react.Children.toArray(children).length > 0) {
                return children;
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    'Unknown route'
                );
            }
        }
    }]);

    return Router;
}(_react.Component), _class.propTypes = {
    history: _propTypes2.default.object.isRequired,
    routes: _propTypes2.default.object.isRequired,
    historyCallback: _propTypes2.default.func,
    fallback: _propTypes2.default.func,
    initialData: _propTypes2.default.object
}, _class.childContextTypes = {
    router: _propTypes2.default.object
}, _temp2);
exports.default = Router;