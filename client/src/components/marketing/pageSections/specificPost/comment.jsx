import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import Subscriber from '../../../../entities/Subscriber'
import { getRelativeDate } from '../../../../utils/dateOperations'
import './commentPost.css'
import {ressourcesUrl} from "../../../../utils/url"


const image = require("../../../../medias/img/test.jpg")

const Comment = ({onResponse, data, isResponse, author}) => {
    const subscriber = new Subscriber(data.author)

    const isAuthor = () => {
        if (author.id === data.author.id) {
            return (
                <span className="isAuthor">Auteur</span>
            )
        }

        return null
    }

    return(
        <div className="CommentContent">
            <div className="header-PostproposeInfo">
                <ImgCircle src={`${ressourcesUrl.profil}/${subscriber.getProfil}`} alt="profil" size="small" classe="header-PostproposeInfoImg" />
                <div className="Info-Comment">
                   <div className="Info-User">
                        <span className="Username">{subscriber.getName} {isAuthor()}</span>
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
                {
                    !isResponse ? (
                        <div className="BiMessageRounded">
                            <BsChat size="20" className="icon" />
                            <span className="NumberL">{data.responses.length}</span>
                        </div>
                    ):null
                }

				<div className={`${isResponse ? "Response": "Answer"}`} onClick={onResponse}>
					Répondre
				</div>
                <span className="DateComment">{getRelativeDate(data.creation_date)} </span>
			</div>
        </div>
    )
}

export default Comment