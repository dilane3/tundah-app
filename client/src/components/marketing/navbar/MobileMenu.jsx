import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "../../../css/mobileMenu.module.css"
import Input from "../../elements/input/Input";
import Aside from "../aside/Aside";

const MobileMenu = ({show}) => {
  return (
    <section className={`${styles.mobileMenuSection} ${show ? styles.mobileMenuAnimation:''}`}>
      <div className={styles.mobileMenuSearchEngine}>
				<Input 
					type="search"
					placeholder="Faites une recherche..."	
				/>

        <BsSearch />
			</div>

      <Aside />
    </section>
  )
}

export default MobileMenu