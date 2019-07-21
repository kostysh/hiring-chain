import { all } from 'redux-saga/effects';
import arweave from './arweave';
import jobs from './jobs';
import cvs from './cvs';

export default function* rootSaga() {
    yield all([
        ...arweave,
        ...jobs,
        ...cvs
    ]);
}
