import NewsConstants from "../constants/newsConstants"
import axios from "axios"
// create news post
export const createNews = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: NewsConstants.NEW_NEWS_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/create/news", myForm, config)
        dispatch({
            type: NewsConstants.NEW_NEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NewsConstants.NEW_NEWS_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get all news  
export const getAllNews = () => async (dispatch) => {
    try {
        dispatch({
            type: NewsConstants.ALL_NEWS_REQUEST
        })
        const { data } = await axios.get("/api/news/get/all")
        dispatch({
            type: NewsConstants.ALL_NEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NewsConstants.ALL_NEWS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// news details
export const newsDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: NewsConstants.NEWS_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/news/details/${id}`)
        dispatch({
            type: NewsConstants.NEWS_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NewsConstants.NEWS_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// delete news
export const deleteNews = (id) => async (dispatch) => {
    try {
        dispatch({
            type: NewsConstants.DELETE_NEWS_REQUEST
        })
        const { data } = await axios.delete(`/api/news/delete/${id}`)
        dispatch({
            type: NewsConstants.DELETE_NEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NewsConstants.DELETE_NEWS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// update news for admin
export const updateNews = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: NewsConstants.UPDATE_NEWS_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.patch(`/api/news/update/${id}`, formData, config)
        dispatch({
            type: NewsConstants.UPDATE_NEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NewsConstants.UPDATE_NEWS_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: NewsConstants.CLEAR_ERRORS
    })
}