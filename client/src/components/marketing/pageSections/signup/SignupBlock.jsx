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
import styles from  "../../../../css/signup.module.css"
import {Image} from 'react-image-progressive-loading'

const image = require("../../../../medias/img/signup-img.png")


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

	const disabled = fullName === "" || userName === "" || email === "" || password === "" || contry === "" || !checkTermsUses
	const errorMsg = error && <Paragraphe classe="text-red-600 pt-5 md:pt-10 lg:pt-5">{error}</Paragraphe>

	return(
		<div className={styles.signupSection}>
				<section className={styles.signupSectionLeft}>
					<div className={styles.signupSectionLeftContainer}>
						<span className={styles.signupSectionLeftLogo}>
							Tundah
						</span>

						<h3 className={styles.signupSectionLeftText}>
							Regoinez la plateforme qui lutte pour préserver la <span className="text-yellow-400">culture africaine</span>
						</h3>

						<Image image={image} className={styles.signupSectionLeftImage} />

						<p className={styles.signupSectionLeftIndication}>
							<span>notre mission </span> 
							<BsArrowRight className="font-extrabold" />
						</p>
					</div>
				</section>

				<section className={styles.signupSectionRight}>
					<span className={styles.signupSectionRightLogo}>Tundah</span>

					<h3 className={styles.signupSectionRightText}>
					Regoinez la plateforme qui lutte pour préserver la <span className="text-yellow-400">culture africaine</span>
					</h3>
					<form className={styles.signupSectionRightForm} onSubmit={handleSubmit}>
						<H1 className="">
							Creer votre compte
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
				</section>
		</div>
	)
}

export default SignupBlock
