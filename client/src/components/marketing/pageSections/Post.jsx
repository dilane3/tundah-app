import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
//packages
import { BsHeartFill, BsHeart, BsThreeDotsVertical, BsChat } from "react-icons/bs"
//composans
import SocialPostDropdown from '../../utils/dropdowns/SocialPostDropdown'
import PostImg from '../../elements/imgCircle/ImgCircle'
import PostCarousel from '../../utils/carousels/PostCarousel'
import Post from '../../../entities/Post'
import LoaderCircle from '../../utils/loaders/Loader'

import "../../../css/post.css"
import DisplayPhoto from '../../utils/modals/DisplayPhoto'
import Subscriber from '../../../entities/Subscriber'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import { Link } from 'react-router-dom'
import { ressourcesUrl } from "../../../utils/url"
import { getRelativeDate } from '../../../utils/dateOperations'
import ProfilPopover from '../../utils/popovers/profilPopover'
import { Box, Typography } from '@mui/material'

const imagesExtensions = ["jpeg", "png", "gif", "bmp", "jpg"]
const checkCurrentUser = (author, currentUser) => {
	if (!currentUser) return false
	return author.getId === currentUser.id
}

const PostComponent = ({ postData, onLikePost, type }) => {
	const target = useMemo(() => type ? type : "social", [type])

	// getting data from the global state
	const { currentUser } = useContext(currentUserContext)

	// Set local state
	const [isHover, setIsHover] = useState(false)

	// getting props values
	let post = new Post(postData)

	//ref
	const postContentRef = useRef()

	// definition of the local state
	const [showDisplayPhotoModal, setShowDisplayPhotoModal] = useState(false)
	const [indexFile, setIndexFile] = useState(0)
	const [relativeDate, setRelativeDate] = useState(getRelativeDate(post.getCreationDate))
	const [isLoading, setLoading] = useState(false)


	const author = new Subscriber(post.getAuthor)

	// useEffect section

	useEffect(() => {
		const timer = setInterval(() => {
			setRelativeDate(getRelativeDate(post.getCreationDate))
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	})

	useEffect(() => {
		postContentRef.current.innerHTML = post.getContent
	}, [post.getContent])


	// some actions methods
	const handleDisplayPhoto = (index) => {
		setIndexFile(index)

		setShowDisplayPhotoModal(true)
	}


	// This function format the likes number and comment number
	// so that we can have 10K likes for example
	const formatLikesOrComment = (value) => {
		if (value < 1000) {
			return value.toString()
		} else if (value < 1000000) {
			return `${Math.floor(value / 1000)}K`
		} else {
			return `${Math.floor(value / 1000)}M`
		}
	}

	const checkExtension = (str) => {
		const tabSplit = str.split(".")
		const extension = tabSplit[tabSplit.length - 1]

		return imagesExtensions.includes(extension)
	}

	return (
		<article className="bg-white w-full font-primary mx-auto rounded-sm" style={{ border: "1px solid rgb(206, 206, 206)" }}>
			{
				target === 'social' ? (
					<header className="flex justify-between items-center pb-3 px-2 pt-2">
						<div className="flex items-center space-x-1 lg:space-x-2 ">
							<PostImg
								size="small"
								alt="wangue fenyep"
								src={`${ressourcesUrl.profil}/${checkCurrentUser(author, currentUser) ? currentUser.profil : author.getProfil}`}
							/>
							<div className="flex flex-col space-y-1 author-info">
								<div
									onMouseEnter={() => setIsHover(true)}
									onMouseLeave={() => setIsHover(false)}
								>
									<Link to={`/profile/${author.getUsername}`}>
										<span
											className="author-post-username text-sm md:text-lg font-bold"
										>{author.getName[0].toUpperCase() + author.getName.substr(1).toLowerCase()}</span>

									</Link>

									{
										isHover && <ProfilPopover authorData={author} />
									}
								</div>
								<span className="text-xs text-gray-500">{relativeDate}</span>
							</div>
						</div>

						{
							currentUser ? (
								<div>
									<SocialPostDropdown
										dropElt={<BsThreeDotsVertical size="25" className="icon" />}
										idPost={post.getId}
										idAuthor={author.getId}
										onLoading={(status) => setLoading(status)}
									/>
								</div>
							) : null
						}

					</header>
				) : (
					<Box
						sx={{
							width: "100%",
							pt: 2,
							px: 1,
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end"
						}}
					>
						<Typography
							sx={{
								fontSize: "12px",
								color: "#555"
							}}
						>{getRelativeDate(post.getCreationDate)}</Typography>
					</Box>
				)
			}

			<main className="">
				<div className="post-title font-bold text-base">
					{post.getTitle[0].toUpperCase() + post.getTitle.substr(1).toLowerCase()}
				</div>
				<Link to={`/posts/${post.getId}`}>
					<div ref={postContentRef} className="px-2 pb-4"></div>
				</Link>

				{
					post.getFilesList.length > 0 ? (
						checkExtension(post.getFilesList[0]) ? (
							<PostCarousel
								files={post.getFilesList}
								onDisplayPhoto={(index) => handleDisplayPhoto(index)}
								edited={true}
							/>
						) : (
							<video controls className="w-full h-full mt-4">

								<source src={`${ressourcesUrl.postVideos}/${post.getFilesList[0]}`}
									type="video/webm" />

								Sorry, your browser doesn't support embedded videos.
							</video>
						)
					) : null
				}
			</main>

			{
				currentUser && target === 'social' ? (
					<footer className="post-footer mt-3 pb-2 px-2 md:mt-3 flex items-center space-x-6">
						<div className="flex items-center space-x-1" onClick={() => onLikePost(post.getId)}>
							{
								post.getLikes.includes(currentUser.id) ? (
									<BsHeartFill size="20" className="icon" color="rgb(218, 18, 18)" />
								) : (
									<BsHeart size="20" className="icon" />
								)
							}
							<span className="text-xs md:text-sm">{formatLikesOrComment(post.getLikes.length)}</span>
						</div>

						<div className="flex items-center space-x-1">
							<Link to={`/posts/${post.getId}`}>
								<BsChat size="20" className="icon" />
							</Link>
							<span className="text-xs md:text-sm">{formatLikesOrComment(post.getComments)}</span>
						</div>
					</footer>
				) : null
			}

			{
				showDisplayPhotoModal ? (
					<DisplayPhoto
						files={post.getFilesList}
						indexFile={indexFile}
						type="images"
						onHide={() => setShowDisplayPhotoModal(false)}
					/>
				) : null
			}

			{
				isLoading && <LoaderCircle size="100" color="#3c6a46" />
			}
		</article>
	)
}

export default PostComponent