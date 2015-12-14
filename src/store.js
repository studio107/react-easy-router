export default {
    _routes: {},

    get(name) {
        if (this.has(name) == false) {
            throw new Error('Route with name ' + name + ' not found');
        }
        return this._routes[name];
    },

    has(name) {
        return name in this._routes;
    },

    set(name, params) {
        if (this.has(name)) {
            throw new Error('Route with name ' + name + ' already exists');
        }
        this._routes[name] = params;
    },

    all() {
        return this._routes;
    }
}