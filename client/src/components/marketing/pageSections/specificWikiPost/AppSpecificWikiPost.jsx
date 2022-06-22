import React, { useCallback, useContext, useEffect, useRef } from 'react'
import Post from '../Post';
import './appSpecificWikiPost.css'
import { Redirect, useParams } from 'react-router-dom';
import currentUserContext from '../../../../dataManager/context/currentUserContent';
import { instance } from '../../../../utils/url';
import LoaderCircle from '../../../utils/loaders/Loader';
import postsWikiContext from '../../../../dataManager/context/postWikiContext';

const AppSpecificWikiPost = () => {
  // getting value from the global state
  const { wikiPosts } = useContext(postsWikiContext)
  const { currentUser } = useContext(currentUserContext)

  // getting the id from the url params
  const { id } = useParams()

  // useEffect section
  useEffect(() => {
    const token = localStorage.getItem("tundah-token")

    instance.defaults.headers.common["authorization"] = `Bearer ${token}`
  }, [])

  const getPost = (id) => {
    let post = wikiPosts.find(p => p.id === id)

    if (!post && currentUser) {
      post = currentUser.posts.find(p => p.id === id)
    }

    return post
  }

  return (
    <section className="contentCommentPage">
      {
        !getPost(id) ? (
          <Redirect to="/" />
        ) : <Post postData={getPost(id)} onLikePost={() => { }} type="wiki" />
      }
    </section>
  )
}

export default AppSpecificWikiPost;