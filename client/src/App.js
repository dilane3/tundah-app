import React, { useState, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './css/app.css';
import Routes from './Routes'
import currentUserContext from './dataManager/context/currentUserContent';
import postsContext from './dataManager/context/postsContext';
import proposedPostContext from './dataManager/context/proposedPostContext'
import CategoryContext from './dataManager/context/categoryContext';
import {
  login,
  logout,
  deletePost,
  editPost,
  createPost,
  updateProfil,
  updateUser,
  likeUserPost
} from './dataManager/data/currentUser/currentUserActions'
import {
  deletePost as postDelete,
  updatePost,
  addPosts,
  addPost,
  addComment,
  addComments,
  likePost
} from './dataManager/data/posts/postsActions'
import {
  deleteProposedPost,
  updateProposedPost,
  addProposedPosts,
  validateProposedPost
} from './dataManager/data/proposedPost/proposedPostActions'
import currentUserReducer from './dataManager/data/currentUser/currentUserReducer';
import postsReducer from './dataManager/data/posts/postsReducer';
import navigationContext from './dataManager/context/navigationContext';
import Post from './entities/Post';
import researchContext from './dataManager/context/researchContext';
import proposedPostsReducer from './dataManager/data/proposedPost/proposedPostReducer';
import {ToastProvider} from "react-simple-toastify"

function App() {
  const [posts, dispatchPosts] = useReducer(postsReducer, [])
  const [proposedPosts, dispatchProposedPosts] = useReducer(proposedPostsReducer, [])
  const [currentUser, dispatchUser] = useReducer(currentUserReducer, null)
  const [navigation, setNavigation] = useState("")
  const [research, setReseach] = useState({
    postsResults: [],
    query: ""
  })
  const [postsArgs, setPostsArgs] = useState({
    next: false,
    skip: 0
  })
  const [proposedPostsArgs, setProposedPostsArgs] = useState({
    next: true,
    skip: 0
  })
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

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

  const userLikeUserPost = (idPost) => {
    dispatchUser(likeUserPost(idPost))
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

  const postsLikePost = (idPost, idUser) => {
    dispatchPosts(likePost(idPost, idUser))
  }

  const setMorePostArgs = (next, skip) => {
    setPostsArgs(state => ({...state, next, skip}))
  }

  // Proposed Posts actions

  const proposedPostsDeletePost = (idPost) => {
    dispatchProposedPosts(deleteProposedPost(idPost))
  }
  
  const proposedPostsUpdatePost = (idPost, data) => {
    dispatchProposedPosts(updateProposedPost(idPost, data))
  }
  
  const proposedPostsAddPosts = (posts) => {
    dispatchProposedPosts(addProposedPosts(posts))
  }

  const proposedPostValidate = (idPost) => {
    dispatchProposedPosts(validateProposedPost(idPost))
  }

  const setMoreProposedPostsArgs = (next, skip) => {
    setProposedPostsArgs(state => ({...state, next, skip}))
  }

  // navigation action
  const navigateTo = (target) => {
    setNavigation(target)
  }

  // research actions
  const addResults = (posts) => {
    const researchClone = {...research}
    const postsResults = posts.map(post => new Post(post))

    researchClone.postsResults = postsResults

    setReseach(researchClone)
  }

  const changeQuery = (query) => {
    const researchClone = {...research}

    researchClone.query = query

    setReseach(researchClone)
  }

  // Category Modal section

  const openModal = () => {
    setCategoryModalOpen(true)
  }

  const closeModal = () => {
    setCategoryModalOpen(false)
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
    updateUser: userUpdateUser,
    likeUserPost: userLikeUserPost
  }

  // data of posts context
  const postsContextValue = {
    posts,
    ...postsArgs,
    deletePost: postsDeletePost,
    updatePost: postsUpdatePost,
    addPosts: postsAddPosts,
    addPost: postsAddPost,
    addComments: postsAddComments,
    addComment: postsAddComment,
    likePost: postsLikePost,
    setMorePostArgs
  }

  const proposedPostContextValue = {
    proposedPosts,
    ...proposedPostsArgs,
    deletePost: proposedPostsDeletePost,
    updatePost: proposedPostsUpdatePost,
    addPosts: proposedPostsAddPosts,
    setMoreProposedPostsArgs,
    validatePost: proposedPostValidate
  }

  // data of navigation
  const navigationContextValue = {
    navigation,
    navigateTo
  }

  // data of research
  const researchContextValue = {
    ...research,
    addResults,
    changeQuery
  }

  // Data of category modal
  const categoryContextValue = {
    open: categoryModalOpen,
    openModal,
    closeModal
  }

  // toast config
  const toastOptions = {
    position: "bottom",
    timeout: 5000
  }

  return (
    <currentUserContext.Provider value={currentUserContextValue}>
      <postsContext.Provider value={postsContextValue}>
        <proposedPostContext.Provider value={proposedPostContextValue}>
          <navigationContext.Provider value={navigationContextValue}>
            <researchContext.Provider value={researchContextValue}>
              <ToastProvider options={toastOptions}>
                <CategoryContext.Provider value={categoryContextValue}>
                  <BrowserRouter>
                    <Routes />
                  </BrowserRouter>
                </CategoryContext.Provider>
              </ToastProvider>
            </researchContext.Provider>
          </navigationContext.Provider>
        </proposedPostContext.Provider>
      </postsContext.Provider>
    </currentUserContext.Provider>
  );
}

export default App;
