import React from 'react'
import { Link } from 'react-router-dom'

const ALink = (props) => {

	let {
		children,
		link,
		classe
	} = props

	return(
		<Link 
			to={link}
			className={`${classe} text-primary  hover:underline`}
			>
			{ children }
		</Link>
	)
}

export default ALink