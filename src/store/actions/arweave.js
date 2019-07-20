import { reduxAction as action } from '../../utils/redux.helpers';

export const AR_SETUP = 'AR_SETUP';
export const AR_INITIALIZED = 'AR_INITIALIZED';
export const AR_LOG_IN = 'AR_LOG_IN';
export const AR_LOGGED_IN = 'AR_LOGGED_IN';
export const AR_BALLANCE = 'AR_BALLANCE';
export const AR_LOG_OUT = 'AR_LOG_OUT';
export const AR_ERROR = 'AR_ERROR';
export const AR_INVALIDATE_ERROR = 'AR_INVALIDATE_ERROR';

export const arSetup = () => action(AR_SETUP);
export const arInitialized = arweave => action(AR_INITIALIZED, { arweave });
export const arLogin = wallet => action(AR_LOG_IN, { wallet });
export const arLoggedIn = (address, wallet) => action(AR_LOGGED_IN, { address, wallet });
export const arBallance = ballance => action(AR_BALLANCE, { ballance });
export const arLogOut = () => action(AR_LOG_OUT);
export const arError = error => action(AR_ERROR, { error });
export const arInvalidateError = () => action(AR_INVALIDATE_ERROR);
