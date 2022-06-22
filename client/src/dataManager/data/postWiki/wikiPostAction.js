import {ADD_WIKIPOSTS} from './type.js'

const addWikiPosts = (wikiPosts) => {
  return {
    type: ADD_WIKIPOSTS,
    payload: wikiPosts
  }
}

export {
    addWikiPosts
}