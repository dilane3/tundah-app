import React from 'react'
import  './Specificpost.css'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
const image = require("../../../../medias/img/test.jpg")
const imageMariage= require("../../../../medias/img/mariage.jpg")

const PostPropose = ({type, post}) => {
    type = type ? type:"proposal_post"

    // getting the time in hours
    const postDateHour = Math.round((0.27777777777778*0.000001)*(Date.now() - post["modification_date"]))

    return(
        <div className="PostPropose"> 
            <div className="header-Postpropose">
                <div className="header-PostproposeInfo">
                    <ImgCircle src={image} alt="profil" classe="profilCardImage"/>

                    <div className="profilInfo">
                        <span>{post["author"]["name"]}</span>
                        <span className="hour">Il y a {postDateHour > 24 ? Math.round((postDateHour/24)).toString() + "jr" : (postDateHour).toString() + "hr"} 
                        {postDateHour < 1 ? Math.round((postDateHour/24)/60).toString() + "min" : (postDateHour).toString() + "hr"}
                        {(postDateHour/24)/60 < 1 ? Math.round(((postDateHour/24)/60)/60).toString() + "s" : Math.round((postDateHour/24)/60).toString() + "min"}
                        </span>
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
                      <span className="title">{(post["title"]).toUpperCase()} </span>
                      <div className="description"> 
                        {post["content"]}
                      </div>
                </div>
                    
                <Image image={imageMariage} className="CardImage" />
            </div>
            
        </div>
    )
}
export default PostPropose;