import Qs from 'query-string';
import store from './store';
import { createElement } from 'react';
import UrlPattern from 'url-pattern';

const defaultOptions = {
    segmentNameCharset: 'a-zA-Z0-9_-'
};

export const defaultProps = {
    params: {},
    query: {},
};

export function createRoute(path, options = {}) {
    return new UrlPattern(path, {
        ...defaultOptions,
        ...options
    });
}

export function findMatch(path, routes) {
    const [ rawPath, rawQuery ] = path.split('?');

    const query = Qs.parse(rawQuery);

    for (let name in routes) {
        const route = createRoute(routes[name].path);

        const params = route.match(rawPath);
        if (null === params) {
            continue;
        }

        return {
            ...routes[name],
            name,
            params,
            query
        };
    }

    return null;
}

export function handle(url, props, routes) {
    const config = findMatch(url, routes);

    if (null === config) {
        return null;
    }

    let { component, wrapper, params, query } = config;

    props = {
        ...defaultProps,
        ...props,
        params,
        query
    };

    return createElement(
        wrapper ? wrapper : component,
        props,
        wrapper ? createElement(component, props) : null
    );
}

export function reverse(to, params = {}, query = {}) {
    if (!to || to.length === 0) {
        return '';
    }

    let queryString = Object.keys(query).length ? '?' + Qs.stringify(query) : '';

    return createRoute(store.get(to).path).stringify(params) + queryString;
}
