import React, { useState, useEffect } from 'react'
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
		<div>
			Profil section
		</div>
	)
}

export default BodyProfile