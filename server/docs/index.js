import basicInfo from "./basicInfo.js"
import comments from "./comments/index.js"
import components from "./components.js"
import posts from "./posts/index.js"
import servers from "./servers.js"
import tags from "./tags.js"
import users from "./users/index.js"

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...users.paths,
    ...posts.paths,
    ...comments.paths
  }
}