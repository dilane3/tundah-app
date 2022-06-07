import React from "react";
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import  './seachBody.css'

const imageMariage= require("../../../../medias/img/mariage.jpg")
const SearchPost = () => {

return(
    <div className="PostPropose"> 
        <div className="header-Postpropose">
            <div className="header-PostproposeInfo">
                <ImgCircle src={imageMariage} alt="profil" classe="profilCardImage"/>

                <div className="profilInfo">
                    <span className="author-post-username"> Kana Blondelle</span>  
                    <span className="hour">
                        vu hier
                    </span>
                </div>
            </div>

            <div className="header-PostproposeIcon">
                        <BsThreeDotsVertical />
            </div>
         
        </div>
        <div className="content-Postpropose">
            <div className="Info-content">
                <span className="title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. </span>
                  
                <div className="description" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    amet odio enim assumenda quas esse illo omnis commodi!
                </div>
            </div>
            <div  className="proposePost-img">
                <Image image={imageMariage} className="CardImage" />
            </div>
        </div>
        
    </div>
    )
}
export default SearchPost;