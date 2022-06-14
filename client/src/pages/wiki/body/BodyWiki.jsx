import React, { useEffect, useContext } from 'react'
import WikiPost from '../../../components/marketing/pageSections/WikiPost'
import navigationContext from '../../../dataManager/context/navigationContext'
import postsContext from '../../../dataManager/context/postsContext'
import { Box } from '@mui/material'

const BodyWiki = () => {
	// Get data from global state
	const { navigateTo } = useContext(navigationContext)
	const { posts } = useContext(postsContext)

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
		>
			{
				posts.map(post => {
					return (
						<WikiPost
							postData={post}
						/>
					)
				})
			}

		</Box>
	)
}

export default BodyWiki