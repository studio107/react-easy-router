'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = (_temp2 = _class = function (_Component) {
    _inherits(Link, _Component);

    function Link() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Link);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (url) {
            return function (e) {
                if (e) {
                    e.preventDefault();
                }

                var _this$props = _this.props,
                    history = _this$props.history,
                    onClick = _this$props.onClick;


                if (onClick) {
                    onClick();
                }

                if (history) {
                    history.push(url);
                } else {
                    _this.getRouter().navigate(url);
                }
            };
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Link, [{
        key: 'getRouter',
        value: function getRouter() {
            var router = this.context.router || this.props.router;
            if (!router) {
                throw new Error('Missing router in context || props');
            }
            return router;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                to = _props.to,
                params = _props.params,
                query = _props.query,
                children = _props.children;


            var props = _extends({}, this.props);
            var keys = ['to', 'params', 'query', 'router', 'history'];
            for (var i in keys) {
                delete props[keys[i]];
            }

            var url = (0, _utils.reverse)(to, params, query);

            return _react2.default.createElement(
                'a',
                _extends({}, props, { onClick: this.handleClick(url), href: url }),
                children
            );
        }
    }]);

    return Link;
}(_react.Component), _class.propTypes = {
    to: _propTypes2.default.string.isRequired,
    params: _propTypes2.default.object,
    query: _propTypes2.default.object,
    history: _propTypes2.default.object,
    onClick: _propTypes2.default.func
}, _class.contextTypes = {
    router: _propTypes2.default.object
}, _temp2);
exports.default = Link;