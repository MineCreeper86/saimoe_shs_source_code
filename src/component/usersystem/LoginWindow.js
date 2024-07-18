import React from "react";
import './LoginWindow.css'

function LoginWindow() {
    const [callback, setCallback] = React.useState({code:-1,message:"",redirect_signup:false});
    return (
        <div className="LoginWindow">
            <h3>登入账号</h3>
            <p>未创建的账户在填写完用户名密码后将以此创建账号。</p>
            <p>用户名<input type="text"/></p>
            <p>密&emsp;码<input type="password"/></p>
            <p className="Tips">创建账号即代表您同意上海中学和风社存储您的部分个人信息。
                <a href="/dataprivacy">了解更多</a>
            </p>
            <button className="SubmitButton">登入</button>
            <p>{callback.message}</p>
        </div>
    )
}

export default LoginWindow;