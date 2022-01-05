import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/marketing/navbar/Navbar'
import Loader from '../../../components/utils/Loader'
import Post from '../../../components/marketing/pageSections/social/Post'
import BigContainer from '../../../components/utils/BigContainer'




const BodySocial = () => {

	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return(
<<<<<<< HEAD
		<BigContainer>
		 <Navbar1 />
		 <Post />
		 { showLoader && <Loader /> }{/* vous pouvez aussi supprimer ce loader c'est juste la pour vous montrer qu'il est monte */}
		 
		</ BigContainer> 
=======
		<section>

		</section>
>>>>>>> f24f4a99df8e8adc6c7d6c63d250ea4a54c7d89e
	)
}

export default BodySocial