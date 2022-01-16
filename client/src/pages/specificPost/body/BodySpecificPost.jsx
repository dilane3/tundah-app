import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import Navbar from '../../../components/marketing/navbar/Navbar'
import AppSpecifificPost from '../../../components/marketing/pageSections/specificPost/AppSpecificPost'
import currentUserContext from '../../../dataManager/context/currentUserContent'

const BodySpecificPost = () => {
	const {currentUser} = useContext(currentUserContext)

	return(
		<section>
			{
				currentUser ? (
					<AppSpecifificPost/>
				):(
					<Redirect to="/wiki/feed" />
				)
			}
		</section>
	)
}

export default BodySpecificPost