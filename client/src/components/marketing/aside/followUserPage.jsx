import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import FollowersSuggestionContext from "../../../dataManager/context/followersSuggestioinContext";
import FollowUserItem from "./followUserItem";
import './followUserStyle.css'

const FollowUserPage = () => {
  const { suggestions } = useContext(FollowersSuggestionContext)

  return (
    <div className="App-contentFollow">
      <Box sx={{ mb: 3 }}>
        <Typography sx={{
          fontSize: "18px",
          fontWeight: "bold",
          ml: 1
        }}>Vous connaissez surement...</Typography>
      </Box>
      {
        suggestions.slice(0, 3).map(user => (
          <FollowUserItem data={user} />
        ))
      }

      {
        suggestions.length > 3 && (
          <div className="followUserSeeMoreAction">
            Voir plus...
          </div>
        )
      }
    </div>
  )
}
export default FollowUserPage;