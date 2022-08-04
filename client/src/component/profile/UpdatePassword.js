import React, { useEffect, useState } from 'react'
import { changePassword, clearErrors } from "../../redux/action/userAction"
import { useDispatch, useSelector } from "react-redux"
import UserConstants from "../../redux/constants/userConstants";
import Loading from '../utils/loader/Loading';

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
}

function UpdatePassword({ history }) {
    const [data, setData] = useState(initialState)
    const { oldPassword, newPassword, confirmPassword } = data;

    const dispatch = useDispatch()
    const { error, loading, isUpdated } = useSelector(state => state.profile)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(changePassword(oldPassword, newPassword, confirmPassword))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            window.alert("Your password updated successfully")
            history.push("/profile")
            dispatch({
                type: UserConstants.UPDATE_PASSWORD_RESET
            })
        }
    }, [error, isUpdated, dispatch, history])
    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <div className="login_page">
                            <div className="log_container">
                                <div className='log_left'>
                                    <div className="log_header">
                                        <h1>Update Password</h1>
                                    </div>
                                    <form className='log_form' onSubmit={handleSubmit} >
                                        <div>
                                            <label htmlFor="oldPassword">Old Password</label>
                                            <input type="password" placeholder='Old password' value={oldPassword} name="oldPassword" onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="password">New Password</label>
                                            <input type="password" placeholder='Enter your password' value={newPassword} name='newPassword' onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="newPassword">New Password</label>
                                            <input type="password" placeholder='confirmPassword' value={confirmPassword} name="confirmPassword" onChange={handleChange} required />
                                        </div>

                                        <div className="log_btn">
                                            <button type='submit'>Update Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default UpdatePassword;