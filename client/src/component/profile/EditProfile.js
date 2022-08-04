import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/loader/Loading"
import { profileAction, clearErrors, loadUser } from "../../redux/action/userAction"
import UserConstants from '../../redux/constants/userConstants';
import { Rating } from "@material-ui/lab"


function EditProfile({ history }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [address, setAddress] = useState("")
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")

    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user)

    const { isUpdated, error } = useSelector(state => state.profile)


    const handleChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        myForm.set("address", address);
        myForm.set("rating", rating);
        myForm.set("description", description);
        dispatch(profileAction(myForm))
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url);
            setRating(user.rating)
            setAddress(user.address)
            setDescription(user.description)
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            window.alert("Profile updated successfully")

            dispatch(loadUser())

            history.push("/profile")

            dispatch({
                type: UserConstants.UPDATE_PROFILE_RESET
            })
        }
    }, [user, dispatch, isUpdated, history, error])




    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="login_page">
                        <div className="log_container">
                            <div className='log_left'>
                                <div className="log_header">
                                    <h1>Edit Profile</h1>
                                </div>
                                <form className='log_form' onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name='name' value={name} placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" placeholder='Enter your email address' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    {
                                        user.role === "subAdmin" ?
                                            <>
                                                <Rating
                                                    onChange={(e) => setRating(e.target.value)}
                                                    value={rating}
                                                    size="large"
                                                    name="rating"
                                                />
                                                <div>
                                                    <label htmlFor="address">Address</label>
                                                    <input type="text" name='name' value={address} placeholder='Enter your Address' onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                                <div className='editDescription'>
                                                    <label htmlFor="description">Description</label>
                                                    <textarea name="" id="" cols="30" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" placeholder='Product Description' ></textarea>
                                                </div>
                                            </> : null
                                    }

                                    <div className='avatar'>
                                        <label htmlFor="avatar">Profile picture :</label>
                                        <div>
                                            <img src={avatarPreview} alt="profile" />
                                            <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="log_btn">
                                        <button type='submit'>Update</button>
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

export default EditProfile