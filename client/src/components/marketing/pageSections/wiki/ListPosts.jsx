import React from 'react'
import Post from '../Post'

const ListPosts = () => {

	return(
		<div className="w-full flex flex-col space-y-8">
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	)
}

export default ListPosts