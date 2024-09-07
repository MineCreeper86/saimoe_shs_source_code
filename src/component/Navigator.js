import React from "react";
import './Navigator.css';

function Navigator() {
    return (
        //TODO Draw a logo.
        <div className="Navigator">
            <span className="Logo">我希望这里有个logo（）</span>
            <span className="Menu">
                <NavItem href={"/"} text="主页"/>
                <NavItem href={"/playback"} text="往期赛况"/>
                <NavItem href={"/timeline"} text="赛程一览"/>
                <NavItem href={"/vote"} text="投票提名"/>
            </span>
        </div>
    )
}

const NavItem = (props) => {
    const pathname = relPath();
    if (pathname === props.href) {
        return <a className={"NavItem Selected"} href={props.href}>{props.text}</a>
    } else {
        return <a className={"NavItem"} href={props.href}>{props.text}</a>
    }
}

export function relPath() {
    const url = document.location.toString();
    const arrUrl = url.split("//");
    const start = arrUrl[1].indexOf("/");
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") !== -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

export default Navigator;