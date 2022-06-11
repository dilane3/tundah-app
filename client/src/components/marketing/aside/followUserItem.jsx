import React, { useContext, useEffect, useState } from "react";
import ImgCircle from '../../elements/imgCircle/ImgCircle'
import { BiMinus, BiPlus } from 'react-icons/bi'
import './followUserStyle.css'
import { formatName } from "../../../utils/format";
import { ressourcesUrl } from "../../../utils/url";
import { getRelativeDate } from "../../../utils/dateOperations";
import currentUserContext from "../../../dataManager/context/currentUserContent";
import UserApi from "../../../api/users";
import FollowersSuggestionContext from "../../../dataManager/context/followersSuggestioinContext";
import { Link } from "react-router-dom";

const FollowUserItem = ({ data }) => {
  // Get data from global state
  const { currentUser, addFollowing, deleteFollowing } = useContext(currentUserContext)
  const { removeSuggestion } = useContext(FollowersSuggestionContext)

  useEffect(() => {
    let timer

    if (currentUser.alreadyFollowed(data.getId)) {
      timer = setTimeout(() => {
        removeSuggestion(data.getId)

        clearTimeout(timer)
      }, 3000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [currentUser.getFollowings.length])

  // Follow and unFollow a user
  const handleFollowUser = async (e, user) => {
    e.preventDefault()

    try {
      const type = currentUser.alreadyFollowed(user.getId) ? "unfollow" : "follow"

      // Handle follow action before sending the request
      if (type === "follow") {
        addFollowing(user)

        const timer = setTimeout(() => {
          removeSuggestion(user.getId)

          clearTimeout(timer)
        }, 3000)
      } else {
        deleteFollowing(user.getId)
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
    <div className="followcontent">
      <div className="followUserAction">
        <div className="followUserImg">
          <ImgCircle src={`${ressourcesUrl.profil}/${data.getProfil}`} alt="profil" classe="flwprofilCardImage" />
        </div>
        <div className="flwUserInformation">
          <Link to={`/profile/${data.getUsername}`}>
            <span className="flwUsername">{formatName(data.getName)}</span>
          </Link>
          <span className="flwUserInscription">{getRelativeDate(data.getDate)} </span>
        </div>
      </div>
      <button className="btnSuivreFlw" onClick={(e) => handleFollowUser(e, data)}>
        {
          currentUser.alreadyFollowed(data.getId) ? (
            <>
              <BiMinus color="3c6a46" size={15} />annule
            </>
          ) : (
            <>
              <BiPlus color="3c6a46" size={15} />suivre
            </>
          )}
      </button>
    </div>
  )
}
export default FollowUserItem;