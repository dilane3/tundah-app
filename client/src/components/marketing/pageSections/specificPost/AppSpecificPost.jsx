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

const CommentBlock = ({comment,idPost}) => {
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
            {/* <div className="secondElement">
                <Comment onResponse={handleActivateResponse} />
                <Comment onResponse={handleActivateResponse} />
            </div> */}
                    
            {
                showResponseInput ? (
                    <WriteResponseComment />
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
        const post = posts.find(p => p.id === id)

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
            console.log(comments)

            addComments(id, {...comments, id});
        })
        .catch(err=>{
            console.log(err);
        })
        return()=>{
            setComments({})
        }
    }, [])

    return(
        <section ref={commentPageRef} className="contentCommentPage">
            <Post postData={getPost(id)} onLikePost={handleLikePost} />
            <WriteComment/>
            <section>
                {comments.map(comment=>(
                    <CommentBlock id={id} comment={comment} />
                ))}
                
            </section>
        </section>
    )
}

export default AppSpecifificPost;