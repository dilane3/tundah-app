import React, { useContext } from 'react'
import Body from './body/BodySocial'
import Seo from '../../components/utils/seo/Seo'
import currentUserContext from '../../dataManager/context/currentUserContent'
import WritePost from '../../components/marketing/pageSections/WritePost'
import ExtendedBase from '../ExtendedBase'


const Social = ({ location }) => {
	const { currentUser } = useContext(currentUserContext)

	return (
		<div className="">
			<Seo
				title="(10) Fil d'actualites|tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<ExtendedBase>
				{
					currentUser ? <WritePost /> : null
				}
				<Body />
			</ExtendedBase>
		</div>
	)
}

export default Social