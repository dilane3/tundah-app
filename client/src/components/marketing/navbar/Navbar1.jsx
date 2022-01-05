import React from 'react'
import { BsThreeDotsVertical, BsArchive } from "react-icons/bs"

import ImgCircle from '../../elements/imgCircle/ImgCircle'

import person from '../../../medias/img/test.jpg'

const Navbar1 = () => {

	return(
		<nav className="bg-white py-3">
			<div className="max-w-7xl px-2 md:px-3 lg:px-0 mx-auto w-full bg-red-100 flex justify-between items-center bg-white py-1">
				<div>
					tundah
				</div>
				<div className="flex ">
					<input type="text" />
				</div>
				<div className="flex items-center  space-x-5 md:space-x-8 lg:space-x-12">
				  <div className="hidden md:flex items-center space-x-3 md:space-x-5 lg:space-x-8 ">
						<BsThreeDotsVertical />
						<BsArchive />
					</div>
					<div>
						<ImgCircle
							size="small"
							alt="wngue fenyep"
							src={person}
						/>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar1