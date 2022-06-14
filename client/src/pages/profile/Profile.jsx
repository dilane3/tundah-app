import React, { useContext, useState } from 'react'
import Body from './body/BodyProfile'
import ExtendedBase from '../ExtendedBase'
import currentUserContext from '../../dataManager/context/currentUserContent'
import { Redirect } from 'react-router-dom'

const Profile = () => {
	// Get data from the global state
	const { currentUser } = useContext(currentUserContext)

	console.log(currentUser)

	return (
		<div className="">
			{
				currentUser ? (
					<ExtendedBase>
						<Body />
					</ExtendedBase>
				) : <Redirect to="/" />
			}
		</div>
	)
}

export default Profile