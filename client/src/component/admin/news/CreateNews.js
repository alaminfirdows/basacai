import React from 'react'
import { useState, useEffect } from 'react'
import SlideBar from '../slidebar/SlideBar'
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../utils/loader/Loading"
import { createNews, clearErrors } from "../../../redux/action/newsAction"
import NewsConstants from '../../../redux/constants/newsConstants'
function CreateNews({ history }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [imagePrv, setImagePrv] = useState("")

    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.newNewsReducer)

    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("title", title)
        myForm.set("content", content)
        myForm.set("image", image)

        dispatch(createNews(myForm))
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
        if (success) {
            window.alert("Created a news")
            history.push("/dashboard")
            dispatch({
                type: NewsConstants.NEW_NEWS_RESET
            })
        }

    }, [error, dispatch, success, history])

    return (
        <>
            <div className="new_product_section">
                <SlideBar />
                <div className="create_product">
                    <div className='new_product'>
                        <h1>Create News page</h1>
                        {
                            loading ? <Loading /> : (
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
                                        <button type='submit'>New News</button>
                                    </div>
                                </form>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNews