import React from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogOut } from "../../redux/action/userAction"
import logo from "./whitelogo.jpg"
import Loading from '../utils/loader/Loading'
function Navbar() {
    const { isAuthenticated, user ,loading} = useSelector(state => state.user)
    const dispatch = useDispatch()


    const logoutHandle = () => {
        if (window.confirm("Are you sure want to sign out ?")) {
            dispatch(userLogOut())
        }
    }

    return (
        <>
            <div className="navbar">
                <div className="container">
                    <div className="nav_container">
                        <Link to="/" className="logo"><img src={logo} alt="" /></Link>

                        <div className="nav_menu">
                            <ul>
                                <li><Link to="/all_homes">সকল বিজ্ঞাপন</Link></li>
                                <li><Link to="/contact">যোগাযোগ</Link></li>
                                {
                                    user && user.role === "admin" ? <>
                                        <li><Link to="/dashboard">ড্যাশবোর্ড</Link></li>
                                    </> : null
                                }
                                {
                                    user && user.role === "subAdmin" ? <>
                                        <li><Link to="/sub_dashboard">ড্যাশবোর্ড</Link></li>
                                    </> : null
                                }
                                {
                                    isAuthenticated ? <li onClick={logoutHandle}><Link to="/">লগ আউট</Link></li> : <li><Link to="/login">লগ ইন</Link></li>
                                }

                                {/* {
                                    isAuthenticated &&
                                    <li className='nav_img'>
                                        <Link to="/profile">
                                            {
                                                loading ? <Loading/> :
                                                <>
                                                <img src={user.avatar && user.avatar.url} alt="Profile" />
                                                <p>{user.name}</p>
                                                </>
                                            }
                                        </Link>
                                    </li>
                                } */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar