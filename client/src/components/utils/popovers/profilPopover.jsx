import { useContext, useEffect, useState } from 'react'
import UserApi from '../../../api/users'
import currentUserContext from '../../../dataManager/context/currentUserContent'
import { formatName } from '../../../utils/format'
import { ressourcesUrl } from '../../../utils/url'
import LoaderCircle from '../loaders/Loader'
import styles from './styles/profilPopover.module.css'

const profileImage = require("../../../medias/img/chinoise.jpg")

const checkUsername = (username, currentUser) => {
  return username === currentUser.username
}

const ProfilPopover = ({ authorData }) => {
  // Get data from global state
  const { currentUser, addFollowing, deleteFollowing } = useContext(currentUserContext)

  // Set local state
  const [followers, setFollowers] = useState(checkUsername(authorData.getUsername, currentUser) && currentUser.followers.length)
  const [followings, setFollowings] = useState(checkUsername(authorData.getUsername, currentUser) && currentUser.followings.length)
  const [loading, setLoading] = useState(!checkUsername(authorData.getUsername, currentUser) && true)

  useEffect(() => {
    handleGetUser()
  })

  const handleGetUser = async () => {
    const { data, error } = await UserApi.getUser(authorData.getUsername)

    if (data) {
      setFollowers(data.followers.length)
      setFollowings(data.followings.length)
    } else {
      setFollowers(0)
      setFollowings(0)
    }

    setLoading(false)
  }

  // Follow and unFollow a user
  const handleFollowUser = async (e, user) => {
    e.preventDefault()

    try {
      const type = currentUser.alreadyFollowed(user.getId) ? "unfollow" : "follow"

      // Handle follow action before sending the request
      if (type === "follow") {
        addFollowing(user)

        setFollowers(prev => prev + 1)
      } else {
        deleteFollowing(user.getId)

        setFollowers(prev => prev - 1)
      }

      const { data, error } = await UserApi.follow({ type, userId: user.getId })

      if (!data) {
        console.log(error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={styles.popoverContainer}>
      <div className={styles.popoverTop}>
        <div className={styles.popoverImageContainer}>
          <img
            src={`${ressourcesUrl.profil}/${authorData.getProfil}`}
          />
        </div>

        <div className={styles.popoverProfilInfo}>
          <span className={styles.popoverName}>{formatName(authorData.getName)}</span>
          <span className={styles.popoverUsername}>{`@${formatName(authorData.getUsername)}`}</span>
        </div>
      </div>

      <div className={styles.popoverBottom}>
        {
          !loading ? (
            <>
              <div className={styles.popoverFollowersInfo}>
                <div className={styles.popoverFollowerItem}>
                  <span>{followers}</span>
                  <span>Abonnés</span>
                </div>

                <div className={styles.popoverFollowerItem}>
                  <span>{followings}</span>
                  <span>Abonnements</span>
                </div>
              </div>

              {
                !checkUsername(authorData.getUsername, currentUser) && (
                  <div className={styles.popoverFollowersControls}>
                    <button className={`${styles.popoverBtn} ${currentUser.alreadyFollowed(authorData.getId) && styles.followed}`} onClick={(e) => handleFollowUser(e, authorData)}>
                      {
                        currentUser.alreadyFollowed(authorData.getId) ? "Se desabonner" : "S'abonner"
                      }
                    </button>
                  </div>
                )
              }
            </>
          ) : (
            <div className={{ ...styles.popoverFollowersControls, position: "relative" }}>
              <LoaderCircle color="#3c6a46" size={40} />
            </div>
          )
        }

      </div>
    </section>
  )
}

export default ProfilPopover