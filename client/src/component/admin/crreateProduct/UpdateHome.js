import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getHomeDetails, updateHome, clearErrors } from "../../../redux/action/homeAction"
import HomeConstats from '../../../redux/constants/homeConstants'
import { useParams } from "react-router-dom"
import Loading from "../../utils/loader/Loading"
import Union from '../../home/Union'

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
const initialState = {
    family: "",
    bachelor: "",
    smallfamily: "",
    onlyboysStudent: "",
    onlygirlStudent: "",
    onlymen: "",
    onlywomen: "",
    menEmployee: "",
    womenemployee: ""
}
function UpdateHome({ history }) {
    const [data, setData] = useState(initialState)
    const [price, setPrice] = useState(0)
    const [advanced, setAdvanced] = useState(0)
    const [address, setAddress] = useState("")
    const [totalFloor, setTotalFloor] = useState(0)
    const [flatNum, setFlatNum] = useState(0)
    const [BedRoom, setBedRoom] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [totalbathroom, setTotalbathroom] = useState(0)

    const [kitchen, setKitchen] = useState(0)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(0)
    const [date, setDate] = useState("")
    const [oldImages, setOldImages] = useState([])

    const [upazila, setUpazila] = useState("")
    const [union, setUnion] = useState("")

    const [velkhani, setVelkhani] = useState(0)
    const [drawingRoom, setDrawingRoom] = useState(0)
    const [atachbathroom, setAtachbathroom] = useState(0)
    const [commonbathroom, setCommonbathroom] = useState(0)

    const { family, bachelor, smallfamily, onlyboysStudent, onlygirlStudent, onlymen, onlywomen, menEmployee, womenemployee } = data

    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const { isUpdated, error, loading: updateLoading } = useSelector(state => state.homeDeUp)
    const { home, loading, error: detailError } = useSelector(state => state.homeDetails)


    const dispatch = useDispatch()
    const params = useParams()

    const id = params.id

    const categories = [
        {
            name: "ফ্ল্যাট ভাড়া",
            value: "flat"
        },
        {
            name: "সিট ভাড়া",
            value: "seat",
        },
        {
            name: "সাবলেট",
            value: "sublet"
        }
    ];


    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("price", price);
        myForm.set("name", name);
        myForm.set("phone", phone);
        myForm.set("advanced", advanced);
        myForm.set("address", address);
        myForm.set("totalFloor", totalFloor);
        myForm.set("flatNum", flatNum);
        myForm.set("BedRoom", BedRoom);
        myForm.set("description", description);
        myForm.set("totalbathroom", totalbathroom);

        myForm.set("kitchen", kitchen);

        myForm.set("date", date);
        myForm.set("upazila", upazila)
        myForm.set("union", union)

        myForm.set("velkhani", velkhani)
        myForm.set("drawingRoom", drawingRoom)
        myForm.set("atachbathroom", atachbathroom)
        myForm.set("commonbathroom", commonbathroom)
        myForm.set("family", family)
        myForm.set("bachelor", bachelor)
        myForm.set("smallfamily", smallfamily)
        myForm.set("onlyboysStudent", onlyboysStudent)
        myForm.set("onlygirlStudent", onlygirlStudent)
        myForm.set("onlymen", onlymen)
        myForm.set("onlywomen", onlywomen)
        myForm.set("menEmployee", menEmployee)
        myForm.set("womenemployee", womenemployee)

        myForm.set("category", category);

        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(updateHome(id, myForm))
    }


    const handleimagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setOldImages([])
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result])
                    setImagesPreview((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const handleChange = (e) => {
        // setData([...data])
        // defaultChecked
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }


    useEffect(() => {
        if (detailError) {
            window.alert(detailError)
            dispatch(clearErrors())
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors)
        }
        if (home && home._id !== id) {
            dispatch(getHomeDetails(id))
        } else {
            setPrice(home.price)
            setAdvanced(home.advanced)
            setAddress(home.address)
            setTotalFloor(home.totalFloor)
            setFlatNum(home.flatNum)
            setBedRoom(home.BedRoom)
            setDescription(home.description)
            setCategory(home.category)
            setTotalbathroom(home.totalbathroom)
            setKitchen(home.kitchen)
            setName(home.name)
            setPhone(home.phone)
            setOldImages(home.images)
            setDate(String(home.date).substr(0, 10))

            setUpazila(home.upazila)
            setUnion(home.union)
            setVelkhani(home.velkhani)
            setDrawingRoom(home.drawingRoom)
            setAtachbathroom(home.atachbathroom)
            setCommonbathroom(home.commonbathroom)


        }
        if (isUpdated) {
            window.alert("Updated post successfully")
            history.push("/dashboard")
            dispatch({ type: HomeConstats.UPDATE_PRODUCT_RESET })
        }
    }, [detailError, dispatch, id, home, isUpdated, error, history])

    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="new_product_section">
                        <div className="create_product">
                            <div className='new_product'>
                                <h1>Update Post page</h1>
                                {
                                    updateLoading ? <Loading /> : (
                                        <form encType='multipart/form-data' onSubmit={handleSubmit} className="new_product_form">
                                            <div>
                                                <label htmlFor="totalfloor">মালিকের নাম : </label>
                                                <input id="create_product_input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='মালিকের নাম ' required />
                                            </div>
                                            <div>
                                                <label htmlFor="phone">মালিকের মোবাইল নম্বর :</label>
                                                <input type="number" id="create_product_input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='মালিকের মোবাইল নম্বর' required />
                                            </div>
                                            <div>
                                                <label htmlFor="upazilas">উপজেলা</label>
                                                <select name="" id="create_product_input" value={upazila} onChange={(e) => setUpazila(e.target.value)}>
                                                    <option value=""> উপজেলা</option>
                                                    {
                                                        upazilaOfName.map((item) => (
                                                            <option key={Math.random()} value={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className='unionSelect'>
                                                <label htmlFor="">ইউনিয়ন</label>
                                                <Union union={union} setUnion={setUnion} upazilla={upazila} />
                                            </div>
                                            <div>
                                                <label htmlFor="phone">ভাড়া শুরু হওয়ার তারিখ  :</label>
                                                <input type="date" id="create_product_input" value={date} onChange={(e) => setDate(e.target.value)} placeholder='মালিকের মোবাইল নম্বর' required />
                                            </div>
                                            <div>
                                                <label htmlFor="category">আপনি কি ভাড়া দিতে চান</label>
                                                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} id="create_product_input">
                                                    <option value=""> টাইপ</option>
                                                    {
                                                        categories.map((cate, index) => (
                                                            <option key={Math.random()} value={cate.value}>{cate.name}</option>
                                                        ))
                                                    }

                                                </select>
                                            </div>
                                            <div>
                                                {category && <label htmlFor="">আপনি কাদের কাছে ভাড়া দিতে চান</label>}
                                                {
                                                    category && category === "flat" ?
                                                        (
                                                            <>
                                                                <div className="typeofCard">

                                                                    <input type="checkbox" id="toppings" name="family" defaultChecked={home.family} value="family" onChange={handleChange} /> <span>ফ্যামিলি</span>
                                                                    <input type="checkbox" id="toppings" name="bachelor" value="bachelor" defaultChecked={home.bachelor} onChange={handleChange} /> <span>ব্যাচেলর</span>
                                                                </div>
                                                            </>
                                                        ) : null
                                                }
                                                {
                                                    category && (category === "seat" || category === "sublet" ?
                                                        (
                                                            <>
                                                                <div className="typeofCard">

                                                                    <input type="checkbox" id="topping" name="family" defaultChecked={home.family} onChange={handleChange} value="family" />ফ্যামিলি
                                                                    <input type="checkbox" id="topping" name="bachelor" defaultChecked={home.bachelor} onChange={handleChange} value="bachelor" />ব্যাচেলর
                                                                    <input type="checkbox" id="topping" name="smallfamily" defaultChecked={home.smallfamily} onChange={handleChange} value="smallfamily" />ছোট ফ্যামিলি
                                                                    <input type="checkbox" id="topping" name="onlyboysStudent" defaultChecked={home.onlyboysStudent} onChange={handleChange} value="onlyboysStudent" />শুধুমাত্র ছাত্র
                                                                    <input type="checkbox" id="topping" name="onlygirlStudent" onChange={handleChange} defaultChecked={home.onlygirlStudent} value="onlygirlStudent" />শুধুমাত্র ছাত্রী
                                                                    <input type="checkbox" id="topping" name="onlymen" onChange={handleChange} defaultChecked={home.onlymen} value="onlymen" />শুধুমাত্র পুরুষ
                                                                    <input type="checkbox" id="topping" name="onlywomen" onChange={handleChange} defaultChecked={home.onlywomen} value="onlywomen" />শুধুমাত্র মহিলা
                                                                    <input type="checkbox" id="topping" name="menEmployee" onChange={handleChange} defaultChecked={home.menEmployee} value="menEmployee" />পুরুষ চাকরীজীবী
                                                                    <input type="checkbox" id="topping" name="womenemployee" onChange={handleChange} defaultChecked={home.womenemployee} value="womenemployee" />মহিলা চাকরীজীবী



                                                                </div>
                                                            </>
                                                        ) : null
                                                    )
                                                }
                                            </div>
                                            <div className="inputNum">
                                                <div>
                                                    <label htmlFor="price">ভাড়ার পরিমান :</label>
                                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id='' placeholder="প্রতি  মাসের ভাড়া " required />
                                                </div>
                                                <div>
                                                    <label htmlFor="">অগ্রিম ভাড়া </label>
                                                    <input type="number" value={advanced} onChange={(e) => setAdvanced(e.target.value)} placeholder='অগ্রিম ভাড়া' required />
                                                </div>
                                                <div>
                                                    <label htmlFor="totalfloor">মোট তলা </label>
                                                    <input type="number" value={totalFloor} onChange={(e) => setTotalFloor(e.target.value)} placeholder='মোট তলা' required />
                                                </div>
                                                <div>
                                                    <label htmlFor="totalfloor">ফ্ল্যাটের অবস্থান :</label>
                                                    <input type="number" id='' value={flatNum} onChange={(e) => setFlatNum(e.target.value)} placeholder="ফ্ল্যাটের অবস্থান" name="totalfloor" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="">মোট বেড রুম</label>
                                                    <input type="number" value={BedRoom} onChange={(e) => setBedRoom(e.target.value)} placeholder='মোট বেড রুম' required />
                                                </div>
                                                <div>
                                                    <label htmlFor="stock">মোট  বাথরুম :</label>
                                                    <input type="number" id='' value={totalbathroom} onChange={(e) => setTotalbathroom(e.target.value)} placeholder="ওয়াস রুম" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="stock">সংযুক্ত বাথরুম :</label>
                                                    <input type="number" id='' value={atachbathroom} onChange={(e) => setAtachbathroom(e.target.value)} placeholder="ওয়াস রুম" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="stock">সাধারণ বাথরুম :</label>
                                                    <input type="number" id='' value={commonbathroom} onChange={(e) => setCommonbathroom(e.target.value)} placeholder="ওয়াস রুম" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="">রান্না ঘর </label>
                                                    <input type="number" value={kitchen} onChange={(e) => setKitchen(e.target.value)} placeholder='রান্না ঘর ' required />
                                                </div>
                                                <div>
                                                    <label htmlFor="">বারান্দা </label>
                                                    <input type="number" value={velkhani} onChange={(e) => setVelkhani(e.target.value)} placeholder='বারান্দা' />
                                                </div>
                                                <div>
                                                    <label htmlFor="">ড্রয়িং রুম</label>
                                                    <input type="number" value={drawingRoom} onChange={(e) => setDrawingRoom(e.target.value)} placeholder='ড্রয়িং ঘর ' />
                                                </div>

                                            </div>
                                            <div>
                                                <label htmlFor="description">Description</label>
                                                <textarea name="" id="" cols="30" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" placeholder='Product Description' ></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="">এলাকা:</label>
                                                <textarea name="" value={address} onChange={(e) => setAddress(e.target.value)} id="" cols="30" rows="5" placeholder='যেমন : ভাওয়াল মির্জাপুর বাজার পাইনশাইল রোড শম্পা মডেল স্কুলের সামনে হাজীবাড়ি মসজিদের দক্ষিণ সাইডে মেইন রাস্তার ডাইন সাইডে, Gazipur Sadar' ></textarea>
                                            </div>
                                            <div className='avatar'>
                                                <label htmlFor="avatar">Product picture :</label>
                                                <div>
                                                    <input type="file" name="avatar" onChange={handleimagesChange} accept="image/*" multiple />
                                                </div>
                                            </div>
                                            <div id='imagesShow'>
                                                {
                                                    oldImages && oldImages.map((image, index) => (
                                                        <img key={index} src={image.url} alt="Product details" />
                                                    ))
                                                }
                                                {
                                                    imagesPreview && imagesPreview.map((image, index) => (
                                                        <img key={index} src={image} alt="House" />
                                                    ))
                                                }
                                            </div>
                                            <div className="create_product_btn">
                                                <button type='submit'>Update Post</button>
                                            </div>
                                        </form>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UpdateHome