import React, { useContext } from 'react'
import styles from '../../../css/aside.module.css'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import { BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import Subscriber from '../../../entities/Subscriber'
import navigationContext from '../../../dataManager/context/navigationContext'
import { ressourcesUrl } from '../../../utils/url'

const StatPostItem = ({ title, number }) => {
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
	const { currentUser } = useContext(currentUserContext)

	const user = new Subscriber(currentUser)

	const formatName = (name) => {
		return name[0].toUpperCase() + name.substr(1)
	}

	return (
		<article className={styles.profilCard}>
			<div className={styles.profilCardTop}>
				<div>
					<ImgCircle src={`${ressourcesUrl.profil}/${user.getProfil}`} alt="profil" classe={styles.profilCardTopImage} />

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
				{
					!user.getRole ? (
						<StatPostItem title="postes proposés" number={user.getProposedPosts.length} />
					) : null
				}
				<StatPostItem title="postes publiés" number={user.getPublishedPosts.length} />
			</div>
		</article>
	)
}

const Navigation = ({ onShowAddExpertSection }) => {
	const { currentUser } = useContext(currentUserContext)
	const { navigation, navigateTo } = useContext(navigationContext)

	const user = new Subscriber(currentUser)

	return (
		<>
			<section className={styles.navigationSection}>
				<div
					className={`${styles.navigationItem} ${navigation === "wiki" ? styles.navigationItemActive : ""}`}
					onClick={() => { navigateTo("wiki") }}
				>
					<Link to="/" style={{ width: "100%" }}>
						<span>W</span>
						<span>Wiki</span>
					</Link>
				</div>

				{
					user ? (
						<>
							<div
								className={`${styles.navigationItem} ${navigation === "social" ? styles.navigationItemActive : ""}`}
								onClick={() => { navigateTo("social") }}
							>
								<Link to="/social" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
									<BsJournals />
									<span>Reseau social</span>
								</Link>
							</div>

							{/* <div className={`${styles.navigationItem}`} onClick={onShowAddExpertSection}>
								<BsPersonCheck />
								<span>Gerer les experts</span>
							</div> */}
						</>
					) : null
				}

				<div className={`${styles.navigationItem}`}>
					<BsGear />
					<span>Reglage</span>
				</div>
			</section>
		</>
	)
}

const Aside = ({ className, location, onShowAddExpertSection }) => {
	const { currentUser } = useContext(currentUserContext)

	return (
		<aside className={className}>
			{
				currentUser ? <ProfilCard /> : null
			}

			<Navigation location={location} onShowAddExpertSection={onShowAddExpertSection} />
		</aside>
	)
}

export default Aside