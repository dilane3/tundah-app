import React, { useContext } from 'react'
import Body from './body/BodyWiki'
import Seo from '../../components/utils/seo/Seo'
import Base from '../Base'
import WritePost from '../../components/marketing/pageSections/WritePost'
import currentUserContext from '../../dataManager/context/currentUserContent'


const Wiki = () => {
	const { currentUser } = useContext(currentUserContext)
	return (
		<div className="">
			<Seo
				title="wiki | tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			<Base>
				<Body />
			</Base>
		</div>
	)
}

export default Wiki