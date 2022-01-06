import React from 'react'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import {BsPlusCircleFill, BsJournals, BsPersonCheck, BsGear, BsThreeDotsVertical} from 'react-icons/bs'
import {Image} from 'react-image-progressive-loading'
import { BsGeoAlt } from 'react-icons/bs'
import {MdContactMail} from 'react-icons/md'
import {AiOutlineEdit} from 'react-icons/ai'
import './profilStyle.css'

const image = require("../../../../medias/img/test.jpg")

const StatPostItem = ({title, number}) => {
	return (
		<div className="profilCardPost">
				<span>{title}({number})</span>
		</div>
	)
}

const HeaderProfil  = () => {

    return(
        <div className="profil-content">
            <div className="informationContent"> 
               <div className="header-profil">
                    <ImgCircle src={image} alt="profil" size="big"/>

                    <div className="profilInfo">
                        <div>
                            <div className="name">Blondelle Kana</div>
                            <div className="username">@ le Doyen </div>
                        </div>    
                            <div className="BsJournals">
                                 <BsGeoAlt/>
				            <span className="town"> Cameroun</span>
			                </div>
                    </div>
                    <div className="iconContact">
                          <div className="MdContactMai" > <MdContactMail/> </div>
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