import Nav from "../components/Nav";


const Home = () => {

    const authtoken = false
    const handleClick =() => {
        console.log("clicked");
    }
    return(
        <div className="overlay">
            <Nav authtoken={authtoken}/>
                <div className="home" >
                    <h1>Swipe Right</h1>
                        <button  className="primary-button" onClick={handleClick}>{authtoken ? "Signout" : "Create Account"}</button>
                </div>
        </div>

    )
}

export default Home;