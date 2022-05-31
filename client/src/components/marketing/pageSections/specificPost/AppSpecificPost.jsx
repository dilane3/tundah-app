import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { WriteComment, WriteResponseComment } from './writeComment';
import Post from '../Post';
import Comment from './comment';
import './commentPost.css'
import postsContext from '../../../../dataManager/context/postsContext';
import { Redirect, useParams } from 'react-router-dom';
import currentUserContext from '../../../../dataManager/context/currentUserContent';
import { instance } from '../../../../utils/url';
import LoaderCircle from '../../../utils/loaders/Loader';

const sortCommentByDate = (comments, order) => {
  order = order === undefined ? true : order
  if (order)
    return comments.sort((c1, c2) => c2.creation_date - c1.creation_date)

  return comments.sort((c1, c2) => c1.creation_date - c2.creation_date)
}

const CommentBlock = ({ comment, post, idUser, onChangeToResponseInput, isResponseInput }) => {
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseDisplayed, setResponseDisplayed] = useState(false)

  // defining reference of element
  const commentBlockRef = useRef()

  useEffect(() => {
    window.addEventListener("resize", function () {
      const width = this.window.innerWidth

      if (width > 700) {
        onChangeToResponseInput(false)
        setShowResponseInput(true)
        commentBlockRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
      }
      else
        onChangeToResponseInput(true, comment.id)
    })
  })

  const handleActivateResponse = () => {
    const width = window.innerWidth

    if (width > 700) {
      onChangeToResponseInput(false)
      setShowResponseInput(true)
      commentBlockRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
    else
      onChangeToResponseInput(true, comment.id)

  }

  const handleDisplayResponses = () => {
    setResponseDisplayed(state => !state)
  }

  return (
    <div ref={commentBlockRef} className="firstElement">
      <Comment
        data={comment}
        onResponse={handleActivateResponse}
        author={post.author}
        responseDisplayed={responseDisplayed}
        onDisplayResponses={handleDisplayResponses}
      />

      <div className={`secondElement ${!responseDisplayed ? "responsesSectionAnimation" : ""}`}>
        {
          sortCommentByDate(comment.responses, false).map(response => {
            return (
              <Comment
                key={response.id}
                data={response}
                onResponse={handleActivateResponse}
                isResponse={true}
                author={post.author}
              />
            )
          })
        }
      </div>

      {
        !isResponseInput ? (
          showResponseInput ? (
            <WriteResponseComment idPost={post.id} idUser={idUser} idComment={comment.id} />
          ) : null
        ) : null
      }
    </div>
  )
}

const AppSpecifificPost = () => {
  // getting value from the global state
  const { posts, likePost, addComments } = useContext(postsContext)
  const { likeUserPost, currentUser } = useContext(currentUserContext)

  // defining of the local state
  const [isResponseInput, setIsResponseInput] = useState(false)
  const [idComment, setIdComment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  // getting the id from the url params
  const { id } = useParams()

  // use callback section
  const methodsCb = useCallback(() => {
    return {
      addComments
    }
  }, [addComments])

  // defining ref
  const commentPageRef = useRef()
  const methodsRef = useRef(methodsCb)

  // useEffect section
  useEffect(() => {
    const token = localStorage.getItem("tundah-token")

    instance.defaults.headers.common["authorization"] = `Bearer ${token}`
  }, [])

  useEffect(() => {
    methodsRef.current = methodsCb
  }, [methodsCb])

  useEffect(() => {
    commentPageRef.current.scrollIntoView()
  }, [])

  useEffect(() => {
    const { addComments } = methodsRef.current()

    setLoading(true)

    instance.get(`/comments/all/${id}`)
      .then(res => {
        const comments = res.data;

        addComments(id, comments);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        setLoading(false)
      })
  }, [id])

  const handleLikePost = (id) => {
    instance.post(`/posts/like/${id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {
        likePost(id, currentUser.id)
        likeUserPost(id)
      })
  }

  const getPost = (id) => {
    let post = posts.find(p => p.id === id)

    if (!post && currentUser) {
      post = currentUser.posts.find(p => p.id === id)
    }

    return post
  }

  const handleChangeCommentEditorType = (status, idComment = null) => {
    setIsResponseInput(status)
    setIdComment(idComment)
  }

  return (
    <section ref={commentPageRef} className="contentCommentPage">
      {
        !getPost(id) ? (
          <Redirect to="/wiki/feed" />
        ) : <Post postData={getPost(id)} onLikePost={handleLikePost} />
      }

      {
        currentUser ? (
          <>
            <WriteComment
              idUser={currentUser.id}
              idPost={id}
              isResponseInput={isResponseInput}
              idComment={idComment}
              onChangeToResponseInput={handleChangeCommentEditorType}
            />
            <section>
              {
                !loading ? (
                  getPost(id) ? (
                    sortCommentByDate(getPost(id).commentsData).map(comment => (
                      <CommentBlock
                        key={comment.id}
                        idUser={currentUser.id}
                        post={getPost(id)}
                        comment={comment}
                        isResponseInput={isResponseInput}
                        onChangeToResponseInput={handleChangeCommentEditorType}
                      />
                    ))
                  ) : <Redirect to="/wiki/feed" />
                ) : (
                  <div className="commentLoader">
                    <LoaderCircle size={50} color="#3c6a46" />
                  </div>
                )
              }

            </section>
          </>
        ) : null
      }
    </section>
  )
}

export default AppSpecifificPost;