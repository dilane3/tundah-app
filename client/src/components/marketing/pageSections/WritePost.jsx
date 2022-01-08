import React, { useContext } from 'react' 
import Paragraphe from '../../elements/p/Paragraphe'
import Button from '../../elements/buttons/Button'

import { BsEmojiHeartEyes, BsCardImage, BsCameraVideo }from 'react-icons/bs'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import Subscriber from '../../../entities/Subscriber'

const WritePost = () => {
	const {currentUser} = useContext(currentUserContext)

	const user = new Subscriber(currentUser)

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
				<ul className="flex items-center space-x-6">
					<li><BsEmojiHeartEyes size="26" color="#deeorx" className="text-gray-900" /></li>
					<li><BsCardImage size="30" color="#deeorx" className="text-gray-900" /></li>
					<li><BsCameraVideo size="30" color="#deeorx" className="text-gray-900" /></li>
				</ul>

				{
					user.getRole === 1 ? (
						<Button>
							Publier
						</Button>
					):(
						<Button>
							Proposer
						</Button>
					)
				}
			</div>
		</div>
	)
}

export default WritePost