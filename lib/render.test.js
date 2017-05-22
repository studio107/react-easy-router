'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _render = require('./render');

var _reactHelmet = require('react-helmet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('static', function () {
    var component = function component(props) {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _reactHelmet.Helmet,
                null,
                _react2.default.createElement(
                    'title',
                    null,
                    props.foo
                )
            ),
            'Hello ',
            props.foo
        );
    };

    var routes = {
        Homepage: { path: '/', component: component },
        About: { path: '/about', component: component }
    };

    it('base', function () {
        (0, _chai.expect)((0, _render.render)('/', {}, routes)).to.include.keys('body', 'helmet');
    });

    it('html', function () {
        (0, _chai.expect)((0, _render.render)('/', { foo: 'bar' }, routes).body).to.equal('<div>Hello bar</div>');

        (0, _chai.expect)((0, _render.render)('/about', { foo: 'baz' }, routes).body).to.equal('<div>Hello baz</div>');
    });

    it('helmet', function () {
        (0, _chai.expect)((0, _render.render)('/', { foo: 'bar' }, routes).helmet.title.toString()).to.equal('<title data-react-helmet="true">bar</title>');
        (0, _chai.expect)((0, _render.render)('/about', { foo: 'baz' }, routes).helmet.title.toString()).to.equal('<title data-react-helmet="true">baz</title>');
    });

    it('renderToString', function () {
        (0, _chai.expect)((0, _render.renderToString)('/', { foo: 'bar' }, routes)).to.contain('title');
        (0, _chai.expect)((0, _render.renderToString)('/about', { foo: 'bar' }, routes)).to.contain('title');
    });

    it('batchRender', function () {
        var pages = (0, _render.batchRender)([{ url: '/', data: { foo: 'bar' }, target: 'index.html' }, { url: '/about', data: { foo: 'about' }, target: 'about.html' }], routes);

        (0, _chai.expect)(pages).to.include.keys('index.html', 'about.html');
    });
});