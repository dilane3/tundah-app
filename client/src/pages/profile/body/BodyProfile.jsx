import React, { useState, useEffect } from 'react'
import Loader from '../../../components/utils/Loader'
import AppProfilPost from '../../../components/marketing/pageSections/profil/AppProfilPost'

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
			<AppProfilPost/>
		</div>
	)
}

export default BodyProfile