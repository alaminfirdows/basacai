import React from 'react'
import { Rating } from "@material-ui/lab"
import { FaQuoteLeft } from 'react-icons/fa';

function OwnerProfile({ users }) {

    return (
        <>
            <div id='ownerSection' className="newsPage">
                <div className="container">
                    <div className="newsSection">
                        <div className="newsHeader">
                            <h1 className='ownerTitle'>বিজ্ঞাপনদাতাগণের মতামত</h1>
                            <p>প্রতিদিনই নতুন নতুন বাসা ভাড়ার বিজ্ঞাপন প্রকাশ করছেন আমাদের সন্মানিত ব্যাবহারকারিগন। বাসা চাই ডট কম ওয়েব সাইটে ফ্রি তে  বিজ্ঞাপন প্রকাশ করুন ।</p>
                        </div>
                        <div className="ownerWrapper">
                            {
                                users && users.map((user) => (
                                    <div key={user._id} className="ownerCard">
                                        <p className='ownerIcon'><FaQuoteLeft /></p>
                                        <div className='ownerComment'>
                                            <p className='italic'>{user.description && user.description}</p>
                                        </div>
                                        <div className="ownerInfo">
                                            <div className="ownerLeft">
                                                <img src={user.avatar && user.avatar.url} alt="" />
                                                <div>
                                                    <p className='ownerName'>{user.name}</p>
                                                    <p>{user.address && user.address}</p>
                                                </div>
                                            </div>
                                            <div className="ownerRight">
                                                <p>
                                                    <Rating
                                                        size="small"
                                                        value={user.rating}
                                                        readOnly={true}
                                                        precision={0.5} />
                                                </p>
                                                <p>5.0 Out of {user.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerProfile