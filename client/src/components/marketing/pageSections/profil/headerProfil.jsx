import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsCameraFill, BsX } from 'react-icons/bs'
import { BsGeoAlt } from 'react-icons/bs'
import { MdContactMail, MdDashboard } from 'react-icons/md'
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
import { useParams } from 'react-router'
import CategoryContext from '../../../../dataManager/context/categoryContext'
import UserApi from '../../../../api/users'
import ModalContext from '../../../../dataManager/context/modalContext'

const checkUsername = (username, currentUser) => {
	return username === currentUser.username
}

const sortPostByDate = (posts) => {
	return posts.sort((p1, p2) => p2.creation_date - p1.creation_date)
}

const StatPostItem = ({ title, number }) => {
	return (
		<div className="profilCardPost">
			<span>{title} ({number})</span>
		</div>
	)
}

const HeaderProfil = () => {
	// getting data from the global state
	const { currentUser, updateProfil, likeUserPost, addFollowing, deleteFollowing } = useContext(currentUserContext)
	const { likePost } = useContext(postsContext)
	const { openModal } = useContext(CategoryContext)
	const { openModal: handleOpenModal } = useContext(ModalContext)


	// username passed inside the url
	const { username } = useParams()

	// setting up of the local state
	const [deleteProfilLoader, setDeleteProfilLoader] = useState(false)
	const [displayProfilUpload, setDisplayProfilUpload] = useState(false)
	const [profilData, setProfilData] = useState("")
	const [percentageUploadProfil, setPercentageUploadProfil] = useState(0)
	const [uploading, setUploading] = useState(false)
	const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)
	const [postTypeToShow, setPostTypeToShow] = useState("published") // define the type of posts to show
	const [isCurrentUser, setIsCurrentUser] = useState(checkUsername(username, currentUser)) // check if the username passed in the url is for the current user or not
	const [user, setUser] = useState(checkUsername(username, currentUser) ? new Subscriber(currentUser) : null) // store the other user 
	const [loadingUser, setLoadingUser] = useState(checkUsername(username, currentUser) ? false : true)

	// use ref
	const updloadProfilRef = useRef()

	// useEffect section

	useEffect(() => {
		if (checkUsername(username, currentUser)) {
			setIsCurrentUser(false)
			setUser((new Subscriber(currentUser)))
			setLoadingUser(false)
		} else {
			setLoadingUser(true)
		}
	}, [username])

	useEffect(() => {
		const token = localStorage.getItem("tundah-token")
		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])

	useEffect(() => {
		if (percentageUploadProfil === 100) {
			setUploading(false)
		}
	}, [percentageUploadProfil])

	useEffect(() => {
		if (!isCurrentUser) {
			instance.get(`/users/${username}`)
				.then(res => {
					if (res.data) {
						const data = res.data
						console.log(data)

						setUser(new Subscriber(data))
						setLoadingUser(false)
					} else {
						// to change
						window.location.href = "/"
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [isCurrentUser, username])

	useEffect(() => {
		if (isCurrentUser) {
			setUser((new Subscriber(currentUser)))
		}
	}, [currentUser, isCurrentUser])

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
				const { loaded, total } = progressEvent

				const percentage = Math.floor((loaded * 100) / total)

				setPercentageUploadProfil(percentage)
			}
		}

		// display the progress bar for uploading photo
		setUploading(true)

		instance.post("/users/change_profil", formData, uploadOption)
			.then(res => {
				setPercentageUploadProfil(0)

				// Update profile photo of the currentuser in the global state
				updateProfil(res.data.profil)

				// Update the profile photo in the profile page
				const prevUser = new Subscriber(user)

				prevUser.setProfil(res.data.profil)

				setUser(prevUser)

				// Mask the modal
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

	// this methods allow the current user to like a post which is owned by another user
	// whose the profil is displayed
	const likeOtherUserPost = (idPost, idUser) => {
		const userClone = new Subscriber({ ...user.getUserData })

		const newPosts = userClone.posts.map(post => {
			if (post.id === idPost) {
				post = post.likePost(idUser)
			}

			return post
		})

		const newUser = new Subscriber({ ...userClone.getUserData, posts: newPosts })

		setUser(newUser)
	}

	const handleLikePost = (idPost) => {
		// we verify if the post liked if for the current user or not
		if (checkUsername(username, currentUser)) {
			likePost(idPost, currentUser.id)
			likeUserPost(idPost)
		} else {
			likePost(idPost, currentUser.id)

			likeOtherUserPost(idPost, currentUser.id)
		}

		instance.post(`/posts/like/${idPost}`)
			.then((res) => {
				console.log(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const handleFollowUser = async (e, user) => {
		e.preventDefault()

		try {
			const type = currentUser.alreadyFollowed(user.getId) ? "unfollow" : "follow"

			const { data, error } = await UserApi.follow({ type, userId: user.getId })

			if (data) {
				if (type === "follow") {
					addFollowing(user)

					const updatedUser = (new Subscriber({ ...user }))

					updatedUser.addFollower(currentUser)

					setUser(updatedUser)
				} else {
					deleteFollowing(user.getId)

					const updatedUser = (new Subscriber({ ...user }))

					updatedUser.deleteFollower(currentUser.getId)

					setUser(updatedUser)
				}
			} else {
				console.log(error)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			{
				!loadingUser ? (
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
								) : null
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

										{
											checkUsername(username, currentUser) ? (
												<>
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
												</>
											) : null
										}

									</div>

									<div className="profilInfo">
										<span className="name">{formatName(user.getName)}</span>
										<span className="username">@{user.getUsername}</span>

										<div className='profilFollowSection'>
											<div className="BsJournals">
												<BsGeoAlt size={20} />
												<span className="town">{user.getCountry}</span>
											</div>

											{
												!checkUsername(username, currentUser) && (
													<button className={`btn-follow ${currentUser.alreadyFollowed(user.getId) && "followed"}`} onClick={(e) => handleFollowUser(e, user)}>
														{
															currentUser.alreadyFollowed(user.getId) ? "Se désabonner" : "S'abonner"
														}
													</button>
												)
											}
										</div>
									</div>
								</div>
								<div className="profilDescription">
									{user.getDescription}
								</div>
								<div className="profilFollower">
									<div className='profilFollowerTop'>
										<div className="iconContact">
											<div className="MdContactMai" >
												<MdContactMail />
											</div>
											<div> contact</div>
										</div>

										<div className="iconContact" onClick={() => handleOpenModal("Categories", "SELECT_CATEGORIES")}>
											<div className="MdContactMai">
												<MdDashboard />
											</div>
											<span>Categories</span>
										</div>
										{
											checkUsername(username, currentUser) ? (
												<div className="iconContact" onClick={() => handleOpenModal("Editer Profil", "PROFILE_UPDATE")}>
													<div className="AiOutlineEdit"> <AiOutlineEdit /> </div>
													<div> Editer profil</div>
												</div>
											) : null
										}
									</div>

									<section className='profilFollowerBottom' onClick={() => handleOpenModal("Abonnements & Abonnés", "USERS_INFO")}>
										<div className='profileFollowerItem'>
											<span>{user.getFollowers.length}</span>
											<span>Abonnés</span>
										</div>

										<div className='profileFollowerItem'>
											<span>{user.getFollowings.length}</span>
											<span>Abonnements</span>
										</div>
									</section>
								</div>
								<div className="profilPost">
									<div
										className={`active`}
										onClick={() => setPostTypeToShow("published")}
									>
										<StatPostItem title="postes publiés" number={user.getPublishedPosts.length} />
									</div>
								</div>
							</div>
						</div>

						<section className="postsList">
							{
								sortPostByDate(user.getPublishedPosts).map(post => {
									return <Post key={post.id} postData={post} onLikePost={handleLikePost} />
								})
							}
						</section>
					</>
				) : (
					<div className="profil-loaderSection">
						<LoaderCircle color="#3c6a46" size={60} />
					</div>
				)
			}
		</>
	)
}

export default HeaderProfil;