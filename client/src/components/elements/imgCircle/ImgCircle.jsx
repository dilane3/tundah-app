import React from 'react'
import {Image} from 'react-image-progressive-loading'
import styles from './imgCircle.module.css'

const ImgCircle = ({src, alt, size, classe}) => {
	let dimention;

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
		<Image 
			image={src} 
			alt={alt} 
			className={`${classe} ${dimention} ${styles.defaultStyle} rounded-full`}
		/>
	)
}

export default ImgCircle