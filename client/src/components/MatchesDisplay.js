import axios from "axios";
import { useState  ,useEffect} from "react";
import { useCookies } from "react-cookie";
const MatchesDisplay = ({ matches , setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserId = matches?.map(({ user_id }) => user_id);
  const [cookies , setCookie , removeCookie] = useCookies(["user"])
  const UserId = cookies.UserId;
  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserId) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatches();
  }, [matches]);
  //SHOWING THE MATCHES ONLY IF WE ARE IN THEIR MATCHES
  // const filteredMatches = matchedProfiles?.filter(({ user_id }) => matchedUserId.includes(user_id))
  let filteredMatches = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id ===  UserId).length > 0)
  console.log("filtered: " + filteredMatches);
  return (
    <div className="matches-display">
       {filteredMatches?.map(({ match , _index }) =>(
        <div key={{_index}} className="match-card" onClick={() => setClickedUser(match)} >
            <div className="img-container">
                <img src={match?.url} alt={match?.first_name + ' profile'} />
            </div>
            <h3>{match?.first_name}</h3>
        </div>
       ))}
    </div>
  );
};

export default MatchesDisplay;
