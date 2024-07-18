import React from "react";
import Article from "../component/Article";
import LoginWindow from "../component/usersystem/LoginWindow";

function Homepage() {
    return (
        <Article>
            <h1>ようこそ！在上萌投下你神圣的一票吧！</h1>
            <p>米娜桑早上好中午好下午好晚上好！这里是上海中学和风社第三届上萌的投票通道。为了方便统计工作并优化大家的体验，我们第一次推出了这个投票网站，你可以在这个网站上进行提名、投票、查看战况等操作。</p>
            <p>为了实行一人一票制，请您先登录，登录后即可参与投票！</p>
            <LoginWindow/>
        </Article>
    )
}

export default Homepage;