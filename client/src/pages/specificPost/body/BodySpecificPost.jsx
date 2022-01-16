import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import Navbar from '../../../components/marketing/navbar/Navbar'
import AppSpecifificPost from '../../../components/marketing/pageSections/specificPost/AppSpecificPost'
import currentUserContext from '../../../dataManager/context/currentUserContent'

const BodySpecificPost = () => {

	return(
		<section>
			<AppSpecifificPost/>
		</section>
	)
}

export default BodySpecificPost