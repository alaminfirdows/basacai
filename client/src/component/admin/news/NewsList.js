import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SlideBar from "../slidebar/SlideBar"
import { useEffect } from 'react'
import { TiEdit } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import Loading from "../../utils/loader/Loading"
import NewsConstants from '../../../redux/constants/newsConstants'
import { getAllNews, clearErrors, deleteNews } from "../../../redux/action/newsAction"


function NewsList({ history }) {
    const { error, loading, news } = useSelector(state => state.allNews)
    const { error: deleteError, isDeleted } = useSelector(state => state.newsDeUp)

    const dispatch = useDispatch()

    const deleteHandle = (id) => {
        if (window.confirm("what do you want to delete this news??")) {
            dispatch(deleteNews(id))
        }
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            window.alert(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            window.alert("News deleted successfully!")
            history.push("/dashboard")
            dispatch({ type: NewsConstants.DELETE_NEWS_RESET })
        }
        dispatch(getAllNews())
    }, [dispatch, error, history, isDeleted, deleteError])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="admin_products">
                        <SlideBar />
                        <div className="admin_products_wrapper">
                            <div>
                                <h1>ALL News</h1>
                            </div>
                            <table className='products_table'>
                                <thead>
                                    <tr>
                                        <th>News ID</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        news && news.map((item) => (
                                            <tr key={item._id}>
                                                <td className='tabletd'><span>User ID :</span>{item._id}</td>
                                                <td><span>Title :</span> {item.title}</td>
                                                <td><span>Content :</span> {item.content}</td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <Link to={`/admin/news/${item._id}`}><TiEdit title="Edit" /></Link>
                                                        <p className='deleteBtn' onClick={() => deleteHandle(item._id)} ><MdDelete title="Delete" /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default NewsList