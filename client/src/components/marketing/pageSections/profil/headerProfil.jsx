import React, { useContext } from 'react'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import {BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear, BsThreeDotsVertical} from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import { BsGeoAlt } from 'react-icons/bs'
import {MdContactMail} from 'react-icons/md'
import {AiOutlineEdit} from 'react-icons/ai'
import './profilStyle.css'
import currentUserContext from '../../../../dataManager/context/currentUserContent'
import Subscriber from '../../../../entities/Subscriber'

const image = require("../../../../medias/img/test.jpg")

const StatPostItem = ({title, number}) => {
	return (
		<div className="profilCardPost">
			<span>{title}({number})</span>
		</div>
	)
}

const HeaderProfil  = () => {
    const {currentUser} = useContext(currentUserContext)
    const user = new Subscriber(currentUser)

    const formatName = (name) => {
		return name[0].toUpperCase() + name.substr(1)
	}

    return(
        <div className="profil-content">
            <div className="informationContent"> 
               <div className="header-profil">
                    <ImgCircle src={image} alt="profil" size="big" classe="profilImage" />

                    <div className="profilInfo">
                        <span className="name">{formatName(user.getName)}</span>
                        <span className="username">@{user.getUsername}</span>
                        <div className="BsJournals">
                            <BsGeoAlt />
				            <span className="town">{user.getCountry}</span>
			            </div>
                    </div>
                </div>
                <div className="profilDescription">
                    {user.getDescription}
                </div>
                <div className="profilFollower">
                    <div className="iconContact">
                        <div className="MdContactMai" > <MdContactMail/> </div>
                        <div> contact</div>
                    </div>
                    <div className="iconEditerProfil">
                        <div className="AiOutlineEdit"> <AiOutlineEdit/> </div>
                        <div> Editer profil</div>
                    </div> 
                </div>
                <div className="profilPost">
                    <div className="firstChild">
				        <StatPostItem  title="postes proposés" number={20} />
                    </div>
				        <StatPostItem title="postes validés" number={12} />
				        <StatPostItem title="postes archivés" number={8} />
                </div>

            </div>
           
        </div>
    )
}

export default HeaderProfil;