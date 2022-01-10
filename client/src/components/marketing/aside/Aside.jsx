import React, { useContext } from 'react'
import styles from '../../../css/aside.module.css'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import {BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import Subscriber from '../../../entities/Subscriber'

const image = require("../../../medias/img/test.jpg")

const StatPostItem = ({title, number}) => {
	return (
		<div className={styles.profilCardStats}>
			<div>
				<BsPlusCircleFill />
				<span>{title}</span>
			</div>

			<span>({number})</span>
		</div>
	)
}

const ProfilCard = () => {
	const {currentUser} = useContext(currentUserContext)

	const user = new Subscriber(currentUser)

	const formatName = (name) => {
		return name[0].toUpperCase() + name.substr(1)
	}

	return (
		<article className={styles.profilCard}>
			<div className={styles.profilCardTop}>
				<div>
					<ImgCircle src={user.getProfil} alt="profil" classe={styles.profilCardTopImage} />

					<div className={styles.profilCardInfo}>
						<span>{formatName(user.getName)}</span>
						<span>@{user.getUsername}</span>
					</div>
				</div>
				<span>
					{user.getDescription ? user.getDescription : "--"}
				</span>
			</div>
			<div className={styles.profilCardBottom}>
				<StatPostItem title="postes proposés" number={20} />
				<StatPostItem title="postes validés" number={12} />
				<StatPostItem title="postes archivés" number={8} />
			</div>
		</article>
	)
}

const Navigation = () => {
	const {currentUser} = useContext(currentUserContext)

	const user = new Subscriber(currentUser)

	return (
		<section className={styles.navigationSection}>
			<div className={`${styles.navigationItem} ${styles.navigationItemActive}`}>
				<Link to="/wiki/feed" style={{width: "100%"}}>
					<span>W</span>
					<span>Wiki</span>
				</Link>
			</div>

			{
				user.getRole === 1 ? (
					<>
						<div className={`${styles.navigationItem}`}>
							<Link to="/proposal_posts" style={{width: "100%", display: "flex", flexDirection: "row"}}>
								<BsJournals />
								<span>Postes Proposes</span>
							</Link>
						</div>

						<div className={`${styles.navigationItem}`}>
							<BsPersonCheck />
							<span>Gerer les experts</span>
						</div>
					</>
				):null
			}

			<div className={`${styles.navigationItem}`}>
				<BsGear />
				<span>Reglage</span>
			</div>
		</section>
	)
}

const Aside = ({className, location}) => {
	const {currentUser} = useContext(currentUserContext)

	return(
		<aside className={className}>
			{
				currentUser ? <ProfilCard /> : null
			}

			<Navigation location={location}/>
		</aside>
	)
}

export default Aside