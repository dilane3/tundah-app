import React from "react";
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import {BiPlus} from 'react-icons/bi'
import  './followUserStyle.css'

const imageMariage= require("../../../medias/img/chinoise.jpg")

const FollowUserItem = () => {

    return(
        <div className="followcontent">
          <div className="followUserAction">
            <div className="followUserImg">
              <ImgCircle src={imageMariage} alt="profil" classe="flwprofilCardImage"/>
            </div>
            <div className="flwUserInformation">
              <span className="flwUsername">Kombou Dilane</span>
              <span className="flwUserInscription">inscrit le 10/01/2018</span>
            </div>
          </div>
          <button className="btnSuivreFlw">
            <BiPlus color="3c6a46" size={15}/>suivre
          </button>
        </div>  
    )
}
export default FollowUserItem;