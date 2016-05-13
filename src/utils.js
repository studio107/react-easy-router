import Qs from 'query-string';
import store from './store';

let reverse = (to, params = {}, query = {}) => {
    if (!to || to.length == 0) {
        throw new Error('Route cannot be empty');
    }

    params = params || {};
    query = query || {};

    let queryString = Object.keys(query).length ? '?' + Qs.stringify(query) : '';
    let { route } = store.get(to);
    return route.reverse(params) + queryString;
};

export {
    reverse
};