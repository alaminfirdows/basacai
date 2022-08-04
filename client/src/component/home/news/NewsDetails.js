import React, { useEffect } from 'react'
import { newsDetails, clearErrors } from "../../../redux/action/newsAction"
import Loading from '../../utils/loader/Loading';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import OwnerProfile from '../OwnerProfile';
import { getSubAdminUsers } from "../../../redux/action/userAction"


function NewsDetails() {
    const { error, loading, news } = useSelector(state => state.newsDetails)
    const { users, loading: ownerLoading } = useSelector(state => state.users)

    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(newsDetails(id))
        dispatch(getSubAdminUsers())
    }, [dispatch, error, id])
    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <>
                            <div className="newsDetails">
                                <div className="container">
                                    <div className="newsDetailsCard">
                                        <img src={news.image && news.image.url} alt="" />
                                        <h2>{news.title}</h2>
                                        <p>{news.content}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
            {
                ownerLoading ? <Loading /> :
                    <OwnerProfile users={users} />
            }
        </>
    )
}

export default NewsDetails