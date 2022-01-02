import React from 'react'
import Body from './body/BodyWiki'
import Seo from '../../components/utils/seo/Seo'


const Wiki = () => {
	return(
		<div className="">
			<Seo
				title="(10) Fil d'actualité|wiki|tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default Wiki