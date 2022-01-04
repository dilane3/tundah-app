import React, { Fragment } from 'react'
import Aside from '../components/marketing/aside/Aside'
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

        <Aside className={styles.asideSection} />
      </section>
    </Fragment>
  )
}

export default Base