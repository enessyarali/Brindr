import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authtoken = false;
  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true)
  };
  return (
    <div className="overlay">
      <Nav
        authtoken={authtoken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title" >Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authtoken ? "Signout" : "Create Account"}
        </button>
        {showModal && (
          <AuthModal
            setShowModal={setShowModal}
            setIsSignUp={setIsSignUp}
            isSignUp={isSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
