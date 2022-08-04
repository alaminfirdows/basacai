import { combineReducers } from "redux"

import { userReducer, updateProfile, allUsersReducer, userDetailsReducer, forgotPasswordReducer } from "./userReducer"
import { newHomeReducer, homesReducer, homeDetails, homeReducer, allhomes, newAdds, getAdds, newReviewReducer, deleteReviewReducer, getReviewSReducer } from "./homeReducer"
import { newNewsReducer, allNews, newsDetails, newsReducer } from "./newsReducer"
export default combineReducers({
    user: userReducer,
    profile: updateProfile,
    users: allUsersReducer,
    details: userDetailsReducer,
    password: forgotPasswordReducer,

    newHome: newHomeReducer,
    allHomes: homesReducer,
    homeDetails: homeDetails,
    homeDeUp: homeReducer,

    newAdds: newAdds,
    getAdds: getAdds,

    homes: allhomes,

    newNewsReducer: newNewsReducer,
    allNews: allNews,
    newsDetails: newsDetails,
    newsDeUp: newsReducer,

    newReview: newReviewReducer,
    review: deleteReviewReducer,
    allReviews: getReviewSReducer,
})