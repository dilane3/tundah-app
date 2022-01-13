import React, { useContext, useState } from 'react'
import { WriteComment, WriteResponseComment } from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext';

const CommentBlock = () => {
    const [response, setResponse] = useState("")
    const [showResponseInput, setShowResponseInput] = useState(false)

    const handleActivateResponse = () => {
        setShowResponseInput(true)
    }

    return (
        <div className="firstElement">
            <Comment/>
            <div className="secondElement">
                <Comment/>
                <Comment/>
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