import React from "react";
import Article from "../component/Article";
import './Vote.css'

function Vote() {
    return (
        <Article>
            <h1>投票通道选择</h1>
            <Portal startTime="1721375167000" endTime="1731477854000" href="/appvote/3/nomination">第三届上萌 - 角色提名</Portal>
            <Portal startTime="1731477854000" endTime="1732948465000" href="/appvote/3/group">第三届上萌 - 小组赛</Portal>
            <Portal startTime="1732948465000" endTime="1732948466000" href="/appvote/3/eight">第三届上萌 - 八强赛</Portal>
            <Portal startTime="1732948465000" endTime="1999999999999" href="/appvote/3/four">第三届上萌 - 四强赛</Portal>
            <Portal startTime="1924638028000" endTime="1999999999999" href="/appvote/3/semifinals">第三届上萌 - 半决赛</Portal>
            <Portal startTime="1924638028000" endTime="1999999999999" href="/appvote/3/finals">第三届上萌 - 决赛与季军赛</Portal>
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