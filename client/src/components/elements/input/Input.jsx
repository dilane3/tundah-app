import React from 'react'

const Input = (props) => {

	const {
		type,
		name,
		value,
		id,
		placeholder,
		classe,
		handleChange
	} = props

	return(
		<input 
			type={type} 
			name={name} 
			id={id}
			value={value}
			placeholder={placeholder}
			onChange={handleChange}
			className={`${classe} w-full py-2 px-3 lg:py-3  text-primary text-sx md:text-sm rounded md:rounded-lg border-2 border-primary focus:outline-none`}
			/>
	)
}

export default Input