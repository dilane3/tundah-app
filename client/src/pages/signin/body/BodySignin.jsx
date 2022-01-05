import React, { useState, useEffect } from 'react'
import Paragraphe from '../../../components/elements/p/Paragraphe'
import Loader from '../../../components/utils/Loader'
import FirstConnexionPage from '../../../components/marketing/pageSections/signin/firstConnexionPage'



const BodySingnin = () => {

	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return(
		<div className=''>
		     <FirstConnexionPage/>
		     {/* delete this line and you can import and add other page sections here */}
		     { showLoader && <Loader /> }{/* vous pouvez aussi supprimer ce loader c'est juste la pour vous montrer qu'il est monte */}

		</div>
	)
}

export default BodySingnin