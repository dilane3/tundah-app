import React from 'react'
import styles from '../../../css/aside.module.css'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import {BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear} from 'react-icons/bs'

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
	return (
		<article className={styles.profilCard}>
			<div className={styles.profilCardTop}>
				<ImgCircle src={image} alt="profil" classe={styles.profilCardTopImage} />

				<div className={styles.profilCardInfo}>
					<span>wangue fenyep</span>
					<span>Je suis etudiant a l'universite de yaounde 1 niveau 3 option GL Lorem20</span>
				</div>
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
	return (
		<section className={styles.navigationSection}>
			<div className={`${styles.navigationItem} ${styles.navigationItemActive}`}>
				<span>W</span>
				<span>Wiki</span>
			</div>

			<div className={`${styles.navigationItem}`}>
				<BsJournals />
				<span>Postes Proposes</span>
			</div>

			<div className={`${styles.navigationItem}`}>
				<BsPersonCheck />
				<span>Gerer les experts</span>
			</div>

			<div className={`${styles.navigationItem}`}>
				<BsGear />
				<span>Reglage</span>
			</div>
		</section>
	)
}

const Aside = ({className}) => {

	return(
		<aside className={className}>
			<ProfilCard />

			<Navigation />
		</aside>
	)
}

export default Aside