import React, { useState } from 'react'
//packages
import { BsThreeDotsVertical } from "react-icons/bs"
import { AiOutlineLike } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import { RiShareForwardLine } from "react-icons/ri"
//medias
import person from '../../../medias/img/test.jpg'
import mariage from '../../../medias/img/mariage.jpg'
import chinoise from '../../../medias/img/chinoise.jpg'
//composans
import SocialPostDropdown from '../../utils/dropdowns/SocialPostDropdown'
import PostImg from '../../elements/imgCircle/ImgCircle'
import PostCarousel from '../../utils/carousels/PostCarousel'
import Paragraphe from '../../elements/p/Paragraphe'
import Post from '../../../entities/Post'

import "../../../css/post.css"
import DisplayPhoto from '../../utils/modals/DisplayPhoto'
import Subscriber from '../../../entities/Subscriber'

const PostComponent = ({postData}) => {
	const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)
	const [indexFile, setIndexFile] = useState(0)

	// getting props values
	const post = new Post(postData)

	const author = new Subscriber(post.getAuthor)
	console.log(post)

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
			const exactDate = new Date()
			
			return `${exactDate.getDay()} ${months[exactDate.getMonth()]} ${exactDate.getFullYear()}`
		}
	}

	return (
		<article className="bg-white w-full font-primary pb-2 mx-auto rounded-sm mb-2" style={{border: "1px solid rgb(206, 206, 206)"}}>
			<header className="flex justify-between items-center pb-3 px-2 pt-2">
				<div className="flex items-center space-x-1 lg:space-x-2 ">
					<PostImg
						size="small"
						alt="wangue fenyep"
						src={author.getProfil}
					 />
					 <div className="flex flex-col space-y-1">
					 	<span className="text-sm md:text-lg font-bold ">{author.getName[0].toUpperCase() + author.getName.substr(1).toLowerCase()}</span>
					 	<date className="text-xs text-gray-500">{getRelativeDate(post.getCreationDate)}</date>
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
					{post.getContent}
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
			<footer className="mt-3 px-2 md:mt-3 flex items-center space-x-6">
				<div className="flex items-center space-x-1">
					<AiOutlineLike size="25" className="icon" />
					<span className="text-xs md:text-sm">{formatLikesOrComment(post.getLikes.length)}</span>
				</div>

				<div className="flex items-center space-x-1">
					<BiMessageRounded size="25" className="icon" />
					<span className="text-xs md:text-sm">{formatLikesOrComment(post.getComments)}</span>
				</div>
			</footer>

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