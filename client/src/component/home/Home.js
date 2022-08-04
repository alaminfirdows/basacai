import React from 'react'
import Category from './Category'
import Carousel from "react-material-ui-carousel"
import { getSubAdminUsers, clearErrors } from "../../redux/action/userAction"
import { getBanner, getAddsBanner } from "../../redux/action/homeAction"
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/loader/Loading"
import News from './news/News'
import { useState } from 'react'
import Union from './Union'
import { FcSearch } from 'react-icons/fc';
import OwnerProfile from './OwnerProfile'
import { getAllhomes } from "../../redux/action/homeAction"


const upazilaOfName = [
    "কক্সবাজার সদর",
    "ঈদগাঁও",
    "উখিয়া",
    "কুতুবদিয়া",
    "চকরিয়া",
    "টেকনাফ",
    "পেকুয়া",
    "মহেশখালী",
    "রামু",
]

function Home() {
    const { users, error, loading } = useSelector(state => state.users)
    const { error: bannerError, banner, adds } = useSelector(state => state.getAdds)
    const { homesCount } = useSelector(state => state.homes)

    const [upazila, setUpazila] = useState("")
    const [union, setUnion] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (bannerError) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(getSubAdminUsers())
        dispatch(getBanner())
        dispatch(getAddsBanner())
        dispatch(getAllhomes())
    }, [error, dispatch, bannerError])

    return (
        <div className='home'>
            <div className="container">
                <div className="banner_card">
                    <Carousel interval={2000} animation="slide">
                        {
                            banner && banner.map((item) => (
                                <img src={item.banner.url} key={item._id} alt="" />
                            ))
                        }
                    </Carousel>
                </div>

            </div>
            <div className="searchSection">
                <div className="container">
                    <div className='search_card'>
                        <div>
                            <h2>বাসা খোঁজার সবচেয়ে সহজ উপায়</h2>
                            <p>{homesCount} টি বিজ্ঞাপন থেকে আপনার পছন্দের বাসাটি এখনি খুঁজুন</p>
                        </div>
                        <div className='searchForm'>
                            <div>
                                <FcSearch />
                                <input type="text" placeholder='flat,seat,sublet' />
                            </div>
                            <select name="" id="" value={upazila} onChange={(e) => setUpazila(e.target.value)}>
                                <option value="">উপজেলা</option>
                                {
                                    upazilaOfName.map((item) => (
                                        <option key={Math.random()} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                            <Union union={union} setUnion={setUnion} upazilla={upazila} />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <Category />
            {
                loading ? <Loading /> :
                    <OwnerProfile users={users} />
            }
            
            <News />
            <div className="container">
                <div className="banner_card" id="addsCard">
                    <Carousel interval={2000} animation="slide">
                        {
                            adds && adds.map((item) => (
                                <img src={item.adds.url} key={item._id} alt="" />
                            ))
                        }
                    </Carousel>
                </div>

            </div>
           
        </div>
    )
}

export default Home