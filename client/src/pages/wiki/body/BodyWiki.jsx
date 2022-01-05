import React, { useState, useEffect } from 'react'
import Paragraphe from '../../../components/elements/p/Paragraphe'
import Loader from '../../../components/utils/Loader'
import Post from '../../../components/marketing/pageSections/social/Post'
import BigContainer from '../../../components/utils/BigContainer'



import signupImg from '../../../medias/img/signup-img.png'

const BodyWiki = () => {

	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])


	return(
		<section>
			Wiki page
		</section>
	)
}

export default BodyWiki