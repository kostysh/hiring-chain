import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HashRouter } from 'react-router-dom';

import { store, history } from './store';
import App from './views/App';
import * as serviceWorker from './serviceWorker';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <HashRouter>
                    <App />
                </HashRouter>                
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'));
};

render();

if (process.env.NODE_ENV !== 'production' && module.hot) {

    module.hot.accept('./views/App', () => render());
    serviceWorker.unregister();
} else {
    
    serviceWorker.register();
}