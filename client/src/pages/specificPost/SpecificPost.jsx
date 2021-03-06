import React from 'react'
import Body from './body/BodySpecificPost'
import Seo from '../../components/utils/seo/Seo'
import ExtendedBase from '../ExtendedBase'


const SpecificPost = () => {
	return (
		<div className="">
			<Seo
				title="(10) Fil d'actualites|tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<ExtendedBase>
				<Body />
			</ExtendedBase>
		</div>
	)
}

export default SpecificPost