import React from 'react'
import { BsX } from 'react-icons/bs'
import styles from '../../../css/addExpert.module.css'
import AddExpertContent from './AddExpertContent'

const AddExpertModal = ({onHide, animationClass}) => {

  return (
    <section className={`${styles.addExpertSection} ${animationClass ? styles.addExpertSectionAnimation:null}`}>
 
        <div className={styles.addExpertFrom}>
          <input 
            type="text"
            placeholder="nom d'utilisateur d'un abonne"
          />
        </div>

        <span className={styles.addExpertClose} onClick={onHide}>
          <BsX className="icon" size="25" />
        </span>

      <div className={styles.addExpertContent}>
        <AddExpertContent/>
      </div>
    </section>
  )
}

export default AddExpertModal