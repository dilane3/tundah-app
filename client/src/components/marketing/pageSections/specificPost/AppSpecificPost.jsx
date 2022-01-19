import React, { useContext, useEffect, useRef, useState } from 'react'
import { WriteComment, WriteResponseComment } from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext';
import { useParams } from 'react-router';
import currentUserContext from '../../../../dataManager/context/currentUserContent';
import { instance } from '../../../../utils/url';
import { addComments } from '../../../../dataManager/data/posts/postsActions';

const CommentBlock = ({comment, idPost, idUser}) => {
    const [showResponseInput, setShowResponseInput] = useState(false);

    // defining reference of element
    const commentBlockRef = useRef()

    const handleActivateResponse = () => {
        setShowResponseInput(true)

        commentBlockRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    // return (
    //     <div ref={commentBlockRef} className="firstElement">
    //         {comments.map(comment=>( 
    //             <div>
    //                 <Comment onResponse={handleActivateResponse} comment={comment} />   
    //                 <div className="secondElement">
    //                     <Comment onResponse={handleActivateResponse} comment={comment} />
    //                 </div> 
    //             </div>
    //         ))}  
    //         {showResponseInput ? (
    //             <WriteResponseComment />
    //         ):null}        
            
    //    </div>    
    // )

    return (
        <div ref={commentBlockRef} className="firstElement">
            <Comment data={comment} onResponse={handleActivateResponse} />

            <div className="secondElement">
                {
                    comment.responses.map(response => {
                        return (
                            <Comment key={response.id} data={response} onResponse={handleActivateResponse} />
                        )
                    })
                }
            </div>
                    
            {
                showResponseInput ? (
                    <WriteResponseComment idPost={idPost} idUser={idUser} idComment={comment.id} />
                ):null
            }
        </div>
    )
}

const AppSpecifificPost  = () => {
    const {posts, likePost} = useContext(postsContext)
    const {likeUserPost, currentUser} = useContext(currentUserContext)
    const [comments, setComments] = useState([])
    const {id} = useParams()

    // defining ref
    const commentPageRef = useRef()

    // useEffect section
	useEffect(() => {
		const token = localStorage.getItem("tundah-token")

		instance.defaults.headers.common["authorization"] = `Bearer ${token}`
	}, [])
	
	useEffect(() => {
		console.log(posts)
	}, [posts])

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

    useEffect(() => {
        commentPageRef.current.scrollIntoView()
    }, [])

    useEffect(() => {
        instance.get(`/comments/all/${id}`)
        .then(res => {
            const comments = res.data;
            setComments(comments);
            console.log("les comments",comments)

            addComments(id, {...comments, id});
        })
        .catch(err=>{
            console.log(err);
        })
        return()=>{
            setComments({})
        }
    }, [])

    // const handleUser = (id) => {
	// 	instance.get(`/posts/like/${id}`)
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
        <section ref={commentPageRef} className="contentCommentPage">
            <Post postData={getPost(id)} onLikePost={handleLikePost} />
            <WriteComment idUser={currentUser.id} idPost={id}/>
            <section>
                {comments.map(comment=>(
                    <CommentBlock key={comment.id}  idUser={currentUser.id} idPost={id} comment={comment} />
                ))}
                
            </section>
        </section>
    )
}

export default AppSpecifificPost;