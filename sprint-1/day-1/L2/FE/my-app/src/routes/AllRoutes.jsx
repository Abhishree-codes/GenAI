import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Summary from "../pages/Summary";
import Mood from "../pages/Mood";
import Generate from "../pages/Generate";

export default function AllRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/summary" element={<Summary/>}/>
            <Route path="/analyze" element={<Mood/>}/>
            <Route path="/gen" element={<Generate/>}/>
        </Routes>
    )
}