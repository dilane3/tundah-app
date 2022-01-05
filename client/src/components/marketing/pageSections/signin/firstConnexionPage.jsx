import React from "react"
import Container from '../../../utils/Container'
import authSvg from '../../../../medias/svg/auth-svg.svg'
import signinImg from '../../../../medias/img/signin-img.png'
import Input from '../../../elements/input/Input'
import H3 from '../../../elements/titles/H3'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import SecondConnexionPage from "./secondConnexionPage"
import './ConnexionPage.css';



const FirstConnexionPage = () => {

	return(
		<div className="signup-block px-3 md:px-4 bg-primary w-full h-screen" >
             <Container classe="relative pb-10 md:pb-0"> 
                 {/* <div className="lg:hidden flex flex-col space-y-4">
				     <Link
							to=""
							className="absolute z-1 left-0  bg-white w-32 p-5  text-black flex justify-center items-center"
							>
							<span className="font-bold">tundah</span>
						</Link>
						<H3 className="">
								Conservons les valeurs enseignees par nos 
                                <span className="text-yellow-400"> ancetres </span>
                                et transmettons les a notre 
                                <span className="text-yellow-400"> progeniture</span>
						</H3>
						<p className=" flex space-x-2 justify-center items-center inline-block text-sm md:text-bases lg:text-xl font-bold text-yellow-400">
							<span>notre mission </span> 
							<BsArrowLeft className="font-extrabold" />
						</p>

					 </div>*/}
                <div className="center-signup  p-3 flex  items-center w-full lg:space-x-4 bg-white rounded-lg mt-5">
					<div className="relative hidden flex  lg:block bg-repeat w-1/2 bg-primary rounded-lg text-white font-primary py-8 px-20" style={{backgroundImage: `url(${authSvg})`}}>
					   <div className="absolute z-1 left-0 bg-white w-32 p-5 text-black flex justify-center items-center">
							 <span className="font-bold">tundah</span>
						</div>
 
						<div>
                 
                           <H3 className="">
						        Conservons les valeurs enseignees par nos 
                                <span className="text-yellow-400"> ancetres </span>
                                et transmettons les a notre 
                                <span className="text-yellow-400"> progeniture</span>
							</H3>

							<div className="Arrow-content inline-block"> 
							  <Link
									to=""
									className="ours-mission absolute z-20"
									>
									<Link
										to="/about"
										className=" flex space-x-2 items-center justify-center inline-block right-5 top-82 text-2xl font-bold text-yellow-400"
										>
											<BsArrowLeft className="font-extrabold" />
											<span>notre mission </span>
									</Link>
								</Link>

                                <img 
									src={signinImg} 
									alt="Une femme africaine en tenue traditionelle"
									className="african-women relative right-8 z-10  mt-30 " 
								/>
							
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