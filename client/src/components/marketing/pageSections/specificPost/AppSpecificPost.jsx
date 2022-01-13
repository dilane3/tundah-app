import React, { useContext, useRef, useState } from 'react'
import { WriteComment, WriteResponseComment } from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext';

const CommentBlock = () => {
    const [response, setResponse] = useState("")
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
    const {posts} = useContext(postsContext)

    return(
        <section className="contentCommentPage">
            <Post postData={posts[0]} />
            <WriteComment/>
            <section>
                <CommentBlock />
                <CommentBlock />
            </section>
        </section>
    )
}

export default AppSpecifificPost;