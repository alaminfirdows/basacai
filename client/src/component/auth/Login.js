import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { userLogin, clearErrors } from "../../redux/action/userAction"
import { Link } from 'react-router-dom'
import Loading from "../utils/loader/Loading"

function Login({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const { loading, error, isAuthenticated } = useSelector(state => state.user)

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin(email, password))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors)
        }
        if (isAuthenticated) {
            history.push("/")
        }
    }, [error, dispatch, isAuthenticated, history])
    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <div className="login_page">
                            <div className="log_container">
                                <div className='log_left'>
                                    <div className="log_header">
                                        <h1>Login form</h1>
                                    </div>
                                    <form className='log_form' onSubmit={loginSubmit} >
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                        <div className="log_btn">
                                            <button type='submit'>Login</button>
                                            <Link to="/forgot_password">Forgot Password</Link>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <span>If you don't have an acount ?</span> <Link className='rgtLink' to="/register">Register</Link>
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

export default Login