import React, { useContext, useEffect, useRef, useState } from 'react'
import { WriteComment, WriteResponseComment } from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext';
import { useParams } from 'react-router';
import currentUserContext from '../../../../dataManager/context/currentUserContent';
import { instance } from '../../../../utils/url';

const CommentBlock = () => {
    const [showResponseInput, setShowResponseInput] = useState(false)

    // defining reference of element
    const commentBlockRef = useRef()

    const handleActivateResponse = () => {
        setShowResponseInput(true)

        commentBlockRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    return (
        <div ref={commentBlockRef} className="firstElement">
            <Comment onResponse={handleActivateResponse} />
            <div className="secondElement">
                <Comment onResponse={handleActivateResponse} />
                <Comment onResponse={handleActivateResponse} />
            </div>
                    
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

        return post
    }

    useEffect(() => {
        commentPageRef.current.scrollIntoView()
    }, [])

    return(
        <section ref={commentPageRef} className="contentCommentPage">
            <Post postData={getPost(id)} onLikePost={handleLikePost} />
            <WriteComment/>
            <section>
                <CommentBlock />
                <CommentBlock />
            </section>
        </section>
    )
}

export default AppSpecifificPost;