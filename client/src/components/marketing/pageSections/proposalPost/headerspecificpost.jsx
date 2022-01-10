import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import  './Specificpost.css'

const HeaderspecifisPost = () => {

    return(
      <div className="header">
        <div className="First-child">
          <a> Trier par </a>
          <BsChevronDown />
        </div>  
        <nav className="navbar-section">
          <a className="proposalPost-active"> Tous les posts </a>
          <a> recemment ajoute </a>
        </nav>
      </div>
    )
}
export default HeaderspecifisPost;