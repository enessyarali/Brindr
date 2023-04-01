import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Dashboard from "./pages/DashBoard";
import {BrowserRouter , Routes , Route } from 'react-router-dom'


const  App = () => {
  return (
    <BrowserRouter>

    <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>
        <Route path={"/onboarding"} element={<OnBoarding/>}/>
        <Route />
    </Routes>

    </BrowserRouter>
   
  );
}

export default App;
