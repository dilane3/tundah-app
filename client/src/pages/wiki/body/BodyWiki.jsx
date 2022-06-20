import React, { useEffect, useContext, useMemo, useCallback, useRef, useState } from 'react'
import WikiPost from '../../../components/marketing/pageSections/WikiPost'
import navigationContext from '../../../dataManager/context/navigationContext'
import postsContext from '../../../dataManager/context/postsContext'
import postsWikiContext from '../../../dataManager/context/postWikiContext'
import { instance } from '../../../utils/url'
import PostWikiApi from '../../../api/postWiki'
import { Box } from '@mui/material'

const BodyWiki = () => {
	// Get data from global state
	const { navigateTo } = useContext(navigationContext)
	const { wikiPosts, addPosts, setMoreWikiPostArgs, skip, next} = useContext(postsWikiContext)

	// local state
	const [loadingMorePosts, setLoadingMorePosts] = useState(false)

	// useCallback section
	const methodsCb = useCallback(() => {
		return {
			addPosts,
			setLoadingMorePosts,
			setMoreWikiPostArgs
		}
	}, 
	[addPosts, 
		setLoadingMorePosts, 
		setMoreWikiPostArgs
	])

	// defining the reference of an element
	const listPostWikiRef = useRef()
	const methodsRef = useRef(methodsCb)
	
	const postsData = useMemo(() => {
		return wikiPosts
	}, [wikiPosts])

	useEffect(() => {
		methodsRef.current = methodsCb
	}, [methodsCb])
	
	useEffect(() => {
		const {setLoadingMorePosts, addPosts, setMoreWikiPostArgs} = methodsRef.current()

		if (loadingMorePosts) {
			if (next) {
				setLoadingMorePosts(true)
				console.log({skip, next})

				instance.get(`/posts/wiki?skip=${skip}&limit=${2}`)
				.then(res => {
					const postData = res.data.data
					let nextValue = res.data.next
					let skipValue = res.data.skip
					console.log("Backend data",postData)
					// adding posts
					addPosts(postData)
	
					// setting posts arguments
					setMoreWikiPostArgs(nextValue, skipValue)
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

	// useEffect(() => {
	// 	// const { addPosts, setMorePostArgs} = methodsRef.current()
		
	// 	if (next) {
	// 		console.log("hello wiki")
	// 		// setLoadingMorePosts(true)
	// 		console.log({skip, next})
	// 		const {data } = PostWikiApi.getAll(skip)
	// 		console.log("data", data)
	// 		if( data ){
	// 			const postData = data
	// 			let nextValue = data.next
	// 			let skipValue = data.skip

	// 			addPosts(postData)
	// 			setMorePostArgs(nextValue, skipValue)
	// 		}
	// 	}
	// }, [skip, next, addPosts, setMorePostArgs])

	useEffect(() => {
		navigateTo("wiki")
	}, [navigateTo])

	return (
		<Box
			sx={{
				"& > article": {
					mb: 2
				}
			}}
			ref={listPostWikiRef}
		>
			{
				postsData.map(post => {
					return (
						<WikiPost
							key={post.id}
							postData={post}
						/>
					)
				})
			}

		</Box>
	)
}

export default BodyWiki