import React, { useContext } from 'react'
import postsContext from '../../../../dataManager/context/postsContext'
import Post from '../Post'

const ListPosts = () => {
	const {posts} = useContext(postsContext)
	console.log(posts)

	return(
		<div className="w-full flex flex-col">
			{
				posts.map(post => {
					return <Post postData={post} />
				})
			}
		</div>
	)
}

export default ListPosts