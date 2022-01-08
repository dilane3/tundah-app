import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import AppProposalPost from '../../../components/marketing/pageSections/proposalPost/AppProposalPost'
import currentUserContext from '../../../dataManager/context/currentUserContent'


const BodyProposalPost = () => {
	const {currentUser} = useContext(currentUserContext)

	return(
		<section>
			{
				currentUser ? <AppProposalPost/> : <Redirect to="/wiki/feed" />
			}
		</section>
	)
}

export default BodyProposalPost