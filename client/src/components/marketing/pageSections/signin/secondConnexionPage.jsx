import React,{useContext, useEffect, useState} from "react";
import Input from '../../../elements/input/Input';
import ALink from '../../../elements/a/ALink';
import './ConnexionPage.css';
import axios from 'axios';
// import currentUserContext from "../../../../dataManager/context/currentUserContent";
import { Redirect } from "react-router";

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
})

const SecondConnexionPage = () =>{
	// using the global state (context)
	// const {login} = useContext(currentUserContext)

	// definition of the state
  const [credentials, setCredentials]= useState({
		username:"",
		password:""
	});
	const [redirect, setRedirect] = useState(false)
	
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
			instance.post("/users/signin", credentials)
			.then(res => {
				const userData = res.data

				// save the token
				localStorage.setItem("tundah-token", userData.token)

				// update the global state
				// login({...userData, token: undefined})
				// console.log(userData)

				// window.location.href = "/"
				setRedirect(true)
			})
			.catch(err => {
				console.error(err)
			})
		} else {
			console.log("provide all the required data")
		}
	}

  return (
    <div className="Content">
      <form className=" formulaire" onSubmit={handleSubmit}>
				<h1> Authentifiez vous </h1>
				<div className="w-full flex flex-col space-y-3  mt-6 md:mt-8">
					<div className="w-full">
						<Input
							type="username"
							name="username"
							value={credentials.username}
							id="username"
							handleChange={handleChange}
							placeholder="Votre adresse username"
						/>
					</div>
					<div className="w-full">
						<Input
							type="password"
							name="password"
							value={credentials.password}
							id="password"
							handleChange={handleChange}
							placeholder="Mot de passe"
						/>
					</div>
					
					<input
						type="submit"
						value="S'authentifier"
						className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full bg-primary hover:bg-primary-hover px-2 py-2 lg:px-3 lg:py-2.5 text-center text-white text-base md:text-xl rounded" 
						onClick={handleSubmit}
					/>
					<div className="flex justify-end py-3">
						Pas encore inscript? 
						<ALink link="/signup" classe="inline-block ml-2">inscrivez vous</ALink>
					</div>
				</div>
    	</form>

			{
				redirect && <Redirect to="/" />
			}
  	</div>
  )
}
export default SecondConnexionPage;