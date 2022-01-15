import React, { useContext, useEffect, useState } from 'react'
//packages
import { BsHeartFill, BsHeart, BsThreeDotsVertical, BsChat } from "react-icons/bs"
//composans
import SocialPostDropdown from '../../utils/dropdowns/SocialPostDropdown'
import PostImg from '../../elements/imgCircle/ImgCircle'
import PostCarousel from '../../utils/carousels/PostCarousel'
import Post from '../../../entities/Post'

import "../../../css/post.css"
import DisplayPhoto from '../../utils/modals/DisplayPhoto'
import Subscriber from '../../../entities/Subscriber'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import postsContext from '../../../dataManager/context/postsContext'
import { Link } from 'react-router-dom'
import {  ressourcesUrl } from "../../../utils/url"
import { getRelativeDate } from '../../../utils/dateOperations'

const PostComponent = ({postData, onLikePost}) => {
	// getting data from the global state
	const {currentUser} = useContext(currentUserContext)

	// getting props values
	let post = new Post(postData)

	// definition of the local state
	const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)
	const [indexFile, setIndexFile] = useState(0)
	const [relativeDate, setRelativeDate] = useState(getRelativeDate(post.getCreationDate/1000))


	const author = new Subscriber(post.getAuthor)
	console.log({author, postData})

	// useEffect section
	useEffect(() => {
		post = new Post(postData)
		console.log("post")
	}, [postData])

	useEffect(() => {
		const timer = setInterval(() => {
			setRelativeDate(getRelativeDate(post.getCreationDate/1000))
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	})


	// some actions methods
	const handleDisplayPhoto = (index) => {
		setIndexFile(index)

		setShowDisplayPhotoModal(true)
	}

	// This function format the likes number and comment number
	// so that we can have 10K likes for example
	const formatLikesOrComment = (value) => {
		if (value < 1000) {
			return value.toString()
		} else if (value < 1000000) {
			return `${Math.floor(value / 1000)}K`
		} else {
			return `${Math.floor(value / 1000)}M`
		}
	}

	return (
		<article className="bg-white w-full font-primary pb-2 mx-auto rounded-sm" style={{border: "1px solid rgb(206, 206, 206)"}}>
			<header className="flex justify-between items-center pb-3 px-2 pt-2">
				<div className="flex items-center space-x-1 lg:space-x-2 ">
					<PostImg
						size="small"
						alt="wangue fenyep"
						src={`${ressourcesUrl.profil}/${author.getProfil}`}
					 />
					 <div className="flex flex-col space-y-1 author-info">
					 	<span className="author-post-username text-sm md:text-lg font-bold ">{author.getName[0].toUpperCase() + author.getName.substr(1).toLowerCase()}</span>
					 	<date className="text-xs text-gray-500">{relativeDate}</date>
					 </div>
				</div>
				

				<div>
			    <SocialPostDropdown 
			      dropElt={ <BsThreeDotsVertical size="25" className="icon" /> } 
			    />
			  </div>
			</header>
			<main className="">
				<div className="post-title">
					{post.getTitle[0].toUpperCase() + post.getTitle.substr(1).toLowerCase()}
				</div>
				<div className="px-2">
					<Link to={`/post/${post.getId}`}>
						{post.getContent}
					</Link>
				</div>

				{
					post.getFilesList.length > 0 ? (
						<PostCarousel
							files={post.getFilesList}
							onDisplayPhoto={(index) => handleDisplayPhoto(index)}
						/>
					):null
				}

			</main>

			{
				currentUser ? (
					<footer className="post-footer mt-3 px-2 md:mt-3 flex items-center space-x-6">
						<div className="flex items-center space-x-1" onClick={() => onLikePost(post.getId)}>
							{
								post.getLikes.includes(currentUser.id) ? (
									<BsHeartFill size="20" className="icon" color="rgb(218, 18, 18)" />
								):(
									<BsHeart size="20" className="icon" />
								)
							}
							<span className="text-xs md:text-sm">{formatLikesOrComment(post.getLikes.length)}</span>
						</div>

						<div className="flex items-center space-x-1">
							<Link to={`/post/${post.getId}`}>
								<BsChat size="20" className="icon" />
							</Link>
							<span className="text-xs md:text-sm">{formatLikesOrComment(post.getComments)}</span>
						</div>
					</footer>
				):null
			}

			{
				showDisplayPhotoModal ? (
					<DisplayPhoto 
						files={post.getFilesList}
						indexFile={indexFile} 
						type="images" 
						onHide={() => setShowDisplayPhotoModal(false)}	
					/>
				):null
			}
		</article>
	)
}

export default PostComponent