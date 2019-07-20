import { select, put, fork, takeLatest, delay } from 'redux-saga/effects';
import { arweave, getAddress, getBalance } from '../../services/arweave';

import config from '../../config.json';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* setup() {
    try {
        yield put(actions.arInitialized(arweave));
    } catch(err) {
        console.log(err);
        yield put(actions.arError(err));
    }
}

function* watchBallance() {
    try {
        while (true) {
            const address = yield select(selectors.address);
            
            if (!address) {
                break;
            }

            const ballance = yield getBalance(address);
            yield put(actions.arBallance(ballance));
            yield delay(config.ballanceInterval);            
        }        
    } catch(err) {
        console.log(err);
        yield put(actions.arError(err));
        yield delay(config.ballanceInterval * 5);
        yield watchBallance();
    }
}

function* login(action) {
    try {
        const address = yield getAddress(action.wallet);
        yield put(actions.arLoggedIn(address, action.wallet));
        yield put(actions.jobsFetch(address));
        yield watchBallance();        
    } catch(err) {
        console.log(err);
        yield put(actions.arError(err));
    }
}

function* watchActions() {
    yield takeLatest(actions.AR_SETUP, setup);
    yield takeLatest(actions.AR_LOG_IN, login);
}

export default [
    fork(watchActions)
];
