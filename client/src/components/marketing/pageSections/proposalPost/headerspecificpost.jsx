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
                  <a> Tous les articles </a>
                  <a> recemment ajoute </a>
                  <a> Trier par </a>
             </nav>
               
       </div>
    
    )
}
export default HeaderspecifisPost;