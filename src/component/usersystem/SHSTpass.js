import React from 'react';
import Article from "../Article";
import axios from "axios";

function SHSTpass() {
    const [userData, setUserData] = React.useState({});
    const [userDataLoaded, setUserDataLoaded] = React.useState(0);
    const loadData = async () => {
        const result = await axios.get(
            'https://api.shswafu.club/v0/verify/shs_tpass',
            {
                params: {
                    ticket: window.location.search.substring(8)
                },
                withCredentials: true
            }
        );
        if (result.data.code === 0) {
            setUserData(result.data.data);
            setUserDataLoaded(2);
        } else {
            setUserDataLoaded(1);
        }
    }
    if(window.location.search.indexOf("ticket=") !== -1) {
        if(userDataLoaded === 0) {
            loadData().then()
        }
        return <Article>
            <h1>本校学生身份验证</h1>
            <h2>您已在智慧上中授权登录。</h2>
            {userDataLoaded === 0 && <p>请稍候，正在处理您的账户信息。</p>}
            {userDataLoaded === 1 && <p>验证失败。</p>}
            {userDataLoaded === 2 && <div style={{padding: "1em"}}>
                <p>姓&emsp;&emsp;名：{userData.name}</p>
                <p>统一编号：{userData.id}</p>
            </div>}
        </Article>
    } else {
        return <Article>
            <h1>本校学生身份验证</h1>
            <h2><a href={"https://tpass.shs.cn/tpass/login?service=https%3A%2F%2Fsaimoe.shswafu.club%2Fshstp"}>点击此链接跳转至智慧上中验证上海中学账户。</a></h2>
            <p>点击链接将跳转至外部网站进行验证。</p>
            <p>请不要使用微信浏览器，可能导致无法正常跳转。</p>
            <p>仅用于验证身份合法性并保证一人一票，上海中学和风社将确保您的账号信息安全。</p>
        </Article>
    }
}

export default SHSTpass;