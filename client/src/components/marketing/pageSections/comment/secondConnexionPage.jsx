import React from "react";
import Input from '../../../elements/input/Input';
import ALink from '../../../elements/a/ALink';
import './ConnexionPage.css';

const SecondConnexionPage = () =>{

    return(
         <div className="Content">
            <form className="" onSubmit="">
					 <h1> Authentifiez vous </h1>
                     <div className="w-full flex flex-col space-y-3  mt-6 md:mt-8">
                          <div className="w-full">
								<Input
								type="email"
								name="email"
								id="email"
								value=""
								placeholder="Email"
								/>
							</div>
							<div className="w-full">
								<Input
								type="password"
								name="Mot de passe"
								id="password"
								value=""
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
                                <ALink link="/signup" classe="inline-block ml-2">connectez vous</ALink>
                            </div>
                     </div>
            </form>
         </div>
    )
}
export default SecondConnexionPage;