import { createElement } from 'react';
import Route from 'route-parser';

const defaultProps = {
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

export default (url, props, routes) => {
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