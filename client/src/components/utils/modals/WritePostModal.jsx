import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsEmojiHeartEyes, BsCardImage, BsCameraVideo }from 'react-icons/bs'

import H3 from '../../elements/titles/H3'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import Button from '../../elements/buttons/Button'

import currentUserContext from '../../../dataManager/context/currentUserContent'
import Subscriber from '../../../entities/Subscriber'
import navigationContext from '../../../dataManager/context/navigationContext'
import {ressourcesUrl} from '../../../utils/url'

const WritePostModal = ({ show, closeModal}) => {

	//constant
	const initialPostState = {
		title: "",
		content: "développez votre idée",
		region: "",
		images: [],
		video: null
	}

	const regionPost = ["Nord", "Sud", "ouest", "Est", "centre", "Littorale", "Extreme-nord", "sud-ouest", "Nord-ouest"]
	
	//context
	const { currentUser } = useContext(currentUserContext)
	const user = new Subscriber(currentUser)

	//state variable
	const [postData, setPostData] = useState(initialPostState)
	const [tribu, setTribu] = useState([])

	//useEffect
	useEffect(() => {
		selectTribu(postData.region)
	}, [postData.region])

  //handler
	const handleChange = (event) => {
		setPostData({ ...postData, [event.target.id]: event.target.value })
	}

	//function
	function selectTribu(region){
		let someTribu = []
		switch(region){
			case "Nord":
				someTribu = ["Toupouri", "Mousgoum", "Foufouldé"]
				setTribu(someTribu)
				break
			case "Ouest":
				someTribu = ["Dschang", "Mbouda", "Bagante", "Bafang", "Balengou"]
				setTribu(someTribu)
				break
			default:
				someTribu = [`${region} tribu 1`, `${region} tribu 2`, `${region} tribu 3`, `${region} tribu 4`]
				setTribu(someTribu)
				break
		}
	}

	const {
		title,
		content,
		region,
		images,
		video
	} = postData

	return(
		
	  		<Transition appear show={show} as={Fragment}>
	  			<div className="absolute px-5 z-25 left-0 top-0 h-screen w-screen bg-black opacity-50">
		        <Dialog
		          as="div"
		          className="fixed inset-0 z-23 overflow-y-auto"
		          onClose={closeModal}
		        >
		          <div className="min-h-screen px-4 text-center">
		            <Transition.Child
		              as={Fragment}
		              enter="ease-out duration-300"
		              enterFrom="opacity-0"
		              enterTo="opacity-100"
		              leave="ease-in duration-200"
		              leaveFrom="opacity-100"
		              leaveTo="opacity-0"
		            >
		              <Dialog.Overlay className="fixed inset-0" />
		            </Transition.Child>

		            {/* This element is to trick the browser into centering the modal contents. */}
		            <span
		              className="inline-block h-screen align-middle"
		              aria-hidden="true"
		            >
		              &#8203;
		            </span>
		            <Transition.Child
		              as={Fragment}
		              enter="ease-out duration-300"
		              enterFrom="opacity-0 scale-95"
		              enterTo="opacity-100 scale-100"
		              leave="ease-in duration-200"
		              leaveFrom="opacity-100 scale-100"
		              leaveTo="opacity-0 scale-95"
		            >
		              <div className="writePostModal absolute z-30 top-20 inline-block w-full max-w-xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
		                <Dialog.Title
		                  as="h3"
		                  className="text-xm font-medium text-gray-900"
		                >
		                  <H3 classe="text-center text-xm py-2">Ecrire un article</H3>
		                </Dialog.Title>
		                <span className="block h-0.5 w-full bg-gray-200"></span>
		                <Dialog.Description className="mt-2 p-5">
		                  <div className="flex items-center justify-start space-x-2">
		                  	<ImgCircle
		                  		src={`${ressourcesUrl.profil}/${user.getProfil}`}
		                  		alt="image du curent iser"
		                  	/>
		                  	<div>
		                  		<span className="block font-bold text-md font-primary">{ user.getName }</span>
		                  		<span className="block text-sm font-primary">@{ user.getUsername }</span>
		                  	</div>
		                  </div>

		                  <input
		                  	type="text"
		                  	id="title"
		                  	name="title-post"
		                  	placeholder="Titre de l'article"
		                  	value={title}
		                  	onChange={handleChange}
		                  	className="block w-full py-0.5 border-b-2 border-x-0 border-gray-500  border-black mx-0 w-full mt-8 bg-white focus:outline-none"
		                  />

		                  <div className="w-full flex items-center justify-between mt-8">
		                  	<select 
		                  		name="region" 
		                  		id="region"
		                  		value={region}
		                  		onChange={handleChange}
		                  		className="bg-gray-200 p-2 rounded text-xm font-primary"
		                  	>
		                  		<option value="">
		                  			Région conserné
		                  		</option>
		                  		{
		                  			regionPost.map((region, index) => (
		                  				<option value={region} key={index}>
		                  					{ region }
		                  				</option>
		                  			))
		                  		}
		                  	</select>
		                  	<select 
		                  		name="tribu" 
		                  		id="tribu"
		                  		value={ tribu }
		                  		onChange={handleChange}
		                  		className="bg-gray-200 p-2 rounded text-xm font-primary"
		                  	>
		                  		{
		                  			!region && (
		                  				<option value="">Tribu conserné</option>
		                  			)
		                  		}

		                  		{
		                  			tribu.map((region, index) => (
		                  				<option value={region} key={index}>
		                  					{ region }
		                  				</option>
		                  			))
		                  		}
		                  	</select>
		                  </div>

		                  <textarea 
		                  		name="post-content" 
		                  		id="post-content"
		                  		value={ content }
		                  		onChange={handleChange}
		                  		className="my-10 w-full"
		                  >
		                  		
		                  </textarea>

		                  <div className="flex justify-between items-center">
												<ul className="flex items-center space-x-6">
													<li>
														<BsEmojiHeartEyes 
															size="22" 
															color="#456445" 
															className="cursor-pointer text-gray-900"
														/>
													</li>
													<li>
														<BsCardImage 
															size="25" 
															color="#456445" 
															className="cursor-pointer text-gray-900"
														/>
													</li>
													<li>
														<BsCameraVideo 
															size="25" 
															color="#456445" 
															className="cursor-pointer text-gray-900"
														/>
													</li>
												</ul>

												<Button>
													proposer
												</Button>
											</div>
		                </Dialog.Description>
		              </div>
		            </Transition.Child>
		          </div>
		        </Dialog>
	        </div>
	      </Transition>
	 
	)
}

export default WritePostModal