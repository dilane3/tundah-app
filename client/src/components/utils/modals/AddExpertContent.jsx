import React from 'react'
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import Button from '../../elements/buttons/Button'
import styles from '../../../css/addExpert.module.css'
import Subscriber from '../../../entities/Subscriber'
import { Link } from 'react-router-dom'
import { ressourcesUrl } from '../../../utils/url'

const image = require("../../../medias/img/test.jpg")

const AddExpertContent = ({data}) => {   
	const user = new Subscriber(data)

	return(
		<div className={styles.addExpertContenu}>
			<div className={styles.addExpertHead}>
			  <ImgCircle src={`${ressourcesUrl.profil}/${user.getProfil}`} alt="profil" size="medium" classe={styles.headerPostproposeInfoImg} /> 
        <div className={styles.infoExpert}>
					<Link to={`/profile/${user.getUsername}`}>
        		<span className={styles.name}> {user.getName[0].toUpperCase() + user.getName.substr(1).toLowerCase()} </span>
          </Link>
					
					<span className={styles.username}>
            @{user.getUsername}
          </span>
        </div>
				<Button size="meduim" classe={styles.BtnAddExpert}>
          Ajouter
        </Button>
			</div>
			<span className={styles.ExpertDescription}>
        {
					user.getDescription ? user.getDescription : "--"
				}
			</span> 
		</div>
	)
}

export default AddExpertContent