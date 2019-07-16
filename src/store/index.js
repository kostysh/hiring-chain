import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import { arSetup } from './actions';
import rootSaga from './sagas';

export const history = createBrowserHistory();

export function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        : compose;
    const combinedReducers = combineReducers({
        router: connectRouter(history),
        ...rootReducer
    });
    
    const store = createStore(
        combinedReducers,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
    );

    sagaMiddleware.run(rootSaga);

    store.dispatch(arSetup());

    return { store };
}

export const { store } = configureStore();
