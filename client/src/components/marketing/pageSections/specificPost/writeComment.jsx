import React ,{useState} from 'react'
import { BsEmojiHeartEyes } from "react-icons/bs"
import Button from '../../../elements/buttons/Button'
import './commentPost.css'

const WriteComment  = () => {

    const [comment, setComment] = useState("")

    const handleChange = (event) =>{
            setComment(event.currentTarget.value);
    }

    return(
        <div className="WriteCommentContent">
            <div className="HeartEyesIcon">
               < BsEmojiHeartEyes size="25" className="icon" />
            </div> 
            <form className="FormComment">
                 <input type="text" 
                    placeholder="Votre commentaire..."
                    onChange={handleChange}
                    value={comment} />
                    
                <Button size="meduim">
                    publier
                </Button>
           </form>
        </div>
    )
}

export default WriteComment;