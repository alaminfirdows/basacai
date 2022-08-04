import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../../utils/loader/Loading'
import { getHomeDetails, updateStock, clearErrors } from "../../../redux/action/homeAction"
import SlideBar from '../slidebar/SlideBar'
import HomeConstats from '../../../redux/constants/homeConstants'
function UpdateStock() {
    const [stock, setStock] = useState("")

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const id = params.id

    const { isUpdated, error, loading: updateLoading } = useSelector(state => state.homeDeUp)
    const { home, loading } = useSelector(state => state.homeDetails)


    const handleSubmit = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("stock", stock)
        dispatch(updateStock(myform, id))
    }

    useEffect(() => {
        if (home && home._id !== id) {
            dispatch(getHomeDetails(id))
        } else {
            setStock(home.stock)
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            window.alert("Stock updated successfully")
            history.push("/admin/homes")
            dispatch({ type: HomeConstats.UPDATE_STOCK_RESET })
        }

    }, [error, history, dispatch, isUpdated, id, home])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="new_product_section">
                        <SlideBar />
                        <div className="create_product">
                            <div className='new_product'>
                                <h1>Home stock update</h1>
                                <form encType='multipart/form-data' onSubmit={handleSubmit} className="new_product_form">
                                    <div>
                                        <label htmlFor="role">Home Stock</label>
                                        <div>
                                            <select id='create_product_input' value={stock} onChange={(e) => setStock(e.target.value)} name="stock">
                                                <option value="">Choose Stock</option>
                                                <option value="available">Available</option>
                                                <option value="notAvailable">Not Available</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="create_product_btn">
                                        <button disabled={updateLoading ? true : false || stock === "" ? true : false} type='submit'>Update Stock</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default UpdateStock