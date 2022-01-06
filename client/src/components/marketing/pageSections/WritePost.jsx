import React from 'react' 
import Paragraphe from '../../elements/p/Paragraphe'
import Button from '../../elements/buttons/Button'

import { BsEmojiHeartEyes, BsCardImage, BsCameraVideo }from 'react-icons/bs'

const WritePost = () => {

	return(
		<div className="bg-white w-full flex flex-col space-y-4 mb-8 p-6 rounded">
			<div>
				<div>
					<span className="font-primary font-medium text-sm md:text-xl">
						Ecrire un article
					</span>
					<span className="block h-0.5 w-3/5 bg-black opacity-60 mt-1.5"></span>
				</div>
				<Paragraphe classe="my-3 text-3xl md:text-3xl text-gray-500 font-medium">
					votre message...
				</Paragraphe>
			</div>
			<div className="flex justify-between items-center">
				<ul className="flex space-x-6">
					<li><BsEmojiHeartEyes  /></li>
					<li><BsCardImage  /></li>
					<li><BsCameraVideo  /></li>
				</ul>
				<Button>
					publier
				</Button>
			</div>
		</div>
	)
}

export default WritePost