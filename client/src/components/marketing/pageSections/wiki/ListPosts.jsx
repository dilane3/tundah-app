import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import currentUserContext from '../../../../dataManager/context/currentUserContent'
import postsContext from '../../../../dataManager/context/postsContext'
import Post from '../Post'
import '../../../../css/post.css'
import { instance } from '../../../../utils/url'
import LoaderCircle from '../../../utils/loaders/Loader'

const ListPosts = () => {
	const {
		posts, 
		skip, 
		next, 
		likePost, 
		setMorePostArgs, 
		addPosts
	} = useContext(postsContext)
	const {currentUser, likeUserPost} = useContext(currentUserContext)

	// local state
	const [loadingMorePosts, setLoadingMorePosts] = useState(false)

	// defining the reference of an element
	const listPostRef = useRef()

	const postsData = useMemo(() => {
		return posts
	}, [posts])


	// useEffect section
	useEffect(() => {
		const token = localStorage.getItem("tundah-token")

		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])

	const handleLikePost = (id) => {
		instance.post(`/posts/like/${id}`)
		.then((res) => {
			console.log(res.data)
		})
		.catch(err => {
			console.log(err)
		})
		.then(() => {
			likePost(id, currentUser.id)
			likeUserPost(id)
		})
	}

	useEffect(() => {
		window.onscroll = (event) => {
			if (listPostRef.current) {
				const wrapperHeight = window.scrollY
				const contentHeight = listPostRef.current.offsetHeight - 500
				const space = contentHeight - wrapperHeight

				if (next) {
					if (space < 150) {
						setLoadingMorePosts(true)
					}
				}
			}
		}
	}, [skip, next])

	useEffect(() => {
		if (loadingMorePosts) {
			if (next) {
				setLoadingMorePosts(true)
				console.log({skip, next})

				instance.get(`/posts?skip=${skip}&limit=${2}`)
				.then(res => {
					const postData = res.data.data
					let nextValue = res.data.next
					let skipValue = res.data.skip
	
					// adding posts
					addPosts(postData)
	
					// setting posts arguments
					setMorePostArgs(nextValue, skipValue)
				})
				.catch(err => {
					console.log(err)
				})
				.finally(() => {
					console.log("geroge")
					setLoadingMorePosts(false)
				})
			} else {
				setLoadingMorePosts(false)
			}
		}
	}, [skip, next, loadingMorePosts])

	const sortPostByDate = (posts) => {
		return posts.sort((p1, p2) => p2.creation_date - p1.creation_date)
	}

	return(
		<div ref={listPostRef} className={`w-full flex flex-col listPost`}>
			{
				sortPostByDate(postsData).map(post => {
					return <Post key={post.id} postData={post} onLikePost={handleLikePost} />
				})
			}

			{
				loadingMorePosts ? (
					<div className="postsLoader">
						<LoaderCircle color="#3c6a46" size={60} />
					</div>
				):null
			}
		</div>
	)
}

export default ListPosts