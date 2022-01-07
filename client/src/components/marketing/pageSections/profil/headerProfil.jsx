import React, { useContext } from 'react'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import {BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear, BsThreeDotsVertical} from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import './profilStyle.css'
import currentUserContext from '../../../../dataManager/context/currentUserContent'

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

    const {name, username} = currentUser

    return(
        <div className="profil-content">
            <div className="informationContent"> 
               <div className="header-profil">
                    <ImgCircle src={image} alt="profil" classe="profilCardImage"/>

                    <div className="profilInfo">
                        <span className="name">{name}</span>
                        <span className="hour">@{username}</span>
                        <div className="BsJournals">
                        <BsPlusCircleFill />
				            <span className="town"> Cameroun</span>
			            </div>
                    </div>
                    <div className="iconContact">
                          <span></span>
                          <div> contact</div>
                    </div>
                </div>
                <div className="profilDescription">
                    Etudiante en informatique a l'Universite de Yaounde 1,
                    et Developpeuse Front-end et Back-end, je suis passionnee 
                    du Developpement web.
                </div>
                <div className="profilFollower">
                      <span> 13 followers</span>
                      <span className="secondFollower"> 50 followings</span>
                      <div className="iconEditerProfil">
                          <span> </span>
                          <span> Editer profil</span>
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