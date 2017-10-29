import React, { Children, createElement, Component } from 'react';
import PropTypes from 'prop-types';
import urljoin from 'urljoin';
import shallowequal from 'shallowequal';
import store from './store';
import { defaultProps, handle, reverse } from './utils';

export default class Router extends Component {
    _unlisten = null;

    static propTypes = {
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
        historyCallback: PropTypes.func,
        fallback: PropTypes.func,
        initialData: PropTypes.object,
    };

    state = {
        initialData: {},
        location: undefined,
        url: '/'
    };

    static childContextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        const {
            history,
            routes
        } = this.props;

        store.set(routes);

        this.parseLocation(history.location);

        this._unlisten = history.listen(location => {
            this.parseLocation(location);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { routes } = nextProps;

        if (false === shallowequal(routes, this.props.routes)) {
            store.set(routes);
        }

        // TODO add redux version for v3
        /*
         const { location } = nextProps;
         if (false === shallowequal(location, this.props.location)) {
             this.parseLocation(location);
         }
         */
    }

    componentWillUnmount() {
        this._unlisten();
    }

    parseLocation(location) {
        const { historyCallback } = this.props;

        this.setState({
            location,
            url: urljoin(location.pathname, location.search)
        }, () => {
            if (historyCallback) {
                historyCallback(this.state.url);
            }
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

    render() {
        const {
            fallback,
            routes,
            initialData,
            children
        } = this.props;

        const component = handle(this.state.url, initialData, this.props.routes);

        if (component) {
            return component;
        } else if (fallback) {
            return fallback(defaultProps);
        } else if (Children.toArray(children).length > 0) {
            return children;
        } else {
            return <div>Unknown route</div>;
        }
    }
}
