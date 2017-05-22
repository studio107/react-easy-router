'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = (_temp = _class = function (_Component) {
    _inherits(Link, _Component);

    function Link() {
        _classCallCheck(this, Link);

        return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
    }

    _createClass(Link, [{
        key: 'handleClick',
        value: function handleClick(url, e) {
            e.preventDefault();
            if (this.props.onClick instanceof Function) {
                this.props.onClick();
            }
            this.getRouter().navigate(url);
        }
    }, {
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
            delete props['to'];
            delete props['params'];
            delete props['query'];
            var url = this.getRouter().reverse(to, params, query);
            return _react2.default.createElement(
                'a',
                _extends({}, props, { onClick: this.handleClick.bind(this, url),
                    href: url }),
                children
            );
        }
    }]);

    return Link;
}(_react.Component), _class.propTypes = {
    to: _propTypes2.default.string.isRequired,
    params: _propTypes2.default.object,
    query: _propTypes2.default.object,
    onClick: _propTypes2.default.func
}, _class.contextTypes = {
    router: _propTypes2.default.object
}, _class.defaultProps = {
    onClick: function onClick(e) {}
}, _temp);
exports.default = Link;