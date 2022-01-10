import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import Loader from '../components/utils/Loader'
import Aside from '../components/marketing/aside/Aside'
import MobileMenu from '../components/marketing/navbar/MobileMenu'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'
import currentUserContext from '../dataManager/context/currentUserContent'
import axios from 'axios'

// const instance = axios.create({
// 	baseURL: "http://localhost:5000/api",
// })

const instance = axios.create({
	baseURL: "http://192.168.43.81:5000/api",
})

const Base = ({children}) => {
	const {login} = useContext(currentUserContext)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maskBackground, setMaskBackground] = useState(true)
  const [showLoaderPage, setShowLoaderPage] = useState(true)
  const [loaderClassActive, setLoaderClassActive] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

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
    const token = localStorage.getItem("tundah-token")

    instance.defaults.headers.common['authorization'] = `Bearer ${token}`

    instance.get("/users/current")
    .then(res => {
      login({...res.data, token: undefined})

      setLoaderClassActive(true)
      setDataLoaded(true)
    })
    .catch(err => {
      console.log(err)
      // window.location.href = "/signin"
    })
    .finally(() => {
      let timer = setTimeout(() => {
        setShowLoaderPage(false)

        clearTimeout(timer)
      }, 1000)
    })
  }, [])

  return (
    <Fragment>
      <Navbar className={styles.header} onShowMobileMenu={() => setShowMobileMenu(true)} />

      <section className={styles.container}>
        {
          dataLoaded ? (
            <section className={styles.mainSection}>
              {children}
            </section>
          ):null
        }

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