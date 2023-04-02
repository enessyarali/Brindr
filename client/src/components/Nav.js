import logo from "../images/brindrLogo.png";

const Nav = (props) => {
  const handleClick = () => {
    props.setShowModal(true);
    props.setIsSignUp(false)
  };
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      {!props.authToken && (
        <button className="nav-button" onClick={handleClick} disabled={props.showModal} > 
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
