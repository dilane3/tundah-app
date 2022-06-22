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
	const { wikiPosts, addPosts, setMoreWikiPostArgs, skip, next } = useContext(postsWikiContext)

	console.log(wikiPosts)
	const posts = useMemo(() => wikiPosts, [wikiPosts])

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
		// ref={listPostWikiRef}
		>
			{
				posts.map(post => {
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