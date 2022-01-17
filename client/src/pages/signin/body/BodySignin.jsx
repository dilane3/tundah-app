import React from 'react'
import FirstConnexionPage from '../../../components/marketing/pageSections/signin/firstConnexionPage'
import SecondConnexionPage from '../../../components/marketing/pageSections/signin/secondConnexionPage'
import styles from '../../../css/signin.module.css'

const BodySingnin = () => {
	return(
		<section className={styles.signinSection}>
		  <FirstConnexionPage/>

			<SecondConnexionPage />
		</section>
	)
}

export default BodySingnin