import React from 'react'

import ContainerGray from '../../../utils/ContainerGray'
import PostImg from '../../../elements/imgCircle/ImgCircle'
import person from '../../../../medias/img/test.jpg'
import { BsThreeDotsVertical } from "react-icons/bs"

import SocialPostDropdown from '../../../utils/dropdowns/SocialPostDropdown'

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
		<section>
			<article className="bg-gray-200 font-primary p-2  mx-auto">
				<header className="flex justify-between items-center">
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
			      	dropElt={ <BsThreeDotsVertical size="25" className="text-gray-500" /> } 
			      />
			    </div>
				</header>
				<main>
					<pre className="">
						hey

						je suis cass hein

						tu suit
					</pre>
					<div>
						<img 
							src={person} 
							alt="une femme en robe noir"
							className="w-full h-96" />
					</div>
				</main>
				<footer>
					
				</footer>
			</article>
		</section>
	)
}

export default Post