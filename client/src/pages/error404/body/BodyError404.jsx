import React from 'react'
import {Image} from 'react-image-progressive-loading'
import Button from '../../../components/elements/buttons/Button'


const image = require("../../../medias/svg/404-error.svg")

const BodyError404 = () => {
	return(
		<section className="ErrorPageContent">
		   <Image image={image} className="ImagePageError"/>	
           <div className="FirstDescription">
               Cette page est inexistante
		   </div>
		   <div classname="SecondDescription">
				Soit la page que vous essayer d'acceder n'existe pas, 
				soit vous n'etes pas autoriser a acceder a cette page.
				Verifier que le lien que vous essayer d'acceder est correct, 
				ou consulter votre fil d'actualiter.
		   </div>
		   <Button size="meduim">
               Fil D'actualiter     
           </Button>
			
		</section>
	)
}

export default BodyError404