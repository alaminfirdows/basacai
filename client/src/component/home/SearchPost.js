import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllhomes, clearErrors } from "../../redux/action/homeAction"
import Loading from "../utils/loader/Loading"
import { Link, useParams } from "react-router-dom"
import { useState } from 'react'


function SearchPost() {
    const { loading, error, homes } = useSelector(state => state.homes)
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    const [category, setCategory] = useState("")
    const [bachelor, setBachelor] = useState("")
    const [family, setFamily] = useState("")
    const [smallfamily, setSmallfamily] = useState("")
    const [onlyboysStudent, setOnlyboysStudent] = useState("")
    const [onlygirlStudent, setOnlygirlStudent] = useState("")
    const [onlymen, setOnlymen] = useState("")
    const [onlywomen, setOnlyWomen] = useState("")
    const [womenemployee, setWomenemployee] = useState("")

    console.log(id);
    console.log(homes);
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (id === "flat") {
            setCategory(id)
        }
        if (id === "seat") {
            setCategory(id)
        }
        if (id === "sublet") {
            setCategory(id)
        }
        if (id === "bachelor") {
            setBachelor(id)
        }
        if (id === "smallfamily") {
            setSmallfamily(id)
        }
        if (id === "family") {
            setFamily(id)
        }
        if (id === "onlyboysStudent") {
            setOnlyboysStudent(id)
        }
        if (id === "onlygirlStudent") {
            setOnlygirlStudent(id)
        }
        if (id === "onlymen") {
            setOnlymen(id)
        }
        if (id === "onlywomen") {
            setOnlyWomen(id)
        }
        if (id === "womenemployee") {
            setWomenemployee(id)
        }
        dispatch(getAllhomes(category, bachelor, smallfamily, family, onlyboysStudent, onlygirlStudent, onlymen, onlywomen, womenemployee))
    }, [dispatch, error, id, category, bachelor, family, smallfamily, onlyboysStudent, onlygirlStudent, onlymen, onlywomen, womenemployee])
    return (
        <div className="all_homes">
            <div className="container">
                <div className='home_head_line'>
                    <h3>আপনার কাঙ্খিত বাসা পছন্দ করুন</h3>

                </div>
                {
                    loading ? <Loading /> : (
                        <>
                                <div className="home_container">
                                    {
                                        homes && homes.map((item) => (
                                            <Link to={`/homeDetails/${item._id}`} id={item.stock === "notAvailable" && "borderRed"} className="home_card" key={item._id}>
                                                <p className='stockDiv'>{item.stock === "notAvailable" ? "ভাড়া হয়েগেছে" : null}</p>
                                                {
                                                    item.images &&
                                                    <img src={item.images[0].url} alt="" />
                                                }
                                                <div>
                                                    <p className='home_category'>{item.category}</p>
                                                    <p className='home_address'>{item.address}</p>
                                                    <p className='bedRoom'> বেড রুম : {item.BedRoom} টি</p>
                                                    <div className='dateInline'>
                                                        <p className='homesDate'>ভাড়া শুরু : {String(item.date).substr(0, 10)}</p>
                                                        <p className='home_price'>ভাড়া : {item.price}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                        </>
                    )
                }

            </div>
        </div>

    )
}

export default SearchPost