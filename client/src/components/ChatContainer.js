import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import { useState } from "react";
const ChatContainer = ({user }) => {
  const [clickeduser,setClickedUser] = useState(null)

    return (
        <div className="chat-container">
          <ChatHeader user={user} />
          <div>
            <button className="option" onClick={() => {setClickedUser(null)}}>Matches</button>
            <button className="option" disabled={!clickeduser} >Chat</button>
          </div>

          {!clickeduser &&<MatchesDisplay matches = {user.matches}  setClickedUser={setClickedUser}/>}
          {/* if there is a clicked user  we will show the ChatDisplay if there is no clicked user we will show the MatchesDisplay. */}
          {clickeduser  && <ChatDisplay user={user} clickedUser={clickeduser} />}
        </div>
    )
}

export default ChatContainer;