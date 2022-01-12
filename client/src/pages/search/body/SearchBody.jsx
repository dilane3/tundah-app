import React, { useContext, useEffect } from 'react'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"
import researchContext from '../../../dataManager/context/researchContext'

const ResearchResultBar = () => {
  return (
    <div className={styles.researchResultBar}>
      03 Resultats pour <b>"Mariage Polygamique"</b>
    </div>
  )
}

const BodySearch = () => {
  const {changeQuery} = useContext(researchContext)

  // test
  useEffect(() => {
    changeQuery("polygamie")
  }, [])

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