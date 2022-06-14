import { ADD_WIKIPOSTS } from './type'
import Post from '../../../entities/Post'
  
const wikiPostsReducer = (state = [], action) => {
    switch (action.type) {

      case ADD_WIKIPOSTS: {
        const posts = [...state]
  
        console.log(action.payload)
  
        if (action.payload) {
          for (let post of action.payload) {
            const p = posts.find(ps => ps.id === post.id)
  
            if (!p)
              posts.push((new Post(post)).getData)
          }
        }
  
        return posts
      }
  
      
      default: return state
    }
}
  
export default wikiPostsReducer
