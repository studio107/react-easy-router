import React from 'react';
import { expect } from 'chai';
import { render, renderToString, batchRender } from './render';
import { Helmet } from "react-helmet";

describe('static', () => {
    const component = props => (
        <div>
            <Helmet>
                <title>{props.foo}</title>
            </Helmet>
            Hello {props.foo}
        </div>
    );

    const routes = {
        Homepage: { path: '/', component },
        About: { path: '/about', component }
    };

    it('base', () => {
        expect(render('/', {}, routes))
            .to.include.keys('body', 'helmet');
    });

    it('html', () => {
        expect(render('/', { foo: 'bar' }, routes).body).to
            .equal('<div>Hello bar</div>');

        expect(render('/about', { foo: 'baz' }, routes).body).to
            .equal('<div>Hello baz</div>');
    });

    it('helmet', () => {
        expect(render('/', { foo: 'bar' }, routes).helmet.title.toString()).to
            .equal('<title data-react-helmet="true">bar</title>');
        expect(render('/about', { foo: 'baz' }, routes).helmet.title.toString()).to
            .equal('<title data-react-helmet="true">baz</title>');
    });

    it('renderToString', () => {
        expect(renderToString('/', { foo: 'bar' }, routes))
            .to.contain('title');
        expect(renderToString('/about', { foo: 'bar' }, routes))
            .to.contain('title');
    });

    it('batchRender', () => {
        let pages = batchRender([
            { url: '/', data: { foo: 'bar' }, target: 'index.html' },
            { url: '/about', data: { foo: 'about' }, target: 'about.html' },
        ], routes);

        expect(pages).to.include.keys('index.html', 'about.html');
    });
});