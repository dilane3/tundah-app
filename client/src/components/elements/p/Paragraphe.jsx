import React from 'react'

const Paragraphe = (props) => {

	const {children, classe} = props

	return(
		<p className={`${classe} md:text-base text-sm font-primary`}>
			{ children }
		</p>
	)
}

export default Paragraphe