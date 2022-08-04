import NewsConstants from "../constants/newsConstants";

export const newNewsReducer = (state = { news: {} }, action) => {
    switch (action.type) {
        case NewsConstants.NEW_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NewsConstants.NEW_NEWS_SUCCESS:
            return {
                loading: false,
                news: action.payload.news,
                success: action.payload.success
            }
        case NewsConstants.NEW_NEWS_RESET:
            return {
                ...state,
                success: false
            }
        case NewsConstants.NEW_NEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NewsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allNews = (state = { news: [] }, action) => {
    switch (action.type) {
        case NewsConstants.ALL_NEWS_REQUEST:
            return {
                loading: true,
                news: []
            }
        case NewsConstants.ALL_NEWS_SUCCESS:
            return {
                loading: false,
                news: action.payload.news,
            }
        case NewsConstants.ALL_NEWS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case NewsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
export const newsDetails = (state = { news: {} }, action) => {
    switch (action.type) {
        case NewsConstants.NEWS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NewsConstants.NEWS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                news: action.payload.news
            }
        case NewsConstants.NEWS_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NewsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
// update & delete post
export const newsReducer = (state = {}, action) => {
    switch (action.type) {
        case NewsConstants.DELETE_NEWS_REQUEST:
        case NewsConstants.UPDATE_NEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NewsConstants.DELETE_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case NewsConstants.UPDATE_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case NewsConstants.DELETE_NEWS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case NewsConstants.UPDATE_NEWS_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case NewsConstants.UPDATE_NEWS_FAIL:
        case NewsConstants.DELETE_NEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NewsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
