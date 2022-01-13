import React, { useContext, useEffect, useMemo } from 'react'
import currentUserContext from '../../../../dataManager/context/currentUserContent'
import postsContext from '../../../../dataManager/context/postsContext'
import Post from '../Post'
import axios from 'axios'

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
})

// const instance = axios.create({
// 	baseURL: "http://192.168.43.81:5000/api",
// })

const ListPosts = () => {
	const {posts, likePost} = useContext(postsContext)
	const {currentUser, likeUserPost} = useContext(currentUserContext)

	const postsData = useMemo(() => {
		return posts
	}, [posts])


	// useEffect section
	useEffect(() => {
		const token = localStorage.getItem("tundah-token")

		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])
	
	useEffect(() => {
		console.log(posts)
	}, [posts])

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

	return(
		<div className="w-full flex flex-col">
			{
				postsData.map(post => {
					return <Post key={post.id} postData={post} onLikePost={handleLikePost} />
				})
			}
		</div>
	)
}

export default ListPosts