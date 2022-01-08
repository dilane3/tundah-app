import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import AppProfilPost from '../../../components/marketing/pageSections/profil/AppProfilPost'
import currentUserContext from '../../../dataManager/context/currentUserContent'


const BodyProfile = () => {
	const {currentUser} = useContext(currentUserContext)

	return(
		<div>
			{
				currentUser ? <AppProfilPost/> : <Redirect to="/wiki/feed" />
			}
		</div>
	)
}

export default BodyProfile