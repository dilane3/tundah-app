import basicInfo from "./basicInfo.js"
import components from "./components.js"
import servers from "./servers.js"
import tags from "./tags.js"

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components
}