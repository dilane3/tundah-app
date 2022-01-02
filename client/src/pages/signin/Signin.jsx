import React from 'react'
import Body from './body/BodySignin'
import Seo from '../../components/utils/seo/Seo'

const Signin = () => {
	return(
		<div className="">
			<Seo
				title="connectez vous et essembles valorisons la culture africaine"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default Signin