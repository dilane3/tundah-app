import { instance } from '../../../utils/url'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"
import researchContext from '../../../dataManager/context/researchContext'

const ResearchResultBar = () => {
  
  const {postsResults, query, addResults, changeQuery} = useContext(researchContext)

  const location = useLocation()

  const {researchQuery} = location.state

  useEffect(() => {  
    instance.get(`/posts/search/${researchQuery}`)
    .then(res => {
      addResults([...res.data])
    }).catch((err) => {
      console.log(err)
      addResults([])
    })
  }, [researchQuery, addResults])

  useEffect(() => {
    changeQuery(researchQuery)
  }, [postsResults, changeQuery, researchQuery])

  return (
    <div className={styles.researchResultBar}>
      {postsResults.length === 0 ? "0" : postsResults.length} {postsResults.length < 2 ? "Resultat": "Resultats"} pour <b>"{query}"</b>
    </div>
  )
}

const BodySearch = () => {
  // const {changeQuery} = useContext(researchContext)

  // // test
  // useEffect(() => {
  //   changeQuery("polygamie")
  // }, [])

  const {postsResults} = useContext(researchContext)


  return (
    <section className={styles.researchResultSection}>
      <ResearchResultBar/>
      
      <div className="container">
        {
          postsResults.map((post) => (
            <PostPropose type="result" postData={post}/>
          ))
        }
      </div>
    </section>
  )
}

export default BodySearch