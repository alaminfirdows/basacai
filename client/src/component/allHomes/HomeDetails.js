import React, { useState } from 'react'
import { getHomeDetails, clearErrors } from "../../redux/action/homeAction"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Carousel from "react-material-ui-carousel"
import Loading from "../utils/loader/Loading"
import { newReviewAction } from "../../redux/action/homeAction"
import { Rating } from "@material-ui/lab"
import { Dialog, DialogActions, DialogContent, Button, DialogTitle } from "@material-ui/core"
import HomeConstats from '../../redux/constants/homeConstants'
import ReviewCard from './ReviewCard'


function HomeDetails() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const { error, loading, home } = useSelector(state => state.homeDetails)
    const { success, error: reviewError } = useSelector(state => state.newReview)

    const params = useParams()
    const id = params.id
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const submitReviewHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("homeID", id)

        dispatch(newReviewAction(myForm))
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            window.alert(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Review submitted successfully")
            dispatch({ type: HomeConstats.NEW_REVIEW_RESET })
        }
        dispatch(getHomeDetails(id))
    }, [error, dispatch, id, reviewError, success])
    return (
        <div className="homeDetails">
            {
                loading ? <Loading /> :
                    (
                        <div className="container">
                            <div className="details_card">
                                <div className='details_img'>
                                    <Carousel interval={3000}>
                                        {
                                            home.images && home.images.map((image) => (
                                                <img src={image.url} key={image._id} alt="" />
                                            ))
                                        }
                                    </Carousel>
                                    <div className="details_button">
                                        <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                                    </div>
                                    <div className='details_left'>
                                        <p>টাইপ : {home && home.category}</p>
                                        <p>ভাড়ার ধরন :{home && home.family ? "ফ্যামিলি ," : null}  {home && home.bachelor ? "ব্যাচেলর ," : null}
                                            {home && home.smallfamily ? "ছোট ফ্যামিলি ," : null}  {home && home.onlyboysStudent ? "শুধুমাত্র ছাত্র ," : null}
                                            {home && home.onlygirlStudent ? "শুধুমাত্র ছাত্রী ," : null} {home && home.onlymen ? "শুধুমাত্র পুরুষ ," : null} {home && home.onlywomen ? "শুধুমাত্র মহিলা ," : null}
                                            {home && home.menEmployee ? "পুরুষ চাকরীজীবী ," : null} {home && home.womenemployee ? "মহিলা চাকরীজীবী ," : null}</p>
                                        <p>{home && home.description}</p>
                                        <p>ঠিকানা :{home && home.address}</p>

                                    </div>

                                    <Dialog
                                        aria-labelledby="simple-dialog-title"
                                        open={open}
                                        onClose={submitReviewToggle}
                                    >
                                        <DialogTitle>Submit Review</DialogTitle>
                                        <DialogContent className="submitDialog">
                                            <Rating
                                                onChange={(e) => setRating(e.target.value)}
                                                value={rating}
                                                size="large"
                                            />
                                            <textarea className="submitDialogTextArea" name="" onChange={(e) => setComment(e.target.value)} id="" cols="30" rows="5"></textarea>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button color="secondary">Cancel</Button>
                                            <Button onClick={submitReviewHandler} color="primary">Submit</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <div className='details_info'>
                                    <div>
                                        <h3> চার্জ সমূহ</h3>
                                        <p>ভাড়া: {home && home.price}</p>
                                        <p>অগ্রিম: {home && home.advanced}</p>
                                    </div>
                                    <div>
                                        <h3>ফিচার সমূহ</h3>
                                        <p>তারিখ : {home && String(home.date).substr(0, 10)}</p>
                                        <p>সম্পত্তি : {home && home.category}</p>
                                        <p>এলাকা : {home && home.upazila}</p>
                                        <p>মোট তলা : {home && home.totalFloor}</p>
                                        <p> বেড রুম: {home && home.BedRoom}</p>
                                        <p> ফ্ল্যাটের অবস্থান: {home && home.flatNum}</p>
                                        <p> মোট  বাথরুম : {home && home.totalbathroom}</p>
                                        <p> সংযুক্ত বাথরুম: {home && home.atachbathroom}</p>
                                        <p> বারান্দা  : {home && home.velkhani}</p>
                                        <p> ড্রয়িং রুম: {home && home.drawingRoom}</p>
                                        <p> kitchen: {home && home.kitchen}</p>

                                    </div>
                                    <div>
                                        <h3>যোগাযোগ</h3>
                                        <p> নাম : {home && home.name}</p>
                                        <p> মোবাইল : {home && home.phone}</p>
                                        <p>ঠিকানা : {home && home.upazila}</p>
                                        <p>Union : {home && home.union}</p>
                                    </div>
                                    {/* <h2>{home && home.category} Rent {home.upazila}</h2>
                                    <p>{home && home.address}</p>
                                   
                                   
                                     */}
                                </div>
                            </div>
                            <div className="reviews">
                                {home.reviews && home.reviews.length === 0 ? <h2>No Reviews </h2> : <h2>home Reviews </h2>}
                                <div className="review_wrapper">
                                    {
                                        home.reviews && home.reviews.map((review) => (
                                            <ReviewCard className="reviews" key={review._id} review={review} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default HomeDetails