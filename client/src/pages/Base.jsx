import React, { Fragment, useEffect, useRef, useState } from 'react'
import Loader from '../components/utils/Loader'
import Aside from '../components/marketing/aside/Aside'
import MobileMenu from '../components/marketing/navbar/MobileMenu'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'

const Base = ({children}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maskBackground, setMaskBackground] = useState(true)
  const [showLoaderPage, setShowLoaderPage] = useState(true)
  const [loaderClassActive, setLoaderClassActive] = useState(false)

  useEffect(() => {
    if (showMobileMenu) {
      setMaskBackground(false)
    } else {
      let timer = setTimeout(() => {
        setMaskBackground(true)
      }, 1000)
    }
  }, [showMobileMenu])

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setLoaderClassActive(true)

      let timer = setTimeout(() => {
        setShowLoaderPage(false)

        clearTimeout(timer)
        clearTimeout(timer1)
      }, 1000)
    }, 1000)
  }, [])

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

      {/* Background black while mobile menu is active */}
      {
        !maskBackground && (
          <span 
            className={`${styles.backgroundBlack} ${!showMobileMenu ? styles.backgroundBlackAnimation:''}`} 
            onClick={() => setShowMobileMenu(false)}
          ></span>
        )
      }

      {/* loader page */}
      {
        showLoaderPage && (
          <div className={`${styles.loaderPage} ${loaderClassActive ? styles.loaderPageAnimation:""}`}>
            <span>Tundah</span>
            <Loader color="#3c6a46" size="30" />
          </div>
        )
      }
    </Fragment>
  )
}

export default Base