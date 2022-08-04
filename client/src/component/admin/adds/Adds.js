import React, { useEffect, useState } from 'react'
import SlideBar from '../slidebar/SlideBar'
import { useSelector, useDispatch } from "react-redux"
import { getAddsBanner, createAdds, deleteAdds, getBanner, newBannaer, deleteBanner, clearErrors } from "../../../redux/action/homeAction"
import HomeConstats from '../../../redux/constants/homeConstants'
import Loading from "../../utils/loader/Loading"
function Adds({ history }) {
    const [adds, setAdds] = useState("")
    const [banner, setBanner] = useState("")
    const [avatar, setAvatar] = useState("")
    const [bannerPrv, setBannerPrv] = useState("")

    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newAdds)
    const { error: deleteerror, bannerDeleted, isDeleted } = useSelector(state => state.homeDeUp)

    const { adds: add, banner: banners } = useSelector(state => state.getAdds)
    console.log(add, banners);

    const handleDelete = (id) => {
        dispatch(deleteAdds(id))
    }
    const bannerDelete = (id) => {
        dispatch(deleteBanner(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("adds", adds)
        dispatch(createAdds(myForm))
    }

    const bannerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("banner", banner)
        dispatch(newBannaer(myForm))
    }

    const handleChange = async (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAdds(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const bannerChange = async (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setBanner(reader.result)
                setBannerPrv(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors)
        }
        if (deleteerror) {
            window.alert(deleteerror)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("New posted a adds")
            history.push("/dashboard")
            dispatch({
                type: HomeConstats.NEW_ADDS_RESET
            })
        }
        if (isDeleted) {
            window.alert("Adds Deleted successfully")
            history.push("/dashboard")
            dispatch({
                type: HomeConstats.DELETE_ADDS_RESET
            })
        }
        if (bannerDeleted) {
            window.alert("Banner Deleted successfully")
            history.push("/dashboard")
            dispatch({
                type: HomeConstats.DELETE_BANNERR_RESET
            })
        }
        dispatch(getBanner())
        dispatch(getAddsBanner())
    }, [error, dispatch, history, success, isDeleted, deleteerror, bannerDeleted])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="addsContainer">
                        <SlideBar />
                        <div className="addPage">
                            <div className="adds_container">
                                <div className="login_page">
                                    <div className="log_container">
                                        <div className='log_left'>
                                            <div className="log_header">
                                                <h1>New Adds Add</h1>
                                            </div>
                                            <form className='log_form' onSubmit={handleSubmit}>
                                                <div className='avatar'>
                                                    <label htmlFor="avatar">New Adds :</label>
                                                    <div>
                                                        <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                                                    </div>
                                                    {
                                                        avatar && <img className='addsShowImg' src={avatar && avatar} alt="" />
                                                    }
                                                </div>
                                                <div className="log_btn">
                                                    <button type='submit'>Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="addsImg">
                                    {
                                        add && add.map((item) => (
                                            <div className='addsImgCard' key={item._id}>
                                                <img src={item.adds.url} alt="" />
                                                <span onClick={() => handleDelete(item._id)}>X</span>
                                            </div>
                                        ))

                                    }
                                </div>
                            </div>
                            <div className="bannerContainer">
                                <div className="login_page">
                                    <div className="log_container">
                                        <div className='log_left'>
                                            <div className="log_header">
                                                <h1>New Banner Add</h1>
                                            </div>
                                            <form className='log_form' onSubmit={bannerSubmit}>
                                                <div className='avatar'>
                                                    <label htmlFor="avatar">New Banner :</label>
                                                    <div>
                                                        <input type="file" name="avatar" onChange={bannerChange} accept="image/*" />
                                                    </div>
                                                    {
                                                        bannerPrv && <img className='addsShowImg' src={bannerPrv && bannerPrv} alt="" />
                                                    }
                                                </div>
                                                <div className="log_btn">
                                                    <button type='submit'>Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {
                                    <div className="addsImg">
                                        {
                                            banners && banners.map((item) => (
                                                <div className='addsImgCard' key={item._id}>
                                                    <img src={item.banner.url} alt="" />
                                                    <span onClick={() => bannerDelete(item._id)}>X</span>
                                                </div>
                                            ))

                                        }
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}

export default Adds