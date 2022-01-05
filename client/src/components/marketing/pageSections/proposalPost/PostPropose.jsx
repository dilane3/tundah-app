import React from 'react'
import  './Specificpost.css'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import {BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear, BsThreeDotsVertical} from 'react-icons/bs'

const image = require("../../../../medias/img/test.jpg")

const PostPropose = () => {

    return(
        <div className="PostPropose"> 
            <div className="header-Postpropose">
                <div className="header-PostproposeInfo">
                    <ImgCircle src={image} alt="profil" classe="profilCardImage"/>

                    <div className="profilInfo">
                        <span>Kana</span>
                        <span className="hour">Il ya 2h </span>
                    </div>
                </div>

                <div className="header-PostproposeIcon">
                    <BsThreeDotsVertical />
                </div>
            </div>
            <div className="content-Postpropose">

            </div>
        </div>
    )
}
export default PostPropose;