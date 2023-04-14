import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";
import {useState , useEffect} from "react";
const ChatDisplay = ({user , clickedUser}) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
    const getUsersMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/messages' ,  {
                params:{userId : userId , correspondingUserId :clickedUserId}
            })
            setUsersMessages(response.data);
            } catch (error) {
                console.log(error);
            };
    };

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages' ,  {
            params:{userId : clickedUserId , correspondingUserId :userId}
        })
        setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error);
        };
};

    useEffect(() => {
      getUsersMessages();
      getClickedUsersMessages();
    }, [usersMessages , clickedUsersMessages]);

    const messages = [];

    
    return(
     
        <>
          <Chat />
           <ChatInput />
        </>
    )
}

export default ChatDisplay;