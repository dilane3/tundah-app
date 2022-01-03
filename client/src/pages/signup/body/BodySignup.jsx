import React, { useState, useEffect } from 'react'
import Loader from '../../../components/utils/Loader'
import SignupBlock from '../../../components/marketing/pageSections/signup/SignupBlock'



import signupImg from '../../../medias/img/signup-img.png'

const BodySingnup = () => {

	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return(
		<>
			<SignupBlock />
		 { showLoader && <Loader /> }{/* vous pouvez aussi supprimer ce loader c'est juste la pour vous montrer qu'il est monte */}
		</> 
	)
}

export default BodySingnup