import { select, put, fork, takeLatest, delay } from 'redux-saga/effects';
import {
    postCv, 
    postApplyCv,
    isTransactionMined, 
    convertIdsToStore,
    fetchCvsIds,
    closeCvById,
    getTagValue
} from '../../services/cvs';

import config from '../../config.json';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* watchCvsTransaction(action) {
    yield delay(config.ballanceInterval);// to avoid 404 error
    try {
        while (true) {
            const mined = yield isTransactionMined(action.transaction.id);

            if (mined) {
                yield put(actions.cvsMined(action.transaction.id));
                break;
            }
            
            yield delay(config.ballanceInterval * 5);            
        }        
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
        yield put(actions.cvsFiled(action.transaction.id));
        yield watchCvsTransaction(action);
    }
}

function* watchCvCloseTransaction(transaction) {
    yield delay(config.ballanceInterval);// to avoid 404 error
    try {
        while (true) {
            const mined = yield isTransactionMined(transaction.id);

            if (mined) {
                yield put(actions.cvsClosed(getTagValue(transaction, 'Cv')));
                break;
            }
            
            yield delay(config.ballanceInterval * 5);            
        }        
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
        yield watchCvCloseTransaction(transaction);
    }
}

function* watchApplyTransaction(action) {
    yield delay(config.ballanceInterval);// to avoid 404 error
    try {
        while (true) {
            const mined = yield isTransactionMined(action.transaction.id);

            if (mined) {
                const cvId = getTagValue(action.transaction, 'Cv');
                const jobId = getTagValue(action.transaction, 'Job');
                yield put(actions.cvsApplyDone(cvId, jobId));
                break;
            }
            
            yield delay(config.ballanceInterval * 5);            
        }        
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
        yield watchApplyTransaction(action);
    }
}

function* cvsPost(action) {
    try {
        const wallet = yield select(selectors.wallet);
        const transaction = yield postCv(action.job, wallet);
        yield put(actions.cvsSent(transaction));
        const address = yield select(selectors.address);
        const store = yield convertIdsToStore([transaction], address, true);
        yield put(actions.cvsReceived(store, true));
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
    }
}

function* fetchCvs() {
    try {
        const address = yield select(selectors.address);
        const ids = yield fetchCvsIds(address);
        const store = yield convertIdsToStore(ids, address);
        yield put(actions.cvsReceived(store));
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
    }
}

function* closeCv(action) {
    try {
        const wallet = yield select(selectors.wallet);
        const transaction = yield closeCvById(action.id, wallet);
        yield watchCvCloseTransaction(transaction);
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
    }
}

function* applyCv(action) {
    try {
        const wallet = yield select(selectors.wallet);
        const transaction = yield postApplyCv(action.cv, action.job, wallet);
        yield put(actions.cvsApplySent(transaction));
    } catch(err) {
        console.log(err);
        yield put(actions.cvsError(err));
    }
}

function* watchActions() {
    yield takeLatest(actions.CVS_POST, cvsPost);
    yield takeLatest(actions.CVS_SENT, watchCvsTransaction);
    yield takeLatest(actions.CVS_FETCH, fetchCvs);
    yield takeLatest(actions.CVS_CLOSE, closeCv);
    yield takeLatest(actions.CVS_APPLY, applyCv);
    yield takeLatest(actions.CVS_APPLY_SENT, watchApplyTransaction);
}

export default [
    fork(watchActions)
];
