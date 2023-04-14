import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
const Dashboard = () => {
  const [user,setUser] = useState(null);
  const [cookies,setCookie,removeCookie] = useCookies(['user']);
  const [preferredusers,setPreferredUsers] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  
  const UserId = cookies.UserId;
  const getUser = async () => {
     try {
      
      const response =   await axios.get("http://localhost:8000/user" , {
        params: {UserId}
      });
      
      setUser(response.data)
      
     } catch (err) {
      console.log(err);
     }
     
  }
  console.log(user);

  const getPreferredUsers = async () => {
    try {
      console.log(user);
      const response =   await axios.get("http://localhost:8000/preferredusers", {
        params: { gender :  user?.gender , breed_interest : user?.breed_interest}
      });
      
      setPreferredUsers(response.data)
     } catch (err) {
      console.log(err);
     }
  }

  
  useEffect(()=>{getUser()
  getPreferredUsers()},[user , preferredusers])
  
  const updateMatches = async (matchedUserId) => {
        try {
          await axios.put("http://localhost:8000/addmatch", {UserId,matchedUserId});
          getUser()
        } catch (err) {
          console.log();
        }
  }
  
  const swiped = (direction, swipedUserId) => {
    if(direction === 'right'){
      updateMatches(swipedUserId)
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

//mathes is an object with all the user_ids that have been matched.This funtion will return an array of all the user_ids that have been matched.
  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(UserId); 
  
  // the code is filtering out preferred users who have already been matched with the logged-in user, using the matchedUserIds 
  // array to keep track of the user IDs of all the matched users, and then using Array.includes() to filter out preferred users whose 
  // user_id is already present in the matchedUserIds array. The resulting filtered array, filteredPreferredUsers, will only contain preferred 
  // users who have not been matched with the logged-in user before.

  const filteredPreferredUsers = preferredusers.filter( preferredUser => !matchedUserIds.includes(preferredUser.user_id) )
  //The problem with this logic is whether the user is matched with  other user  or not is not depending on the other user.
  //Whoever is swiped right is accepted as matched without any regard to the other users swipe.
  //Logic needs to be changed to check if the other user is matched with the logged-in user.IT NEEDS IMPROVEMENT
  return (
    <>
   {user && <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swiper-container">
        <div className="card-container">
          {filteredPreferredUsers.map((preferred_user) => (
            <TinderCard
              className="swipe"
              key={preferred_user.name}
              onSwipe={(dir) => swiped(dir, preferred_user.user_id)}
              onCardLeftScreen={() => outOfFrame(preferred_user.name)}
            >
              <div
                style={{ backgroundImage: "url(" + preferred_user.url + ")" }}
                className="card"
              >
                <h3>{preferred_user.first_name}</h3>
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
