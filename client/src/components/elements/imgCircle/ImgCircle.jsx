import React from 'react'

const ImgCircle = (props) => {

	let { 
			src, 
			alt,
			size,
			classe 
		} = props

	let dimention

	if(size === "small"){
		dimention = "w-12 h-12"
	}else if(size === "medium"){
		dimention = "md:w-20 md:h-20 w-14 h-14"
	}else if(size==="big"){
		dimention = "lg:w-36 lg:h-36 md:w-24 md:h-24 w-16 h-16"
	}else{
		dimention = "w-12 h-12"
	}

	return(
		<img 
			src={src} 
			alt={alt}
			className={`${classe} ${dimention} rounded-full`}
			/>
	)
}

export default ImgCircle