import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
const Dashboard = () => {
  const [user,setUser] = useState(null);
  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  
  const UserId = cookies.UserId;
  const getUser = async () => {
     try {
      console.log(UserId);
      const response =   await axios.get("http://localhost:8000/user" , {
        params: {UserId}
      });
      
      setUser(response.data)
     } catch (err) {
      console.log(err);
     }
     
  }
  useEffect(()=>{getUser()},[])
  
  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://imgur.com/gallery/rCbSy0E",
    },
    {
      name: "Erlich Bachman",
      url: "https://imgur.com/gallery/rCbSy0E",
    },
    {
      name: "Monica Hall",
      url: "https://imgur.com/gallery/rCbSy0E",
    },
    {
      name: "Jared Dunn",
      url: "https://imgur.com/gallery/rCbSy0E",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://imgur.com/gallery/rCbSy0E",
    },
  ];

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <>
   {user && <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swiper-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>

            </TinderCard>
          ))}
           <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>

        </div>
      </div>
    </div>}
  </>
  );
};

export default Dashboard;
