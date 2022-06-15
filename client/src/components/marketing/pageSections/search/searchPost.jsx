import React, { useEffect, useMemo, useRef } from "react";
import ImgCircle from '../../../elements/imgCircle/ImgCircle'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Image } from 'react-image-progressive-loading'
import './searchBody.css'
import Post from "../../../../entities/Post";
import { formatName } from '../../../../utils/format'
import { getRelativeDate } from "../../../../utils/dateOperations";
import { ressourcesUrl } from "../../../../utils/url";
import { Link } from "react-router-dom";

const SearchPost = ({ data }) => {
    const post = useMemo(() => new Post(data), [data])

    // Declare ref variable
    const postContentRef = useRef()

    useEffect(() => {
        postContentRef.current.innerHTML = post.getContent.substring(0, 150) + "..."
    }, [])

    return (
        <div className="PostPropose">
            <div className="header-Postpropose">
                <div className="header-PostproposeInfo">
                    <ImgCircle src={`${ressourcesUrl.profil}/${post.getAuthor.profil}`} alt="profil" classe="profilCardImage" />

                    <div className="profilInfo">
                        <Link to={`/profile/${post.getAuthor.username}`}>
                            <span className="author-post-username">{formatName(post.getAuthor.name)}</span>
                        </Link>
                        <span className="hour">
                            {getRelativeDate(post.getCreationDate)}
                        </span>
                    </div>
                </div>

                {/* <div className="header-PostproposeIcon">
                    <BsThreeDotsVertical />
                </div> */}

            </div>
            <div className="content-Postpropose">
                <div className="Info-content">
                    <span className="title">{post.getTitle}</span>

                    <Link to={`/posts/${post.getId}`}>
                        <div
                            ref={postContentRef}
                            className="description"
                        ></div>
                    </Link>
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
export default SearchPost;