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
		<section>

		</section>
	)
}

export default BodySocial