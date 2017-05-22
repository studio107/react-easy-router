import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reverse } from './utils';

export default class Link extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        params: PropTypes.object,
        query: PropTypes.object,
        history: PropTypes.object,
        onClick: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object
    };

    getRouter() {
        let router = this.context.router || this.props.router;
        if (!router) {
            throw new Error('Missing router in context || props');
        }
        return router;
    }

    handleClick = url => e => {
        if (e) {
            e.preventDefault();
        }

        const {
            history, // for testing only
            onClick
        } = this.props;

        if (onClick) {
            onClick();
        }

        if (history) {
            history.push(url)
        } else {
            this.getRouter().navigate(url);
        }
    };

    render() {
        const {
            to,
            params,
            query,
            children
        } = this.props;

        let props = { ...this.props };
        const keys = ['to', 'params', 'query', 'router', 'history'];
        for (let i in keys) {
            delete props[keys[i]];
        }

        const url = reverse(to, params, query);

        return (
            <a {...props} onClick={this.handleClick(url)} href={url}>
                {children}
            </a>
        );
    }
}
