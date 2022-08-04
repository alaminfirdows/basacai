import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createHome, clearErrors } from "../../../redux/action/homeAction"
import HomeConstats from '../../../redux/constants/homeConstants'
import SlideBar from '../slidebar/SlideBar'
import Loading from '../../utils/loader/Loading'
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
function NewHome({ history }) {
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
    const [upazila, setUpazila] = useState("")
    const [union, setUnion] = useState("")

    const [velkhani, setVelkhani] = useState(0)
    const [drawingRoom, setDrawingRoom] = useState(0)
    const [atachbathroom, setAtachbathroom] = useState(0)
    const [commonbathroom, setCommonbathroom] = useState(0)


    const [family, setFamily] = useState("")
    const [bachelor, setBachelor] = useState("")
    const [smallfamily, setSmallfamily] = useState("")
    const [onlyboysStudent, setOnlyboysStudent] = useState("")
    const [onlygirlStudent, setOnlygirlStudent] = useState("")
    const [onlymen, setOnlymen] = useState("")
    const [onlywomen, setOnlywomen] = useState("")
    const [menEmployee, setMenEmployee] = useState("")
    const [womenemployee, setWomenemployee] = useState("")


    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const { success, loading, error } = useSelector(state => state.newHome)
    const dispatch = useDispatch()
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
        dispatch(createHome(myForm))
    }


    const handleimagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
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


    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Create a product")
            history.push("/")
            dispatch({ type: HomeConstats.NEW_PRODUCT_RESET })
        }
    }, [error, success, dispatch, history])

    return (
        <>
            <div className="new_product_section">
                <SlideBar />
                <div className="create_product">
                    <div className='new_product'>
                        <h1>Create Post page</h1>
                        {
                            loading ? <Loading /> : (
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
                                        {category && <label htmlFor="category">আপনি কাদের কাছে ভাড়া দিতে চান</label>}
                                        {
                                            category && category === "flat" ?
                                                (
                                                    <>
                                                        <div className="typeofCard">
                                                            <div className="topping">
                                                                <input type="checkbox" id="topping" name="topping" value="family" onChange={(e) => setFamily(e.target.value)} /> <span>ফ্যামিলি</span>
                                                            </div>
                                                            <div className="topping">
                                                                <input type="checkbox" id="topping" name="topping" value="bachelor" onChange={(e) => setBachelor(e.target.value)} /> <span>ব্যাচেলর</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : null
                                        }
                                        {
                                            category && (category === "seat" || category === "sublet" ?
                                                (
                                                    <>
                                                        <div className="typeofCard">
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setFamily(e.target.value)} value="family" />ফ্যামিলি
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setBachelor(e.target.value)} value="bachelor" />ব্যাচেলর
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setSmallfamily(e.target.value)} value="smallfamily" />ছোট ফ্যামিলি
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setOnlyboysStudent(e.target.value)} value="onlyboysStudent" />শুধুমাত্র ছাত্র
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setOnlygirlStudent(e.target.value)} value="onlygirlStudent" />শুধুমাত্র ছাত্রী
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setOnlymen(e.target.value)} value="onlymen" />শুধুমাত্র পুরুষ
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setOnlywomen(e.target.value)} value="onlywomen" />শুধুমাত্র মহিলা
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setMenEmployee(e.target.value)} value="menEmployee" />পুরুষ চাকরীজীবী
                                                            <input type="checkbox" id="topping" name="topping" onChange={(e) => setWomenemployee(e.target.value)} value="womenemployee" />মহিলা চাকরীজীবী



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
                                        <label htmlFor="images">Product Images :</label>
                                        <div>
                                            <input type="file"  onChange={handleimagesChange} name="avatar" accept="image/*" multiple />
                                        </div>
                                    </div>
                                    <div id='imagesShow'>
                                        {
                                            imagesPreview && imagesPreview.map((image, index) => (
                                                <img key={index} src={image} alt="House" />
                                            ))
                                        }
                                    </div>
                                    <div className="create_product_btn">
                                        <button type='submit'>Submit</button>
                                    </div>
                                </form>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHome