import React, { useContext } from 'react'
import Body from './body/BodySocial'
import Seo from '../../components/utils/seo/Seo'
import Base from '../Base'
import currentUserContext from '../../dataManager/context/currentUserContent'
import WritePost from '../../components/marketing/pageSections/WritePost'


const Social = ({ location }) => {
	const { currentUser } = useContext(currentUserContext)

	return (
		<div className="">
			<Seo
				title="(10) Fil d'actualites|tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Base>
				{
					currentUser ? <WritePost /> : null
				}
				<Body />
			</Base>
		</div>
	)
}

export default Social