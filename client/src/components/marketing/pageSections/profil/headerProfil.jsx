import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsCameraFill, BsX } from 'react-icons/bs'
import { BsGeoAlt } from 'react-icons/bs'
import { MdContactMail } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import './profilStyle.css'
import currentUserContext from '../../../../dataManager/context/currentUserContent'
import Subscriber from '../../../../entities/Subscriber'
import Post from '../Post'
import { instance, ressourcesUrl } from '../../../../utils/url'
import LoaderCircle from '../../../utils/loaders/Loader'
import AddProfilPhotoModal from '../../../utils/modals/AddProfilPhotoModal'
import DisplayPhoto from '../../../utils/modals/DisplayPhoto'
import postsContext from '../../../../dataManager/context/postsContext'

const image1 = require("../../../../medias/img/chinoise.jpg")
const image2 = require("../../../../medias/img/mariage.jpg")
const image3 = require("../../../../medias/img/test.jpg")

// const profilUpdate

const StatPostItem = ({title, number}) => {
	return (
		<div className="profilCardPost">
		    <span>{title} ({number})</span>
		</div>
	)
}

const HeaderProfil  = () => {
    // getting data from the global state
    const {currentUser, updateProfil, likeUserPost} = useContext(currentUserContext)
    const {likePost} = useContext(postsContext)
    let user = new Subscriber(currentUser)

    // setting up of the local state
    const [deleteProfilLoader, setDeleteProfilLoader] = useState(false)
    const [displayProfilUpload, setDisplayProfilUpload] = useState(false)
    const [profilData, setProfilData] = useState("")
    const [percentageUploadProfil, setPercentageUploadProfil] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)
    const [postTypeToShow, setPostTypeToShow] = useState("published")

    // use ref
    const updloadProfilRef = useRef()

    useEffect(() => {
        const token = localStorage.getItem("tundah-token")
        instance.defaults.headers.common["authorization"] = `Bearer ${token}`
    }, [])

    useEffect(() => {
        if (percentageUploadProfil === 100) {
            setUploading(false)
        }
    }, [percentageUploadProfil])

    const formatName = (name) => {
		return name[0].toUpperCase() + name.substr(1)
	}

    // this function allow a user to delete his profil photo
    const deleteProfil = () => {
        setDeleteProfilLoader(true)

        instance.post("/users/delete_profil")
        .then(res => {
            updateProfil(res.data.profil)
        })
        .catch(err => {
            console.log(err)
        })
        .then(() => {
            setDeleteProfilLoader(false)
        })
    }

    // this function allow a user to upload his profil photo
    const uploadProfil = () => {
        const formData = new FormData()
        const fileImg = updloadProfilRef.current.files[0]

        formData.append("profil", fileImg)

        // progressive loading
        const uploadOption = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent

                const percentage = Math.floor((loaded * 100)/total)

                console.log(`${loaded}B on ${total}B | percentage = ${percentage}`)

                setPercentageUploadProfil(percentage)
            }
        }

        // display the progress bar for uploading photo
        setUploading(true)

        instance.post("/users/change_profil", formData, uploadOption)
        .then(res => {
            setPercentageUploadProfil(0)
            updateProfil(res.data.profil)

            setDisplayProfilUpload(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleClickProfilPhotoUpload = () => {
        updloadProfilRef.current.click()
    }

    const handleChangeProfilPhotoUploadData = (event) => {
        const file = event.target.files[0]

        const preview = URL.createObjectURL(file)

        setProfilData(preview)
        setDisplayProfilUpload(true)
    }

    const handleLikePost = (idPost) => {
        instance.post(`/posts/like/${idPost}`)
		.then((res) => {
			console.log(res.data)
		})
		.catch(err => {
			console.log(err)
		})
		.then(() => {
            likeUserPost(idPost)
			likePost(idPost, currentUser.id)
		})
    }

    return(
        <>
            <div className="profil-content">

                {
                    displayProfilUpload ? (
                        <AddProfilPhotoModal 
                            onHide={() => setDisplayProfilUpload(false)} 
                            image={profilData}
                            onChangeProfil={handleClickProfilPhotoUpload}
                            onUploadProfil={uploadProfil}
                            percentage={percentageUploadProfil}
                            uploading={uploading}
                        />
                    ) : null
                }

                {
                    showDisplayPhotoModal ? (
                        <DisplayPhoto 
                            files={[user.getProfil]} 
                            type="profil"
                            onHide={() => setShowDisplayPhotoModal(false)}
                        />
                    ):null
                }

                <div className="informationContent"> 
                    <div className="header-profil">
                        <div className="header-profil-image-card">
                            <div className="profilImage">
                                <img 
                                    src={`${ressourcesUrl.profil}/${user.getProfil}`} 
                                    alt="profil"
                                    onClick={() => setShowDisplayPhotoModal(true)} 
                                />
                            </div>
                            <input 
                                ref={updloadProfilRef} 
                                type="file" 
                                hidden 
                                accept="image/*"
                                onChange={handleChangeProfilPhotoUploadData}
                            />

                            <span onClick={handleClickProfilPhotoUpload} title="changer de photo">
                                <BsCameraFill />
                            </span>

                            <div className="deleteProfil" onClick={deleteProfil} title="supprimer le profil">
                                <BsX />
                            </div>

                            {
                                deleteProfilLoader ? <LoaderCircle color="#3c6a46" size={30} /> : null
                            }
                            
                        </div>

                        <div className="profilInfo">
                            <span className="name">{formatName(user.getName)}</span>
                            <span className="username">@{user.getUsername}</span>
                            <div className="BsJournals">
                                <BsGeoAlt />
                                <span className="town">{user.getCountry}</span>
                            </div>
                        </div>
                    </div>
                    <div className="profilDescription">
                        {user.getDescription}
                    </div>
                    <div className="profilFollower">
                        <div className="iconContact">
                            <div className="MdContactMai" > <MdContactMail/> </div>
                            <div> contact</div>
                        </div>
                        <div className="iconEditerProfil">
                            <div className="AiOutlineEdit"> <AiOutlineEdit/> </div>
                            <div> Editer profil</div>
                        </div> 
                    </div>
                    <div className="profilPost">
                        {
                            !user.getRole ? (
                                <div 
                                    className={`${postTypeToShow === "proposed" ? "active":""}`}
                                    onClick={() => setPostTypeToShow("proposed")}
                                >
                                    <StatPostItem  title="postes proposés" number={user.getProposedPosts.length} />
                                </div>
                            ):null
                        }
                        <div 
                            className={`${postTypeToShow === "published" ? "active":""}`}
                            onClick={() => setPostTypeToShow("published")}
                        >
                            <StatPostItem title="postes publiés" number={user.getPublishedPosts.length} />
                        </div>
                    </div>
                </div>
            </div>

            <section className="postsList">
                {
                    postTypeToShow === "published" ? (
                        user.getPublishedPosts.map(post => {
                            return <Post key={post.id} postData={post} onLikePost={handleLikePost}/>
                        })
                    ):(
                        user.getProposedPosts.map(post => {
                            return <Post key={post.id} postData={post} onLikePost={handleLikePost}/>
                        })
                    )
                }
            </section>
        </>
    )
}

export default HeaderProfil;