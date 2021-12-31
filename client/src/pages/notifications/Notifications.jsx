import React from 'react'
import Body from './body/BodyNotifications'
import Seo from '../../components/utils/seo/Seo'


const Social = () => {
	return(
		<div className="">
			<Seo
				title="notifications | tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default Social