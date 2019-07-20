import {
    JOBS_FETCH,
    JOBS_RECEIVED,
    JOBS_MINED,
    JOBS_CLOSE,
    JOBS_CLOSED,
    JOBS_FETCH_CACHE,
    JOBS_FETCH_CACHE_RECEIVED,
    JOBS_UPDATE_QUERY,
    JOBS_ERROR,
    JOBS_ERROR_INVALIDATE,
    AR_LOG_OUT
} from '../actions';

const initialState = {
    loading: false,
    cacheLoading: false,
    jobs: {},
    cache: {},
    closing: [],
    query: {
        tag: '',
        location: ''
    },
    error: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case JOBS_FETCH:
            return {
                ...state,
                loading: true
            };

        case JOBS_RECEIVED:
            return {
                ...state,
                loading: action.notMined ? state.loading : false,
                jobs: {
                    ...state.jobs,
                    ...action.store
                }
            };

        case JOBS_FETCH_CACHE:
                return {
                    ...state,
                    cacheLoading: true
                };

        case JOBS_FETCH_CACHE_RECEIVED:
                return {
                    ...state,
                    cacheLoading: false,
                    cache: {
                        ...state.cache,
                        ...action.store
                    }
                };

        case JOBS_UPDATE_QUERY:
            return {
                ...state,
                query: action.query
            };

        case JOBS_MINED:
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    [action.id]: {
                        ...state.jobs[action.id],
                        mined: true
                    }
                }
            };

        case JOBS_CLOSE:
            return {
                ...state,
                closing: [...state.closing, action.id]
            };

        case JOBS_CLOSED:
                return {
                    ...state,
                    closing: state.closing.filter(v => v !== action.id),
                    jobs: Object.fromEntries(Object.entries(state.jobs).filter(v => v[0] !== action.id))
                };

        case AR_LOG_OUT:
            return {
                ...state,
                loading: false,
                jobs: {}
            };

        case JOBS_ERROR:
            return { 
                ...state, 
                error: action.error.message 
            };

        case JOBS_ERROR_INVALIDATE:
            return { 
                ...state, 
                error: null 
            };
        
        default:
            return state;
    }
};
