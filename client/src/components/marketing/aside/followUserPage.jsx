import React, { useContext } from "react";
import FollowersSuggestionContext from "../../../dataManager/context/followersSuggestioinContext";
import FollowUserItem from "./followUserItem";
import './followUserStyle.css'

const FollowUserPage = () => {
  const { suggestions } = useContext(FollowersSuggestionContext)

  return (
    <div className="App-contentFollow">
      {
        suggestions.map(user => (
          <FollowUserItem data={user} />
        ))
      }

      <div className="followUserSeeMoreAction">
        Voir plus...
      </div>
    </div>
  )
}
export default FollowUserPage;