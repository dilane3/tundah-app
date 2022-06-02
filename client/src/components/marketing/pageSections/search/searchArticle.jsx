import React from "react";
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import  './seachBody.css'

const imageMariage= require("../../../../medias/img/mariage.jpg")
const SearchArticle = () => {

return(
    <div className="PostPropose"> 
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
export default SearchArticle;