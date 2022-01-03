import React from 'react'
import Container from '../../../utils/Container'
import authSvg from '../../../../medias/svg/auth-svg.svg'
import signupImg from '../../../../medias/img/signup-img.png'
import Input from '../../../elements/input/Input'
import H1 from '../../../elements/titles/H1'
import H2 from '../../../elements/titles/H2'
import { Link } from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";

const SignupBlock = ({ children }) => {

	return(
		<div className="signup-block px-3 md:px-4 bg-primary w-full h-screen">
			<Container classe="relative pb-10 md:pb-0">
				<div className="lg:hidden flex flex-col space-y-4">
						<Link
								to=""
								className="bg-white w-32 p-5 text-black flex justify-center items-center"
								>
								<span>tundah</span>
						</Link>
						<H2 className="">
								Regoinez le reseau social qui lutte pour préserver la <span className="text-yellow-400">culture africaine</span>
						</H2>
				</div>

				<div className="center-signup  p-3 flex  items-center w-full lg:space-x-4 bg-white rounded-lg mt-40 sm:mt-10 md:mt-0">
					<div className="relative hidden lg:block bg-repeat w-1/2 bg-primary rounded-lg text-white font-primary py-8 px-10" style={{backgroundImage: `url(${authSvg})`}}>
						<Link
							to=""
							className="absolute z-1 left-0 bg-white w-32 p-5 text-black flex justify-center items-center"
							>
							<span>tundah</span>
						</Link>

						<div>
							<div className="flex items-center">
								<img 
									src={signupImg} 
									alt="Une femme africaine en tenue traditionelle"
									className="african-women relative right-8 z-10 inline-block mt-4 lg:w-auto lg:h-auto md:w-96 md:h-96" 
								/>
								<Link
									to=""
									className="ours-mission absolute z-20"
									>
									<p className=" flex space-x-2 items-center justify-center inline-block right-5 top-82 text-2xl font-bold text-yellow-400">
										<span>notre mission </span> 
										<BsArrowRight className="font-extrabold" />
									</p>
								</Link>
							</div>
							<H2 className="">
								Regoinez le reseau social qui lutte pour préserver la <span className="text-yellow-400">culture africaine</span>
							</H2>
						</div>
					</div>

					<from className="w-full lg:w-1/2 ">
						<H1 className="">
							Creer<br className="hidden lg:block" /> votre compte
						</H1>

						<div className="w-full flex flex-col space-y-4  mt-5 md:mt-8">
							<div className="w-full">
								
								<Input
								type="text"
								name="name"
								id="name"
								placeholder="Nom complet"
								classe=""
								/>
							</div>

							<div className="w-full">
								<Input
								type="text"
								name="userName"
								id="userName"
								placeholder="Nom utilisateur"
								classe="block"
								/>
							</div>

							<div className="w-full">
								<Input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								classe="block"
								/>
							</div>
							<div className="w-full">
								<Input
								type="password"
								name="Mot de passe"
								id="password"
								placeholder="Mot de passe"
								classe="block"
								/>
							</div>

							<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
								<div className="w-full">
									<Input
									type="tel"
									name="tel"
									id="tel"
									placeholder="Telephone"
									/>
								</div>
								<div className="w-full">
									<Input
									type="password"
									name="Mot de passe"
									id="password"
									placeholder="Mot de passe"
									/>
								</div>
							</div>

							<Link
								to=""
								className="w-full bg-primary hover:bg-primary px-2 py-2 lg:px-3 lg:py-4 text-center text-white text-base md:text-xl rounded" 
								>
								créer mon compte
							</Link>
						</div>
					</from>
				</div>
			</Container>
		</div>
	)
}

export default SignupBlock