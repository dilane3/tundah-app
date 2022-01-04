import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/marketing/navbar/Navbar'
import Loader from '../../../components/utils/Loader'



import signupImg from '../../../medias/img/signup-img.png'

const BodyProfile = () => {

	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return(
		<>
		 <Navbar />
			page de profil{/* import and add other page sections here */}
		 { showLoader && <Loader /> }{/* vous pouvez aussi supprimer ce loader c'est juste la pour vous montrer qu'il est monte */}

		</> 
	)
}

export default BodyProfile