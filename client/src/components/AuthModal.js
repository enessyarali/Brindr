import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"
const AuthModal = (props) => {
    
    const [email, setEmail] = useState(null)
    const [password , setPassword] = useState(null)
    const [confirmPassword , setConfirmPassword] = useState(null)
    const [error ,setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null);


    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    let navigate = useNavigate()
   
    const handleClick = () => {
        props.setShowModal(false)
        props.setIsSignUp(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(props.isSignUp && (password !== confirmPassword)){
                    setError("Passwords Need to Match")
                    return
            }
               const response = await axios.post(`http://localhost:8000/${props.isSignUp ? 'signup' : 'login'}`, {email, password})
               setCookie('AuthToken', response.data.token)
               setCookie( 'UserId', response.data.userId )
               const success = response.status === 201;
               if (success && props.isSignUp)  navigate('/onboarding');
               if (success && !props.isSignUp) navigate('/dashboard');
            
            console.log("make a post request to the database");
        }catch(error){
            console.log(error);
        }
    }
   
    return (

        <div  className="auth-modal">
            <div   className="close-icon" onClick={handleClick}>X</div>
            <h2>{props.isSignUp ? "Create Account" : "Log In" }</h2>
            <form onSubmit={handleSubmit}>
                    <input 
                        type='email' 
                        id='email' 
                        name="email" 
                        placeholder="email"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <input 
                        type='password' 
                        id='password' 
                        name="password" 
                        placeholder="password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    {props.isSignUp && <input //Conditional rendering if the person is not signedup we show this input if they are just logging in we dont.
                        type='password' 
                        id='passwordcheck' 
                        name="passwordcheck" 
                        placeholder="Confirm Password"
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />}
                    <input className="secondary-button" type={"submit"}/>
                    <p>{error}</p>
            </form>
        </div>
    )
}

export default AuthModal;