import React,{useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import Project from "./component/project/Project.js";
import Kanban from "./component/kanban/Kanban.js";
import Schedule from "./component/schedule/Schedule.js";
import Error404 from "./component/error/Error404"
import Profile from "./component/setting/Profile";

const App = () => {

    //const[projectNo, setProjectNo] = useState(null);
    

    return (
        <Router>
            <Routes>  
                <Route path="/" element={<Project />} > 
                    {/* <Route path="board" element={<Kanban />} /> */}
                </Route>

                <Route path="board" element={<Kanban />} />

                <Route path="schedule" element={<Schedule />} />
                <Route path='profile' element={<Profile />} />
                <Route path='*' element={<Error404 />} />
                <Route path='/api/checkSession'/>
            </Routes>
        </Router>
    );
};

export default App;