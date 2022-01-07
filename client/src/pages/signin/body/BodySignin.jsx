import React, { useState, useEffect } from 'react'
import FirstConnexionPage from '../../../components/marketing/pageSections/signin/firstConnexionPage'
import SecondConnexionPage from '../../../components/marketing/pageSections/signin/secondConnexionPage'
import styles from '../../../css/signin.module.css'

const BodySingnin = () => {

	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => setShowLoader(false), 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return(
		<section className={styles.signinSection}>
		  <FirstConnexionPage/>

			<SecondConnexionPage />
		</section>
	)
}

export default BodySingnin