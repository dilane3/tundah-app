import { instance } from '../../../utils/url'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"
import researchContext from '../../../dataManager/context/researchContext'
import SearchNavbar from '../../../components/marketing/pageSections/search/seachNavbar'

const ResearchResultBar = () => {
  
  const {postsResults, query, addResults, changeQuery} = useContext(researchContext)

  const location = useLocation()

  const {researchQuery} = location.state

  // use Memo and use Callback section
  const methodsCb = useCallback(() => {
    return {
      addResults,
      changeQuery
    }
  }, [addResults, changeQuery])

  const dataMemo = useMemo(() => {
    return researchQuery
  }, [researchQuery])

  // use ref section
  const dataRef = useRef(dataMemo)
  const methodsRef = useRef(methodsCb)

  // use effect section
  useEffect(() => {
    methodsRef.current = methodsCb
  }, [methodsCb])

  useEffect(() => {
    dataRef.current = dataMemo
  }, [dataMemo])

  useEffect(() => {  
    const {addResults} = methodsRef.current()

    if (dataRef.current.length > 0) {
      instance.get(`/posts/search/${dataRef.current}`)
      .then(res => {
        console.log("res.data")
        addResults([...res.data])
      }).catch((err) => {
        console.log(err)
        addResults([])
      })
    }

  }, [researchQuery])

  useEffect(() => {
    const {changeQuery} = methodsRef.current()

    changeQuery(dataRef.current)
  }, [postsResults])

  return (
    <div className={styles.researchResultBar}>
      {postsResults.length === 0 ? "0" : postsResults.length} {postsResults.length < 2 ? "Resultat": "Resultats"} pour <b>"{query}"</b>
    </div>
  )
}

const BodySearch = () => {
  const {postsResults} = useContext(researchContext)


  return (
    <section className={styles.researchResultSection}>
      <ResearchResultBar/>
      <SearchNavbar/>
      
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