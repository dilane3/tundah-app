import React from 'react'
import PostPropose from '../../../components/marketing/pageSections/proposalPost/PostPropose'
import styles from "../../../css/search.module.css"

const ResearchResultBar = () => {
  return (
    <div className={styles.researchResultBar}>
      03 Resultats pour <b>"Mariage Polygamique"</b>
    </div>
  )
}

const BodySearch = () => {
  return (
    <section className={styles.researchResultSection}>
      <ResearchResultBar />

      <div className="container">
        <PostPropose />
        <PostPropose />
        <PostPropose />
      </div>
    </section>
  )
}

export default BodySearch