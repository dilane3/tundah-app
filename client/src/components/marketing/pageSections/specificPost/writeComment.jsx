import React ,{useContext, useState} from 'react'
import { BsEmojiHeartEyes } from "react-icons/bs"
import Button from '../../../elements/buttons/Button'
import {instance} from '../../../../utils/url'
import Subscriber from '../../../../entities/Subscriber'
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext'

const WriteComment  = ({idPost,idUser}) => {
    const [comment, setComment] = useState("")

    // getting data from global state
    const {addComment} = useContext(postsContext)

    const handleChange = (event) =>{
        setComment(event.currentTarget.value);
    }

    const handleSubmit = (event)=>{
        console.log("submit");
        instance.post(`/comments/create`,{
            content:comment,
            idPost,
            idUser
        })
	 	.then((res) => {
	 		const comment = res.data.data

            addComment(idPost, comment)
            setComment("")
	 	})
	 	.catch(err => {
	 		console.log(err)
	 	})
    }

    return(
        <div className="WriteCommentContent">
            <div className="HeartEyesIcon">
               <BsEmojiHeartEyes size="25" className="icon" />
            </div> 
            <form className="FormComment">
                 <input type="text" 
                    placeholder="Votre commentaire..."
                    onChange={handleChange}
                    value={comment} />
                    
                <Button size="meduim" type="submit" action={handleSubmit}>
                    publier
                </Button>
           </form>
        </div>
    )
}

const WriteResponseComment = ({idPost, idUser, idComment}) => {
    const [comment, setComment] = useState("")

    // getting data from global state
    const {addComment} = useContext(postsContext)

    const handleChange = (event) =>{
        setComment(event.currentTarget.value);
    }
    
    const handleSubmit = (event)=>{
        console.log(idComment)
        console.log("submit");
        instance.post(`/comments/create`,{
            content:comment,
            idPost,
            idUser,
            idComment
        })
	 	.then((res) => {
	 		console.log(res.data)
            addComment(idPost, res.data.data, idComment)

            setComment("")
	 	})
	 	.catch(err => {
	 		console.log(err)
	 	})
    }

    return(
        <div className="WriteCommentResponseContent">
            <div className="HeartEyesIcon">
               <BsEmojiHeartEyes size="25" className="icon" />
            </div> 
            <form className="FormComment">
                 <input type="text" 
                    placeholder="Ajouter une reponse..."
                    onChange={handleChange}
                    value={comment} />
                    
                <Button size="meduim" type="submit" action={handleSubmit}>
                    publier
                </Button>
           </form>
        </div>
    )
}

export { WriteComment, WriteResponseComment };