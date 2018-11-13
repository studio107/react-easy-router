import { expect } from 'chai';
import { reverse, findMatch, createRoute } from './utils';
import store from './store';
import UrlPattern from 'url-pattern';

describe('utils', () => {
    it('reverse url-pattern', () => {
        const url = (new UrlPattern('/user/:user_id', {
            segmentNameCharset: 'a-zA-Z0-9_-'
        })).stringify({ user_id: 1 });

        expect(url).to.be.equal('/user/1');
    });

    it('reverse', () => {
        store.set({
            user_view: {
                path: '/user/:user_id'
            }
        });

        expect(reverse('user_view', { user_id: 1 })).to.be.equal('/user/1')
    });

    it('find match', () => {
        let route = createRoute('/user'),
            url = '/user?page=1';

        expect(route.match(url.split('?')[0])).to.be.deep.equal({});
    });

    it('matches with segment value option', () => {
        let route = createRoute('/segment-name/:bar', {segmentValueCharset: ',a-z'}),
            url = '/segment-name/hello,world';

        expect(route.match(url)).to.be.deep.equal({bar: 'hello,world'});
    });

    it('find match from routes', () => {
        store.set({
            user_list: { path: '/user' }
        });
        const config = findMatch('/user?page=1&q=qwe', store.all());

        expect(config.query).to.be.deep.equal({ page: "1", q: "qwe" });
    });
});
