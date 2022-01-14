import React, { useState } from 'react'
import  './Specificpost.css'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import DisplayPhoto from '../../../utils/modals/DisplayPhoto'
const image = require("../../../../medias/img/test.jpg")
const imageMariage= require("../../../../medias/img/mariage.jpg")

const PostPropose = ({type, post}) => {
    type = type ? type:"proposal_post"

    // This function display the relative date
	const getRelativeDate = (date) => {
		const currentDate = new Date().getTime()
		let diffDate = Math.floor((currentDate - Number(date)) / 1000)

		const months = [
			"janvier",
			"fevrier",
			"mars",
			"avril",
			"mai",
			"juin",
			"juillet",
			"aout",
			"septembre",
			"octobre",
			"novembre",
			"decembre"
		]

		console.log({diffDate})

		if (diffDate < 60) {
			return "A l'instant"
		} else if (diffDate < 3600) {
			return `Il y a ${Math.floor(diffDate/60)}min`
		} else if (diffDate < 86400) {
			return `Il y a ${Math.floor(diffDate/3600)}h`
		} else if (diffDate >= 86400 && diffDate < 86400*2) {
			return "Hier"
		} else {
			const exactDate = new Date(date)
			
			return `${exactDate.getDay() + 1} ${months[exactDate.getMonth()]} ${exactDate.getFullYear()}`
		}
	}

    return(
        <div className="PostPropose"> 
            <div className="header-Postpropose">
                <div className="header-PostproposeInfo">
                    <ImgCircle src={image} alt="profil" classe="profilCardImage"/>

                    <div className="profilInfo">
                        <span>{post["author"]["name"]}</span>
                        <span className="hour">
                            {getRelativeDate(post["modification_date"])}
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
                    
                {/* <div onClick={() => setShowDisplayPhotoModal(true)}> */}
                    <Image image={imageMariage} className="CardImage" />
                {/* </div> */}


                {/* J'ai personnellement commenté ce module parce-qu'il m'empéchait d'acceder à l'ui de la page de recherche des posts */}
                {/* {
                    // showDisplayPhotoModal ? (
                        <DisplayPhoto
                            files={[imageMariage]}
                            type="profil"
                            // onHide={() => setShowDisplayPhotoModal(false)}
                        />
                    // ):null
                } */}
            </div>
            
        </div>
    )
}
export default PostPropose;