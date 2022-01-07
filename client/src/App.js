import React, { useReducer } from 'react';
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

function App() {
  const [posts, dispatchPosts] = useReducer(postsReducer, [])
  const [currentUser, dispatchUser] = useReducer(currentUserReducer, null)

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

  return (
    <currentUserContext.Provider value={currentUserContextValue}>
      <postsContext.Provider value={posts}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </postsContext.Provider>
    </currentUserContext.Provider>
  );
}

export default App;
