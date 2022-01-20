import React from 'react'
import { ScaleLoader } from 'react-spinners';

const Loader = (props) => {
	let { color, size } = props

	if(!color) color = "#456445"
	if(!size) size = "8"

	return(
		<div className="flex items-center">
			<div className="mx-auto">
				<ScaleLoader color={color} size={`${size}px`} />
			</div>
		</div>
	)
}

export default Loader