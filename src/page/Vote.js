import React from "react";
import Article from "../component/Article";
import './Vote.css'

function Vote() {
    return (
        <Article>
            <h1>投票通道选择</h1>
            <Portal startTime="1721375167000" endTime="1760228400000" href="/appvote/4/nomination">第四届上萌 - 角色提名</Portal>
            <Portal startTime="1760832000000" endTime="1762790400000" href="/appvote/4/group">第四届上萌 - 预选赛</Portal>
            <Portal startTime="9999999999999" endTime="9999999999999" href="/appvote/4/eight">第四届上萌 - 八强赛</Portal>
            <Portal startTime="9999999999999" endTime="9999999999999" href="/appvote/4/four">第四届上萌 - 四强赛</Portal>
            <Portal startTime="9999999999999" endTime="9999999999999" href="/appvote/4/semifinal">第四届上萌 - 半决赛</Portal>
            <Portal startTime="9999999999999" endTime="9999999999999" href="/appvote/4/final">第四届上萌 - 决赛与季军赛</Portal>
        </Article>
    )
}

const Portal = (props) => {
    const alertEnded = () => {alert("该投票已结束")}
    const skipTo = () => {window.location.href = props.href};
    if (Date.now() > props.endTime) {
        return <p className="Portal Ended" onClick={alertEnded}>{props.children}</p>
    } else if (Date.now() < props.startTime) {
        return <p className="Portal NotStarted">{props.children}</p>
    } else return <p className="Portal Active" onClick={skipTo}><a href={props.href}>{props.children}</a></p>;
}

export default Vote;
