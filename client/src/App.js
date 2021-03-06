import React, { useState, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import "./css/app.css";
import Routes from "./Routes";
import currentUserContext from "./dataManager/context/currentUserContent";
import postsContext from "./dataManager/context/postsContext";
import postsWikiContext from "./dataManager/context/postWikiContext";
import CategoryContext from "./dataManager/context/categoryContext";
import {
  login,
  logout,
  deletePost,
  editPost,
  createPost,
  simpleSharePost,
  updateProfil,
  updateUser,
  likeUserPost,
  addFollower,
  addFollowing,
  deleteFollower,
  deleteFollowing,
} from "./dataManager/data/currentUser/currentUserActions";
import {
  deletePost as postDelete,
  updatePost,
  addPosts,
  addPost,
  addComment,
  addComments,
  likePost,
  sharePost,
  deleteComment,
} from "./dataManager/data/posts/postsActions";

import { addWikiPosts } from "./dataManager/data/postWiki/wikiPostAction";

import currentUserReducer from "./dataManager/data/currentUser/currentUserReducer";
import wikiPostsReducer from "./dataManager/data/wikiPosts/wikiPostsReducer";
import postsReducer from "./dataManager/data/posts/postsReducer";
import navigationContext from "./dataManager/context/navigationContext";
import Post from "./entities/Post";
import Subscriber from "./entities/Subscriber";
import researchContext from "./dataManager/context/researchContext";
import { ToastProvider } from "react-simple-toastify";
import ModalProvider from "./dataManager/providers/modalProvider";
import FollowersSuggestionProvider from "./dataManager/providers/followersSuggestionProvider";
import PostWikiProvider from "./dataManager/providers/postWikiProvider";

function App() {
  const [posts, dispatchPosts] = useReducer(postsReducer, []);
  const [currentUser, dispatchUser] = useReducer(currentUserReducer, null);
  const [navigation, setNavigation] = useState("");
  const [research, setReseach] = useState({
    postsResults: [],
    usersResults: [],
    query: "",
  });
  const [postsArgs, setPostsArgs] = useState({
    next: false,
    skip: 0,
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  // current User actions
  const userLogin = (data) => {
    dispatchUser(login(data));
  };

  const userLogout = () => {
    dispatchUser(logout());
  };

  const userDeletePost = (idPost) => {
    dispatchUser(deletePost(idPost));
  };

  const userEditPost = (idPost, data) => {
    dispatchUser(editPost(idPost, data));
  };

  const userCreatePost = (post) => {
    dispatchUser(createPost(post));
  };

  const userUpdateProfil = (profil) => {
    dispatchUser(updateProfil(profil));
  };

  const userLikeUserPost = (idPost) => {
    dispatchUser(likeUserPost(idPost));
  };

  const userSimpleSharePost = (post, status) => {
    dispatchUser(simpleSharePost(post, status));
  };

  const userUpdateUser = (data) => {
    dispatchUser(updateUser(data));
  };

  const userAddFollower = (user) => {
    dispatchUser(addFollower(user));
  };

  const userAddFollowing = (user) => {
    dispatchUser(addFollowing(user));
  };

  const userDeleteFollower = (userId) => {
    dispatchUser(deleteFollower(userId));
  };

  const userDeleteFollowing = (userId) => {
    dispatchUser(deleteFollowing(userId));
  };

  // Posts actions

  const postsDeletePost = (idPost) => {
    dispatchPosts(postDelete(idPost));
  };

  const postsUpdatePost = (idPost, data) => {
    dispatchPosts(updatePost(idPost, data));
  };

  const postsAddPosts = (posts) => {
    dispatchPosts(addPosts(posts));
  };

  const postsAddPost = (post) => {
    dispatchPosts(addPost(post));
  };

  const postsSharePost = (post) => {
    dispatchPosts(sharePost(post));
  };

  const postsAddComment = (idPost, comment, responseTo = null) => {
    dispatchPosts(addComment(idPost, comment, responseTo));
  };

  const postsAddComments = (idPost, comments) => {
    dispatchPosts(addComments(idPost, comments));
  };

  const postsDeleteComment = (idComment, idPost) => {
    dispatchPosts(deleteComment(idComment, idPost));
  };

  const postsLikePost = (idPost, idUser) => {
    dispatchPosts(likePost(idPost, idUser));
  };

  const setMorePostArgs = (next, skip) => {
    setPostsArgs((state) => ({ ...state, next, skip }));
  };

  // navigation action
  const navigateTo = (target) => {
    setNavigation(target);
  };

  // research actions
  const addResults = (posts) => {
    const researchClone = { ...research };
    const postsResults = posts.map((post) => new Post(post));

    researchClone.postsResults = postsResults;

    setReseach(researchClone);
  };

  const addUserResults = (users) => {
    const researchClone = { ...research };
    const usersResults = users.map((user) => new Subscriber(user));

    researchClone.usersResults = usersResults;

    setReseach(researchClone);
  };

  const changeQuery = (query) => {
    const researchClone = { ...research };

    researchClone.query = query;

    setReseach(researchClone);
  };

  // Category Modal section

  const openModal = () => {
    setCategoryModalOpen(true);
  };

  const closeModal = () => {
    setCategoryModalOpen(false);
  };

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
    simpleSharePost: userSimpleSharePost,
    likeUserPost: userLikeUserPost,
    addFollower: userAddFollower,
    addFollowing: userAddFollowing,
    deleteFollower: userDeleteFollower,
    deleteFollowing: userDeleteFollowing,
  };

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
    deleteComment: postsDeleteComment,
    likePost: postsLikePost,
    setMorePostArgs,
    sharePost: postsSharePost,
  };

  // const wikiPostContextValue = {
  //   wikiPosts,
  //   ...wikiPostsArgs,
  //   deleteWikiPost: postsDeleteWikiPost,
  //   updateWikiPost: postsUpdateWikiPost,
  //   addWikiPosts: postsAddWikiPosts,
  //   addWikiPost: postsAddWikiPost,
  //   setMoreWikiPostsArgs,
  // };

  // data of navigation
  const navigationContextValue = {
    navigation,
    navigateTo,
  };

  // data of research
  const researchContextValue = {
    ...research,
    addResults,
    addUserResults,
    changeQuery,
  };

  // Data of category modal
  const categoryContextValue = {
    open: categoryModalOpen,
    openModal,
    closeModal,
  };

  // toast config
  const toastOptions = {
    position: "bottom",
    timeout: 5000,
  };

  return (
    <currentUserContext.Provider value={currentUserContextValue}>
      <PostWikiProvider>
        <postsContext.Provider value={postsContextValue}>
          <navigationContext.Provider value={navigationContextValue}>
            <researchContext.Provider value={researchContextValue}>
              <ToastProvider options={toastOptions}>
                <CategoryContext.Provider value={categoryContextValue}>
                  <ModalProvider>
                    <FollowersSuggestionProvider>
                      <BrowserRouter>
                        <Routes />
                      </BrowserRouter>
                    </FollowersSuggestionProvider>
                  </ModalProvider>
                </CategoryContext.Provider>
              </ToastProvider>
            </researchContext.Provider>
          </navigationContext.Provider>
        </postsContext.Provider>
      </PostWikiProvider>
    </currentUserContext.Provider>
  );
}

export default App;
