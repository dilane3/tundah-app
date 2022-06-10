import React from "react";
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import { BiPlus } from 'react-icons/bi'
import './followUserStyle.css'
import { formatName } from "../../../utils/format";
import { ressourcesUrl } from "../../../utils/url";
import { getRelativeDate } from "../../../utils/dateOperations";

const FollowUserItem = ({ data }) => {
  return (
    <div className="followcontent">
      <div className="followUserAction">
        <div className="followUserImg">
          <ImgCircle src={`${ressourcesUrl.profil}/${data.getProfil}`} alt="profil" classe="flwprofilCardImage" />
        </div>
        <div className="flwUserInformation">
          <span className="flwUsername">{formatName(data.getName)}</span>
          <span className="flwUserInscription">{getRelativeDate(data.getDate)} </span>
        </div>
      </div>
      <button className="btnSuivreFlw">
        <BiPlus color="3c6a46" size={15} />suivre
      </button>
    </div>
  )
}
export default FollowUserItem;