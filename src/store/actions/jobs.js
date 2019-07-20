import { reduxAction as action } from '../../utils/redux.helpers';

export const JOBS_POST = 'JOBS_POST';
export const JOBS_SENT = 'JOBS_SENT';
export const JOBS_MINED = 'JOBS_MINED';
export const JOBS_FILED = 'JOBS_FILED';
export const JOBS_FETCH = 'JOBS_FETCH';
export const JOBS_RECEIVED = 'JOBS_RECEIVED';
export const JOBS_CLOSE = 'JOBS_CLOSE';
export const JOBS_CLOSED = 'JOBS_CLOSED';
export const JOBS_FETCH_CACHE = 'JOBS_FETCH_CACHE';
export const JOBS_FETCH_CACHE_RECEIVED = 'JOBS_FETCH_CACHE_RECEIVED';
export const JOBS_UPDATE_QUERY = 'JOBS_UPDATE_QUERY';
export const JOBS_ERROR = 'JOBS_ERROR';
export const JOBS_ERROR_INVALIDATE = 'JOBS_ERROR_INVALIDATE';

export const jobsPost = job => action(JOBS_POST, { job });
export const jobsSent = transaction => action(JOBS_SENT, { transaction });
export const jobsFetch = address => action(JOBS_FETCH, { address });
export const jobsReceived = (store, notMined = false) => action(JOBS_RECEIVED, { store, notMined });
export const jobsMined = id => action(JOBS_MINED, { id });
export const jobsFiled = id => action(JOBS_FILED, { id });
export const jobsClose = id => action(JOBS_CLOSE, { id });
export const jobsClosed = id => action(JOBS_CLOSED, { id });
export const jobsFetchCache = () => action(JOBS_FETCH_CACHE);
export const jobsChacheReceived = store => action(JOBS_FETCH_CACHE_RECEIVED, { store });
export const jobsUpdateQuery = query => action(JOBS_UPDATE_QUERY, { query });
export const jobsError = error => action(JOBS_ERROR, { error });
export const jobsErrorInvalidate = () => action(JOBS_ERROR_INVALIDATE);

