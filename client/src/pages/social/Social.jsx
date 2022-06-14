import React, { useContext } from 'react'
import Body from './body/BodySocial'
import Seo from '../../components/utils/seo/Seo'
import currentUserContext from '../../dataManager/context/currentUserContent'
import WritePost from '../../components/marketing/pageSections/WritePost'
import ExtendedBase from '../ExtendedBase'
import { Redirect } from 'react-router-dom'
import FollowUserPage from '../../components/marketing/aside/followUserPage'
import { Box } from '@mui/system'


const Social = ({ location }) => {
	const { currentUser } = useContext(currentUserContext)

	return (
		<div className="">
			<Seo
				title="(10) Fil d'actualites|tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
			{
				currentUser ? (
					<ExtendedBase>
						<WritePost />

						<Box
							sx={{
								mb: 3,
								display: "none",
								"@media screen and (max-width: 700px)": {
									display: "block"
								}
							}}
						>
							<FollowUserPage />
						</Box>

						<Body />
					</ExtendedBase>

				) : <Redirect to="/" />
			}
		</div>
	)
}

export default Social