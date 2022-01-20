import React, { Fragment, useEffect, useContext } from 'react'
import { AiOutlineEdit } from "react-icons/ai"
import { Menu, Transition } from '@headlessui/react'
import { MdOutlineMailOutline } from "react-icons/md"
import { BsArchive } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai";

import postContext from '../../../dataManager/context/postsContext'
import currentUserContext from '../../../dataManager/context/currentUserContent'

import Subscriber from '../../../entities/Subscriber'
import Post from '../../../entities/Post'

import { instance } from '../../../utils/url'

const SocialPostDropdown = (props) => {

    const { 
      dropElt, 
      idPost, 
      idAuthor,
      loading,
      onLoading
    } = props

    //context
    const contextPost = useContext(postContext)
    const deletePostFeed = contextPost.deletePost
    const { currentUser, deletePost } = useContext(currentUserContext)

    const user = new Subscriber(currentUser)

    //handler
    const handleDelete = (id) => {
      
      //start loading
      onLoading(true)

      instance.delete(`/posts/delete/${idPost}`)
      .then(res => {
        console.log(res.data)
        onLoading(false)

        deletePostFeed(id);
        if(user.getId === idAuthor){ //delete post in profil if current user is the owner of the post to delete
          deletePost(id)
        }
      })
      .catch(res => {
        console.log(res.data)
        onLoading(false)
      })
    }

	return(
		<Menu as="div" className="relative z-10 inline-block text-left font-primary">
      <div>
        <Menu.Button>
          { dropElt }
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100 text-primary' : 'text-gray-900'
                  } group flex items-center space-x-3 w-full px-2 py-2 text-sm`}
                >
                  <AiOutlineEdit size="25" className="icon" />
                  <span>Editer le post</span>
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100 text-primary' : 'text-gray-900'
                  } group flex items-center space-x-3 w-full px-2 py-2 text-sm`}
                >
                  <BsArchive size="20" className="icon" />
                  <span>archiver ce post</span>
                </button>
              )}
            </Menu.Item>
          </div>
          <div 
            className="px-1 py-1"
            onClick={() => handleDelete(idPost) }
            >
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100 text-primary' : 'text-gray-900'
                  } group flex items-center space-x-2 w-full px-2 py-2 text-sm`}
                >
                 <AiOutlineDelete size="25" className="icon" />
                  <span>Supprimer ce post</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
	)
}

export default SocialPostDropdown
