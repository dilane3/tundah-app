import React, { Fragment, useEffect, useRef, useState } from 'react'
import Aside from '../components/marketing/aside/Aside'
import MobileMenu from '../components/marketing/navbar/MobileMenu'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'

const Base = ({children}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maskBackground, setMaskBackground] = useState(true)

  useEffect(() => {
    if (showMobileMenu) {
      setMaskBackground(false)
    } else {
      let timer = setTimeout(() => {
        setMaskBackground(true)
      }, 500)
    }
  }, [showMobileMenu])

  return (
    <Fragment>
      <Navbar className={styles.header} onShowMobileMenu={() => setShowMobileMenu(true)} />

      <section className={styles.container}>
        <section className={styles.mainSection}>
          {children}
        </section>

        <Aside className={styles.asideSection} />
      </section>

      <MobileMenu show={showMobileMenu} />

      {
        !maskBackground && (
          <span 
            className={`${styles.backgroundBlack} ${!showMobileMenu ? styles.backgroundBlackAnimation:''}`} 
            onClick={() => setShowMobileMenu(false)}
          ></span>
        )
      }
    </Fragment>
  )
}

export default Base