import logo from '../images/brindrLogo.png'

const Nav = (props) => {
    return (
       <nav>
        <div className="logo-container">
            <img className="logo" src={logo}/>
            </div>
           {!props.authToken  && <button className='nav-button'>Log In</button>}
        
       </nav>
    )
}

export default Nav;