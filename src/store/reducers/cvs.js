import {    
    CVS_MINED,
    CVS_FETCH,
    CVS_RECEIVED,
    CVS_CLOSE,
    CVS_CLOSED,
    CVS_ERROR,
    CVS_ERROR_INVALIDATE,
    AR_LOG_OUT
} from '../actions';

const initialState = {
    loading: false,
    cvs: {},
    closing: [],
    error: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case CVS_MINED:
            return {
                ...state,
                cvs: {
                    ...state.cvs,
                    [action.id]: {
                        ...state.cvs[action.id],
                        mined: true
                    }
                }
            };

        case CVS_FETCH:
                return {
                    ...state,
                    loading: true
                };

        case CVS_RECEIVED:
                return {
                    ...state,
                    loading: action.notMined ? state.loading : false,
                    cvs: {
                        ...state.cvs,
                        ...action.store
                    }
                };

        case CVS_CLOSE:
                return {
                    ...state,
                    closing: [...state.closing, action.id]
                };
    
        case CVS_CLOSED:
            return {
                ...state,
                closing: state.closing.filter(v => v !== action.id),
                cvs: Object.fromEntries(Object.entries(state.cvs).filter(v => v[0] !== action.id))
            };

        case AR_LOG_OUT:
            return {
                ...state,
                loading: false,
                cvs: {}
            };

        case CVS_ERROR:
            return { 
                ...state, 
                error: action.error.message 
            };

        case CVS_ERROR_INVALIDATE:
            return { 
                ...state, 
                error: null 
            };
        
        default:
            return state;
    }
};
