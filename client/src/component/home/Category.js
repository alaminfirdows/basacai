import React, { useEffect } from 'react'
import icon1 from "./icons/bed.svg"
import icon2 from "./icons/boy.svg"
import icon3 from "./icons/building.svg"
import icon4 from "./icons/business-man.svg"
import icon5 from "./icons/business-woman.svg"
import icon6 from "./icons/family.svg"
import icon7 from "./icons/family-small.svg"
import icon8 from "./icons/female.svg"
import icon9 from "./icons/girl.svg"
import icon10 from "./icons/home.svg"
import icon11 from "./icons/male.svg"
import { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getAllhomes, clearErrors } from "../../redux/action/homeAction"

const data = [
    {
        id: 4,
        img: icon2,
        name: "ব্যাচেলর",
        value: "bachelor"
    },
    {
        id: 5,
        img: icon6,
        name: "ফ্যামিলি",
        value: "family"
    },
    {
        id: 6,
        img: icon7,
        name: "ছোট ফ্যামিলি",
        value: "smallfamily"
    },
    {
        id: 7,
        img: icon2,
        name: "শুধুমাত্র ছাত্র",
        value: "onlyboysStudent"
    },
    {
        id: 8,
        img: icon9,
        name: "শুধুমাত্র ছাত্রী",
        value: "onlygirlStudent"
    },
    {
        id: 9,
        img: icon11,
        name: "শুধুমাত্র পুরুষ",
        value: "onlymen"
    },
    {
        id: 10,
        img: icon8,
        name: "শুধুমাত্র মহিলা",
        value: "onlywomen"
    },
    {
        id: 11,
        img: icon4,
        name: "পুরুষ চাকরীজীবী",
        value: "menEmployee"
    },
    {
        id: 12,
        img: icon5,
        name: "মহিলা চাকরীজীবী",
        value: "womenemployee"
    },
]
const list = [
    {
        id: 1,
        img: icon3,
        name: "ফ্ল্যাট",
        value: "flat",
    },
    {
        id: 2,
        img: icon1,
        name: "সিট",
        value: "seat"
    },
    {
        id: 3,
        img: icon10,
        name: "সাবলেট",
        value: "sublet"
    },
]
function Category() {
    const [categories] = useState(data)
    const [lists] = useState(list)
    const { error, homesCount } = useSelector(state => state.homes)

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(getAllhomes())
    }, [dispatch, error])
    return (
        <>
            <div className="categorySection">
                <div className="container">
                    <div className='category_title'>
                        <h2>জনপ্রিয় ক্যাটেগরি</h2>
                        <p>১২+ ক্যাটেগরিতে রয়েছে {homesCount} টি বিজ্ঞাপন</p>
                    </div>
                    <div className="category_container">
                        {
                            lists && lists.map((item) => (
                                <Link to={`/home/category/${item.value}`} className='category_card' key={item.id}>
                                    <img src={item.img} alt="" />
                                    <p>{item.name}</p>
                                </Link>
                            ))
                        }
                        {
                            categories && categories.map((category) => (
                                <Link to={`/home/category/${category.value}`} className='category_card' key={category.id}>
                                    <img src={category.img} alt="Icon" />
                                    <p>{category.name}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default Category