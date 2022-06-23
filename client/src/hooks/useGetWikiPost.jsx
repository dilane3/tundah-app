import { useContext, useEffect } from "react"
import PostWikiApi from "../api/postWiki"
import currentUserContext from "../dataManager/context/currentUserContent"
import postsWikiContext from "../dataManager/context/postWikiContext"

const useGetWikiPost = () => {
  const { currentUser } = useContext(currentUserContext)
  const { addPosts, setMoreWikiPostArgs } = useContext(postsWikiContext)

  useEffect(() => {
    handleGetWikiPost()
  }, [currentUser])

  // Some handlers
  const handleGetWikiPost = async () => {
    const { data: res, error } = await PostWikiApi.getAll(0)

    if (res) {
      const postData = res.data
      let nextValue = res.next
      let skipValue = res.skip

      console.log(postData)

      // adding posts
      addPosts(postData)

      // setting posts arguments
      setMoreWikiPostArgs(nextValue, skipValue)

      // stopping the loader for loading posts
      // setDataLoaded(true)

      // hidden the loading page
      // setLoaderClassActive(true)
    }
  }
}

export default useGetWikiPost