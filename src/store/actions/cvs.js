import { reduxAction as action } from '../../utils/redux.helpers';

export const CVS_POST = 'CVS_POST';
export const CVS_SENT = 'CVS_SENT';
export const CVS_MINED = 'CVS_MINED';
export const CVS_FETCH = 'CVS_FETCH';
export const CVS_RECEIVED = 'CVS_RECEIVED';
export const CVS_FILED = 'CVS_FILED';
export const CVS_CLOSE = 'CVS_CLOSE';
export const CVS_CLOSED = 'CVS_CLOSED';
export const CVS_APPLY = 'CVS_APPLY';
export const CVS_APPLY_SENT = 'CVS_APPLY_SENT';
export const CVS_APPLY_DONE = 'CVS_APPLY_DONE';
export const CVS_ERROR = 'CVS_ERROR';
export const CVS_ERROR_INVALIDATE = 'CVS_ERROR_INVALIDATE';

export const cvsPost = job => action(CVS_POST, { job });
export const cvsSent = transaction => action(CVS_SENT, { transaction });
export const cvsMined = id => action(CVS_MINED, { id });
export const cvsFetch = address => action(CVS_FETCH, { address });
export const cvsReceived = (store, notMined = false) => action(CVS_RECEIVED, { store, notMined });
export const cvsFiled = id => action(CVS_FILED, { id });
export const cvsClose = id => action(CVS_CLOSE, { id });
export const cvsClosed = id => action(CVS_CLOSED, { id });
export const cvsApply = (cv, job) => action(CVS_APPLY, { cv, job });
export const cvsApplySent = transaction => action(CVS_APPLY_SENT, { transaction });
export const cvsApplyDone = (cv, job) => action(CVS_APPLY_DONE, { cv, job });
export const cvsError = error => action(CVS_ERROR, { error });
export const cvsErrorInvalidate = () => action(CVS_ERROR_INVALIDATE);
