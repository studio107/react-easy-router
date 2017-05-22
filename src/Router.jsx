import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'route-parser';
import Qs from 'query-string';
import urljoin from 'urljoin';
import store from './store';
import { reverse } from './utils';

export default class Router extends Component {
    _unlisten = null;

    static propTypes = {
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
        historyCallback: PropTypes.func,
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

        const { history, historyCallback } = this.props;

        const currentLocation = history.location;

        let url = this.urlFromLocation(currentLocation);
        this.setState({
            location: currentLocation,
            route: this.parseUrl(url)
        }, () => {
            if (historyCallback) {
                historyCallback(url);
            }
        });

        this._unlisten = history.listen(location => {

            let url = this.urlFromLocation(location);

            this.setState({
                location,
                route: this.parseUrl(url)
            }, () => {
                if (historyCallback) {
                    historyCallback(url);
                }
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
        return urljoin(location.pathname, location.search);
    }

    parseUrl(url) {
        let routes = store.all();

        for (let name in routes) {
            let { route, component, wrapper } = routes[name],
                params = route.match(url);

            if (params) {
                return { params, component, wrapper };
            }
        }

        return null;
    }

    render() {
        const { fallback } = this.props;
        const { route, location } = this.state;

        let query = Qs.parse(location.search.substring(1)),
            props = { params: {}, query };

        if (route) {
            props = { ...props, params: route.params };

            return createElement(
                route.wrapper ? route.wrapper : route.component,
                props,
                route.wrapper ? createElement(route.component, props) : null
            );
        } else if (fallback) {
            return fallback(props);
        } else {
            return <div>Unknown route</div>;
        }
    }
}
