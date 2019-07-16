import { all } from 'redux-saga/effects';
import arweave from './arweave';

export default function* rootSaga() {
    yield all([
        ...arweave
    ]);
}
