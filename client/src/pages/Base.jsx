import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Loader from '../components/utils/Loader'
import Aside from '../components/marketing/aside/Aside'
import MobileMenu from '../components/marketing/navbar/MobileMenu'
import Navbar from '../components/marketing/navbar/Navbar'
import styles from '../css/base.module.css'
import currentUserContext from '../dataManager/context/currentUserContent'
import { instance } from '../utils/url'
import postsContext from '../dataManager/context/postsContext'
import AddExpertModal from '../components/utils/modals/AddExpertModal'
import { ToastContext } from 'react-simple-toastify'
import ShowCategories from '../components/utils/modals/showCategories'
import CategoryContext from '../dataManager/context/categoryContext'
import ModalContext from '../dataManager/context/modalContext'
import ModalCoreContainer from '../components/utils/modals/modalCore'

const logo = require("../medias/logo/Tundah-large.png")

const Base = ({ children }) => {
  // getting context value
  const { login, currentUser } = useContext(currentUserContext)
  const {
    addPosts,
    setMorePostArgs
  } = useContext(postsContext)
  const { displayToast } = useContext(ToastContext)
  const { open: modalOpened, closeModal } = useContext(CategoryContext)
  const { isOpen: modalIsOpened, closeModal: modalCloser, currentModalName } = useContext(ModalContext)

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maskBackground, setMaskBackground] = useState(true)
  const [showLoaderPage, setShowLoaderPage] = useState(!currentUser ? true : false)
  const [loaderClassActive, setLoaderClassActive] = useState(!currentUser ? false : true)
  const [dataLoaded, setDataLoaded] = useState(!currentUser ? false : true)
  const [showAddExpertModal, setShowAddExpertModal] = useState(false)
  const [addExpertAnimation, setAddExpertAnimation] = useState(false)

  // use Memo and use Callback section
  const currentUserMemo = useMemo(() => {
    return currentUser
  }, [currentUser])

  const methodsCallback = useCallback(() => {
    return {
      addPosts,
      login,
      setMorePostArgs
    }
  }, [addPosts, login, setMorePostArgs])

  // use Ref section
  const currentUserRef = useRef(currentUserMemo)
  const methodsRef = useRef(methodsCallback)

  // use Effect section
  useEffect(() => {
    currentUserRef.current = currentUserMemo
  }, [currentUserMemo])

  useEffect(() => {
    methodsRef.current = methodsCallback()
  }, [methodsCallback])

  // handle the resizing of the window viewport
  useEffect(() => {
    window.onresize = function () {
      const width = window.innerWidth

      if (width > 700) {
        setShowMobileMenu(false)
      }
    }
  })

  useEffect(() => {
    if (showMobileMenu) {
      setMaskBackground(false)
    } else {
      let timer = setTimeout(() => {
        setMaskBackground(true)

        clearTimeout(timer)
      }, 1000)
    }
  }, [showMobileMenu])

  useEffect(() => {
    const token = localStorage.getItem("tundah-token")

    instance.defaults.headers.common['authorization'] = `Bearer ${token}`

    const {
      addPosts,
      login,
      setMorePostArgs
    } = methodsRef.current

    if (!currentUserRef.current) {
      instance.get("/users/current")
        .then(res => {
          console.log({ data: res.data })
          // adding the current user in the global state
          login({ ...res.data, token: undefined })

          displayToast("Vos données ont été chargées avec succes")
        })
        .catch(err => {
          console.log(err)

          displayToast("Vous n'êtes pas connecté")
        })
        .then(() => {

          instance.get("/posts?skip=0&limit=5")
            .then(res => {
              const postData = res.data.data
              let nextValue = res.data.next
              let skipValue = res.data.skip

              console.log({ nextValue, skipValue })
              console.log(res.data)

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

              displayToast("Une erreur est survenu lors du chargement des posts, veuillez recharger la page s'il vous plait")
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
          ) : null
        }

        <Aside className={styles.asideSection} onShowAddExpertSection={handleDisplayAddExpertModal} />
      </section>

      <MobileMenu show={showMobileMenu} onShowAddExpertSection={handleDisplayAddExpertModal} />

      {/* Background black while mobile menu is active */}
      {
        !maskBackground && (
          <span
            className={`${styles.backgroundBlack} ${!showMobileMenu ? styles.backgroundBlackAnimation : ''}`}
            onClick={() => setShowMobileMenu(false)}
          ></span>
        )
      }

      {/* loader page */}
      {
        showLoaderPage && (
          <div className={`${styles.loaderPage} ${loaderClassActive ? styles.loaderPageAnimation : ""}`}>
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
            <span className={`${styles.backgroundBlack} ${!addExpertAnimation ? styles.backgroundBlackAnimation : ""}`} onClick={handleHiddeAddExpertModal}></span>
          </>
        ) : null
      }


      {
        modalOpened && (
          <ShowCategories onCloseModal={closeModal} />
        )
      }

      <ModalCoreContainer
        open={modalIsOpened}
        title={currentModalName}
        closeModal={modalCloser}
      />
    </Fragment>
  )
}

export default Base