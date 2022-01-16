import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import Loader from '../components/utils/Loader'
import Aside from '../components/marketing/aside/Aside'
import MobileMenu from '../components/marketing/navbar/MobileMenu'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'
import currentUserContext from '../dataManager/context/currentUserContent'
import { instance } from '../utils/url'
import postsContext from '../dataManager/context/postsContext'
import AddExpertModal from '../components/utils/modals/AddExpertModal'

const logo = require("../medias/logo/Tundah-large.png")

const Base = ({children}) => {
  // getting context value
	const {login, currentUser} = useContext(currentUserContext)
  const {
    addPosts,
    setMorePostArgs
  } = useContext(postsContext)

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maskBackground, setMaskBackground] = useState(true)
  const [showLoaderPage, setShowLoaderPage] = useState(!currentUser ? true:false)
  const [loaderClassActive, setLoaderClassActive] = useState(!currentUser ? false:true)
  const [dataLoaded, setDataLoaded] = useState(!currentUser ? false:true)
  const [showAddExpertModal, setShowAddExpertModal] = useState(false)
  const [addExpertAnimation, setAddExpertAnimation] = useState(false)

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

        instance.get("/posts?skip=0&limit=5")
        .then(res => {
          const postData = res.data.data
          let nextValue = res.data.next
          let skipValue = res.data.skip

          console.log({nextValue, skipValue})

          // adding posts
          addPosts(postData)

          // setting posts arguments
          setMorePostArgs(nextValue, skipValue)

          // stopping the loader for loading posts
          setDataLoaded(true)

          // hidden the loading page
          setLoaderClassActive(true)
          
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

  const handleDisplayAddExpertModal = (status) => {
    setShowAddExpertModal(true)
    setShowMobileMenu(false)

    let timer = setTimeout(() => {
      setAddExpertAnimation(true)

      clearTimeout(timer)
    }, 200)
  }

  const handleHiddeAddExpertModal = () => {
    setAddExpertAnimation(false)

    let timer = setTimeout(() => {
      setShowAddExpertModal(false)

      clearTimeout(timer)
    }, 500)
  }

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

        <Aside className={styles.asideSection} onShowAddExpertSection={handleDisplayAddExpertModal} />
      </section>

      <MobileMenu show={showMobileMenu} onShowAddExpertSection={handleDisplayAddExpertModal} />

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


      {
        showAddExpertModal ? (
          <>
            <AddExpertModal 
              onHide={handleHiddeAddExpertModal} 
              animationClass={addExpertAnimation} 
            />
            <span className={`${styles.backgroundBlack} ${!addExpertAnimation ? styles.backgroundBlackAnimation:""}`} onClick={handleHiddeAddExpertModal}></span>
          </>
        ):null
      }
    </Fragment>
  )
}

export default Base