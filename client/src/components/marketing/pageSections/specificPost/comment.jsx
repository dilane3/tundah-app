import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs'
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import Subscriber from '../../../../entities/Subscriber'
import { getRelativeDate } from '../../../../utils/dateOperations'
import './commentPost.css'
import {ressourcesUrl} from "../../../../utils/url"
import {Link} from 'react-router-dom'

const Comment = ({onResponse, data, isResponse, author, onDisplayResponses, responseDisplayed}) => {
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
                <Link to={`/profile/${subscriber.getUsername}`}>
                    <ImgCircle src={`${ressourcesUrl.profil}/${subscriber.getProfil}`} alt="profil" size="small" classe="header-PostproposeInfoImg" />
                </Link>
                <div className="Info-Comment">
                   <div className="Info-User">
                        <Link to={`/profile/${subscriber.getUsername}`}>
                            <span className="Username">{subscriber.getName} {isAuthor()}</span>
                        </Link>

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

                {
                    data.responses ? (
                        data.responses.length > 0 ? (
                            <span className="displayResponse" onClick={onDisplayResponses}>{responseDisplayed ? "Masquer":"Afficher"} reponses</span>
                        ):null
                    ):null
                }
                <span className="DateComment">{getRelativeDate(data.creation_date)} </span>
			</div>
        </div>
    )
}

export default Comment