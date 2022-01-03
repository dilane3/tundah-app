import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";

import authSvg from '../../../../medias/svg/auth-svg.svg'
import signupImg from '../../../../medias/img/signup-img.png'

import Container from '../../../utils/Container'
import Input from '../../../elements/input/Input'
import Paragraphe from '../../../elements/p/Paragraphe'
import ALink from '../../../elements/a/ALink'
import H1 from '../../../elements/titles/H1'
import H2 from '../../../elements/titles/H2'

const SignupBlock = (props) => {

	const initialSignupData = {
		fullName: "",
		userName:  "",
		email:  "",
		password:  "",
		tel:  "",
		contry: "cameroun"
	}

	// state variables
	const [signupData, setUserData] = useState(initialSignupData)
	const [checkTermsUses, setCheckTermsUses] = useState(false)
	const [error, setError] = useState("")

	//handler
	const handleChange = (event) => {
		setUserData({...signupData, [event.target.id]:[event.target.value]})
		setError("")
	}

	const handleCheck = (event) => {
		setCheckTermsUses(!checkTermsUses)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log("soumission du formulaire....")
		setError("Ceci est le message d'erreur si l'on essaie d'envoyer un formulaire qui n'est pas bien remplit")
	}

	//fonctions
	const validateUserName = (name) => {
		{/* to do*/}
	}

	const {
		fullName,
		userName,
		email,
		password,
		tel,
		contry
	} = signupData

	const disabled = fullName === "" || userName === "" || email === "" || password === "" || tel === "" || contry === "" || !checkTermsUses
	const errorMsg = error && <Paragraphe classe="text-red-600 pt-5 md:pt-10 lg:pt-5">{error}</Paragraphe>

	return(
		<div className="signup-block px-3 md:px-4 bg-primary w-full h-screen">
			<Container classe="relative pb-10 md:pb-0">
				<div className="lg:hidden flex flex-col space-y-4">
						<Link
								to=""
								className="bg-white w-32 p-5 text-black flex justify-center font-semibold items-center"
								>
								<span>tundah</span>
						</Link>
						<H2 className="">
								Regoinez le reseau social qui lutte pour préserver la <span className="text-yellow-400">culture africaine</span>
						</H2>

						<p className=" flex space-x-2 justify-center items-center inline-block text-sm md:text-bases lg:text-xl font-bold text-yellow-400">
							<span>notre mission </span> 
							<BsArrowRight className="font-extrabold" />
						</p>
				</div>

				{ errorMsg }

				<div className="center-signup  p-3 flex  items-center w-full lg:space-x-4 bg-white rounded-lg mt-5">
					<div className="relative hidden lg:block bg-repeat w-1/2 bg-primary rounded-lg text-white font-primary py-8 px-10" style={{backgroundImage: `url(${authSvg})`}}>
						<div
							className="absolute z-1 left-0 bg-white w-32 p-5 text-black flex justify-center items-center"
							>
							<span className="font-bold">tundah</span>
						</div>

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
									<Link
										to="/about"
										className=" flex space-x-2 items-center justify-center inline-block right-5 top-82 text-2xl font-bold text-yellow-400"
										>
										<span>notre mission </span> 
										<BsArrowRight className="font-extrabold" />
									</Link>
								</Link>
							</div>
							<H2 className="">
								Regoinez le reseau social qui lutte pour préserver la <span className="text-yellow-400">culture africaine</span>
							</H2>
						</div>
					</div>

					<form className="w-full lg:w-1/2 " onSubmit={handleSubmit}>
						<H1 className="">
							Creer<br className="hidden lg:block" /> votre compte
						</H1>

						<div className="w-full flex flex-col space-y-4  mt-5 md:mt-8">
							<div className="w-full">
								
								<Input
								type="text"
								name="fullName"
								id="fullName"
								value={fullName}
								placeholder="Nom complet"
								handleChange={handleChange}
								classe=""
								/>
							</div>

							<div className="w-full">
								<Input
								type="text"
								name="userName"
								id="userName"
								value={userName}
								placeholder="Nom utilisateur"
								handleChange={handleChange}
								classe="block"
								/>
							</div>

							<div className="w-full">
								<Input
								type="email"
								name="email"
								id="email"
								value={email}
								placeholder="Email"
								handleChange={handleChange}
								classe="block"
								/>
							</div>
							<div className="w-full">
								<Input
								type="password"
								name="Mot de passe"
								id="password"
								value={password}
								placeholder="Mot de passe"
								handleChange={handleChange}
								classe="block"
								/>
							</div>

							<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
								<div className="w-full">
									<Input
									type="tel"
									name="tel"
									id="tel"
									value={tel}
									placeholder="Telephone"
									handleChange={handleChange}
									/>
								</div>
								<div className="w-full">
									<select 
										name="contry" 
										id="contry"
										value={contry}
										onChange={handleChange} 
										className="w-full py-2 px-3 lg:py-3 bg-white  text-primary text-sx md:text-sm rounded md:rounded-lg border-2 border-primary focus:outline-none"
									>
									    <option value="cameroun">Cameroun</option>
									    <option value="gabon">Gabon</option>
									    <option value="nigeria">Nigeria</option>
									    <option value="tchad">Tchad</option>
									</select>

								</div>
							</div>

							<div className="flex items-center space-x-2">
								<input 
									type="checkbox"
									id="termsUses"
									checked={checkTermsUses}
									onChange={handleCheck}
									className="border-2 border-primary w-3 h-3 rounded-full checked:bg-blue-500" 
								/>
								<Paragraphe>j'accepte les <ALink link="/termsuses">conditions d'utilisations</ALink></Paragraphe>
							</div>

							<input
								type="submit"
								disabled={disabled}
								value="créer mon compte"
								className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full bg-primary hover:bg-primary-hover px-2 py-2 lg:px-3 lg:py-4 text-center text-white text-base md:text-xl rounded" 
							/>

							<Paragraphe classe="flex justify-end">
								deja inscrit? <ALink link="/signin" classe="inline-block ml-2">connectez vous</ALink>
							</Paragraphe>
						</div>
					</form>
				</div>
			</Container>
		</div>
	)
}

export default SignupBlock