import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import FollowersSuggestionContext from "../../../dataManager/context/followersSuggestionContext";
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
        }}>
          {
            suggestions.length > 0 ? "Vous connaissez surement.." : "Aucune suggestion d'utilisateurs pour le moment"
          }
        </Typography>
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