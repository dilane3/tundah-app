import React, { useContext, useEffect, useRef, useState } from 'react'
import { WriteComment, WriteResponseComment } from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext';
import { useParams } from 'react-router';
import currentUserContext from '../../../../dataManager/context/currentUserContent';
import { instance } from '../../../../utils/url';

const sortCommentByDate = (comments) => {
    return comments.sort((c1, c2) => c2.creation_date - c1.creation_date)
}

const CommentBlock = ({comment, post, idUser}) => {
    const [showResponseInput, setShowResponseInput] = useState(false);

    // defining reference of element
    const commentBlockRef = useRef()

    const handleActivateResponse = () => {
        setShowResponseInput(true)

        commentBlockRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    return (
        <div ref={commentBlockRef} className="firstElement">
            <Comment 
                data={comment} 
                onResponse={handleActivateResponse} 
                author={post.author}
            />

            <div className="secondElement">
                {
                    sortCommentByDate(comment.responses).map(response => {
                        return (
                            <Comment 
                                key={response.id} 
                                data={response} 
                                onResponse={handleActivateResponse} 
                                isResponse={true}
                                author={post.author}
                            />
                        )
                    })
                }
            </div>
                    
            {
                showResponseInput ? (
                    <WriteResponseComment idPost={post.id} idUser={idUser} idComment={comment.id} />
                ):null
            }
        </div>
    )
}

const AppSpecifificPost  = () => {
    const {posts, likePost, addComments} = useContext(postsContext)
    const {likeUserPost, currentUser} = useContext(currentUserContext)
    const {id} = useParams()

    // defining ref
    const commentPageRef = useRef()

    // useEffect section
	useEffect(() => {
		const token = localStorage.getItem("tundah-token")

		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])

    useEffect(() => {
        commentPageRef.current.scrollIntoView()
    }, [])

    useEffect(() => {
        instance.get(`/comments/all/${id}`)
        .then(res => {
            const comments = res.data;

            addComments(id, comments);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

	const handleLikePost = (id) => {
		instance.post(`/posts/like/${id}`)
		.then((res) => {
			console.log(res.data)
		})
		.catch(err => {
			console.log(err)
		})
		.then(() => {
			likePost(id, currentUser.id)
			likeUserPost(id)
		})
	}

    const getPost = (id) => {
        let post = posts.find(p => p.id === id)

        if (!post) {
            post = currentUser.posts.find(p => p.id === id)
        }

        console.log({posts, id})

        return post
    }

    return(
        <section ref={commentPageRef} className="contentCommentPage">
            <Post postData={getPost(id)} onLikePost={handleLikePost} />
            <WriteComment idUser={currentUser.id} idPost={id}/>
            <section>
                {
                    sortCommentByDate(getPost(id).commentsData).map(comment=>(
                        <CommentBlock key={comment.id}  idUser={currentUser.id} post={getPost(id)} comment={comment} />
                    ))
                }
                
            </section>
        </section>
    )
}

export default AppSpecifificPost;