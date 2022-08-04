import React from 'react'
import { useState, useEffect } from 'react'
import SlideBar from '../slidebar/SlideBar'
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../utils/loader/Loading"
import { newsDetails, updateNews, clearErrors } from "../../../redux/action/newsAction"
import NewsConstants from '../../../redux/constants/newsConstants'
import { useParams } from "react-router-dom"


function UpdateNews({ history }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [imagePrv, setImagePrv] = useState("")

    const dispatch = useDispatch()
    const { error: updateError, isUpdated, loding: updateLoading } = useSelector(state => state.newsDeUp)
    const { error, loading, news } = useSelector(state => state.newsDetails)

    const params = useParams()

    const id = params.id

    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("title", title)
        myForm.set("content", content)
        myForm.set("image", image)

        dispatch(updateNews(id, myForm))
    }
    const handleChange = async (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
                setImagePrv(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors)
        }
        if (updateError) {
            window.alert(updateError)
            dispatch(clearErrors())
        }
        if (news && news._id !== id) {
            dispatch(newsDetails(id))
        } else {
            setTitle(news.title)
            setContent(news.content)
            setImagePrv(news.image.url)
        }
        if (isUpdated) {
            window.alert("Updated a news")
            history.push("/dashboard")
            dispatch({
                type: NewsConstants.UPDATE_NEWS_RESET
            })
        }

    }, [error, dispatch, isUpdated, history, news,id,updateError])

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="new_product_section">
                        <SlideBar />
                        <div className="create_product">
                            <div className='new_product'>
                                <h1>Update News page</h1>
                                {
                                    updateLoading ? <Loading /> : (
                                        <form encType='multipart/form-data' onSubmit={handleSubmit} className="new_product_form">
                                            <div>
                                                <label htmlFor="title">Title : </label>
                                                <input id="create_product_input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='News Title' required />
                                            </div>

                                            <div>
                                                <label htmlFor="description">Content</label>
                                                <textarea name="" id="" cols="30" value={content} onChange={(e) => setContent(e.target.value)} rows="5" placeholder='Product Description' ></textarea>
                                            </div>
                                            <div className='avatar'>
                                                <label htmlFor="images">News Image :</label>
                                                <div>
                                                    <input type="file" id='create_product_input' onChange={handleChange} name="avatar" accept="image/*" />
                                                </div>
                                            </div>
                                            <div id='imagesShow'>
                                                {
                                                    imagePrv &&
                                                    <img src={imagePrv && imagePrv} alt="House" />
                                                }
                                            </div>
                                            <div className="create_product_btn">
                                                <button type='submit'>Update News</button>
                                            </div>
                                        </form>
                                    )
                                }

                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default UpdateNews