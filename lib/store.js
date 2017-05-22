'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    _routes: {},

    get: function get(name) {
        if (false === name in this._routes) {
            throw new Error('Route with name ' + name + ' not found');
        }
        return this._routes[name];
    },
    set: function set(routes) {
        for (var name in routes) {
            this._routes[name] = routes[name];
        }
    },
    all: function all() {
        return this._routes;
    }
};