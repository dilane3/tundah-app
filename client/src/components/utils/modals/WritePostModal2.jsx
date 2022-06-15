import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from '../../../css/writePost.module.css'
import { BsEmojiHeartEyes, BsCardImage, BsCameraVideo } from 'react-icons/bs'

import ImgCircle from '../../elements/imgCircle/ImgCircle'
import Button from '../../elements/buttons/Button'

import Subscriber from '../../../entities/Subscriber'
import PostCarousel from '../../utils/carousels/PostCarousel'
import DisplayPhoto from './DisplayPhoto'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import { instance, ressourcesUrl } from "../../../utils/url"
import LoaderCircle from "../loaders/Loader"
import postsContext from '../../../dataManager/context/postsContext'
import "../../../css/app.css"
import { formatName } from '../../../utils/format'
import { Autocomplete, TextField } from '@mui/material'
import CategoryItem from '../../marketing/pageSections/social/categoryItem'
import CategoryApi from '../../../api/categories'
import Category from '../../../entities/Category'

const WritePostModal2 = (props) => {
  const {
    // show, 
    onCloseModal
  } = props

  //constant
  const initialPostState = {
    title: "",
    categories: [],
    images: [],
    video: null
  }

  //context
  const { addPost } = useContext(postsContext)
  const { createPost } = useContext(currentUserContext)
  const { currentUser } = useContext(currentUserContext)

  const user = new Subscriber(currentUser)

  //ref
  const inputImagesRef = useRef()
  const inputVideoRef = useRef()
  const contentRef = useRef()

  //state variable
  const [postData, setPostData] = useState(initialPostState)
  const [indexImage, setIndexImage] = useState(0)
  // const [displayEditPost, setDisplayEditPost] = useState(false)
  const [displayImage, setDisplayImage] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [allCategories, setAllCategories] = useState([])


  // UseEffect section
  useEffect(() => {
    handleGetAllCategories()
  }, [])

  //handler
  const handleGetAllCategories = async () => {
    const { data, error } = await CategoryApi.getAll()

    if (data) {
      console.log(data)
      const categories = []

      for (let res of data) {
        categories.push(new Category(res))
      }

      setAllCategories(categories)
    } else {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    setPostData({ ...postData, [event.target.id]: event.target.value })
  }

  /**
   * Add a category
   */
  const handleAddCategories = () => {
    if (selectedCategory) {
      const postDataClone = { ...postData }

      if (!postDataClone.categories.some(cat => cat.name === selectedCategory.value)) {
        postDataClone.categories.push(new Category({
          id: selectedCategory.value,
          name: selectedCategory.label
        }))

        setPostData(postDataClone)
      }

      setSelectedCategory(null)
    }
  }

  /**
   * Delete a category basing on its id
   * @param {string} id 
   */
  const handleDeleteCategory = (id) => {
    const postDataClone = { ...postData }

    const index = postDataClone.categories.findIndex(cat => cat.id === id)

    if (index > -1) {
      postDataClone.categories.splice(index, 1)

      setPostData(postDataClone)
    }
  }

  //submit data post
  const handleSubmit = (event) => {
    event.preventDefault()

    const contentPost = contentRef.current.innerHTML

    if (verificationForm()) {

      const fileType = postData.video ? "video" : "image"
      const {
        title,
        images,
        video,
        categories
      } = postData

      //send a FormData when post data content files
      const dataToSend = new FormData()

      const categoriesToSend = categories.map(cat => cat.getId)

      dataToSend.append("title", title)
      dataToSend.append("content", contentPost)
      dataToSend.append("fileType", fileType)

      dataToSend.append("categoryList", "")

      categoriesToSend.forEach(cat => {
        dataToSend.append("categoryList", cat)
      })

      if (video) {
        dataToSend.append("video", inputVideoRef.current.files[0])
      }

      if (images.length) {
        images.forEach((_, index) => {
          dataToSend.append("images", inputImagesRef.current.files[index])
        })
      }

      //stratloading
      setLoading(true)

      const url = postData.images.length === 0 ? "video" : "images"

      //send data 
      instance.post(`/posts/create/${url}`, dataToSend)
        .then(res => {
          setLoading(false)
          onCloseModal()

          // we add the post inside the social page
          addPost(res.data.data)

          // we add the post inside the profile of the current user
          createPost(res.data.data)
        })
        .catch(err => {
          console.log(err)

          setLoading(false)
        })
    } else {
      console.log("terminer la redaction de post")
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
    setLoading(false)
    onCloseModal()
  }

  const {
    title,
    content,
    categories
    // images,
    // video
  } = postData

  const verificationForm = () => {
    const {
      title,
      categories
    } = postData
    const contentPost = contentRef?.current?.innerHTML

    if (title && contentPost && categories.length > 0) return true

    return false
  }


  return (
    <>
      <section className={styles.writePostModalSection}>
        <form className={`${styles.writePostModalForm}`}>
          <div className="flex items-center justify-start space-x-2">
            <ImgCircle
              src={ressourcesUrl.profil + "/" + user.getProfil}
              size="medium"
              alt="image du current user"
            />

            <div>
              <span className="block font-bold text-md font-primary">{formatName(user.getName)}</span>
              <span className="block text-sm font-primary">@{user.getUsername}</span>
            </div>
          </div>

          {/* Category section */}

          <section className={styles.postCategoryContainer}>
            <div className={styles.postCategoryTop}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={
                  allCategories.map(category => ({
                    label: category.getName,
                    value: category.getId
                  }))
                }
                fullWidth
                onChange={(_, category) => setSelectedCategory(category)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={selectedCategory}
                renderInput={(params) => <TextField {...params} variant="standard" label="Categories" />}
              />

              <Button action={handleAddCategories}>Ajouter</Button>
            </div>

            <div className={styles.postCategoryBottom}>
              {
                categories.map(categorie => (
                  <CategoryItem
                    key={categorie.getId}
                    value={categorie.getName}
                    id={categorie.getId}
                    onDelete={handleDeleteCategory}
                  />
                ))
              }
            </div>
          </section>

          {/* Title section */}

          <input
            type="text"
            id="title"
            name="title-post"
            placeholder="Titre de l'article"
            value={title}
            onChange={handleChange}
            className={`${styles.postTitle} block w-full py-0.5 mx-0 w-full mt-8 bg-white focus:outline-none`}
          />

          {/* Content section */}

          <div
            ref={contentRef}
            id="content"
            contentEditable="true"
            className={`${styles.postEditor} block focus:border-0 border-none w-full my-14 w-full text-gray-800`}
            value={content}
            placeholder="développer votre idée"
          >
          </div>

          {
            postData.images.length > 0 && (
              <PostCarousel
                files={postData.images}
                onDisplayPhoto={handleDisplayImage}
                edited={false}
              />
            )

          }

          {
            postData.video !== null && (
              <div className="w-full h-full">
                <video src={postData.video} controls className="w-full h-full">
                  <source />

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
                color="#456445"
                className="cursor-pointer text-gray-900"
              />
            </li>
            <li>
              <BsCardImage
                color="#456445"
                className="cursor-pointer text-gray-900"
                onClick={handleSelectImages}
              />
              <input
                type="file"
                name="upload-photo"
                ref={inputImagesRef}
                hidden
                accept="image/*"
                multiple
                onChange={handleChangePostsImages}
              />
            </li>
            <li>
              <BsCameraVideo
                color="#456445"
                className="cursor-pointer text-gray-900"
                onClick={handleSelectVideo}
              />

              <input
                type="file"
                ref={inputVideoRef}
                hidden
                accept="video/*"
                onChange={handleChangePostsVideos}
              />
            </li>
          </ul>

          <div className="flex space-x-4">
            <Button
              theme="gray"
              action={resetPostData}
              classe={styles.writePostButtonControl}
            >
              annuler
            </Button>

            <input
              onClick={(event) => handleSubmit(event)}
              disabled={!verificationForm()}
              type="submit"
              value={"publier"}
              className={`${styles.writePostButtonControl} px-3 bg-primary text-white text-xs rounded hover:bg-primary-hover`}
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
            files={postData.images}
            indexFile={indexImage}
            edited={false}
            type={postData.images.length ? "images" : "video"}
            onHide={() => setDisplayImage(false)}
          />
        )
      }
    </>
  )
}

export default WritePostModal2