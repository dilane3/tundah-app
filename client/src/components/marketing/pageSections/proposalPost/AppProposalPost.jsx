import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import proposedPostsContext from '../../../../dataManager/context/proposedPostContext';
import { instance } from '../../../../utils/url';
import LoaderCircle from '../../../utils/loaders/Loader';
import HeaderspecifisPost from './headerspecificpost';
import PostPropose from './PostPropose';
import  './Specificpost.css'
import {ToastContext} from 'react-simple-toastify'

const AppProposalPost  = () => {
    // getting data from global state
    const {
        proposedPosts, 
        addPosts, 
        setMoreProposedPostsArgs,
        skip,
        next
    } = useContext(proposedPostsContext)
    const {displayToast} = useContext(ToastContext)

    // setting the local state
    const [loadingMorePosts, setLoadingMorePosts] = useState(true)

    // use callback section
    const methodsCb = useCallback(() => {
        return {
            addPosts,
            setMoreProposedPostsArgs
        }
    }, [addPosts, setMoreProposedPostsArgs])

    // use reference section
    const methodsRef = useRef(methodsCb)
    const listProposedPostRef = useRef()

    // use effect section
    useEffect(() => {
        methodsRef.current = methodsCb()
    }, [methodsCb])

    useEffect(() => {
		window.onscroll = (event) => {
			if (listProposedPostRef.current) {
				const wrapperHeight = window.scrollY
				const contentHeight = listProposedPostRef.current.offsetHeight - 500
				const space = contentHeight - wrapperHeight

				if (next) {
                    console.log(space)
					if (space < 150) {
						setLoadingMorePosts(true)
					}
				}
			}
		}
	}, [next])

    useEffect(() => {
        const {addPosts, setMoreProposedPostsArgs} = methodsRef.current

        let timer = setTimeout(() => {
            if (loadingMorePosts) {
                if (next) {
                    setLoadingMorePosts(true)
        
                    instance.get(`/posts/proposed?skip=${skip}&limit=${5}`)
                    .then(res => {
                        const datas = res.data
                        const postData = res.data.data
                        let nextValue = res.data.next
                        let skipValue = res.data.skip
            
                        console.log(res.data)
            
                        if (datas) {
                            addPosts(postData)
                            setMoreProposedPostsArgs(nextValue, skipValue)
                        }
                    })
                    .catch(err => {
                        console.log(err)

                        displayToast("Une erreur est survenu lors du chargement des commentaires")
                    })
                    .then(() => {
                        setLoadingMorePosts(false)
                    })
                }else {
                    setLoadingMorePosts(false)
                }
            }            
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [skip, next, loadingMorePosts])

    return(
        <>
            <div ref={listProposedPostRef} className="content">
                <HeaderspecifisPost/>
                
                {
                    proposedPosts.map(post => {
                        return <PostPropose key={post.id} type="proposedPost" postData={post} />
                    })
                }

            </div>
            
            {
                loadingMorePosts ? (
                    <div className="loader-section">
                        <LoaderCircle size={50} color="#3c6a46" />
                    </div>
                ):null
            }
        </>
    )
}

export default AppProposalPost;