import React from 'react'
import {Helmet} from "react-helmet";

const Seo = (props) => {

	const{
		title,
		description,
		script
	} = props

	return(
		<Helmet>
			<meta charSet="utf-8" />
			<meta name="description" description={description} />
			<title>{ title }</title>
			{ script }
		</Helmet>
	)
}

export default Seo