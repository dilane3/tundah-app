import React from "react";
import FollowUserItem from "./followUserItem";
import  './followUserStyle.css'

const FollowUserPage = () => {

    return(
      <div className="App-contentFollow">
        <FollowUserItem/>
        <FollowUserItem/>
        <FollowUserItem/>
        <FollowUserItem/>
        <div className="followUserSeeMoreAction">
          Voir plus...
        </div>
      </div>
    )
}
export default FollowUserPage;