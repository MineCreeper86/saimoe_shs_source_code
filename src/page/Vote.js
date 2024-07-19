import React from "react";
import Article from "../component/Article";
import './Vote.css'

function Vote() {
    return (
        <Article>
            <h1>投票通道选择</h1>
            <Portal startTime="1721375167000" endTime="1721375295000" href="/appvote/3/nomination">第三届上萌 - 角色提名</Portal>
            <Portal startTime="1721375167000" endTime="1721375295000" href="/appvote/3/group">第三届上萌 - 小组赛</Portal>
            <Portal startTime="1721375167000" endTime="1721375295000" href="/appvote/3/group">第三届上萌 - 八强赛</Portal>
        </Article>
    )
}

const Portal = (props) => {
    const alertEnded = () => {alert("该投票已结束")}
    if (Date.now() > props.endTime) {
        return <p className="Portal Ended" onClick={alertEnded}>{props.children}</p>
    } else if (Date.now() < props.startTime) {
        return <p className="Portal NotStarted">{props.children}</p>
    } else return <p className="Portal Active"><a href={props.href}>{props.children}</a></p>;
}

export default Vote;