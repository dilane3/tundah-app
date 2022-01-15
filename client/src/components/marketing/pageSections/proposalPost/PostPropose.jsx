import React, { useState } from 'react'
import  './Specificpost.css'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import DisplayPhoto from '../../../utils/modals/DisplayPhoto'
import { getRelativeDate } from '../../../../utils/dateOperations'
import Post from '../../../../entities/Post'
import Subscriber from '../../../../entities/Subscriber'
import { ressourcesUrl } from '../../../../utils/url'

const imageMariage= require("../../../../medias/img/mariage.jpg")

const PostPropose = ({type, postData}) => {
    type = type ? type:"proposal_post"
    const post = new Post(postData)
    const author = new Subscriber(post.getAuthor)

    // difinition of local state
    const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)

    const truncateContent = (content) => {
        if (content.length > 100) return content.substr(0, 100) + "..."
        
        return content
    }

    return(
        <div className="PostPropose"> 
            <div className="header-Postpropose">
                <div className="header-PostproposeInfo">
                    <ImgCircle src={`${ressourcesUrl.profil}/${author.getProfil}`} alt="profil" classe="profilCardImage"/>

                    <div className="profilInfo">
                        <span className="author-post-username">{author.getName[0].toUpperCase() + author.getName.substr(1).toLowerCase()}</span>
                        <span className="hour">
                            {getRelativeDate(post["modification_date"]/1000)}
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
                      <span className="title">{(post.getTitle).toUpperCase()} </span>
                      <div className="description"> 
                        {truncateContent(post.getContent)}
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