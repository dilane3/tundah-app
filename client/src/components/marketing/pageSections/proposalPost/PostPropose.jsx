import React, { useState } from 'react'
import  './Specificpost.css'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import DisplayPhoto from '../../../utils/modals/DisplayPhoto'
const image = require("../../../../medias/img/test.jpg")
const imageMariage= require("../../../../medias/img/mariage.jpg")

const PostPropose = ({type}) => {
    type = type ? type:"proposal_post"

    // difining local state
    const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)

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

                {
                    type !== "result" ? (
                        <div className="header-PostproposeIcon">
                            <BsThreeDotsVertical />
                        </div>
                    ):null
                }
                
            </div>
            <div className="content-Postpropose">
                <div className="Info-content">
                      <span className="title">Toutes les coutumes camerounaises encouragent la polygamie </span>
                      <div className="description"> 
                        Durant les cérémonies de mariages, nous assistons souvent à des litiges
                        opposant...
                      
                      </div>
                </div>
                    
                <div onClick={() => setShowDisplayPhotoModal(true)}>
                    <Image image={imageMariage} className="CardImage" />
                </div>

                {
                    showDisplayPhotoModal ? (
                        <DisplayPhoto
                            files={[imageMariage]}
                            type="profil"
                            onHide={() => setShowDisplayPhotoModal(false)}
                        />
                    ):null
                }
            </div>
            
        </div>
    )
}
export default PostPropose;