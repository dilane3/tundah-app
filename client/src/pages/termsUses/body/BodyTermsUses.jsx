import React, { useState, useEffect } from 'react'
import Paragraphe from '../../../components/elements/p/Paragraphe'
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
		<section>
			Terms Uses page
		</section>
	)
}

export default BodyTemsUses