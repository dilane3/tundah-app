import { instance } from '../../../utils/url'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"
import researchContext from '../../../dataManager/context/researchContext'
import SearchNavbar from '../../../components/marketing/pageSections/search/searchNavbar'

const ResearchResultBar = () => {

  const { postsResults, usersResults, query, addResults, addUserResults, changeQuery, target } = useContext(researchContext)

  const location = useLocation()

  const { researchQuery } = location.state

  // use Memo and use Callback section
  const methodsCb = useCallback(() => {
    return {
      addResults,
      addUserResults,
      changeQuery
    }
  }, [addResults, addUserResults, changeQuery])

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
    const { addResults, addUserResults } = methodsRef.current()

    console.log(postsResults.length)
    console.log(usersResults.length)
    if (dataRef.current.length > 0) {
      if (target === "wiki") {
        instance.get(`/posts/wiki/search/${dataRef.current}`)
          .then(res => {
            addResults([...res.data])
          }).catch((err) => {
            console.log(err)
            addResults([])
          })
      } else {
        instance.get(`/posts/search/${dataRef.current}`)
          .then(res => {
            addResults([...res.data])
          }).catch((err) => {
            console.log(err)
            addResults([])
          })

        instance.get(`/users/search/${dataRef.current}`)
          .then(res => {
            addUserResults([...res.data])
          }).catch((err) => {
            console.log(err)
            addUserResults([])
          })
      }
    }

  }, [researchQuery])

  useEffect(() => {
    const { changeQuery } = methodsRef.current()

    changeQuery(dataRef.current)
  }, [postsResults, usersResults])

  console.log(query)

  return (
    <div className={styles.researchResultBar}>
      {target === "wiki" ?
        null :
        <div className={styles.resultsUsers}>
          <span>Personnes:</span>
          <div>
            {usersResults && usersResults.length === 0 ? "0" : usersResults.length} {usersResults.length < 2 ? "Resultat" : "Resultats"} pour <b>"{query}"</b>
          </div>
        </div>
      }

      <div className={styles.resultsPosts}>
        {target === "wiki" ?
          null :
          <span>Posts reseau:</span>
        }
        <div>
          {postsResults && postsResults.length === 0 ? "0" : postsResults.length} {postsResults.length < 2 ? "Resultat" : "Resultats"} pour <b>"{query}"</b>
        </div>
      </div>
    </div>
  )
}

const BodySearch = () => {
  return (
    <section className={styles.researchResultSection}>
      <ResearchResultBar />

      <SearchNavbar />
    </section>
  )
}

export default BodySearch