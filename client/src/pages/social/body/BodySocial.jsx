import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/marketing/navbar/Navbar'
import Loader from '../../../components/utils/Loader'
import BigContainer from '../../../components/utils/BigContainer'
import axios from 'axios'

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
})

const BodySocial = () => {
	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem("tundah-token")
		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return(
		<section>

		</section>
	)
}

export default BodySocial