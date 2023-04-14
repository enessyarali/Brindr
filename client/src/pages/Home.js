import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import AuthModal from "../components/AuthModal";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie,removeCookie] = useCookies(["user"]);
  const authtoken = cookies.AuthToken;
  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true)

    if (authtoken) {
      removeCookie('UserId', cookies.UserId);
      removeCookie("AuthToken" , cookies.AuthToken);
      window.location.reload();

    }
  };
  return (
    <div className="overlay">
      <Nav
        minimal = {true}
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
