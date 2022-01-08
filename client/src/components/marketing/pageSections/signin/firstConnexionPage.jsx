import React from "react"
import styles from '../../../../css/signin.module.css'
import {Image} from 'react-image-progressive-loading'

const image = require("../../../../medias/img/signin-img.png")

const FirstConnexionPage = () => {
	return (
		<section className={styles.signinSectionLeft}>
			<div className={styles.signinSectionLeftContainer}>
				<span className={styles.signinSectionLeftLogo}>
					Tundah
				</span>

				<h3 className={styles.signinSectionLeftText}>
					Conservons les valeurs enseignees par nos 
					<span className="text-yellow-400"> ancetres </span>
						et transmettons les a notre 
 					<span className="text-yellow-400"> progeniture</span>
				</h3>

				<Image image={image} className={styles.signinSectionLeftImage} />
			</div>
		</section>
	)
}

export default FirstConnexionPage;