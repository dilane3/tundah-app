import React from 'react'
import Seo from '../../components/utils/seo/Seo'
import Base from '../Base'
import Body from './body/SearchBody'

const Search = () => {
  return (
    <Base>
      <Seo
				title="recherche | tundah"
				description="tundah est un réseau social qui met en avant la culture africaine pour la transmettre à la génération futur"
			/>
      <Body />
    </Base>
  )
}

export default Search