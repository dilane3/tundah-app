import React, { useContext, useEffect } from 'react'
import AppProposalPost from '../../../components/marketing/pageSections/proposalPost/AppProposalPost'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import Post from '../../../entities/Post'


const BodyProposalPost = () => {
	const {
		currentUser,
		login,
		logout,
		deletePost,
		editPost,
		createPost,
		updateProfil,
		updateUser
	} = useContext(currentUserContext)

	useEffect(() => {

		if (!currentUser) {

			login({
				id: "oasdhfasdfkljaslf",
				name: "dilane",
				username: "dilane",
				email: "dilane3@gmail.com",
				date: 16738745234,
				role: 1,
				profil: "default.png",
				posts: [],
				country: "cameroon"
			})
		}

		
		if (currentUser) {
			console.log(currentUser)
			// const post = new Post({
			// 	id: "jlakshf;ae", 
			// 	title: "hello", 
			// 	content: "hello world", 
			// 	creation_date: 167803942, 
			// 	modification_date: 17937515, 
			// 	files_list: [], 
			// 	published: true, 
			// 	region: "ouest", 
			// 	tribe: "bagangte", 
			// 	comments: [], 
			// 	author: currentUser,
			// 	subAuthors: []
			// })
			// console.log({currentUser})
			// createPost(post)
			updateProfil("hello.png")
		}
	}, [])

	return(
		<section>
			<AppProposalPost/>
		</section>
	)
}

export default BodyProposalPost