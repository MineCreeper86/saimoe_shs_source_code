import React, {useEffect} from "react";
import './LoginWindow.css'
import axios from "axios";

function LoginWindow(props) {
    const [callback, setCallback] = React.useState({code:-1,message:"",data:{}});
    const [moreInfo, setMoreInfo] = React.useState(false);
    const [state, setState] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState([]);
    const displayMoreInfo = () => {setMoreInfo(true);};
    let schools = []
    let pending = false
    const isWechat = () => {
        const ua = navigator.userAgent.toLowerCase();
        const isWXWork = ua.match(/wxwork/i) === 'wxwork';
        return !isWXWork && ua.match(/MicroMessenger/i) === 'micromessenger'
    }
    const OptionBar = (props) => {
        const setType = (option, e) => {
            document.getElementById("type").value = option.code;
            document.getElementById("type_search").value = option.name;
            searchType()
        }
        let children = []
        for(let i=0; i<props.options.length; i++) {
            children.push(<p className="TypeOption" key={"optionVal-"+i+"-"+props.options.code} onClick={(e) => setType(props.options[i],e)}>
                {props.options[i].name}
            </p>)
        }
        if(children.length === 0) {
            return <div></div>
        } else {
            return <div><p className="Tips">目前仅收录2024年上海中考录取学校</p><div className={"TypeOptions"}>{children}</div></div>
        }
    }
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
                withCredentials: true
            }
        )
        setCallback(result.data);
        setState(1);
    }
    const fetchSchool = async () => {
        const result = await axios.get('/schools.json')
        schools = result.data
        searchType()
    }
    const searchType = () => {
        const keyword = document.getElementById("type_search").value
        if(schools.length === 0 && !pending) {
            pending = true
            console.log("pending now")
            fetchSchool()
        } else if (schools.length !== 0) {
            let response = [];
            let available = true;
            for(let i=0; i < schools.length; i++) {
                if(response.length < 10) {
                    if(schools[i].code < "000100") {
                        response.push(schools[i]);
                    }
                    let k = schools[i].name
                    let left_flag = 0
                    if(schools[i].code >= "000100") {
                        for(let right_flag = 0; right_flag < k.length; right_flag++) {
                            if(k.charAt(right_flag) === keyword.charAt(left_flag)) left_flag++;
                            if(left_flag === keyword.length) {
                                response.push(schools[i])
                                break;
                            }
                        }
                    }
                    if(schools[i].name === keyword
                    && schools[i].code === document.getElementById("type").value) {
                        available = false;
                        break;
                    }
                }
            }
            if(available) setSearchResult(response);
            else setSearchResult([]);
        }
        return [];
    }
    useEffect(() => {
        if(state === 0) fetchData();
    })
    if(state === 0) {
        return (
            props.hide?(<div></div>):(<div className="LoginWindow">
                <h3>少女祈祷中...</h3>
                <p>正在加载用户资料</p>
            </div>)
        )
    } else if(state === 1 && callback.code === 0 && callback.data.logged){
        return (
                (props.hide && callback.data.user.verified)?(<div></div>):(<div className="LoginWindow">
                    <h3>您已登入账号</h3>
                    <p>用户名：{callback.data.user.username}</p>
                    <p className="Tips">{callback.data.user.type_display}
                        {callback.data.user.type === "042032" && !callback.data.user.shsid && !isWechat() &&
                        <a href={"https://tpass.shs.cn/tpass/login?service=https%3A%2F%2Fsaimoe.shswafu.club%2Fshstp"}>&emsp;去绑定智慧上中</a>}
                        {callback.data.user.type === "042032" && !callback.data.user.shsid && isWechat() &&
                            <span>&emsp;可打开默认浏览器绑定智慧上中</span>}
                        {callback.data.user.type === "042032" && callback.data.user.shsid &&
                            <span>&emsp;已绑定智慧上中</span>}
                    </p>
                    <p>邮箱：{callback.data.user.email}&nbsp;{callback.data.user.verified?<font color="green">已验证</font>:<font color="darkgray">未验证</font>}</p>
                    {!callback.data.user.verified && <p className="Tips">未验证的用户无法投票，请通过绑定邮箱将任意内容的邮件发送至 verify@shswafu.club</p>}
                    {!callback.data.user.verified && <p className="Tips">一般验证过程需要等待 30s，请刷新页面以应用更新效果</p>}
                </div>)
        )
    } else if(state >= 1) {
        return (
            <div className="LoginWindow">
                <h3>{state===2?"注册":"登入"}账号</h3>
                <p className="TipsWhenMobile">{state===2?"请额外填写学校及邮箱信息，这有助于促进投票的公平性。":"未创建的账户在填写完用户名密码后将以此创建账号。"}</p>
                <p className="KeyInput"><span>用户名</span><input type="text" id="username" placeholder={state===2?"用户名（5-16长，不推荐汉字）":"用户名或邮箱"}/></p>
                <p className="KeyInput"><span>密码</span><input type="password" id="password" placeholder="密码"/></p>
                {state===2 && <p className="KeyInput"><span>密码确认</span><input type="password" id="password_confirm" placeholder="密码确认"/></p>}
                {
                    state===2 &&
                    <p className="KeyInput"><span>在读学校</span>
                        <input type="text" id="type_search" onInput={searchType} placeholder="在读学校"/></p>
                }
                <input type="hidden" id="type"/>
                {state===2 && <OptionBar options={searchResult}/>}
                {state===2 && <p className="KeyInput"><span>邮箱地址</span><input type="email" id="email" placeholder="电子邮箱地址"/></p>}
                <p className="Tips">创建账号即代表您同意上海中学和风社存储您的部分个人信息。
                    <span onClick={displayMoreInfo}>{moreInfo?"":"了解更多"}</span>
                </p>
                <p className="Tips">{moreInfo?"（包括学校、年级及性别等画像特征信息，浏览器类型、IP地址及屏幕参数等设备特征信息及选票内容等信息，用于检测刷票及用户群分析）":""}</p>
                <button className="SubmitButton" onClick={login}>{state===2?"注册":"登入"}</button>&emsp;
                <button className="SwitchButton" onClick={switchType}>{state===1?"注册":"登入"}</button>
                {isWechat() || <p>其它登录方式：<a
                    href={"https://tpass.shs.cn/tpass/login?service=https%3A%2F%2Fsaimoe.shswafu.club%2Fshstp"}>智慧上中一键登录</a>
                </p>}
                {isWechat() && <p>智慧上中一键登录在微信浏览器下不可用，请切换浏览器
                </p>}
                <p className="Tips">{loading?"加载中":<b><big>{callback.message}</big></b>}</p>
            </div>
        )
    }
}

export default LoginWindow;
