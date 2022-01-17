import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import Subscriber from '../../../../entities/Subscriber'
import './commentPost.css'
// import {ressourceUrl} from "../../../../utils/url"`${ressourceUrl.profil}/${subscriber.getProfil}`


const image = require("../../../../medias/img/test.jpg")

const Comment = ({onResponse,data}) => {
    const {author} = data;
    const subscriber = new Subscriber(author)

    return(
        <div className="CommentContent">
            <div className="header-PostproposeInfo">
                <ImgCircle src={image} alt="profil" size="small" classe="header-PostproposeInfoImg" />
                <div className="Info-Comment">
                   <div className="Info-User">
                        <span className="Username">{subscriber.getUsername}</span>
                        <div className="BsThreeDotIcon">
                          <BsThreeDots/>
                        </div>
                    </div>
                    <div className="TextComment">
                        {data.content}
                    </div>
                    {/* <div className="TextComment">
                        Durant les ceremonies de mariages ont assiste souvent a  des litiges  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni saepe accusamus, odit nulla est nemo consequuntur blanditiis delectus reprehenderit consequatur.
                    </div> */}
                </div>  
            </div>
            <div className="IconComment">
				<div className="BiMessageRounded">
                    <BsChat size="20" className="icon" />
					<span className="NumberL">115</span>
				</div>

				<div className="Answer" onClick={onResponse}>
					Répondre
				</div>
                <span className="DateComment">Il ya {Date.now()-data.creation_date} </span>
			</div>
        </div>
    )
}

export default Comment