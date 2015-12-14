Simple and lightweight alternative to `react-router`

Usage:

```js
// Main routes file: routes.js
import user from 'modules/user/routes';
import catalog from 'modules/catalog/routes';

export default {
	...user,
	...catalog
};
```

```js
// Module route file: modules/user/routes.js

import * as Handlers from './handlers';
import { AppBase } from 'app';

export default {
    UserList: {path: '/user/list', component: Handlers.List, wrapper: AppBase},
    UserView: {path: '/user/:user_id', component: Handlers.View, wrapper: AppBase}
}
```

```js
// index file
import React from 'react';
import { render } from 'react-dom';
import { createHistory, useBasename } from 'history'
import routes from './routes';

// Redux store, optional
import store from './store';
import { Provider } from 'react-redux';

// Example for historyCallback
import * as actions from 'modules/core/actions/core';

const history = useBasename(createHistory)({
	basename: '/'
});

render((
    <Provider store={store}>
        <Router
            historyCallback={() => {
            	// do something when route changed
            	// Example:
            	store.dispatch(actions.didChangeRoute())
            }}
            history={history}
            notFound={notFound} // optional 404 handler, can be null
            routes={routes}/>
    </Provider>
), document.getElementById('app'));
```