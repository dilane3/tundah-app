import React from 'react'
import styles from '../../../css/navbar.module.css'
import Input from '../../elements/input/Input'
import {BsChevronDown} from 'react-icons/bs'
import ImgCircle from '../../elements/imgCircle/ImgCircle'

const image = require("../../../medias/img/test.jpg")

const Navbar = ({className}) => {

	return(
		<header className={className}>
			<div className={styles.headerLogo}>
				<span>Tundah</span>
			</div>
			<div className={styles.headerSearchEngine}>
				<Input 
					type="search"
					placeholder="Faites une recherche..."	
				/>
			</div>
			<div className={styles.headerProfil}>
				<div className={styles.headerProfilIcon}>
					<ImgCircle src={image} alt={"profil"} size="small" />

					<BsChevronDown />
				</div>
			</div>
		</header>
	)
}

export default Navbar