import React from 'react'
//packages
import { BsThreeDotsVertical } from "react-icons/bs"
import { AiOutlineLike } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import { RiShareForwardLine } from "react-icons/ri"
//medias
import person from '../../../../medias/img/test.jpg'
import mariage from '../../../../medias/img/mariage.jpg'
import signinImg from '../../../../medias/img/signin-img.png'
import signupImg from '../../../../medias/img/signup-img.png'
//composans
import SocialPostDropdown from '../../../utils/dropdowns/SocialPostDropdown'
import PostImg from '../../../elements/imgCircle/ImgCircle'
import PostCarousel from '../../../utils/carousels/PostCarousel'

const Post = (props) => {
/*
	const  { 
			authorInfo, 
			datePost,
			contentPost,
			listImgPost, 
			listVideoPost  
		} = props

		const { imgAuthor, nameAuthor } = authorInfo*/

	return(
		<article className="bg-white w-96 font-primary pb-2 mx-auto rounded-sm">
			<header className="flex justify-between items-center pb-3 px-2 pt-2">
				<div className="flex items-center space-x-1 lg:space-x-2 ">
					<PostImg
						size="small"
						alt="wangue fenyep"
						src={person}
					 />
					 <div className="flex flex-col space-y-1">
					 	<span className="text-sm md:text-lg font-bold ">wangue fenyep</span>
					 	<date className="text-xs text-gray-500">10/12/2021</date>
					 </div>
				</div>
				

				<div>
			      <SocialPostDropdown 
			      	dropElt={ <BsThreeDotsVertical size="25" className="icon" /> } 
			      />
			    </div>
			</header>
			<main className="">
				<pre className="px-2 pt-2 font-primary">
					hey

					je suis cass hein

					tu suit
				</pre>
				{/*<div className="pt-2">
					<img 
						src={mariage} 
						alt="une femme en robe noir"
						className="w-full h-96" />
				</div>*/}

				<PostCarousel
					img1 = {mariage}
					img2 = {signinImg}
					img3 = {person}
				/>
			</main>
			<footer className="mt-1 md:mt-2 flex items-center space-x-4">
				<div className="flex items-center space-x-1">
					<AiOutlineLike size="25" className="icon" />
					<span className="text-xs md:text-sm">213k</span>
				</div>

				<div className="flex items-center space-x-1">
					<BiMessageRounded size="25" className="icon" />
					<span className="text-xs md:text-sm">102</span>
				</div>

				<div className="flex items-center space-x-1">
					<RiShareForwardLine size="25" className="icon" />
					<span className="text-xs md:text-sm">06</span>
				</div>
			</footer>
		</article>
	)
}

export default Post