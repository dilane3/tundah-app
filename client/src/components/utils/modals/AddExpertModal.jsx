import React,{useState, useEffect, useContext} from 'react'
import { BsX } from 'react-icons/bs'
import styles from '../../../css/addExpert.module.css'
import AddExpertContent from './AddExpertContent'
import { instance } from '../../../utils/url'
import LoaderCircle from '../loaders/Loader'
import {ToastContext} from 'react-simple-toastify'
import Subscriber from '../../../entities/Subscriber'

const AddExpertModal = ({onHide, animationClass}) => {

  const [newExpert,setNewExpert]= useState("");
  const [users, setUsers]= useState([])
  const [loading, setLoading] = useState(false)

  // using context
  const {displayToast} = useContext(ToastContext)

  const handleChange = event =>{
    setNewExpert(event.currentTarget.value);
  }

  useEffect(() => {
    const token = localStorage.getItem("tundah-token")

    instance.defaults.headers.common["authorization"] = `Bearer ${token}`
    console.log(instance)
  }, [])

  useEffect(()=>{
    setLoading(true)

    instance.get(`/users/search/${newExpert}`)
    .then(res => {
      if (res.data) {
        setUsers(res.data)
      } else {
        setUsers([])
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })

  }, [newExpert])

  const deleteUser = (id) => {
    const usersClone = [...users]

    const index = usersClone.findIndex(user => user.id === id)

    if (index > -1) {
      usersClone.splice(index, 1)

      setUsers(usersClone)
    }
  }

  const handleAddExpert = (idUser) => {
    if (idUser) {
      setLoading(true)

      instance.post("/users/add_expert", {idSubscriber: idUser})
      .then(res => {
        console.log(res.data)

        const user = new Subscriber(res.data)

        deleteUser(user.getId)

        displayToast(`${user.getName} a été ajouté comme expert`)
      })
      .catch(err => {
        console.log(err)

        displayToast("Erreur lors de l'ajout d'un expert")
      })
      .then(() => {
        setLoading(false)
      })
    }
  }


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
         !loading ? (
           users.length > 0 ? (
             users.map(user => {
               return <AddExpertContent onAddExpert={handleAddExpert} key={user.id} data={user} />
             }) 
           ):(
             newExpert !== "" ? (
              <article className={styles.addExpertNoResult}>
                Aucun abonne ne correspond a ce nom d'utilisateur
              </article>
             ):null
           )
         ):(
           <LoaderCircle size={100} color="#3c6a46" />
         )
       }
       </div>
    </section>
  )
}

export default AddExpertModal