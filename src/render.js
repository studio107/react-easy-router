import { renderToStaticMarkup } from 'react-dom/server';
import { handle } from './utils';
import store from './store';
import { Helmet } from 'react-helmet';

export function batchRender(urls = [], routes = {}) {
    let pages = {};

    for (let i in urls) {
        const { url, target, data } = urls[i];

        let html = renderToString(url, data, routes);
        if (html) {
            pages[target] = html;
        }
    }

    return pages;
}

export function defaultMarkup(body, helmet, target = 'root') {
    return `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="${target}">${body}</div>
            ${helmet.script.toString()}
        </body>
    </html>`;
}

export function fetchProps(props) {
    return typeof props === "function" ? props() : props;
}

export function render(url, props, routes) {
    store.set(routes);

    const component = handle(url, fetchProps(props), routes);

    if (!component) {
        return null;
    }

    return {
        body: renderToStaticMarkup(component),
        helmet: Helmet.renderStatic(),
    };
}

export function renderToString(url, props, routes, template = defaultMarkup) {
    const result = render(url, props, routes);
    if (!result) {
        return null;
    }

    return template(result.body, result.helmet);
}
