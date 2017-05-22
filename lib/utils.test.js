'use strict';

var _chai = require('chai');

var _utils = require('./utils');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('utils', function () {
    it('reverse url-pattern', function () {
        var url = new _urlPattern2.default('/user/:user_id', {
            segmentNameCharset: 'a-zA-Z0-9_-'
        }).stringify({ user_id: 1 });

        (0, _chai.expect)(url).to.be.equal('/user/1');
    });

    it('reverse', function () {
        _store2.default.set({
            user_view: {
                path: '/user/:user_id'
            }
        });

        (0, _chai.expect)((0, _utils.reverse)('user_view', { user_id: 1 })).to.be.equal('/user/1');
    });
});