import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineLike } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import './commentPost.css'

const image = require("../../../../medias/img/test.jpg")

const Comment  = () => {

    return(
        <div className="CommentContent">
             <div className="header-PostproposeInfo">
                <ImgCircle src={image} alt="profil" classe="profilCardImage"/>
                <div className="Info-Comment">
                   <div className="Info-User">
                        <span className="Username">Kana Blondelle</span>
                        <div className="BsThreeDotIcon">
                          <BsThreeDots/>
                        </div>
                    </div>
                    <div className="TextComment">
                    Durant les cérémonies de mariages, nous assistons souvent à des litiges
                        opposant Toutes les coutumes aofrutieutuiruyuruhyuiioopp...
                     </div>
                </div>  
             </div>
             <footer className="IconComment">
				<div className="AiOutlineLike">
					<AiOutlineLike size="25" className="icon" />
					<span className=" ">213k</span>
				</div>

				<div className="BiMessageRounded ">
					<BiMessageRounded size="25" className="icon" />
					<span className="">102</span>
				</div>
			</footer>
        </div>
    )
}

export default Comment