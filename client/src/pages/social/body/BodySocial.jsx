import React, { useEffect } from 'react'
import axios from 'axios'

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
})

const BodySocial = () => {

	useEffect(() => {
		const token = localStorage.getItem("tundah-token")
		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])

	return(
		<section>	
			Hello
		</section>
	)
}

export default BodySocial