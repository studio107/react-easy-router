'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createMemoryHistory2.default)();

var routes = {
    homepage: {
        path: '/',
        component: function component(props) {
            return _react2.default.createElement(
                'div',
                null,
                'Hello world'
            );
        }
    },
    page: {
        path: '/:foo',
        component: function component(props) {
            return _react2.default.createElement(
                'div',
                null,
                'Hello world'
            );
        }
    }
};

describe('<Link />', function () {
    var router = (0, _enzyme.shallow)(_react2.default.createElement(_Router2.default, { history: history, routes: routes }));

    it('render valid <Link /> component', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { router: router, to: 'homepage' }));
        (0, _chai.expect)(wrapper.prop('href')).to.equal('/');
    });

    it('renders children when passed in', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
            _Link2.default,
            { router: router, to: 'homepage' },
            _react2.default.createElement('div', { className: 'unique' })
        ));
        (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { className: 'unique' }))).to.equal(true);
    });

    it('click events', function () {
        var onClick = _sinon2.default.spy();
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { history: history, router: router, to: 'homepage', onClick: onClick }));
        wrapper.simulate('click');
        (0, _chai.expect)(onClick).to.have.property('callCount', 1);
    });
});