import React, { Component, PropTypes } from 'react';
import Route from 'route-parser';
import Qs from 'query-string';
import urlJoin from 'url-join';
import store from './store';
import { reverse } from './utils';

export default class Router extends Component {
    _unlisten = null;

    static propTypes = {
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
        fallback: PropTypes.func
    };

    state = {
        location: undefined,
        route: {}
    };

    static childContextTypes = {
        router: PropTypes.object
    };

    componentWillUnmount() {
        this._unlisten();
    }

    componentWillMount() {
        this.createRoutes();
        const { history } = this.props;

        const currentLocation = history.getCurrentLocation();
        this.setState({
            location: currentLocation,
            route: this.parseUrl(this.urlFromLocation(currentLocation))
        });

        this._unlisten = history.listen(location => {
            this.setState({
                location,
                route: this.parseUrl(this.urlFromLocation(location))
            });
        });
    }

    getChildContext() {
        return {
            router: {
                to: this.transitionTo.bind(this),
                transitionTo: this.transitionTo.bind(this),
                reverse: reverse.bind(this),
                navigate: this.navigate.bind(this)
            }
        };
    }

    transitionTo(to, params = {}, query = {}) {
        this.navigate(reverse(to, params, query));
    }

    navigate(url) {
        this.props.history.push(url);
    }

    createRoutes() {
        const { routes } = this.props;
        for (let name in routes) {
            let { path, component, wrapper } = routes[name];
            store.set(name, {
                route: new Route(path),
                component,
                wrapper
            });
        }
    }

    urlFromLocation(location) {
        if (location.search.length > 0) {
            return urlJoin(location.pathname, location.search);
        } else {
            return urlJoin(location.pathname);
        }
    }

    parseUrl(url) {
        let routes = store.all();

        for (let name in routes) {
            let { route, component, wrapper } = routes[name],
                params = route.match(url);

            if (params) {
                return {params, component, wrapper};
            }
        }

        return null;
    }

    render() {
        const { fallback } = this.props;
        const { route, location } = this.state;

        let query = Qs.parse(location.search.substring(1)),
            props = {
                query,
                // Backward for react-router
                location: {...location, query: query}
            };
        if (route) {
            props = {...props, params: route.params};

            if (route.wrapper) {
                return React.createElement(route.wrapper, props,
                    React.createElement(route.component, props));
            } else {
                return React.createElement(route.component, props);
            }
        } else if (fallback) {
            return fallback(props);
        } else {
            return <div>Unknown route</div>;
        }
    }
}