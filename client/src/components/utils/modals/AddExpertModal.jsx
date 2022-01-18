import React,{useState, useEffect} from 'react'
import { BsX } from 'react-icons/bs'
import styles from '../../../css/addExpert.module.css'
import AddExpertContent from './AddExpertContent'
import { instance } from '../../../utils/url'

const AddExpertModal = ({onHide, animationClass}) => {

  const [newExpert,setNewExpert]= useState("");
  const [users, setUsers]= useState([])

  const handleChange = event =>{
    setNewExpert(event.currentTarget.value);
  }

  useEffect(() => {
    const token = localStorage.getItem("tundah-token")

    instance.defaults.headers.common["authorization"] = `Bearer ${token}`
  }, [])

  useEffect(()=>{
    console.log(newExpert)
    instance.get(`/users/${newExpert}`)
    .then(res => {
      if (res.data) {
        setUsers([{...res.data}])
      } else {
        setUsers([])
      }
    })
    .catch(err => {
      console.log(err)
    })

  }, [newExpert])


  return (
    <section className={`${styles.addExpertSection} ${animationClass ? styles.addExpertSectionAnimation:null}`}>
        <div className={styles.addExpertHeader}>
          <span > Gestion des Experts </span>
          <div className={styles.addExpertFrom}>
            <input 
              type="text"
              placeholder="nom d'utilisateur d'un abonne"
              onChange={handleChange}
              value={newExpert}
            />        
            
          </div>

          <span className={styles.addExpertClose} onClick={onHide}>
            <BsX className="icon" size="25" />
          </span>
        </div>
      <div className={styles.addExpertContent}>
       {
        users.length > 0 ? (
          users.map(user => {
            return <AddExpertContent key={user.id} data={user} />
          }) 
        ):null
       }
       </div>
    </section>
  )
}

export default AddExpertModal