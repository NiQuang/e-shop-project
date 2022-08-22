import React from 'react'
import './admSingle.scss'

const AdmSingle = () => {
    return (
        <div className="single">
            <div className="top">
                <div className="left">
                    <div className="editButton">Edit</div>
                    <h1 className="title">Infomation</h1>
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                            alt=""
                            className="itemImg"
                        />
                        <div className="details">
                            <h2 className="itemTitle">Jane Doe</h2>
                            <div className="detailItem">
                                <span className="itemKey">Email: </span>
                                <span className="itemValue">janedoe@gmail.com</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Phone: </span>
                                <span className="itemValue">+1 2345 67 89</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Adress: </span>
                                <span className="itemValue">Elton St.234 Garden Yd. NewYork</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Country: </span>
                                <span className="itemValue">USA</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
            <div className="bottom">

            </div>
        </div>
    )
}

export default AdmSingle