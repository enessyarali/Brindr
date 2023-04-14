import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const ChatHeader = ({user}) => {
const [cookies, setCookie, removeCookie] = useCookies(["user"]);
const navigate = useNavigate();
  const logout = () => {
    removeCookie("UserId" , cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  }

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="image-container">
        <img src={user.url} alt={"photo of " + user.first_name }/>
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="logout-icon" onClick={logout} >←</i>
    </div>
  );
};

export default ChatHeader;
