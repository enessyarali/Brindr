import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModel";
const Home = () => {

    const [showModal,setShowModal] = useState(false)

    const authtoken = false
    const handleClick =() => {
        console.log("clicked");
        setShowModal(true)
    }
    return(
        <div className="overlay">
            <Nav authtoken={authtoken} setShowModal={setShowModal} showModal={showModal}/>
                <div className="home" >
                    <h1>Swipe Right</h1>
                        <button  className="primary-button" onClick={handleClick}>{authtoken ? "Signout" : "Create Account"}</button>

                      {showModal && (<AuthModal setShowModal={setShowModal}/>)}  
                </div>
        </div>

    )
}

export default Home;