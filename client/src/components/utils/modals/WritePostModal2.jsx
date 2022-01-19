import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from '../../../css/writePost.module.css'
import { BsEmojiHeartEyes, BsCardImage, BsCameraVideo }from 'react-icons/bs'

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

const WritePostModal2 = (props) => {

  const {addPost} = useContext(postsContext)
  const {createPost} = useContext(currentUserContext)

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
	}, [postData])

	
  	//handler
	const handleChange = (event) => {
		setPostData({ ...postData, [event.target.id]: event.target.value })

    if (event.target.id === "region") {
      setPostData(state => ({...state, tribu: tribus[0]}))
    }
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
				setLoading(false)
				onCloseModal()

        // we add the post inside the wiki page
        addPost(res.data.data)

        // we add the post inside the profile of the current user
        createPost(res.data.data)
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
				someTribu = ["Toupouri", "Mousgoum", "Foufouldé"]
				setTribus(someTribu)
				break
			case "ouest":
				someTribu = ["Dschang", "Mbouda", "Bagante", "Bafang", "Balengou"]
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


  return (
    <>
      <section className={styles.writePostModalSection}>
        <form className={`${styles.writePostModalForm}`}>
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
            className={`${styles.postTitle} block w-full py-0.5 mx-0 w-full mt-8 bg-white focus:outline-none`}
          />

          <div className={`${styles.postOptions} flex items-center justify-between mt-8`}>
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
            className={`${styles.postEditor} block focus:border-0 border-none w-full my-14 w-full text-gray-800`}
            value={content}
            placeholder="développer votre idée yo"
            onClick={() => setShowPreMessage(false)}
          >
            {
              showPreMessage || (contentRef.current && contentRef.current.innerHTML) === "" ?  (
                <span className="md:text-lg text-gray-400" id="preMessage">Développez votre idée</span> 
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
                <video src={ postData.video } controls className="w-full h-full">
                  <source  />

                  Sorry, your browser doesn't support embedded videos.
                </video>
              </div>
            )
          }
        </form>

        <div className={`${styles.postEditorControl} flex justify-between items-center mt-5`}>
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
                annuler
              </Button>

              <input
                onClick={ (event) => handleSubmit(event) }
                type="submit"
                value={ user.getRole === 0 ? "proposer" : "publier" }
                className="px-3 bg-primary text-white text-xs rounded hover:bg-primary-hover"
              />
            </div>
            {
              isLoading && <LoaderCircle size="180" color="#FACC15" />
            }

        </div>
      </section>
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
    </>
  )
}

export default WritePostModal2