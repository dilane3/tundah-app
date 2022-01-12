import React from 'react'
import WriteComment from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'

const AppSpecifificPost  = () => {

    return(
        <section className="content">
            <Post/>
            <WriteComment/>
            <section>
                <div className="firstElement">
                    <Comment/>
                </div>
            </section>
        </section>
    )
}

export default AppSpecifificPost;