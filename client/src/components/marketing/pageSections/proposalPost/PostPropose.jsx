import React, { useContext, useEffect, useRef, useState } from 'react'
import  './Specificpost.css'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import DisplayPhoto from '../../../utils/modals/DisplayPhoto'
import { getRelativeDate } from '../../../../utils/dateOperations'
import Post from '../../../../entities/Post'
import Subscriber from '../../../../entities/Subscriber'
import { ressourcesUrl } from '../../../../utils/url'
import { Link } from 'react-router-dom'
import postsContext from '../../../../dataManager/context/postsContext'

const imageMariage= require("../../../../medias/img/mariage.jpg")
const imagesExtensions = [ "jpeg", "png", "gif", "bmp", "jpg" ]

const PostPropose = ({type, postData}) => {
    type = type ? type:"proposal_post"
    const post = new Post(postData)
    const author = new Subscriber(post.getAuthor)

    // getting data from global state
    const {addPost} = useContext(postsContext)

    // difinition of local state
    const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)
	const [relativeDate, setRelativeDate] = useState(getRelativeDate(post.getCreationDate))

    // useRef section
    const postContentRef = useRef()

    // useEffect section

	useEffect(() => {
		const timer = setInterval(() => {
			setRelativeDate(getRelativeDate(post.getCreationDate))
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	})

    useEffect(() => {
        postContentRef.current.innerHTML = truncateContent(post.getContent)
    }, [])

    const truncateContent = (content) => {
        if (content.length > 100) return content.substr(0, 100) + "..."
        
        return content
    }

    const checkExtension = (str) => {
		const tabSplit = str.split(".")
		const extension = tabSplit[tabSplit.length - 1]

		return imagesExtensions.includes(extension)
	}

    const displayPost = () => {
        addPost(post)

        let timer = setTimeout(() => {
            window.location.href = `/posts/${post.getId}`

            clearTimeout(timer)
        }, 500)
    }

    return(
        <div className="PostPropose"> 
            <div className="header-Postpropose">
                <div className="header-PostproposeInfo">
                    <ImgCircle src={`${ressourcesUrl.profil}/${author.getProfil}`} alt="profil" classe="profilCardImage"/>

                    <div className="profilInfo">
                        <Link to={`/profile/${author.getUsername}`}>
                            <span className="author-post-username">{author.getName[0].toUpperCase() + author.getName.substr(1).toLowerCase()}</span>
                        </Link>
                        
                        <span className="hour">
                            {relativeDate}
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
                      
                    <div 
                        ref={postContentRef} 
                        className="description"
                        onClick={displayPost}    
                    ></div>
                </div>
                    
                {
                    post.getFilesList.length > 0 ? (
                        <div onClick={() => setShowDisplayPhotoModal(true)} className="proposePost-img">
                            {
                                checkExtension(post.getFilesList[0]) ? (
                                    <Image image={ `${ressourcesUrl.postImages}/${post.getFilesList[0]}` } className="CardImage" />
                                ):(
                                    <video controls className="CardImage">

                                        <source src={ `${ressourcesUrl.postVideos}/${post.getFilesList[0]}` }
                                                type="video/webm" />

                                        Sorry, your browser doesn't support embedded videos.
                                    </video>
                                )
                            }
                        </div>
                    ):null
                }


                {
                    showDisplayPhotoModal ? (
                        <DisplayPhoto
                            files={post.getFilesList}
                            type="images"
                            onHide={() => setShowDisplayPhotoModal(false)}
                        />
                    ):null
                }
            </div>
            
        </div>
    )
}
export default PostPropose;