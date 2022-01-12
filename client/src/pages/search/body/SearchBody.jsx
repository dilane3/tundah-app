import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"
import researchContext from '../../../dataManager/context/researchContext'

const instance = axios.create({
  baseURL: "http://localhost:3001/api/posts", 
})

const ResearchResultBar = () => {
  
  const {postsResults, query, addResults, changeQuery} = useContext(researchContext)

  const location = useLocation()

  const {researchQuery} = location.state

  useEffect(() => {  
    instance.get(`/search/${researchQuery}`).then(res => {
      addResults([...res.data])
    }).catch(() => {
      addResults([])
    })
  })

  return (
    <div className={styles.researchResultBar}>
      {postsResults.length === 0 || postsResults.length === 33 ? "0" : postsResults.length} Resultats pour <b>"{researchQuery}"</b>
    </div>
  )
}

const BodySearch = () => {
  // const {changeQuery} = useContext(researchContext)

  // // test
  // useEffect(() => {
  //   changeQuery("polygamie")
  // }, [])

  return (
    <section className={styles.researchResultSection}>
      <ResearchResultBar />

      <div className="container">
        <PostPropose type="result" />
        <PostPropose type="result" />
        <PostPropose type="result" />
      </div>
    </section>
  )
}

export default BodySearch