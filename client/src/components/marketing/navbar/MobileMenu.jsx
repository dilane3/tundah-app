import React, {useState, useEffect} from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom'
import styles from "../../../css/mobileMenu.module.css"
import Input from "../../elements/input/Input";
import Aside from "../aside/Aside";

const MobileMenu = ({show}) => {

  const [researchQuery, setResearchQuery] = useState("")

	const handleChange = event => {

		event.preventDefault();

		setResearchQuery(event.target.value);
	}	

	useEffect(() => {
		console.log("The value entered is: ", researchQuery)
	}, [researchQuery])

  return (
    <section className={`${styles.mobileMenuSection} ${show ? styles.mobileMenuAnimation:''}`}>
      <div className={styles.mobileMenuSearchEngine}>
				<Input 
					type="search"
					placeholder="Faites une recherche..."
					handleChange={handleChange}
				/>

        <Link to={{
            pathname: '/search',
            state: {
            researchQuery: researchQuery
          }
        }}>
					<div className={styles.headerSearchEngineIcon}>
						<BsSearch />
					</div>
				</Link>
			</div>

      <Aside />
    </section>
  )
}

export default MobileMenu