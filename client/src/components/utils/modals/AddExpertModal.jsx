import React,{useState} from 'react'
import { BsX } from 'react-icons/bs'
import styles from '../../../css/addExpert.module.css'
import AddExpertContent from './AddExpertContent'

const AddExpertModal = ({onHide, animationClass}) => {

  const[newExpert,setNewExpert]= useState("");

  const handleChange = event =>{
    setNewExpert(event.currentTarget.value);
}


  return (
    <section className={`${styles.addExpertSection} ${animationClass ? styles.addExpertSectionAnimation:null}`}>
        <div className={styles.addExpertHeader}>
          <span > Gestion des Experts </span>
          <div className={styles.addExpertFrom}>
            <input 
              type="text"c
              placeholder="nom d'utilisateur d'un abonne"
              onChange={handleChange}
            />        
            
          </div>

          <span className={styles.addExpertClose} onClick={onHide}>
            <BsX className="icon" size="25" />
          </span>
        </div>
      <div className={styles.addExpertContent}>
        <AddExpertContent/>
        <AddExpertContent/>
        <AddExpertContent/>
        <AddExpertContent/>
        <AddExpertContent/>
      </div>
    </section>
  )
}

export default AddExpertModal