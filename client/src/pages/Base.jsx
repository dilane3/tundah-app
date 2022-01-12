import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import Loader from '../components/utils/Loader'
import Aside from '../components/marketing/aside/Aside'
import MobileMenu from '../components/marketing/navbar/MobileMenu'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'
import currentUserContext from '../dataManager/context/currentUserContent'
import axios from 'axios'
import postsContext from '../dataManager/context/postsContext'

const logo = require("../medias/logo/Tundah-large.png")

// const instance = axios.create({
// 	baseURL: "http://localhost:5000/api",
// })

const instance = axios.create({
	baseURL: "http://192.168.43.81:5000/api",
})

const Base = ({children}) => {
  // getting context value
	const {login, currentUser} = useContext(currentUserContext)
  const {posts, addPosts} = useContext(postsContext)

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maskBackground, setMaskBackground] = useState(true)
  const [showLoaderPage, setShowLoaderPage] = useState(!currentUser ? true:false)
  const [loaderClassActive, setLoaderClassActive] = useState(!currentUser ? false:true)
  const [dataLoaded, setDataLoaded] = useState(!currentUser ? false:true)

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

    if (!currentUser) {
      instance.get("/users/current")
      .then(res => {
        // adding the current user in the global state
        login({...res.data, token: undefined})
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {

        instance.get("/posts?skip=0&limit=10")
        .then(res => {
          // adding post to the global state
          addPosts(res.data.data)
          console.log(res.data)

          setLoaderClassActive(true)
          setDataLoaded(true)
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          // to remove
          // setDataLoaded(true)


          let timer = setTimeout(() => {
            setShowLoaderPage(false)
    
            clearTimeout(timer)
          }, 1000)
        })
      })
    }
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
            <img src={logo} alt="logo" />
            <Loader color="#3c6a46" size="30" />
          </div>
        )
      }
    </Fragment>
  )
}

export default Base