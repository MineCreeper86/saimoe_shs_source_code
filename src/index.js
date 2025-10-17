import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigator from "./component/Navigator";
import Footer from "./component/Footer";
import './Index.css';

// 使用 React.lazy 动态导入页面
const Homepage = React.lazy(() => import('./page/Homepage'));
const Vote = React.lazy(() => import('./page/Vote'));
const Playback = React.lazy(() => import('./page/Playback'));
const Timeline = React.lazy(() => import('./page/Timeline'));
const SHSTpass = React.lazy(() => import('./component/usersystem/SHSTpass'));
const Nomination = React.lazy(() => import('./component/appvote/Nomination'));
const Group = React.lazy(() => import('./component/appvote/Group'));
const Eight = React.lazy(() => import('./component/appvote/Eight'));
const Four = React.lazy(() => import('./component/appvote/Four'));
const Semifinal = React.lazy(() => import('./component/appvote/Semifinal'));
const Final = React.lazy(() => import('./component/appvote/Final'));
const GroupTest = React.lazy(() => import('./component/appvote/GroupTest'));

const root = ReactDOM.createRoot(document.getElementById('root'));
document.cookie = "wh="+window.outerHeight+"; domain=shswafu2025.club";
document.cookie = "ww="+window.outerWidth+"; domain=shswafu2025.club";
console.log("～欢迎关注上海中学和风社～")

// 加载中的占位组件
const LoadingFallback = () => <div>Loading...</div>;

root.render(
    <React.StrictMode>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap" rel="stylesheet"/>
        <div className="Background"></div>
        <Navigator/>
        <Router>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route exact path="/" element={<Homepage/>}/>
                    <Route exact path="/playback" element={<Playback/>}/>
                    <Route exact path="/timeline" element={<Timeline/>}/>
                    <Route exact path="/vote" element={<Vote/>}/>
                    <Route exact path="/shstp" element={<SHSTpass/>}/>
                    <Route exact path="/appvote/4/nomination" element={<Nomination/>}/>
                    <Route exact path="/appvote/4/group" element={<Group/>}/>
                    <Route exact path="/appvote/4/eight" element={<Eight/>}/>
                    <Route exact path="/appvote/4/four" element={<Four/>}/>
                    <Route exact path="/appvote/4/semifinal" element={<Semifinal/>}/>
                    <Route exact path="/appvote/4/final" element={<Final/>}/>
                    <Route exact path="/appvote/4/group_test" element={<GroupTest/>}/>
                </Routes>
            </Suspense>
        </Router>
        <Footer/>
    </React.StrictMode>
);

reportWebVitals();