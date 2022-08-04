import React from 'react'
import { MdOutlineDashboard, MdAdd, MdOutlinePostAdd, } from 'react-icons/md';
import { Link } from "react-router-dom"


const Slide = () => {
    return (
        <>
            <div className="admin_slide">
                <ul className="admin_silde_menu">
                    <li> <Link to="/sub_dashboard"><MdOutlineDashboard /> <p>Dashboard</p></Link> </li>
                    <li><Link to="/subAdmin/allPost"><MdOutlinePostAdd /> <p>All post</p></Link> </li>
                    <li><Link to="/subAdmin/newPost"><MdAdd /> <p>New Post</p> </Link></li>
                </ul>
            </div>
        </>
    )
}

export default Slide