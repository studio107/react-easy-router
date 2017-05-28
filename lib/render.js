'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.batchRender = batchRender;
exports.defaultMarkup = defaultMarkup;
exports.fetchProps = fetchProps;
exports.render = render;
exports.renderToString = renderToString;

var _server = require('react-dom/server');

var _utils = require('./utils');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactHelmet = require('react-helmet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function batchRender() {
    var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var pages = {};

    for (var i in urls) {
        var _urls$i = urls[i],
            url = _urls$i.url,
            target = _urls$i.target,
            data = _urls$i.data;


        var html = renderToString(url, data, routes);
        if (html) {
            pages[target] = html;
        }
    }

    return pages;
}

function defaultMarkup(body, helmet) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'root';

    return '<!doctype html>\n    <html ' + helmet.htmlAttributes.toString() + '>\n        <head>\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n        </head>\n        <body ' + helmet.bodyAttributes.toString() + '>\n            <div id="' + target + '">' + body + '</div>\n            ' + helmet.script.toString() + '\n        </body>\n    </html>';
}

function fetchProps(props) {
    return typeof props === "function" ? props() : props;
}

function render(url, props, routes) {
    _store2.default.set(routes);

    var component = (0, _utils.handle)(url, fetchProps(props), routes);

    if (!component) {
        return null;
    }

    return {
        body: (0, _server.renderToStaticMarkup)(component),
        helmet: _reactHelmet.Helmet.renderStatic()
    };
}

function renderToString(url, props, routes) {
    var template = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultMarkup;

    var result = render(url, props, routes);
    if (!result) {
        return null;
    }

    return template(result.body, result.helmet);
}