import React,{useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import Project from "./component/project/Project.js";
import Schedule from "./component/schedule/Schedule.js";
import Error404 from "./component/error/Error404"
import Settings from "./component/setting/Settings";

const App = () => {

    //const[projectNo, setProjectNo] = useState(null);
    

    return (
        <Router>
            <Routes>  
                <Route path="/" element={<Project />} > 
                    {/* <Route path="board" element={<Kanban />} /> */}
                </Route>
                <Route path="schedule" element={<Schedule />} />
                <Route path="settings" element={<Settings />} />
                <Route path='*' element={<Error404 />} />
                <Route path='/api/checkSession'/>
            </Routes>
        </Router>
    );
};

export default App;