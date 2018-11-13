import React from 'react';
import { render } from 'react-dom';
import Link from './Link';
import Router from './Router';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import createMemoryHistory from 'history/createMemoryHistory';

configure({
    adapter: new Adapter()
});

const history = createMemoryHistory();

const routes = {
    homepage: {
        path: '/',
        component: props => <div>Hello world</div>
    },
    page: {
        path: '/:foo',
        component: props => <div>Hello world</div>
    },
    pageWithOptions: {
        path: '/:bar',
        component: props => <div>Hello world</div>,
        options: {segmentValueCharset: ',a-z'},
    },
};

describe('<Link />', () => {
    const router = shallow(<Router history={history} routes={routes}/>);

    it('renders valid <Link /> component', () => {
        const wrapper = shallow(<Link router={router} to="homepage"/>);
        expect(wrapper.prop('href')).to.equal('/');
    });

    it('renders <Link /> component with options', () => {
        const wrapper = shallow(<Link router={router} to="pageWithOptions" params={{bar: "hello,world" }}/>);
        expect(wrapper.prop('href')).to.equal('/hello,world');
    });

    it('renders children when passed in', () => {
        const wrapper = shallow(
            <Link router={router} to="homepage">
                <div className="unique"/>
            </Link>
        );
        expect(wrapper.contains(<div className="unique"/>)).to.equal(true);
    });

    it('click events', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<Link history={history} router={router} to="homepage" onClick={onClick}/>);
        wrapper.simulate('click');
        expect(onClick).to.have.property('callCount', 1);
    });
});
