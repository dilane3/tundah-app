import React from "react"
import Container from '../../../utils/Container'
import authSvg from '../../../../medias/svg/auth-svg.svg'
import signinImg from '../../../../medias/img/signin-img.png'
import Input from '../../../elements/input/Input'
import H3 from '../../../elements/titles/H3'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import SecondConnexionPage from "./secondConnexionPage"


const FirstConnexionPage = () => {

	return(
		<div className="signup-block px-3 md:px-4 bg-primary w-full h-screen" >
             <Container classe="relative pb-10 md:pb-0"> 

                <div className="center-signup  p-3 flex  items-center w-full lg:space-x-4 bg-white rounded-lg mt-5">
					<div className="relative hidden lg:block bg-repeat w-1/2 bg-primary rounded-lg text-white font-primary py-8 px-20" style={{backgroundImage: `url(${authSvg})`}}>
						<Link
							to=""
							className="absolute z-1 left-0  bg-white w-32 p-5  text-black flex justify-center items-center"
							>
							<span className="font-bold">tundah</span>
						</Link>

						<div>
                 
                            <H3 className="">
								Conservons les valeurs enseignees par nos 
                                <span className="text-yellow-400"> ancetres </span>
                                et transmettons les a notre 
                                <span className="text-yellow-400"> progeniture</span>
							</H3>

							<div className="flex items-center flex-col"> 
                               <Link
									to=""
									className="ours-mission absolute z-20 "
									>
									<p className=" flex space-x-2 items-center justify-center  left-5 top-122 text-2xl font-bold text-yellow-400">
                                         <BsArrowLeft className="font-extrabold" />   
                                         <span>en savoir plus </span> 
									</p>
								</Link>
                                <div> 
                                <img 
									src={signinImg} 
									alt="Une femme africaine en tenue traditionelle"
									className="african-women relative right-8 z-10 inline-block mt-6 lg:w-auto lg:h-auto md:w-96 md:h-96" 
								/>
								
                                </div>
                            </div>
                        </div>
                   </div>
                   <SecondConnexionPage/>
                </div>

             </Container>
			 
		</div>
	)
}

export default FirstConnexionPage;