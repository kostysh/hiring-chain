import { select, put, fork, takeLatest, delay } from 'redux-saga/effects';
import {
    postJob, 
    isTransactionMined, 
    convertIdsToStore, 
    fetchJobsIds,
    closeJobById,
    getTagValue
} from '../../services/jobs';

import config from '../../config.json';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* watchJobTransaction(action) {
    yield delay(config.ballanceInterval);// to avoid 404 error
    try {
        while (true) {
            const mined = yield isTransactionMined(action.transaction.id);

            if (mined) {
                yield put(actions.jobsMined(action.transaction.id));
                break;
            }
            
            yield delay(config.ballanceInterval);            
        }        
    } catch(err) {
        console.log(err);
        yield put(actions.jobsError(err));
        yield put(actions.jobsFiled(action.transaction.id));
    }
}

function* watchJobCloseTransaction(transaction) {
    yield delay(config.ballanceInterval);// to avoid 404 error
    try {
        while (true) {
            const mined = yield isTransactionMined(transaction.id);

            if (mined) {
                yield put(actions.jobsClosed(getTagValue(transaction, 'Job')));
                break;
            }
            
            yield delay(config.ballanceInterval);            
        }        
    } catch(err) {
        console.log(err);
        yield put(actions.jobsError(err));
    }
}

function* jobsPost(action) {
    try {
        const wallet = yield select(selectors.wallet);
        const transaction = yield postJob(action.job, wallet);
        yield put(actions.jobsSent(transaction));
        const address = yield select(selectors.address);
        const store = yield convertIdsToStore([transaction], address, true);
        yield put(actions.jobsReceived(store, true));
    } catch(err) {
        console.log(err);
        yield put(actions.jobsError(err));
    }
}

function* fetchJobs() {
    try {
        const address = yield select(selectors.address);
        const ids = yield fetchJobsIds(address);
        const store = yield convertIdsToStore(ids, address);
        yield put(actions.jobsReceived(store));
    } catch(err) {
        console.log(err);
        yield put(actions.jobsError(err));
    }
}

function* fetchJobsCache() {
    try {
        const ids = yield fetchJobsIds();
        const store = yield convertIdsToStore(ids);
        yield put(actions.jobsChacheReceived(store));
    } catch(err) {
        console.log(err);
        yield put(actions.jobsError(err));
    }
}

function* closeJob(action) {
    try {
        const wallet = yield select(selectors.wallet);
        const transaction = yield closeJobById(action.id, wallet);
        yield watchJobCloseTransaction(transaction);
    } catch(err) {
        console.log(err);
        yield put(actions.jobsError(err));
    }
}

function* watchActions() {
    yield takeLatest(actions.JOBS_POST, jobsPost);
    yield takeLatest(actions.JOBS_SENT, watchJobTransaction);
    yield takeLatest(actions.JOBS_FETCH, fetchJobs);
    yield takeLatest(actions.JOBS_CLOSE, closeJob);
    yield takeLatest(actions.JOBS_FETCH_CACHE, fetchJobsCache);
}

export default [
    fork(watchActions)
];
