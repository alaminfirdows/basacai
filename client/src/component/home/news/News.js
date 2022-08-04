import React from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { GrFormNextLink } from 'react-icons/gr';
import { getAllNews, clearErrors } from "../../../redux/action/newsAction"
import Loading from '../../utils/loader/Loading';
import { useDispatch, useSelector } from "react-redux"


function News() {
    const { error, loading, news } = useSelector(state => state.allNews)
    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(getAllNews())
    }, [dispatch, error])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="newsPage">
                        <div className="container">
                            <div className="newsSection">
                                <div className="newsHeader">
                                    <h1 className='newsTitle'>আপডেট নিউজ</h1>
                                    <p>আমাদের গ্রাহকদের বাসা ভাড়া সম্পর্কে প্রয়োজনীয় আপডেট নিউজ এইখানে প্রকাশ করা হয়েছে।</p>
                                </div>
                                <div className="news">
                                    {
                                        news && news.map((item) => (
                                            <div key={item._id} className="newsCard">
                                                <div className='newsImage'>
                                                    <img src={item.image.url} alt="" />
                                                </div>
                                                <div className="newsMeta">
                                                    <h3>{item.title}</h3>
                                                    <p>{item.content}</p>
                                                    <div className="newsMore">
                                                        <Link to={`/news/details/${item._id}`}>Read More </Link>
                                                        <GrFormNextLink />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default News