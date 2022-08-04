import HomeConstats from "../constants/homeConstants"

export const newHomeReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case HomeConstats.NEW_PRODUCT_REQUEST:
        case HomeConstats.NEW_POST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case HomeConstats.NEW_PRODUCT_SUCCESS:
        case HomeConstats.NEW_POST_SUCCESS:
            return {
                loading: false,
                home: action.payload.home,
                success: action.payload.success
            }
        case HomeConstats.NEW_PRODUCT_RESET:
        case HomeConstats.NEW_POST_RESET:
            return {
                ...state,
                success: false
            }
        case HomeConstats.NEW_PRODUCT_FAIL:
        case HomeConstats.NEW_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const homesReducer = (state = { homes: [] }, action) => {
    switch (action.type) {
        case HomeConstats.ALL_PRODUCT_REQUEST:
        case HomeConstats.ADMIN_PRODUCT_REQUEST:
        case HomeConstats.ALL_POST_REQUEST:
            return {
                loading: true,
                homes: []
            }
        case HomeConstats.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                homes: action.payload.homes,
            }
        case HomeConstats.ALL_POST_SUCCESS:
            return {
                loading: false,
                homes: action.payload.result,
            }
        case HomeConstats.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                homes: action.payload.homes
            }
        case HomeConstats.ALL_PRODUCT_FAIL:
        case HomeConstats.ADMIN_PRODUCT_FAIL:
        case HomeConstats.ALL_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const homeDetails = (state = { home: {} }, action) => {
    switch (action.type) {
        case HomeConstats.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                home: action.payload.home
            }
        case HomeConstats.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
// update & delete post
export const homeReducer = (state = {}, action) => {
    switch (action.type) {
        case HomeConstats.DELETE_PRODUCT_REQUEST:
        case HomeConstats.UPDATE_PRODUCT_REQUEST:
        case HomeConstats.UPDATE_POST_REQUEST:
        case HomeConstats.DELETE_ADDS_REQUEST:
        case HomeConstats.DELETE_BANNERR_REQUEST:
        case HomeConstats.UPDATE_STOCK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.DELETE_PRODUCT_SUCCESS:
        case HomeConstats.DELETE_ADDS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case HomeConstats.DELETE_BANNERR_SUCCESS:
            return {
                ...state,
                loading: false,
                bannerDeleted: action.payload.success
            }
        case HomeConstats.UPDATE_PRODUCT_SUCCESS:
        case HomeConstats.UPDATE_POST_SUCCESS:
        case HomeConstats.UPDATE_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case HomeConstats.DELETE_PRODUCT_RESET:
        case HomeConstats.DELETE_ADDS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case HomeConstats.DELETE_BANNERR_RESET:
            return {
                ...state,
                bannerDeleted: false
            }
        case HomeConstats.UPDATE_PRODUCT_RESET:
        case HomeConstats.UPDATE_POST_RESET:
        case HomeConstats.UPDATE_STOCK_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case HomeConstats.DELETE_PRODUCT_FAIL:
        case HomeConstats.UPDATE_PRODUCT_FAIL:
        case HomeConstats.UPDATE_POST_FAIL:
        case HomeConstats.DELETE_ADDS_FAIL:
        case HomeConstats.DELETE_BANNERR_FAIL:
        case HomeConstats.UPDATE_STOCK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allhomes = (state = { homes: [] }, action) => {
    switch (action.type) {
        case HomeConstats.ALL_HOMES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.ALL_HOMES_SUCCESS:
            return {
                ...state,
                loading: false,
                homes: action.payload.homes,
                homesCount: action.payload.homesCount,
                resultPerpage: action.payload.resultPerpage,
                result: action.payload.result,
            }
        case HomeConstats.ALL_HOMES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

// NEW ADDS
export const newAdds = (state = { adds: {} }, action) => {
    switch (action.type) {
        case HomeConstats.NEW_ADDS_REQUEST:
        case HomeConstats.NEW_BANNER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case HomeConstats.NEW_ADDS_SUCCESS:
        case HomeConstats.NEW_BANNER_SUCCESS:
            return {
                loading: false,
                home: action.payload.home,
                success: action.payload.success
            }
        case HomeConstats.NEW_ADDS_RESET:
        case HomeConstats.NEW_BANNER_RESET:
            return {
                ...state,
                success: false
            }
        case HomeConstats.NEW_ADDS_FAIL:
        case HomeConstats.NEW_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const getAdds = (state = { adds: [], banner: [] }, action) => {
    switch (action.type) {
        case HomeConstats.ALL_ADDS_REQUEST:
        case HomeConstats.ALL_BANNER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.ALL_ADDS_SUCCESS:
            return {
                ...state,
                loading: false,
                adds: action.payload.adds
            }
        case HomeConstats.ALL_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                banner: action.payload.banner
            }
        case HomeConstats.ALL_ADDS_FAIL:
        case HomeConstats.ALL_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case HomeConstats.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case HomeConstats.NEW_REVIEW_FAIL:
            return {
                ...state,
                loadding: false,
                error: action.payload
            }
        case HomeConstats.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const getReviewSReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case HomeConstats.ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.ALL_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews
            }
        case HomeConstats.ALL_REVIEWS_FAIL:
            return {
                ...state,
                loadding: false,
                error: action.payload
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case HomeConstats.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HomeConstats.DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success
            }
        case HomeConstats.DELETE_REVIEW_FAIL:
            return {
                ...state,
                loadding: false,
                error: action.payload
            }
        case HomeConstats.DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case HomeConstats.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}