import React from 'react'
import {Image} from 'react-image-progressive-loading'
import { Link } from 'react-router-dom'
import Button from '../../../components/elements/buttons/Button'
import './BodyErrorStyle.css'


const image = require("../../../medias/svg/404-error.png")

const BodyError404 = () => {
	return(
        <section className="">
			<div className="ErrorPageContent">
				<Image image={image} className="ImagePageError"/>	
        <div className="FirstDescription">
          Cette page est inexistante
		   	</div>
		   	<div className="SecondDescription">
					Soit la page que vous essayez d'acceder n'existe pas, 
					soit vous n'êtes pas autorisé à acceder à cette page.
					Vérifier que le lien que vous essayez d'acceder est correct, 
					ou consulter votre fil d'actualités.
		  	</div>

				<Button size="meduim" classe="BtnActualiter" link="/wiki/feed">
					Fil D'actualités
				</Button>
			</div>
		</section>
	)
}

export default BodyError404