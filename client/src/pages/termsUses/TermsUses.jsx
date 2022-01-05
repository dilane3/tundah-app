import React from 'react'
import Body from './body/BodyTermsUses'
import Seo from '../../components/utils/seo/Seo'
import Base from '../Base'


const TermsUses = () => {
	return(
		<div className="">
			<Seo
				title="conditions d'utilisations |tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Base>
				<Body />
			</Base>
		</div>
	)
}

export default TermsUses