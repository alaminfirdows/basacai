import React from 'react'
import { MdImportExport, MdOutlineDashboard, MdAdd, MdOutlinePostAdd, MdOutlinePeople, MdOutlineRateReview } from 'react-icons/md';
import { Link } from "react-router-dom"
import {TiNews } from 'react-icons/ti';



const SlideBar = () => {
    return (
        <>
            <div className="admin_slide">
                <ul className="admin_silde_menu">
                    <li> <Link to="/dashboard"><MdOutlineDashboard /> <p>Dashboard</p></Link> </li>
                    <li><Link to="/admin/homes"><MdOutlinePostAdd /> <p>All post</p></Link> </li>
                    <li><Link to="/newProduct"><MdAdd /> <p>New Post</p> </Link></li>
                    <li><Link to="/create/news"><MdAdd /> <p>News</p> </Link></li>
                    <li><Link to="/admin/news"><TiNews /> <p>All news</p></Link> </li>
                    <li> <Link to="/admin/adds"><MdImportExport /> <p>Ads</p></Link> </li>
                    <li> <Link to="/admin/users"><MdOutlinePeople /> <p>Users</p></Link> </li>
                    <li> <Link to="/admin/reviews"><MdOutlineRateReview /> <p>Reviews</p></Link> </li>
                </ul>
            </div>
        </>
    )
}

export default SlideBar