import React from 'react'
import Body from './body/BodyMessages'
import Seo from '../../components/utils/seo/Seo'


const Messages = () => {
	return(
		<div className="">
			<Seo
				title="messages | tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default Messages