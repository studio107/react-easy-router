'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    _routes: {},

    get: function get(name) {
        if (this.has(name) === false) {
            throw new Error('Route with name ' + name + ' not found');
        }
        return this._routes[name];
    },
    has: function has(name) {
        return name in this._routes;
    },
    set: function set(name, params) {
        if (this.has(name)) {
            throw new Error('Route with name ' + name + ' already exists');
        }
        this._routes[name] = params;
    },
    all: function all() {
        return this._routes;
    }
};