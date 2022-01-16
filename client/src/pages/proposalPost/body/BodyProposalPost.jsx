import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import AppProposalPost from '../../../components/marketing/pageSections/proposalPost/AppProposalPost'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import navigationContext from '../../../dataManager/context/navigationContext'


const BodyProposalPost = () => {
	const {currentUser} = useContext(currentUserContext)
	const {navigateTo} = useContext(navigationContext)

	useEffect(() => {
		navigateTo("proposal_posts")
	}, [navigateTo])

	return(
		<section>
			{
				currentUser ? <AppProposalPost/> : <Redirect to="/wiki/feed" />
			}
		</section>
	)
}

export default BodyProposalPost