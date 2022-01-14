import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineLike } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import './commentPost.css'
import {instance} from '../../../../utils/url'

const image = require("../../../../medias/img/test.jpg")

const Comment  = () => {

    return(
        <div className="CommentContent">
            <div className="header-PostproposeInfo">
                <ImgCircle src={image} alt="profil" size="small"/>
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
            <div className="IconComment">
				<div className="BiMessageRounded">
                    <BiMessageRounded size="25" className="icon" />
					<span className="NumberL">115</span>
				</div>

				<div className="Answer ">
					Répondre
				</div>
                <span className="DateComment">Il ya 2h </span>
			</div>
        </div>
    )
}

export default Comment