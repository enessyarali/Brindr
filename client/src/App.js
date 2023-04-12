import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Dashboard from "./pages/DashBoard";
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import { useCookies } from "react-cookie";

const  App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>

    <Routes>
        <Route path={"/"} element={<Home/>}/>
      {authToken &&  <Route path={"/dashboard"} element={<Dashboard/>}/>}
      {authToken &&  <Route path={"/onboarding"} element={<OnBoarding/>}/>}
        <Route />
    </Routes>

    </BrowserRouter>
   
  );
}

export default App;
