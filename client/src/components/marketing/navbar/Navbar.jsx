import React, { useContext, useEffect, useState } from 'react'
import styles from '../../../css/navbar.module.css'
import Input from '../../elements/input/Input'
import { BsChevronDown, BsSearch, BsJustify } from 'react-icons/bs'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import NavbarProfilDropdown from '../../utils/dropdowns/NavbarProfilDropdown'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import { Link } from 'react-router-dom'
import Subscriber from '../../../entities/Subscriber'
import { ressourcesUrl } from '../../../utils/url'

const logo = require("../../../medias/logo/Tundah-large.png")

const Navbar = ({ className, onShowMobileMenu }) => {
	const { currentUser } = useContext(currentUserContext)

	const [researchQuery, setResearchQuery] = useState("")

	const handleChange = event => {

		event.preventDefault();

		setResearchQuery(event.target.value);
	}

	const user = new Subscriber(currentUser)

	return (
		<header className={className}>
			<div className={styles.headerLogo}>
				<div className={styles.headerMenuIcon} onClick={onShowMobileMenu}>
					<BsJustify />
				</div>
				<img src={logo} alt="logo" />
			</div>
			<div className={styles.headerSearchEngine}>
				<Input
					type="search"
					placeholder="Faites une recherche..."
					handleChange={handleChange}
				/>

				<Link to={{
					pathname: '/search',
					state: {
						researchQuery: researchQuery
					}
				}}>
					<div className={styles.headerSearchEngineIcon}>
						<BsSearch />
					</div>
				</Link>

			</div>
			<div className={styles.headerProfil}>
				<div className={styles.headerProfilIcon}>
					{
						currentUser ? (
							<>
								<ImgCircle src={`${ressourcesUrl.profil}/${user.getProfil}`} alt={"profil"} />

								<NavbarProfilDropdown
									dropElt={<BsChevronDown className="icon" />}
								/>
							</>
						) : (
							<Link to="/signin">
								<button className={styles.headerProfilButton}>se connecter</button>
							</Link>
						)
					}
				</div>
			</div>
		</header>
	)
}

export default Navbar