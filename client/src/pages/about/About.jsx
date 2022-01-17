import React from 'react'
import Body from './body/BodyAbout'
import Seo from '../../components/utils/seo/Seo'

const About = () => {
	return(
		<div className="">
			<Seo
				title="a propos | tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default About