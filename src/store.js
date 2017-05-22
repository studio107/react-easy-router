export default {
    _routes: {},

    get(name) {
        if (false === (name in this._routes)) {
            throw new Error('Route with name ' + name + ' not found');
        }
        return this._routes[name];
    },

    set(routes) {
        for (let name in routes) {
            this._routes[name] = routes[name];
        }
    },

    all() {
        return this._routes;
    }
}
