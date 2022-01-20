import React, { useEffect, useContext } from 'react'
import ListPosts from '../../../components/marketing/pageSections/wiki/ListPosts'
import navigationContext from '../../../dataManager/context/navigationContext'

const BodyWiki = () => {
	const {navigateTo} = useContext(navigationContext)

	useEffect(() => {
		navigateTo("wiki")
	}, [navigateTo])

	return(
		<>
		 	<ListPosts />
		</>
	)
}

export default BodyWiki