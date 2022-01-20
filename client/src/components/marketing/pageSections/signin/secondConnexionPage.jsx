import React, { useState} from "react";
import Input from '../../../elements/input/Input';
import ALink from '../../../elements/a/ALink';
import './ConnexionPage.css';
import { instance } from "../../../../utils/url";
import styles from '../../../../css/signin.module.css'
import { Redirect } from "react-router";
import AlertError from "./AlertError";

const SecondConnexionPage = () => {
	// definition of the state
  const [credentials, setCredentials]= useState({
		username:"",
		password:""
	});
	const [redirect, setRedirect] = useState(false)
	const [showError, setShowError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [loading, setLoading] = useState(false)
	
  const handleChange = (event) =>{
		const {id, value} = event.target;

		const credentialsclone = {...credentials}

		if (id === "password") {
			credentialsclone.password=value;
		} else {
			credentialsclone.username=value;
		}

		setCredentials(credentialsclone);
  }

	/**
	 * This function send a request to the server for connecting the user
	 * @param {Event} event 
	 */
  const handleSubmit = event => {
		event.preventDefault()

		if (credentials.password && credentials.username) {
			setLoading(true)

			instance.post("/users/signin", credentials)
			.then(res => {
				const userData = res.data

				// save the token
				localStorage.setItem("tundah-token", userData.token)

				setRedirect(true)
			})
			.catch(err => {
				setErrorMessage("Soit le nom d'utilisateur, soit le mot de passe est incorrect, ressayez s'il vous plait")
				setShowError(true)
				console.log(err)
			})
			.finally(() => {
				setLoading(false)
			})
		} else {
			setErrorMessage("Fournissez le mot de passe et le nom d'utilisateur a la fois")
			setShowError(true)
			console.log("provide all the required data")
		}
	}

  return (
    <div className={styles.signinSectionRight}>
			<span className={styles.signinSectionRightLogo}>Tundah</span>

			<h3 className={styles.signinSectionRightText}>
				Conservons les valeurs enseignees par nos 
				<span className="text-yellow-400"> ancetres </span>
					et transmettons les a notre 
 				<span className="text-yellow-400"> progeniture</span>
			</h3>

      <form className={styles.signinSectionRightForm} onSubmit={handleSubmit}>
				<h1 className="mb-3"> Authentifiez vous </h1>

				{
					showError ? <AlertError message={errorMessage} onHide={() => setShowError(false)} /> : null
				}
				

				<div className="w-full flex flex-col space-y-3  mt-6 md:mt-8">
					<div className="w-full">
						<Input
							type="username"
							name="username"
							value={credentials.username}
							id="username"
							handleChange={handleChange}
							placeholder="Votre username"
						/>
					</div>
					<div className="w-full">
						<Input
							type="password"
							name="password"
							value={credentials.password}
							id="password"
							handleChange={handleChange}
							placeholder="Votre mot de passe"
						/>
					</div>
					
					<input
						type="submit"
						value="S'authentifier"
						className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full bg-primary hover:bg-primary-hover px-2 py-2 lg:px-3 lg:py-2.5 text-center text-white text-base md:text-xl rounded" 
						onClick={handleSubmit}
					/>
					<div className="flex flex-row justify-end py-3">
						Pas encore inscrit ? 
						<ALink link="/signup" classe="inline-block ml-2">inscrivez vous</ALink>
					</div>

					{
						loading ? <span className={styles.signinSectionRightLoader}></span> : null
					}
				</div>
    	</form>

			{
				redirect && <Redirect to="/wiki/feed" />
			}
  	</div>
  )
}
export default SecondConnexionPage;