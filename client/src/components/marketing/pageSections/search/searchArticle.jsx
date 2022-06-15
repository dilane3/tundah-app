import React, { useMemo, useEffect, useRef } from "react";
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Image } from 'react-image-progressive-loading'
import Post from "../../../../entities/Post";
import './searchBody.css'
import { ressourcesUrl } from "../../../../utils/url";

const imageMariage = require("../../../../medias/img/mariage.jpg")

const SearchArticle = ({ data }) => {

    const post = useMemo(() => new Post(data), [data])
    
    // Declare ref variable
    const postContentRef = useRef()

    useEffect(() => {
        postContentRef.current.innerHTML = post.getContent.substring(0, 230) + "..."
    }, [])

    return (
        <div className="PostPropose">
            <div className="content-Postpropose">
                <div className="Info-content">
                    <span className="title">{post.getTitle}</span>

                    <div ref={postContentRef} className="description" >
                        {post.getContent}
                    </div>
                </div>
                {
                    post.getFilesList.length > 0 && (
                        <div className="proposePost-img">
                            <Image image={`${ressourcesUrl.postImages}/${post.getFilesList[0]}`} className="CardImage" />
                        </div>
                    )
                }
            </div>

        </div>
    )
}
export default SearchArticle;