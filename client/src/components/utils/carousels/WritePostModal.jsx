import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsEmojiHeartEyes, BsCardImage, BsCameraVideo }from 'react-icons/bs'

import H3 from '../../elements/titles/H3'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import Button from '../../elements/buttons/Button'

import Subscriber from '../../../entities/Subscriber'
import PostCarousel from '../../utils/carousels/PostCarousel'
import DisplayPhoto from './DisplayPhoto'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import {instance, ressourcesUrl} from "../../../utils/url"
import LoaderCircle from "../loaders/Loader"
import postsContext from '../../../dataManager/context/postsContext'
import "../../../css/app.css"
// import postReducer from '../../../dataManager/data/posts/postsReducer'

const WritePostModal = (props) => {

	const postsContextValue = useContext(postsContext)

	const { 
			show, 
			onCloseModal, 
			showPreMessage, 
			setShowPreMessage
	} = props

	//constant
	const initialPostState = {
		title: "",
		region: "",
		tribu: "",
		images: [],
		video: null
	}


	const regionPost = ["Nord", "Sud", "ouest", "Est", "centre", "Littorale", "Extreme-nord", "sud-ouest", "Nord-ouest"]
	
	//context
	const { currentUser } = useContext(currentUserContext)
	const user = new Subscriber(currentUser)
	const contextPost = useContext(postsContext)

	//ref
	const inputImagesRef = useRef()
	const inputVideoRef = useRef()
	const contentRef = useRef()

	//state variable
	const [postData, setPostData] = useState(initialPostState)
	const [tribus, setTribus] = useState([])
	const [indexImage, setIndexImage] = useState(0)
	const [displayEditPost, setDisplayEditPost] = useState(false)
	const [displayImage, setDisplayImage] = useState(false)
	const [isLoading, setLoading] = useState(false) 

	//useEffect
	useEffect(() => {
		selectTribu(postData.region)
	}, [postData.region])

	
  	//handler
	const handleChange = (event) => {
		setPostData({ ...postData, [event.target.id]: event.target.value })
	}

	//submit data post
	const handleSubmit = (event) => {
		event.preventDefault()

		const  { title, region, tribu } = postData
		const contentPost = contentRef.current.innerHTML

		if(title !== "" && contentPost !== "" && !showPreMessage && region !== "" && tribu !== ""){

			console.log(contentPost)
		    const fileType = postData.video ? "video" : "image"
			const {
				title,
				region,
				tribu,
				images,
				video
			} = postData

			console.log(postData)

			//send a FormData when post data content files
			const dataToSend = new FormData()

			dataToSend.append("title", title)
			dataToSend.append("content", contentPost)
			dataToSend.append("region", region)
			dataToSend.append("tribe", tribu)
			dataToSend.append("fileType", fileType)

			if(video){
				dataToSend.append("video", inputVideoRef.current.files[0])
			}

			if(images.length){
				images.forEach((img, index) => {
					dataToSend.append("images", inputImagesRef.current.files[index])
				})
			}

			console.log(dataToSend.get("content"))
			
			//stratloading
			setLoading(true)

		    const url = postData.images.length === 0 ? "video" : "images"

			//send data 
			instance.post(`/posts/create/${url}`, dataToSend)
			.then(res => {
				console.log(res.data)
				setLoading(false)
				onCloseModal()
			})
			.catch(err => {
				console.log(err)

				setLoading(false)
			})
		}else{
			console.log("terminer la redactioin de post")
		}

	}

	const handleSelectImages = () => {
		inputImagesRef.current.click();
	}

	const handleSelectVideo = () => {
		inputVideoRef.current.click();
	}

	const handleChangePostsImages = (event) => {
		const files = [...event.target.files];
		const imagesUrls = files.map(file => URL.createObjectURL(file)) // create images URL
		setPostData({ 
				...postData, 
				images: imagesUrls,
				video: null
		})
	}


	const handleChangePostsVideos = (event) => {
		const file = event.target.files[0]
		const videoUrl = URL.createObjectURL(file)
		setPostData({ 
				...postData, 
				video: videoUrl,
				images: []
		})
		console.log(videoUrl)
	}

	const handleDisplayImage = (index) => {
		setIndexImage(index)

		setDisplayImage(true)
	}

	const resetPostData = () => {
		setPostData({ ...initialPostState })
		contentRef.current.innerHTML = ""
		setShowPreMessage(true)
		setLoading(false)
		onCloseModal()
	}

	//function
	function selectTribu(region){
		let someTribu = []
		switch(region.toLowerCase()){
			case "nord":
				someTribu = ["Toupouri", "Moundan", "Massah", "Arabe choa"]
				setTribus(someTribu)
				break
			case "ouest":
				someTribu = ["Dschang", "Mbouda", "Bagante", "Bamoun", "Bafousam", "Bafang", "Baham", "Bandjoun"]
				setTribus(someTribu)
				break
			case "centre":
				someTribu = ["Eton", "Ewondo", "Bassa", "Boulou"]
				setTribus(someTribu)
				break
			case "littoral":
				someTribu = ["Douala", "Mboo", "Bassa"]
				setTribus(someTribu)
				break
			default:
				someTribu = [`${region} tribu 1`, `${region} tribu 2`, `${region} tribu 3`, `${region} tribu 4`]
				setTribus(someTribu)
				break
		}
	}

	const {
		title,
		content,
		region,
		tribu,
		images,
		video
	} = postData

	return(
		<div style={{position: 'fixed', top: 0, left: 0, width: "100%", height: "100vh", zIndex: 5}}>
			<Transition appear show={show} as={Fragment}>
				<div className="fixed px-5 z-10 left-0 top-0 h-screen w-screen bg-black opacity-50">
	        <Dialog
	          as="div"
	          className="fixed inset-0 z-10 overflow-y-auto"
	          onClose={() => console.log("hello")}
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
	              <div className="writePostModal absolute top-20 inline-block w-full max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
	                <Dialog.Title
	                  as="h3"
	                  className="text-xm font-medium text-gray-900"
	                >
	                  <H3 classe="text-center text-xm py-2">Ecrire un article</H3>
	                </Dialog.Title>
	                <span className="block h-0.5 w-full bg-gray-200"></span>
	                <Dialog.Description className="mt-2 p-5">
	               	<form className="post-modal-form" onSubmit={ (event) => handleSubmit(event) }>
	                  <div className="flex items-center justify-start space-x-2">
	                  	<ImgCircle
	                  		src={ ressourcesUrl.profil + "/" + user.getProfil }
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
	                  			tribus.map((region, index) => (
	                  				<option value={region} key={index}>
	                  					{ region }
	                  				</option>
	                  			))
	                  		}
	                  	</select>
	                  </div>

	                  <div
	                  	ref={ contentRef }
	                  	id="content"
	                  	contentEditable="true"
	                  	className="post-editor block focus:border-0 border-none w-full my-14 w-full text-gray-800"
	                  	value={content}
	                  	placeholder="développer votre idée yo"
	                  	onClick={() => setShowPreMessage(false)}
	                  >
	                  	{
	                  		showPreMessage || contentRef.current.innerHTML === "" ?  (
	                  			<span className="text-xs md:text-lg text-gray-400" id="preMessage">Développez votre idée</span> 
	                  		) : null
	                  	}
	                  </div>

	                 		{ 
	                 			postData.images.length > 0 && (
	                 				<PostCarousel 
	                 					files={postData.images}
	                 					onDisplayPhoto = { handleDisplayImage }
	                 					edited={false}
	                 				/>
	                 			)

	                 		} 
	                 		{
	                 			postData.video !== null && (
	                 				<div className="w-full h-full">
	                 					<video controls className="w-full h-full">

										    <source src={ postData.video }
										            type="video/webm" />

										    Sorry, your browser doesn't support embedded videos.
										</video>
	                 				</div>
	                 			)
	                 		}

	                  <div className="post-modal-control flex justify-between items-center mt-5">
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
														onClick = { handleSelectImages }
													/>
													<input
														type="file"
														name="upload-photo"
														ref = {inputImagesRef}
														hidden
														accept="image/*"
														multiple
														onChange={ handleChangePostsImages }
													/>
												</li>
												<li>
													<BsCameraVideo 
														size="25" 
														color="#456445" 
														className="cursor-pointer text-gray-900"
														onClick={handleSelectVideo}
													/>

													<input
														type="file"
														ref = {inputVideoRef}
														hidden 
														accept="video/*"
														onChange={ handleChangePostsVideos }
													/>
												</li>
											</ul>

											<div className="flex space-x-4">
												<Button 
													theme="gray"
													action={ resetPostData }
													>
													anuler
												</Button>

												<input
													type="submit"
													value={ user.getRole === 0 ? "proposer" : "publier" }
													className="px-3 bg-primary text-white text-xs rounded hover:bg-primary-hover"
												/>
											</div>
											{

													isLoading && <LoaderCircle size="180" color="#FACC15" />
											}
										</div>
									</form>
	                </Dialog.Description>
	              </div>
	            </Transition.Child>
	          </div>
	        </Dialog>
	      </div>
	    </Transition>
	    
	    {
	    	displayImage && (
	    		<DisplayPhoto
	    			files={ postData.images }
	    			indexFile={ indexImage }
	    			edited = {false}
	    			type={ postData.images.length ? "images" : "video" }
	    			onHide={ () => setDisplayImage(false) }
	    		/>
	    	)
	    }
	 	</div>
	)
}
export default WritePostModal