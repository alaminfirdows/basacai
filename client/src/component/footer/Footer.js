import React from 'react'
import { MdFacebook, MdEmail } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import { TiArrowRight } from 'react-icons/ti';
import { FaTwitterSquare, FaGooglePlusSquare, FaLinkedinIn, FaPhone} from 'react-icons/fa';
import { Link } from "react-router-dom"

function Footer() {
    return (
        <>
            <div className="subscribeSection">
                <div className="container">
                    <div className="subscribeCard">                   
                    </div>
                </div>
            </div>
            <footer className="footer_page">
                <div className="container">
                    <div className="footerWrapper">
                        <div className="footerLeft">
                            <h3>আমাদের সম্পর্কে</h3>
                            <p>বাসা, অফিস, ফ্ল্যাট ভাড়া খুজার একটি অনলাইন মাধ্যম । খুব সহজেই এখনই খুজে নিন আপনার নতুন বাসা-বাড়ি ও অফিস সমূহ।</p>
                            <div className="socialIcon">
                                <Link to="#"><MdFacebook /></Link>
                                <Link to="#"><FaTwitterSquare /></Link>
                                <Link to="#"><FaGooglePlusSquare /></Link>
                                <Link to="#"><FaLinkedinIn /></Link>
                            </div>
                        </div>
                        <div className="footerMiddle">
                            <h3>যোগাযোগ করুন</h3>
                            <div>
                                <p><IoHome />কলাতলী হোটেল সি প্যালেস, মেইন  রোড,কক্সবাজার।</p>
                            </div>
                            <div>
                                <p><FaPhone /> <span>+880 1936369984</span></p>
                            </div>
                            <div>
                                <p><MdEmail /><span>basacaidotcom@gmail.com</span></p>
                            </div>
                        </div>
                        <div className="footerRight">
                            <h3>useful links</h3>
                            <p><TiArrowRight /> <Link to="/">Home</Link></p>
                            <p><TiArrowRight /> <Link to="/about">About Us</Link></p>
                            <p><TiArrowRight /> <Link to="/service">Service</Link></p>
                            <p><TiArrowRight /> <Link to="/news">News</Link></p>
                        </div>
                    </div>
                </div>
                <div className="copyRightContainer">
                    <div className="container">
                        <div className="copyRightWrapper">
                            <div>
                                <p>© Copyright 2022 basaCai.info All rights reserved.</p>
                            </div>
                            <div>
                                <ul className="copyRightMenu">
                                    <li><Link to="#">FAQS</Link></li>
                                    <li><Link to="#">Privacy</Link></li>
                                    <li><Link to="#">Policy</Link></li>
                                    <li><Link to="#">Support</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer