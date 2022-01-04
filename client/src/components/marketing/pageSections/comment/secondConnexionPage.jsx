import React,{useState} from "react";
import Input from '../../../elements/input/Input';
import ALink from '../../../elements/a/ALink';
import './ConnexionPage.css';

const SecondConnexionPage = () =>{

    const[value,setValue]= useState("");

    const handleChange = event =>{
        setValue(event.currentTarget.value);
  }
    const handleSubmit = event => {
        event.preventDefault();
		console.log(event.target.email.value) ;
		console.log(event.target.password.value) ;
	}

    return(
         <div className="Content">
            <form className=" formulaire" onSubmit={handleSubmit}>
					 <h1> Authentifiez vous </h1>
                     <div className="w-full flex flex-col space-y-3  mt-6 md:mt-8">
                          <div className="w-full">
								<Input
								type="email"
								name="email"
								id="email"
								onChange={handleChange}
								placeholder="Votre adresse email"
								/>
							</div>
							<div className="w-full">
								<Input
								type="password"
								name="password"
								id="password"
								onChange={handleChange}
								placeholder="Mot de passe"
								/>
							</div>
                            <input
								type="submit"
								value="créer mon compte"
								className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full bg-primary hover:bg-primary-hover px-2 py-2 lg:px-3 lg:py-2.5 text-center text-white text-base md:text-xl rounded" 
							/>
                            <div className="flex justify-end py-3">
                                Pas encore inscript? 
                                <ALink link="/signup" classe="inline-block ml-2">inscrivez vous</ALink>
                            </div>
                     </div>
            </form>
         </div>
    )
}
export default SecondConnexionPage;