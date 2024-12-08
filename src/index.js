import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './page/Homepage';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navigator from "./component/Navigator";
import Footer from "./component/Footer";
import Vote from "./page/Vote";
import Playback from "./page/Playback";
import Timeline from "./page/Timeline";
import Nomination from "./component/appvote/Nomination";
import Group from "./component/appvote/Group";
import SHSTpass from "./component/usersystem/SHSTpass";
import Eight from "./component/appvote/Eight";
import Four from "./component/appvote/Four";
import Semifinal from "./component/appvote/Semifinal";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.cookie = "wh="+window.outerHeight+"; domain=shswafu.club";
document.cookie = "ww="+window.outerWidth+"; domain=shswafu.club";
console.log("～欢迎关注上海中学和风社～")
root.render(
    <React.StrictMode>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap"
              rel="stylesheet"/>
        <div className="Background"></div>
        <Navigator/>
        <Router>
            <Routes>
                <Route exact path="/" element={<Homepage/>}/>
                <Route exact path="/playback" element={<Playback/>}/>
                <Route exact path="/timeline" element={<Timeline/>}/>
                <Route exact path="/vote" element={<Vote/>}/>
                <Route exact path="/shstp" element={<SHSTpass/>}/>
                <Route exact path="/appvote/3/nomination" element={<Nomination/>}/>
                <Route exact path="/appvote/3/group" element={<Group/>}/>
                <Route exact path="/appvote/3/eight" element={<Eight/>}/>
                <Route exact path="/appvote/3/four" element={<Four/>}/>
                <Route exact path="/appvote/3/semifinal" element={<Semifinal/>}/>
            </Routes>
        </Router>
        <Footer/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
