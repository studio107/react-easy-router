import React, { Component, PropTypes } from 'react';

export default class Link extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        params: PropTypes.object,
        query: PropTypes.object,
        onClick: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        onClick: (e) => {
        }
    };

    handleClick(url, e) {
        e.preventDefault();
        if (this.props.onClick instanceof Function) {
            this.props.onClick();
        }
        this.getRouter().navigate(url);
    }

    getRouter() {
        let router = this.context.router || this.props.router;
        if (!router) {
            throw new Error('Missing router in context || props');
        }
        return router;
    }

    render() {
        const { to, params, query } = this.props;
        let url = this.getRouter().reverse(to, params, query);
        return <a {...this.props} onClick={this.handleClick.bind(this, url)}
                                  href={url}>{this.props.children}</a>;
    }
}