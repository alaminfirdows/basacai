import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { forgotAction, clearErrors } from "../../redux/action/userAction"

function ForgotPassword({ history }) {
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()
    const { error, success } = useSelector(state => state.password)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotAction(email))
    }


    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Please check your email address!")
        }
    }, [error, dispatch, success])
    return (
        <>
            <div className="login_page">
                <div className="log_container">
                    <div className='log_left'>
                        <div className="log_header">
                            <h1>Forgot Password</h1>
                        </div>
                        <form className='log_form' onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="log_btn">
                                <button type='submit'>Forgot Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword