import React from 'react'

const navigationContext = React.createContext({
  navigation: "",
  navigateTo: (target) => {}
})

export default navigationContext