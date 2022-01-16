import React, { useContext, useEffect } from 'react'
import proposedPostsContext from '../../../../dataManager/context/proposedPostContext';
import { instance } from '../../../../utils/url';
import HeaderspecifisPost from './headerspecificpost';
import PostPropose from './PostPropose';
import  './Specificpost.css'

const AppProposalPost  = () => {
    const {proposedPosts, addPosts} = useContext(proposedPostsContext)

    useEffect(() => {
        instance.get("/posts/proposed?skip=0&limit=10")
        .then(res => {
            const datas = res.data

            if (datas) {
                addPosts(datas.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [addPosts])

    return(
        <div className="content">
            <HeaderspecifisPost/>
            
            {
                proposedPosts.map(post => {
                    return <PostPropose key={post.id} type="proposedPost" postData={post} />
                })
            }
        </div>
    )
}

export default AppProposalPost;