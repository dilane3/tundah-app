import React from 'react'
import { BsEmojiHeartEyes } from "react-icons/bs"
import Button from '../../../elements/buttons/Button'
import './commentPost.css'

const WriteComment  = () => {

    return(
        <div className="WriteCommentContent">
            <div className="HeartEyesIcon">
               < BsEmojiHeartEyes size="25" className="icon" />
            </div> 
            <form className="FormComment">
                <div className="Input-space">
                    <input type="text" 
                   placeholder="Votre commentaire..."/>
                </div>
                <Button size="meduim">
                    publier
                </Button>
           </form>
        </div>
    )
}

export default WriteComment;