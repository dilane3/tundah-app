import React, { useState, useEffect } from 'react'
import Paragraphe from '../../../components/elements/p/Paragraphe'
import Navbar from '../../../components/marketing/navbar/Navbar'
import Loader from '../../../components/utils/Loader'


const BodyTemsUses = () => {

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
			<Paragraphe>page des conditions d'utilisations</Paragraphe>{/* delete this line and you can import and add other page sections here */}
		 { showLoader && <Loader /> }{/* vous pouvez aussi supprimer ce loader c'est juste la pour vous montrer qu'il est monte */}

		</> 
	)
}

export default BodyTemsUses