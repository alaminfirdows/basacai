import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { userRegister, clearErrors } from "../../redux/action/userAction"
import Loading from '../utils/loader/Loading'

const intialState = {
    name: "",
    email: "",
    password: "",
    cf_password: ""
}
function Register({ history }) {
    const [data, setData] = useState(intialState)
    const [avatar, setAvatar] = useState("")
    const [avatarPrev] = useState("https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg")

    const dispatch = useDispatch()
    const { loading, error, isAuthenticated } = useSelector(state => state.user)

    const { name, email, password, cf_password } = data

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(password === cf_password)) {
            window.alert("Password did not match")
        } else {
            const myForm = new FormData()
            myForm.set("name", name)
            myForm.set("email", email)
            myForm.set("password", password)
            myForm.set("avatar", avatar)

            dispatch(userRegister(myForm))
        }
    }
    const handleChange = async (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        } else {
            const { name, value } = e.target;
            setData({ ...data, [name]: value })
        }
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
                loading ? <Loading /> : (
                    <div className="login_page">
                        <div className="log_container">
                            <div className='log_left'>
                                <div className="log_header">
                                    <h1>Register form</h1>
                                </div>
                                <form className='log_form' onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name='name' value={name} placeholder='Enter your Name' onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" placeholder='Enter your email address' name='email' value={email} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" placeholder='Enter your password' value={password} onChange={handleChange} name="password" required />
                                    </div>
                                    <div>
                                        <label htmlFor="cf_password">Confirm Password</label>
                                        <input type="password" placeholder='Confirm Password' value={cf_password} onChange={handleChange} name="cf_password" required />
                                    </div>
                                    <div className='avatar'>
                                        <label htmlFor="avatar">Profile picture :</label>
                                        <div>
                                            <img src={avatar ? avatar : avatarPrev} alt="profile" />
                                            <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="log_btn">
                                        <button type='submit'>Submit</button>
                                        <Link to="/forgot_password">Forgot Password</Link>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <span>If you have an acount ?</span> <Link className='rgtLink' to="/login">Login</Link>
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

export default Register