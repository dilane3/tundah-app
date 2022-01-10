import React, { useContext, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './css/app.css';
import Routes from './Routes'
import currentUserContext from './dataManager/context/currentUserContent';
import postsContext from './dataManager/context/postsContext';
import {
  login,
  logout,
  deletePost,
  editPost,
  createPost,
  updateProfil,
  updateUser
} from './dataManager/data/currentUser/currentUserActions'
import {
  deletePost as postDelete,
  updatePost,
  addPosts,
  addPost,
  addComment,
  addComments
} from './dataManager/data/posts/postsActions'
import currentUserReducer from './dataManager/data/currentUser/currentUserReducer';
import postsReducer from './dataManager/data/posts/postsReducer';

function App() {
  const [posts, dispatchPosts] = useReducer(postsReducer, [])
  const [currentUser, dispatchUser] = useReducer(currentUserReducer, null)

  // current User actions
  const userLogin = (data) => {
    dispatchUser(login(data))
  }

  const userLogout = () => {
    dispatchUser(logout())
  }

  const userDeletePost = (idPost) => {
    dispatchUser(deletePost(idPost))
  }

  const userEditPost = (idPost, data) => {
    dispatchUser(editPost(idPost, data))
  }

  const userCreatePost = (post) => {
    dispatchUser(createPost(post))
  }

  const userUpdateProfil = (profil) => {
    dispatchUser(updateProfil(profil))
  }

  const userUpdateUser = (data) => {
    dispatchUser(updateUser(data))
  }

  // Posts actions

  const postsDeletePost = (idPost) => {
    dispatchPosts(postDelete(idPost))
  }
  
  const postsUpdatePost = (idPost, data) => {
    dispatchPosts(updatePost(idPost, data))
  }
  
  const postsAddPosts = (posts) => {
    dispatchPosts(addPosts(posts))
  }
  
  const postsAddPost = (post) => {
    dispatchPosts(addPost(post))
  }
  
  const postsAddComment = (idPost, comment, responseTo = null) => {
    dispatchPosts(addComment(idPost, comment, responseTo))
  }
  
  const postsAddComments = (idPost, comments) => {
    dispatchPosts(addComments(idPost, comments))
  }

  // data of current user context
  const currentUserContextValue = {
    currentUser,
    login: userLogin,
    logout: userLogout,
    deletePost: userDeletePost,
    editPost: userEditPost,
    createPost: userCreatePost,
    updateProfil: userUpdateProfil,
    updateUser: userUpdateUser
  }

  // data of posts context
  const postsContextValue = {
    posts,
    deletePost: postsDeletePost,
    updatePost: postsUpdatePost,
    addPosts: postsAddPosts,
    addPost: postsAddPost,
    addComments: postsAddComments,
    addComment: postsAddComment
  }

  return (
    <currentUserContext.Provider value={currentUserContextValue}>
      <postsContext.Provider value={postsContextValue}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </postsContext.Provider>
    </currentUserContext.Provider>
  );
}

export default App;
