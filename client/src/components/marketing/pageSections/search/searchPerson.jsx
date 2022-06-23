import React, { useMemo } from "react";
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import './searchBody.css'
import Subscriber from "../../../../entities/Subscriber";
import { getRelativeDate } from "../../../../utils/dateOperations";
import { ressourcesUrl } from "../../../../utils/url";
import { Link } from "react-router-dom";
import { formatName } from "../../../../utils/format";

const imageMariage = require("../../../../medias/img/chinoise.jpg")

const SearchPerson = ({ data }) => {

    const user = useMemo(() => new Subscriber(data), [data])

    return (
        <div className="Personheader">
            <div className="content">
                <ImgCircle src={`${ressourcesUrl.profil}/${user.getProfil}`} alt="profil" classe="profilCardImage" />
                <div className="userinformation">
                    <Link to={`/profile/${user.getUsername}`}>
                        <span className="username">{formatName(user.getName)}</span>
                    </Link>
                    <span className="userInscription">{"inscrit depuis le " + getRelativeDate(user.getDate)}</span>
                </div>
                {/* <button className="btnSuivre">
                    Suivre
                </button> */}
            </div>
            <div className="userDescription">
                {user.getDescription}
            </div>
        </div>
    )
}
export default SearchPerson;