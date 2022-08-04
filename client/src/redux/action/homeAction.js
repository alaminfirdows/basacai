import HomeConstats from "../constants/homeConstants"
import axios from "axios"
// create new post for admin
export const createHome = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.NEW_PRODUCT_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/homes/create", myForm, config)
        dispatch({
            type: HomeConstats.NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.NEW_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}

// new post for sub admin
export const newPost = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.NEW_POST_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/homes/create/subAdmin", myForm, config)
        dispatch({
            type: HomeConstats.NEW_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.NEW_POST_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getAllhomes = (category = "", bachelor = " ", smallfamily = "", family = "", onlyboysStudent = "", onlygirlStudent = "", onlymen = "", onlywomen = "", womenemployee = "", search = "", upazila = "") => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ALL_HOMES_REQUEST
        })
        let link = ""
        if (category) {
            link = `/api/all_homes?category=${category}`
        }
        if (bachelor) {
            link = `/api/all_homes?bachelor=bachelor`
        }
        if (family) {
            link = `/api/all_homes?family=family`
        }
        if (smallfamily) {
            link = `/api/all_homes?smallfamily=smallfamily`
        }
        if (onlyboysStudent) {
            link = `/api/all_homes?onlyboysStudent=onlyboysStudent`
        }
        if (onlygirlStudent) {
            link = `/api/all_homes?onlygirlStudent=onlygirlStudent`
        }
        if (onlymen) {
            link = `/api/all_homes?onlymen=onlymen`
        }
        if (onlywomen) {
            link = `/api/all_homes?onlywomen=onlywomen`
        }
        if (womenemployee) {
            link = `/api/all_homes?womenemployee=womenemployee`
        }
        if (search) {
            link = `/api/all_homes?category[regex]=${search}`
        }
        if (upazila) {
            link = `/api/all_homes?upazila=${upazila}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: HomeConstats.ALL_HOMES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ALL_HOMES_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getSearchHomes = (search = "", upazila = "", union = "", price = [0, 30000], currentPage = 1) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ALL_HOMES_REQUEST
        })
        let link = `/api/all_homes?category[regex]=${search}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`
        if (upazila) {
            link = `/api/all_homes?category[regex]=${search}&upazila=${upazila}&page=${currentPage}`
        }
        if (union) {
            link = `/api/all_homes?category[regex]=${search}&upazila=${upazila}&union=${union}&page=${currentPage}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: HomeConstats.ALL_HOMES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ALL_HOMES_FAIL,
            payload: error.response.data.msg
        })
    }
}
// All get post for admin  
export const getAdminHomes = () => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ADMIN_PRODUCT_REQUEST
        })
        const { data } = await axios.get("/api/admin/homes")
        dispatch({
            type: HomeConstats.ADMIN_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get all create post for subAdmin
export const getSubAdminPost = () => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ALL_POST_REQUEST
        })
        const { data } = await axios.get("/api/homes/subadmin")
        dispatch({
            type: HomeConstats.ALL_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ALL_POST_FAIL,
            payload: error.response.data.msg
        })
    }
}
// home details
export const getHomeDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.PRODUCT_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/home/details/${id}`)
        dispatch({
            type: HomeConstats.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// delete post for admin
export const deleteHome = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.DELETE_PRODUCT_REQUEST
        })
        const { data } = await axios.delete(`/api/home/delete/${id}`)
        dispatch({
            type: HomeConstats.DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.DELETE_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}
// update post for admin
export const updateHome = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.UPDATE_PRODUCT_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/home/update/${id}`, formData, config)
        dispatch({
            type: HomeConstats.UPDATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}
// update post for subAdmin
export const updatepostSubAdmin = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.UPDATE_POST_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/home/subAdmin/update/${id}`, formData, config)
        dispatch({
            type: HomeConstats.UPDATE_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.UPDATE_POST_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get all Adds  
export const getAddsBanner = () => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ALL_ADDS_REQUEST
        })
        const { data } = await axios.get("/api/adds")
        dispatch({
            type: HomeConstats.ALL_ADDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ALL_ADDS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// create new adds for admin
export const createAdds = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.NEW_ADDS_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/adds", myForm, config)
        dispatch({
            type: HomeConstats.NEW_ADDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.NEW_ADDS_FAIL,
            payload: error.response.data.msg
        })
    }
}

// delete Adds for admin
export const deleteAdds = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.DELETE_ADDS_REQUEST
        })
        const { data } = await axios.delete(`/api/adds/delete/${id}`)
        dispatch({
            type: HomeConstats.DELETE_ADDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.DELETE_ADDS_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get all Adds  
export const getBanner = () => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ALL_BANNER_REQUEST
        })
        const { data } = await axios.get("/api/banner")
        dispatch({
            type: HomeConstats.ALL_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ALL_BANNER_FAIL,
            payload: error.response.data.msg
        })
    }
}
// create new post for admin
export const newBannaer = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.NEW_BANNER_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/new/banner", myForm, config)
        dispatch({
            type: HomeConstats.NEW_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.NEW_BANNER_FAIL,
            payload: error.response.data.msg
        })
    }
}
// delete banner for admin
export const deleteBanner = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.DELETE_BANNERR_REQUEST
        })
        const { data } = await axios.delete(`/api/delete/banner/${id}`)
        dispatch({
            type: HomeConstats.DELETE_BANNERR_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.DELETE_BANNERR_FAIL,
            payload: error.response.data.msg
        })
    }
}
// update stock
export const updateStock = (myForm, id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.UPDATE_STOCK_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/home/stock/admin/${id}`, myForm, config)
        dispatch({
            type: HomeConstats.UPDATE_STOCK_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.UPDATE_STOCK_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const updateStockSub = (myForm, id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.UPDATE_STOCK_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/homes/stock/subAdmin/${id}`, myForm, config)
        dispatch({
            type: HomeConstats.UPDATE_STOCK_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.UPDATE_STOCK_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const newReviewAction = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.NEW_REVIEW_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put("/api/home/reviews", reviewData, config)
        dispatch({
            type: HomeConstats.NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.NEW_REVIEW_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get reviews of a product
export const getReviewsAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.ALL_REVIEWS_REQUEST
        })
        const { data } = await axios.get(`/api/home/reviews?id=${id}`)
        dispatch({
            type: HomeConstats.ALL_REVIEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.ALL_REVIEWS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const deleteRvwAction = (id, homeID) => async (dispatch) => {
    try {
        dispatch({
            type: HomeConstats.DELETE_REVIEW_REQUEST
        })
        // console.log(id, productId)
        const { data } = await axios.delete(`/api/home/reviews?id=${id}&homeID=${homeID}`)
        dispatch({
            type: HomeConstats.DELETE_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HomeConstats.DELETE_REVIEW_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: HomeConstats.CLEAR_ERRORS
    })
}