import { useContext } from 'react'
import postsContext from '../../../dataManager/context/postsContext'
import Post from './Post'

const WikiPost = ({ postData, onLikePost }) => {

  return (
    <Post
      postData={postData}
      onLikePost={() => console.log("hello")}
      type="wiki"
    />
  )
}

export default WikiPost