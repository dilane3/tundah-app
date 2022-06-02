import React from "react";
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import  './seachBody.css'

const imageMariage= require("../../../../medias/img/chinoise.jpg")

const SearchPerson = () => {

    return(
      <div className="Personheader">
        <div className="content">
            <ImgCircle src={imageMariage} alt="profil" classe="profilCardImage"/>
            <div className="userinformation">
                <span className="username"> Kombou Dilane</span>
                <span className="userInscription"> inscrit depuis le 10 janvier 2018</span>
            </div>
            <button className="btnSuivre">
                Suivre
            </button>
        </div>  
        <div className="userDescription">
            FullStack javascript Developper using React js for frontend and 
            Node js(Express) for Backend
        </div>
      </div>
    )
}
export default SearchPerson;