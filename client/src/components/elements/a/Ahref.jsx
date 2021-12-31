import React from 'react'

const Ahref = (props) => {

	let {
		children,
		link,
		classe
	} = props

	if(!classe){
		classe = "text-primary underline hover:underline-offset-4"
	}

	return(
		<a 
			href={link}
			target="_black"
			rel="noreferer"
			className={classe}
			>
			{ children }
		</a>
	)
}

export default Ahref