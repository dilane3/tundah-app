import React from 'react'
import styles from '../../../css/navbar.module.css'
import Input from '../../elements/input/Input'
import {BsChevronDown, BsSearch, BsJustify} from 'react-icons/bs'
import ImgCircle from '../../elements/imgCircle/ImgCircle'


import NavbarProfilDropdown from '../../utils/dropdowns/NavbarProfilDropdown'

const image = require("../../../medias/img/test.jpg")

const Navbar = ({className, onShowMobileMenu}) => {

	return(
		<header className={className}>
			<div className={styles.headerLogo}>
				<div className={styles.headerMenuIcon} onClick={onShowMobileMenu}>
					<BsJustify />
				</div>
				<span>Tundah</span>
			</div>
			<div className={styles.headerSearchEngine}>
				<Input 
					type="search"
					placeholder="Faites une recherche..."	
				/>

				<div className={styles.headerSearchEngineIcon}>
					<BsSearch />
				</div>
			</div>
			<div className={styles.headerProfil}>
				<div className={styles.headerProfilIcon}>
					<ImgCircle src={image} alt={"profil"} />

					<NavbarProfilDropdown 
				    dropElt={ <BsChevronDown className="icon" /> } 
				  />
				</div>
			</div>
		</header>
	)
}

export default Navbar