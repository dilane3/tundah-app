import React, { useEffect, useState } from 'react'
import { BsArrowRight, BsCheck, BsX } from "react-icons/bs";
import Input from '../../../elements/input/Input'
import Paragraphe from '../../../elements/p/Paragraphe'
import ALink from '../../../elements/a/ALink'
import H1 from '../../../elements/titles/H1'
import styles from  "../../../../css/signup.module.css"
import {Image} from 'react-image-progressive-loading'
import { instance } from '../../../../utils/url';
import AlertError from '../signin/AlertError';
import { PAYS } from '../../../../utils/Allcountries';
import { Redirect } from 'react-router';

const image = require("../../../../medias/img/signup-img.png")

const SignupBlock = (props) => {
	const initialSignupData = {
		fullName: "",
		userName:  "",
		email:  "",
		password:  "",
		country: "cameroun"
	}

	// state variables
	const [signupData, setUserData] = useState(initialSignupData)
	const [checkTermsUses, setCheckTermsUses] = useState(false)
	const [showError, setShowError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [uniqueUsernameCheck, setUniqueUsernameCheck] = useState(false)
	const [uniqueEmailCheck, setUniqueEmailCheck] = useState(false)
	const [uniqueCheckLoadingEmail, setUniqueCheckLoadingEmail] = useState(false)
	const [uniqueCheckLoadingUsername, setUniqueCheckLoadingUsername] = useState(false)
	const [loading, setLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)
	
	// check if username is unique
	useEffect(() => {
		// send request to the server
		const {userName} = signupData
 
		if (userName.length >= 4) {
			// start loading
			setUniqueCheckLoadingUsername(true)

			instance.post("/users/check_username", {username: userName})
			.then(res => {
				const {data} = res.data

				if (!data) {
					setUniqueUsernameCheck(true)
				} else {
					setUniqueUsernameCheck(false)
				}
			})
			.catch(err => {
				console.log(err)
				setUniqueUsernameCheck(false)
			})
			.then(() => {
				// stop loading
				setUniqueCheckLoadingUsername(false)
			})
		} else {
			console.log("error")
			setUniqueUsernameCheck(false)
		}
	}, [signupData.userName])

	// check if the email is unique
	useEffect(() => {
		// send request to the server
		const {email} = signupData
 
		if (email.length >= 4) {
			// start loading
			setUniqueCheckLoadingEmail(true)

			instance.post("/users/check_email", {email})
			.then(res => {
				const {data} = res.data
				console.log(data)

				if (!data) {
					setUniqueEmailCheck(true)
				} else {
					setUniqueEmailCheck(false)
				}
			})
			.catch(err => {
				setUniqueEmailCheck(false)
			})
			.then(() => {
				// stop loading
				setUniqueCheckLoadingEmail(false)
			})
		} else {
			console.log("error")
			setUniqueEmailCheck(false)
		}
	}, [signupData.email])

	//handler
	const handleChange = (event) => {
		setUserData({...signupData, [event.target.id]: event.target.value})
	}

	const handleCheck = (event) => {
		setCheckTermsUses(!checkTermsUses)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	
		if (checkTermsUses && uniqueEmailCheck && uniqueUsernameCheck) {
			const credentials = {
				name: signupData.fullName,
				username: signupData.userName,
				email: signupData.email,
				country: signupData.country,
				password: signupData.password,
				role: 0
			}

			// set loading to true
			setLoading(true)

			instance.post("/users/signup", {...credentials})
			.then(res => {
				const {token} = res.data

				localStorage.setItem("tundah-token", token)
				setRedirect(true)
			})
			.catch(err => {
				console.log(err)
				setErrorMessage("Quelque ait survenu cote serveur, s'il vous plait ressayer")
				setShowError(true)
			})
			.then(() => {
				setLoading(false)
			})
		} else {
			setErrorMessage("Verifier votre formulaire avant de valider")
			setShowError(true)
		}
	}

	// getting country names in french
	const getCountryName = () => {
		const countries = []
		const others = []

		for (let country of PAYS) {
			let countryName = country["translations"]["fr"]

			if (countryName) countries.push(countryName)
			else others.push(country["translations"])
		}

		console.log(others)
		return countries.sort()
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
		country
	} = signupData

	const disabled = fullName === "" || userName === "" || email === "" || password === "" || country === "" || !checkTermsUses

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

						{
							showError ? <AlertError message={errorMessage} onHide={() => setShowError(false)} /> : null
						}

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

							<div className={`${styles.formItem} w-full`}>
								<Input
									type="text"
									name="userName"
									id="userName"
									value={userName}
									placeholder="Nom utilisateur"
									handleChange={handleChange}
									classe="block"
								/>

								<span className={styles.checkIcons}>
									{
										uniqueCheckLoadingUsername ? (
											<span className={styles.signupSectionRightLoader}></span>
										) : (
											uniqueUsernameCheck ? <BsCheck className={styles.checkIconsCheck} /> : <BsX className={styles.checkIconsX} />
										)
									}									
								</span>
							</div>

							<div className={`${styles.formItem} w-full`}>
								<Input
									type="email"
									name="email"
									id="email"
									value={email}
									placeholder="Email"
									handleChange={handleChange}
									classe="block"
								/>

								<span className={styles.checkIcons}>
									{
										uniqueCheckLoadingEmail ? (
											<span className={styles.signupSectionRightLoader}></span>
										) : (
											uniqueEmailCheck ? <BsCheck className={styles.checkIconsCheck} /> : <BsX className={styles.checkIconsX} />
										)
									}									
								</span>
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
										name="country" 
										id="country"
										defaultValue="cameroun"
										value={country}
										onChange={handleChange} 
										className="w-full py-2 px-3 lg:py-3 bg-white  text-primary text-sx md:text-sm rounded md:rounded-lg border-2 border-primary focus:outline-none"
									>
										{
											getCountryName().map(country => {
												return <option value={country.toLowerCase()}>{country[0].toUpperCase() + country.substr(1)}</option>
											})
										}
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

						{/* redirection to wiki page */}
						{
							redirect ? <Redirect to="/wiki/feed" />:null
						}

						{
							loading ? <span className={styles.signupSectionRightLoaderSending}></span> : null
						}
					</form>
				</section>
		</div>
	)
}

export default SignupBlock
