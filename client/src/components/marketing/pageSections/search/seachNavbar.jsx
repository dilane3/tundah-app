import React, { useContext } from "react";
import { Tab } from '@headlessui/react'
import SearchPerson from "./searchPerson";
import SearchPost from "./searchPost";
import SearchArticle from "./searchArticle";
import './seachBody.css'
import researchContext from "../../../../dataManager/context/researchContext";

function SearchNavbar() {
  const { postsResults, target } = useContext(researchContext)

  return (
    <Tab.Group manual >
      <Tab.List className="header">
        {
          target === "wiki" ? (
            <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black'}>
              Articles Wiki
            </Tab>
          ) : (
            <>
              <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black'}>
                Articles Wiki
              </Tab>
              <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black'}>
                Personne
              </Tab>
              <Tab className={({ selected }) => selected ? 'activeClass' : 'bg-white text-black'}>
                Posts reseau
              </Tab>
            </>
          )
        }

      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <SearchArticle />
        </Tab.Panel>
        <Tab.Panel>
          <SearchPerson />
        </Tab.Panel>
        <Tab.Panel>
          {
            postsResults.map(post => {
              return (
                <SearchPost
                  key={post.id}
                  data={post}
                />
              )
            })
          }
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default SearchNavbar;