import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import Subscriber from '../../../../entities/Subscriber'
import { getRelativeDate } from '../../../../utils/dateOperations'
import './commentPost.css'
import {ressourcesUrl} from "../../../../utils/url"


const image = require("../../../../medias/img/test.jpg")

const Comment = ({onResponse,data}) => {
    const {author} = data;
    const subscriber = new Subscriber(author)
    //console.log(data)
    //console.log("userName",subscriber.getUsername)  

    return(
        <div className="CommentContent">
            <div className="header-PostproposeInfo">
                <ImgCircle src={`${ressourcesUrl.profil}/${subscriber.getProfil}`} alt="profil" size="small" classe="header-PostproposeInfoImg" />
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
                <span className="DateComment">{getRelativeDate(data.creation_date/1000)} </span>
			</div>
        </div>
    )
}

export default Comment