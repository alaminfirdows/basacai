import axios from "axios"
import UserConstants from "../constants/userConstants";
export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.LOGIN_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post("/user/login", { email, password }, config)

        dispatch({
            type: UserConstants.LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.LOGIN_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const userRegister = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.REGISTER_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post("/user/register", myForm, config)

        dispatch({
            type: UserConstants.REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.REGISTER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.LOAD_USER_REQUEST
        })
        const { data } = await axios.get("/user/getUser")
        dispatch({
            type: UserConstants.LOAD_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.LOAD_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const userLogOut = () => async (dispatch) => {
    try {
        await axios.post("/user/logout")
        dispatch({
            type: UserConstants.LOGOUT_USER_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: UserConstants.LOGOUT_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const profileAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.UPDATE_PROFILE_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.patch("/user/profile/update", userData, config)
        dispatch({
            type: UserConstants.UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UserConstants.UPDATE_PROFILE_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const changePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.UPDATE_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put("/user/update/password", { oldPassword, newPassword, confirmPassword }, config)

        dispatch({
            type: UserConstants.UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const forgotAction = (email) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.FORGOT_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post("/user/forgot", { email }, config)

        dispatch({
            type: UserConstants.FORGOT_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const resetAction = (password, token) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.RESET_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/user/reset/${token}`, { password }, config)
        dispatch({
            type: UserConstants.RESET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UserConstants.RESET_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}
// // get all users for admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.ALL_USERS_REQUEST
        })

        const { data } = await axios.get("/user/get/all")

        dispatch({
            type: UserConstants.ALL_USERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.ALL_USERS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// // get all subAdmin users 
export const getSubAdminUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.ALL_SUBADMIN_REQUEST
        })

        const { data } = await axios.get("/user/user/subAdmin")

        dispatch({
            type: UserConstants.ALL_SUBADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.ALL_SUBADMIN_FAIL,
            payload: error.response.data.msg
        })
    }
}
// Admin-----> get user id details
export const userDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.USER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/user/user/details/${id}`)

        dispatch({
            type: UserConstants.USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.USER_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// // usee update role for admin

export const updateUserRole = (id, myform) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.USER_UPDATE_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/user/update/role/${id}`, myform, config)

        dispatch({
            type: UserConstants.USER_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.USER_UPDATE_FAIL,
            payload: error.response.data.msg
        })
    }
}
// admin -----> user id delete Ctrl  
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.USER_DELETE_REQUEST
        })

        const { data } = await axios.delete(`/user/admin/delete/${id}`)

        dispatch({
            type: UserConstants.USER_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.USER_DELETE_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const contactAction = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.POST_CONTACT_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post("/user/contact/admin", myForm, config)
        dispatch({
            type: UserConstants.POST_CONTACT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.POST_CONTACT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: UserConstants.CLEAR_ERRORS
    })
}