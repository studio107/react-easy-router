import { expect } from 'chai';
import { reverse } from './utils';
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
});
