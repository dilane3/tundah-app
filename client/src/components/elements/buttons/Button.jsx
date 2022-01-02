import React from 'react'
import { HashLink } from 'react-router-hash-link';

const Button = (props) => {

	let {
		children,
		link,
		size,
		theme,
		classe,
		target,
		rounded,
		action
	} = props


 	// BACKFROUND
 	let background, backgroundHover, textColor

 	if(theme === "info"){
 		background = "bg-blue-600"
 		backgroundHover = "bg-blue-700"
 		textColor = "text-white"
 	}else if(theme === "sucess"){
 		background = "bg-green-600"
 		backgroundHover = "bg-green-700"
 		textColor = "text-white"
 	}else if(theme === "danger"){
 		background = "bg-red-500"
 		backgroundHover = "bg-red-700"
 		textColor = "text-white"
 	}else{
 		background = "bg-primary"
 		backgroundHover = "bg-primary-hover"
 		textColor = "text-white"
 	}

 	//SIZE
 	  /* SIZE */
  let textSize, padding;

  if ( size === "small"){
    textSize = "text-xs"
    padding = "py-2 px-3"
  }
  else if (size === "medium") {
    textSize = "text-xs"
    padding = "py-3 px-5"
  }
  else if (size === "big") {
    textSize = "text-sm"
    padding = "py-3 px-5 md:py-4 md:px-8 "
  }
  else {
    textSize = "text-sm"
    padding = "py-2 px-5"
  }

  /* Rounded */
  let radius ;
  if ( rounded === "full" ) {
    radius = "rounded-full";
  }else {
    radius = "rounded" ;
  }

  if(!link) link = "#/"
	return(
		<HashLink 
			to={link} 
			target={target}
			onClick={ action ? (e) => action() : null}
			className={`${classe} ${radius} ${padding} ${textSize} ${background} hover:${backgroundHover} ${textColor} font-primary font-semibold`}
				>
			{ children }
		</HashLink>
	)
}

export default Button