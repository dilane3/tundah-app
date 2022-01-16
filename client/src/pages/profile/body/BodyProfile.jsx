import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import AppProfilPost from '../../../components/marketing/pageSections/profil/AppProfilPost'
import Seo from '../../../components/utils/seo/Seo'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import navigationContext from '../../../dataManager/context/navigationContext'


const BodyProfile = () => {
	const {currentUser} = useContext(currentUserContext)
	const {navigateTo} = useContext(navigationContext)

	useEffect(() => {
		navigateTo("")
	}, [navigateTo])

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