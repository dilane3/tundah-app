import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import  './Specificpost.css'

const HeaderspecifisPost = () => {

    return(
      <div className="header">
        <div className="First-child">
          <span> Trier par </span>
          <BsChevronDown />
        </div>  
        <nav className="navbar-section">
          <span className="proposalPost-active"> Tous les posts </span>
          <span> recemment ajoute </span>
        </nav>
      </div>
    )
}
export default HeaderspecifisPost;