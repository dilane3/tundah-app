import React from "react";
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import {BiPlus} from 'react-icons/bi'
import  './followUserStyle.css'

const imageMariage= require("../../../medias/img/chinoise.jpg")

const FollowUserItem = () => {

    return(
        <div className="followcontent">
            <ImgCircle src={imageMariage} alt="profil" classe="flwprofilCardImage"/>
            <div className="followInformation">
              <div className="flwUserinformation">
                  <span className="flwUsername"> Kombou Dilane</span>
                  <span className="flwUserInscription"> inscrit depuis le 10/01/2018</span>
              <button className="btnSuivreFlw">
                <BiPlus color="red" size={16}/> Suivre
              </button>
              </div>
            </div>
        </div>  
    )
}
export default FollowUserItem;