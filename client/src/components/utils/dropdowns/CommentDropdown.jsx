import React, { Fragment, useContext } from 'react'
import { AiOutlineEdit } from "react-icons/ai"
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineDelete } from "react-icons/ai";
import currentUserContext from '../../../dataManager/context/currentUserContent'
// import { ToastContext } from 'react-simple-toastify'
import Subscriber from '../../../entities/Subscriber'

const CommentDropdown = (props) => {

  const {
    dropElt,
    idComment,
    idAuthor,
  } = props

  // Get data from global state
  const { currentUser } = useContext(currentUserContext)
  // const { displayToast } = useContext(ToastContext)

  const user = new Subscriber(currentUser)

  return (
    <Menu as="div" className="relative z-10 inline-block text-left font-primary">
      <div>
        <Menu.Button>
          {dropElt}
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
                  className={`${active ? 'bg-gray-100 text-primary' : 'text-gray-900'
                    } group flex items-center space-x-3 w-full px-2 py-2 text-sm`}
                >
                  <AiOutlineEdit size="25" className="icon" />
                  <span>Editer le commentaire</span>
                </button>
              )}
            </Menu.Item>
          </div>

          {
            idAuthor === user.getId ? (
              <div
                className="px-1 py-1"
              // onClick={() => handleDelete(idComment}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100 text-primary' : 'text-gray-900'
                        } group flex items-center space-x-2 w-full px-2 py-2 text-sm`}
                    >
                      <AiOutlineDelete size="25" className="icon" />
                      <span>Supprimer le commentaire</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            ) : null
          }
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default CommentDropdown
