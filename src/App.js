import Logo from './Logo.svg'
import {Helmet} from 'react-helmet';
import {Magic} from 'magic-sdk';
import {useForm} from "react-hook-form";
//import login from "./login";
//import axios from "axios";


function Login() {
    const magic = new Magic('pk_live_AABC93231E65FC6F');
    const {register, handleSubmit} = useForm();
    const onSubmit = async ({email}) => {
        const did_Token = await magic.auth.loginWithMagicLink({email})
        console.log(did_Token)
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer '+did_Token
            }
        };

        fetch('https://20ucnlvbni.execute-api.ap-south-1.amazonaws.com/beta/v1/login', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));



    };
    return (

        <div className="container">
            <Helmet>
                <title>SICS | Login</title>
                <link rel="icon" href="Logo.svg" type="image/svg"/>
            </Helmet>
            <img className="Logo" src={Logo} id={Logo} width="150" height="120"/><br/><br/>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input className="Email" type="email" placeholder="Email" id="Email" {...register("email")}
                       required/><br></br><br></br>
                <button className="login" type="submit">Login</button>
                <br></br><br></br>


                <span className="sign">Don't have an account? <a href="#">sign up</a></span>

            </form>

        </div>


    )

}

export default Login;



// fetch("https://sics-python.herokuapp.com/",{
//     mode: 'no-cors',
//     method: 'GET',
//     header: {
//         authorization: "Bearer " + did_Token,
//         "Content-type": 'application/json',
//         "accept": 'application/json'
//     },
// }).then(async  (resp) => {
//     const response = await resp.json();
//     console.log(response)
// })