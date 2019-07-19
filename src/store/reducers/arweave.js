import {
    AR_SETUP,
    AR_INITIALIZED,
    AR_LOG_IN,
    AR_LOGGED_IN,
    AR_BALLANCE,
    AR_LOG_OUT,
    AR_ERROR,
    AR_INVALIDATE_ERROR
} from '../actions';

const initialState = {
    initialized: false,
    loading: false,
    arweave: null,
    address: null,
    ballance: 0,
    error: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case AR_SETUP:
            return {
                ...state,
                initialized: false,
                loading: true,
                arweave: null,
                address: null,
                ballance: 0,
                error: null
            };
        
        case AR_INITIALIZED:
            return { 
                ...state,
                initialized: true,
                loading: false,
                arweave: action.arweave,
                error: null 
            };

        case AR_LOG_IN:
            return {
                ...state,
                loading: true,
                address: null,
                error: null
            };

        case AR_LOGGED_IN:
            return { 
                ...state,
                loading: false,
                address: action.address,
                error: null 
            };

        case AR_BALLANCE:
            return {
                ...state,
                ballance: action.ballance
            };

        case AR_LOG_OUT:
            return {
                ...state,
                loading: false,
                arweave: null,
                address: null,
                ballance: 0,
                error: null
            };

        case AR_ERROR:
            return { 
                ...state, 
                error: action.error.message 
            };

        case AR_INVALIDATE_ERROR:
            return { 
                ...state, 
                error: null 
            };
        
        default:
            return state;
    }
};
