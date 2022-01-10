import React, { useState, useEffect } from 'react'
import Loader from '../../../components/utils/Loader'
import AppProfilPost from '../../../components/marketing/pageSections/profil/AppProfilPost'
import HeaderProfil from '../../../components/marketing/pageSections/profil/headerProfil'
import signupImg from '../../../medias/img/signup-img.png'


const BodyProfile = () => {
	return(
		<div>
			<AppProfilPost/>
		</div>
	)
}

export default BodyProfile