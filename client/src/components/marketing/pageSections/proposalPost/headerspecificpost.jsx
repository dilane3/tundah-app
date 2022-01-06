import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import  './Specificpost.css'

const HeaderspecifisPost = () => {

    return(
       <div className="header">
             <div className="First-child">
                  <a href="/">trier par</a>
                  <BsChevronDown />
             </div>  
             <nav className="navbar-section">
                  <a href="/"> Tous les articles </a>
                  <a href="/"> recemment ajoute </a>
                  <a href="/"> Trier par </a>
             </nav>
               
       </div>
    
    )
}
export default HeaderspecifisPost;