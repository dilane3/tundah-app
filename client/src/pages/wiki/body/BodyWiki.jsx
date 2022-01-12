import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router'
import ListPosts from '../../../components/marketing/pageSections/wiki/ListPosts'
import WritePost from '../../../components/marketing/pageSections/WritePost'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import navigationContext from '../../../dataManager/context/navigationContext'

const BodyWiki = () => {
	const {currentUser} = useContext(currentUserContext)
	const {navigateTo} = useContext(navigationContext)

	useEffect(() => {
		navigateTo("wiki")
	}, [])

	return(
		<>
			{
				currentUser ? <WritePost /> : null
			}
		 	<ListPosts />
		</>
	)
}

export default BodyWiki