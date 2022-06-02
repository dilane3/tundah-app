import React from "react";
import { Tab } from '@headlessui/react'
import SearchPerson from "./searchPerson";
import SearchPost from "./searchPost";
import SearchArticle from "./searchArticle";
import  './seachBody.css'

function SearchNavbar() {
  return (
    <Tab.Group manual >
      <Tab.List className="header">
        <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black' }>
           Articles Wiki
        </Tab>
     
        <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black' }>
            Personne
        </Tab>
        <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black'}>
          Posts reseau
        </Tab>
      </Tab.List>
      <Tab.Panels> 
        <Tab.Panel> <SearchArticle/> </Tab.Panel>
        <Tab.Panel> <SearchPerson/> <SearchPerson/><SearchPerson/></Tab.Panel>
        <Tab.Panel> <SearchPost/> <SearchPost/> <SearchPost/> </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

/*
const SearchNavbar = () => {

    return(
      <div className="header">
        <span className="firstChild"> Articles de Wiki</span>
        <span className="secondChild"> Personne</span>
        <span className="thirdChild"> Posts Reseau</span>   
      </div>
    )
}*/
export default SearchNavbar;