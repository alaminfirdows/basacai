import UserConstants from "../constants/userConstants"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UserConstants.LOGIN_REQUEST:
        case UserConstants.REGISTER_REQUEST:
        case UserConstants.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case UserConstants.LOGIN_SUCCESS:
        case UserConstants.REGISTER_SUCCESS:
        case UserConstants.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated: true,
            }
        case UserConstants.LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case UserConstants.LOGIN_FAIL:
        case UserConstants.REGISTER_FAIL:
        case UserConstants.LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                error: action.payload
            }
        case UserConstants.LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UserConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const updateProfile = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.UPDATE_PROFILE_REQUEST:
        case UserConstants.UPDATE_PASSWORD_REQUEST:
        case UserConstants.USER_DELETE_REQUEST:
        case UserConstants.USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UserConstants.UPDATE_PROFILE_SUCCESS:
        case UserConstants.UPDATE_PASSWORD_SUCCESS:
        case UserConstants.USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case UserConstants.USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case UserConstants.UPDATE_PROFILE_FAIL:
        case UserConstants.UPDATE_PASSWORD_FAIL:
        case UserConstants.USER_DELETE_FAIL:
        case UserConstants.USER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UserConstants.UPDATE_PROFILE_RESET:
        case UserConstants.UPDATE_PASSWORD_RESET:
        case UserConstants.USER_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case UserConstants.USER_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UserConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.FORGOT_PASSWORD_REQUEST:
        case UserConstants.RESET_PASSWORD_REQUEST:
        case UserConstants.POST_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case UserConstants.FORGOT_PASSWORD_SUCCESS:
        case UserConstants.RESET_PASSWORD_SUCCESS:
        case UserConstants.POST_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            }
        case UserConstants.FORGOT_PASSWORD_FAIL:
        case UserConstants.RESET_PASSWORD_FAIL:
        case UserConstants.POST_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UserConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case UserConstants.ALL_USERS_REQUEST:
        case UserConstants.ALL_SUBADMIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UserConstants.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        case UserConstants.ALL_SUBADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.result
            }
        case UserConstants.ALL_USERS_FAIL:
        case UserConstants.ALL_SUBADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UserConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UserConstants.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UserConstants.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        case UserConstants.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UserConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
