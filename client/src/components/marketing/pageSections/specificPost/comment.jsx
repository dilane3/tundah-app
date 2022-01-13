import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import './commentPost.css'

const image = require("../../../../medias/img/test.jpg")

const Comment  = () => {

    return(
        <div className="CommentContent">
            <div className="header-PostproposeInfo">
                <ImgCircle src={image} alt="profil" size="small" classe="header-PostproposeInfoImg" />
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
                    <BsChat size="20" className="icon" />
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