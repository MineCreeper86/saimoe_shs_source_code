import React, {useEffect} from "react";
import './LoginWindow.css'
import axios from "axios";

function LoginWindow() {
    const [callback, setCallback] = React.useState({code:-1,message:"",data:{}});
    const [moreinfo, setMoreInfo] = React.useState(false);
    const [state, setState] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const displayMoreInfo = () => {setMoreInfo(true);};
    const login = async () => {
        let pwd_match = state === 1 || document.getElementById("password").value === document.getElementById("password_confirm").value
        if(!loading && pwd_match) {
            setLoading(true)
            let result;
            if(state===1) {
                result = await axios.post(
                    'https://api.shswafu.club/v0/user/login',
                    {},
                    {
                        headers: {
                            "Window-Param-Height": window.outerHeight,
                            "Window-Param-Width": window.outerWidth
                        },
                        params: {
                            username: document.getElementById("username").value,
                            password: document.getElementById("password").value
                        },
                        withCredentials: true
                    }
                )
            }
            if(state===2) {
                if(pwd_match) {
                    result = await axios.post(
                        'https://api.shswafu.club/v0/user/register',
                        {},
                        {
                            headers: {
                                "Window-Param-Height": window.outerHeight,
                                "Window-Param-Width": window.outerWidth
                            },
                            params: {
                                username: document.getElementById("username").value,
                                password: document.getElementById("password").value,
                                type: document.getElementById("type").value,
                                email: document.getElementById("email").value,
                            },
                            withCredentials: true
                        }
                    )
                }
            }
            if(state === 1 && result.data.code === 2) setState(2);
            if(state === 1 && result.data.code === 0) fetchData();
            setCallback(result.data);
            setLoading(false);
        }
        if(!pwd_match) setCallback({code:3,message:"确认密码与密码不匹配",data:{}});
    }
    const switchType = () => {
        setState(3-state)
    }
    const fetchData = async () => {
        const result = await axios.get(
            'https://api.shswafu.club/v0/user/info',
            {
                headers: {
                    "Window-Param-Height": window.outerHeight,
                    "Window-Param-Width": window.outerWidth
                },
                withCredentials: true
            }
        )
        setCallback(result.data);
        setState(1);
    }
    useEffect(() => {
        if(state === 0) fetchData();
    })
    if(state === 0) {
        return (
            <div className="LoginWindow">
                <h3>少女祈祷中...</h3>
                <p>正在加载用户资料</p>
            </div>
        )
    } else if(state === 1 && callback.code === 0 && callback.data.logged){
        return (
            <div className="LoginWindow">
                <h3>您已登入账号</h3>
                <p>用户名：{callback.data.user.username}</p>
            </div>
        )
    } else if(state >= 1) {
        return (
            <div className="LoginWindow">
                <h3>{state===2?"注册":"登入"}账号</h3>
                <p>{state===2?"请额外填写学校及邮箱信息，这有助于促进投票的公平性。":"未创建的账户在填写完用户名密码后将以此创建账号。"}</p>
                <p>用&ensp;户&ensp;名<input type="text" id="username"/></p>
                <p>密&emsp;&emsp;码<input type="password" id="password"/></p>
                {
                    state===2 &&
                    <p>密码确认<input type="password" id="password_confirm"/></p>
                }
                {
                    state===2 &&
                    <p>在读学校<input type="text" id="type"/></p>
                }
                {
                    state===2 &&
                    <p>邮箱地址<input type="email" id="email"/></p>
                }
                <p className="Tips">创建账号即代表您同意上海中学和风社存储您的部分个人信息。
                    <span onClick={displayMoreInfo}>{moreinfo?"":"了解更多"}</span>
                </p>
                <p className="Tips">{moreinfo?"（包括学校、年级及性别等画像特征信息，浏览器类型、IP地址及屏幕参数等设备特征信息及选票内容等信息，用于检测刷票及用户群分析）":""}</p>
                <button className="SubmitButton" onClick={login}>{state===2?"注册":"登入"}</button>&emsp;
                <button className="SwitchButton" onClick={switchType}>{state===1?"注册":"登入"}</button>
                <p className="Tips">{loading?"加载中":<b><big>{callback.message}</big></b>}</p>
            </div>
        )
    }
}

export default LoginWindow;