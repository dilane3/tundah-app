import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import AppProfilPost from '../../../components/marketing/pageSections/profil/AppProfilPost'
import Seo from '../../../components/utils/seo/Seo'
import currentUserContext from '../../../dataManager/context/currentUserContent'


const BodyProfile = () => {
	const {currentUser} = useContext(currentUserContext)

	return(
		<div>
			{
				currentUser ? (
					<>
						<Seo
							title={`${currentUser.name}(@${currentUser.username})`}
							description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
						/>
						<AppProfilPost/> 
					</>
				): <Redirect to="/wiki/feed" />
			}
		</div>
	)
}

export default BodyProfile