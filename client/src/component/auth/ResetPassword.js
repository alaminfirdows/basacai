import React, { useEffect, useState } from 'react'
import { resetAction, clearErrors } from "../../redux/action/userAction"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../utils/loader/Loading';
import { useParams } from "react-router-dom"

const initialState = {
    password: "",
    confirmPassword: ""
}

function ResetPassword({ history }) {
    const [data, setData] = useState(initialState)

    const { password, confirmPassword } = data;

    const dispatch = useDispatch()
    const { error, loading, success } = useSelector(state => state.password)

    const params = useParams()
    const token = params.token

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(password === confirmPassword)) {
            window.alert("Password does not match")
        }
        dispatch(resetAction(password, token))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Your password reset successfully")
            history.push("/login")
        }
    }, [error, success, dispatch, history])
    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="login_page">
                        <div className="log_container">
                            <div className='log_left'>
                                <div className="log_header">
                                    <h1>Reset Password</h1>
                                </div>
                                <form className='log_form' onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="password">New Password</label>
                                        <input type="password" placeholder='Enter New password' value={password} onChange={handleChange} name="password" required />
                                    </div>
                                    <div>
                                        <label htmlFor="cf_password">Confirm Password</label>
                                        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleChange} name="confirmPassword" required />
                                    </div>
                                    <div className="log_btn">
                                        <button type='submit'>Reset Password</button>
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

export default ResetPassword;