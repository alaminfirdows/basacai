import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/loader/Loading"
import { getSubAdminPost, clearErrors } from "../../redux/action/homeAction"
import { Link } from "react-router-dom"
import { useEffect } from 'react'
import { TiEdit } from 'react-icons/ti';
import Slide from './Slide'

function PostList({ history }) {
    const { error, loading, homes } = useSelector(state => state.allHomes)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(getSubAdminPost())
    }, [dispatch, error, history])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="admin_products">
                        <Slide />
                        <div className="admin_products_wrapper">
                            <div>
                                <h1>সকল বিজ্ঞাপন</h1>
                            </div>
                            <table className='products_table'>
                                <thead>
                                    <tr>
                                        <th>Home ID</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        homes && homes.map((item) => (
                                            <tr key={item._id}>
                                                <td><span>Home ID :</span>{item._id}</td>
                                                <td><span>Category :</span> {item.category}</td>
                                                <td><span>Price :</span> {item.price}</td>
                                                <td>
                                                <span>Stock :</span>
                                                <div className='product_action_btn'>
                                                <span>{item.stock}</span>  <Link to={`/put/stock/${item._id}`}><TiEdit title="Edit" /></Link>
                                                </div>

                                                </td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <Link to={`/subAdmin/update_post/${item._id}`}><TiEdit title="Edit" /></Link>
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

export default PostList