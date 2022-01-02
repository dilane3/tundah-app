import React from 'react'
import Body from './body/BodySignup'
import Seo from '../../components/utils/seo/Seo'


const Signup = () => {

	return(
		<div className="">
			<Seo
				title="inscrivez-vous sur le réseau social qui prone la culture africaine"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default Signup