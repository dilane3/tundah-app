import React ,{useContext, useEffect, useRef, useState} from 'react'
import { BsEmojiHeartEyes, BsX } from "react-icons/bs"
import Button from '../../../elements/buttons/Button'
import {instance} from '../../../../utils/url'
import Subscriber from '../../../../entities/Subscriber'
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext'
import LoaderCircle from "../../../utils/loaders/Loader"

const WriteComment  = ({idPost, idUser, isResponseInput, idComment, onChangeToResponseInput}) => {
    // defining the local state
    const [comment, setComment] = useState("")
    const [sendingComment, setSendingComment] = useState(false)

    // getting data from global state
    const {addComment} = useContext(postsContext)

    // reference section
    const inputCommentRef = useRef()

    // use Effect section
    useEffect(() => {
        if (isResponseInput) {
            inputCommentRef.current.focus()
        }
    }, [isResponseInput])

    const handleChange = (event) =>{
        setComment(event.currentTarget.value);
    }

    const handleSubmit = (event)=>{
        const credentials = {
            content:comment,
            idPost,
            idUser,
            idComment: idComment ? idComment:undefined
        }

        setSendingComment(true)

        instance.post(`/comments/create`, credentials)
	 	.then((res) => {
	 		const comment = res.data.data

            addComment(idPost, comment, idComment)
            setComment("")

            onChangeToResponseInput(false)
	 	})
	 	.catch(err => {
	 		console.log(err)
	 	})
        .then(() => {
            setSendingComment(false)
        })
    }

    return(
        <div className="WriteCommentContent">
            <div className="HeartEyesIcon">
               <BsEmojiHeartEyes size="25" className="icon" />
            </div> 
            <form className="FormComment">
                <input 
                    ref={inputCommentRef}
                    type="text" 
                    placeholder={`${isResponseInput ? "Votre reponse":"Votre commentaire..."}`}
                    onChange={handleChange}
                    value={comment} 
                />

                {
                    isResponseInput ? (
                        <span className="closeResponseInput" onClick={() => onChangeToResponseInput(false)}>
                            <BsX size={25} className="icon" color="grey" />
                        </span>
                    ):null
                }

                {
                    sendingComment ? (
                        <span className="sendingCommentLoader">
                            <LoaderCircle color="green" size={30} />
                        </span>
                    ):null
                }
                    
                <Button size="meduim" type="submit" action={handleSubmit} classe="commentBtn">
                    publier
                </Button>
           </form>
        </div>
    )
}

const WriteResponseComment = ({idPost, idUser, idComment}) => {
    // defining local state
    const [comment, setComment] = useState("")
    const [sendingComment, setSendingComment] = useState(false)

    // getting data from global state
    const {addComment} = useContext(postsContext)

    // reference section
    const inputResponseRef = useRef()

    // use Effect section
    useEffect(() => {
        inputResponseRef.current.focus()
    }, [idComment])

    const handleChange = (event) =>{
        setComment(event.currentTarget.value);
    }
    
    const handleSubmit = (event)=>{
        setSendingComment(true)

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
        .then(() => {
            setSendingComment(false)
        })
    }

    return(
        <div className="WriteCommentResponseContent">
            <div className="HeartEyesIcon">
               <BsEmojiHeartEyes size="25" className="icon" />
            </div> 
            <form className="FormComment">
                 <input 
                    ref={inputResponseRef}
                    type="text" 
                    placeholder="Ajouter une reponse..."
                    onChange={handleChange}
                    value={comment}
                    onKeyPress={(event) => event.code === "Enter" ? handleSubmit(event):null} 
                />

                {
                    sendingComment ? (
                        <span className="sendingCommentLoader">
                            <LoaderCircle color="green" size={30} />
                        </span>
                    ):null
                }
                    
                <Button size="meduim" type="submit" action={handleSubmit}>
                    Répondre
                </Button>
           </form>
        </div>
    )
}

export { WriteComment, WriteResponseComment };