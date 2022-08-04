import React from 'react'
import { FaMobileAlt } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { BsHeadset } from 'react-icons/bs';
import { contactAction, clearErrors } from "../../redux/action/userAction"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../utils/loader/Loading';


function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const { error, success, loading } = useSelector(state => state.password)


    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("message", message)
        dispatch(contactAction(myForm))
    }
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Message send successfully")
        }
        if (!success) {
            setName("")
            setEmail("")
            setMessage("")
        }
    }, [error, success, dispatch])

    return (
        <div className="contactSection">
            <div className="contactImage">
                <div>
                    <h1>যোগাযোগ</h1>
                </div>
            </div>
            <div className="contact_container">
                <div className="contactIcon">
                    <div>
                        <FaMobileAlt />
                        <h5>Call Us</h5>
                        <p>+880 1936369984</p>
                    </div>
                    <div>
                        <IoLocationOutline />
                        <h5>Visit Us</h5>
                        <p>কলাতলী হোটেল সি প্যালেস , মেইন  রোড ,কক্সবাজার।</p>
                    </div>
                    <div>
                        <AiOutlineMail />
                        <h5>Mail Us</h5>
                        <p>basacaidotcom@gmail.com</p>
                    </div>
                    <div>
                        <BsHeadset />
                        <h5>Live Chat</h5>
                        <p>Chat with Us 24/7</p>
                    </div>
                </div>
                {
                    loading ? <Loading /> :
                        <form onSubmit={handleSubmit} action="" className='contact_form'>
                            <h2>Ready to get started ?</h2>
                            <div>
                                <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div>
                                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <textarea name="" id="" placeholder='Message' cols="30" rows="6" value={message} required onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            <button type='submit'>Send message</button>
                        </form>
                }
            </div>
        </div>
    )
}

export default Contact