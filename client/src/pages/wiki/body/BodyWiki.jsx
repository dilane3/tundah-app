import React, { useState, useEffect } from 'react'
import Paragraphe from '../../../components/elements/p/Paragraphe'
import Navbar1 from '../../../components/marketing/navbar/Navbar1'
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
		<BigContainer>
		 <Navbar1 />
		 <Post />
		</ BigContainer> 
	)
}

export default BodyWiki