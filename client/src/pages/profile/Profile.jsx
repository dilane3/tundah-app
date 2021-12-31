import React from 'react'
import Body from './body/BodyProfile'
import Seo from '../../components/utils/seo/Seo'


const Profile = () => {
	return(
		<div className="">
			<Seo
				title="Wangue fenyep(@leDoyen)"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Body />
		</div>
	)
}

export default Profile