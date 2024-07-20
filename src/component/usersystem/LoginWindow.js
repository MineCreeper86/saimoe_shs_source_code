import React from "react";
import './LoginWindow.css'

function LoginWindow() {
    const [callback, setCallback] = React.useState({code:-1,message:"",redirect_signup:false});
    const [moreinfo, setMoreInfo] = React.useState(false);
    const displayMoreInfo = () => {setMoreInfo(true);};
    return (
        <div className="LoginWindow">
            <h3>登入账号</h3>
            <p>未创建的账户在填写完用户名密码后将以此创建账号。</p>
            <p>用户名<input type="text"/></p>
            <p>密&emsp;码<input type="password"/></p>
            <p className="Tips">创建账号即代表您同意上海中学和风社存储您的部分个人信息。
                <span onClick={displayMoreInfo}>{moreinfo?"":"了解更多"}</span>
            </p>
            <p className="Tips">{moreinfo?"（包括学校、年级及性别等画像特征信息，浏览器类型、IP地址及屏幕参数等设备特征信息及选票内容等信息，用于检测刷票及用户群分析）":""}</p>
            <button className="SubmitButton">登入</button>
            <p>{callback.message}</p>
        </div>
    )
}

export default LoginWindow;