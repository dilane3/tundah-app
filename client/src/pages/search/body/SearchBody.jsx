import { instance } from '../../../utils/url'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"
import researchContext from '../../../dataManager/context/researchContext'
import axios from 'axios'

const ResearchResultBar = () => {
  
  const {postsResults, query, addResults, changeQuery} = useContext(researchContext)

  const location = useLocation()

  const {researchQuery} = location.state

  useEffect(() => {  
    instance.get(`/posts/search/${researchQuery}`)
    .then(res => { 
      console.log(res.data)
      addResults([...res.data])
    }).catch(() => {
      console.log("lol ok")
      addResults([])
    })
  }, [researchQuery])

  useEffect(() => {
    changeQuery(researchQuery)
    console.log("This are the post results ", postsResults)
  }, [postsResults])

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

  const {postsResults, query, addResults, changeQuery} = useContext(researchContext)

  const location = useLocation()

  const {researchQuery} = location.state

  return (
    <section className={styles.researchResultSection}>
      <ResearchResultBar/>
      
      <div className="container">
        {postsResults.map((post) => (
          <PostPropose type="result" post={post}/>
        ))}
        {/* <PostPropose type="result"  />
        <PostPropose type="result" />
        <PostPropose type="result" /> */}
      </div>
    </section>
  )
}

export default BodySearch