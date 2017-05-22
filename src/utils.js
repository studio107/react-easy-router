import Qs from 'query-string';
import store from './store';
import { createElement } from 'react';
import Route from 'route-parser';

export const defaultProps = {
    params: {},
    query: {},
};

export function findMatch(path, routes) {
    for (let name in routes) {
        const route = new Route(routes[name].path);

        const params = route.match(path);
        if (!params) {
            continue;
        }

        return {
            ...routes[name],
            name,
            params,
        };
    }

    return null;
}

export function handle(url, props, routes) {
    const config = findMatch(url, routes);
    if (!config) {
        return null;
    }

    let { component, wrapper, params } = config;

    props = { ...defaultProps, ...props, params };

    return createElement(
        wrapper ? wrapper : component,
        props,
        wrapper ? createElement(component, props) : null
    );
}

export function reverse(to, params = {}, query = {}) {
    if (!to || to.length === 0) {
        throw new Error('Route cannot be empty');
    }

    let queryString = Object.keys(query).length ? '?' + Qs.stringify(query) : '';
    let { path } = store.get(to);
    return (new Route(path)).reverse(params) + queryString;
}
