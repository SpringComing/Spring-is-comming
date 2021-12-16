import "./index.css";
import React from "react";
import Loadable from "react-loadable";
import Logo from "./components/Logo/Logo.js";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Basic from "./components/Routes/Basic/Basic.js";
import Project from "./components/Routes/projects/Project.js";
import Manage from "./components/Routes/Manage/Manage.js";
import Reports from "./components/Routes/Reports/Reports.js";
import Schedule from "./components/Routes/Schedule/Schedule.js";
import Settings from "./components/Routes/Settings/Settings.js";

class App extends React.Component {
    render() {
        return (
            <div className="kanban-wrapper">
                <div className="kanban">
                    <Logo />
                    <Header />
                    <Sidebar />
                    <Switch>
                        {
                            //*/
                            <Route exact path="/" component={Basic} />
                            
                            /*/
                        
                            <Route exact path="/" component={Project} /> 
                            //*/
                        }
                        <Route path="/manage" component={Manage} />
                        <Route path="/schedule" component={Schedule} />
                        <Route path="/reports" component={Reports} />
                        <Route path="/settings" component={Settings} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const Loading = () => <div className="loading">Loading...</div>;

const Sidebar = Loadable({
    loader: () => import("./components/Sidebar/Sidebar.js"),
    loading: Loading,
});

export default App;
