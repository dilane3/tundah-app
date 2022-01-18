import React ,{useState} from 'react'
import { BsEmojiHeartEyes } from "react-icons/bs"
import Button from '../../../elements/buttons/Button'
import {instance} from '../../../../utils/url'
import Subscriber from '../../../../entities/Subscriber'
import './commentPost.css'

const WriteComment  = ({idPost,idUser}) => {
    const [comment, setComment] = useState("")

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
	 		console.log(res.data)
	 	})
	 	.catch(err => {
	 		console.log(err)
	 	})
    }

    // const handleLikePost = (id) => {
	// 	instance.post(`/posts/like/${id}`)
	// 	.then((res) => {
	// 		console.log(res.data)
	// 	})
	// 	.catch(err => {
	// 		console.log(err)
	// 	})
	// 	.then(() => {
	// 		likePost(id, currentUser.id)
	// 		likeUserPost(id)
	// 	})
	// }

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