import React from 'react'
import HeaderspecifisPost from './headerspecificpost';
import PostPropose from './PostPropose';
import  './Specificpost.css'

const AppProposalPost  = () => {

    return(
        <div className="content">
            <HeaderspecifisPost/>
            <PostPropose/>
            <PostPropose/>
            <PostPropose/>
            <PostPropose/>
            <PostPropose/>
            <PostPropose/>
        </div>
    )
}

export default AppProposalPost;