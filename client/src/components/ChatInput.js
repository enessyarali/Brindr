import axios from "axios";
import { useState } from "react";

const ChatInput = ({user,clickedUser,getUsersMessages,getClickedUsersMessages,}) => {
  const [textarea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addmessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textarea,
    };
    try {
      const response = await axios.post("http://localhost:8000/messages", {
        message,
      });
      getUsersMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={textarea}
        onChange={(e) => {
          setTextArea(e.target.value);
        }}
      />
      <button className="secondary-button" onClick={addmessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
