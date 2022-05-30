import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import navigationContext from '../../../dataManager/context/navigationContext'
import ListPosts from '../../../components/marketing/pageSections/wiki/ListPosts'

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
})

const BodySocial = () => {
	const { navigateTo } = useContext(navigationContext)

	useEffect(() => {
		navigateTo("social")
	}, [navigateTo])

	useEffect(() => {
		const token = localStorage.getItem("tundah-token")
		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])

	return (
		<>
			<ListPosts />
		</>
	)
}

export default BodySocial