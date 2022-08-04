import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/loader/Loading"
import { getAdminHomes, deleteHome, clearErrors } from "../../redux/action/homeAction"
import { Link } from "react-router-dom"
import SlideBar from './slidebar/SlideBar'
import { useEffect } from 'react'
import { TiEdit } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import HomeConstats from '../../redux/constants/homeConstants'


function AdminHomes({ history }) {
    const { error, loading, homes } = useSelector(state => state.allHomes)
    const { error: deleteerror, isDeleted } = useSelector(state => state.homeDeUp)
    const dispatch = useDispatch()

    const deleteHandle = (id) => {
        if (window.confirm("If you want to this id delete ? ")) {
            dispatch(deleteHome(id))
        }
    }
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (deleteerror) {
            window.alert(deleteerror)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            window.alert("Post deleted successfully!")
            history.push("/dashboard")
            dispatch({ type: HomeConstats.DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminHomes())
    }, [dispatch, error, history, isDeleted, deleteerror])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="admin_products">
                        <SlideBar />
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
                                                        <span>{item.stock}</span>  <Link to={`/update/stock/${item._id}`}><TiEdit title="Edit" /></Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <Link to={`/update/home/${item._id}`}><TiEdit title="Edit" /></Link>
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

export default AdminHomes