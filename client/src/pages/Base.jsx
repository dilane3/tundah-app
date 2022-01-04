import React, { Fragment } from 'react'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'

const Base = ({children}) => {
  return (
    <Fragment>
      <Navbar className={styles.header} />

      <section className={styles.container}>
        <section className={styles.mainSection}>
          {children}
        </section>
        <section className={styles.asideSection}></section>
      </section>
    </Fragment>
  )
}

export default Base