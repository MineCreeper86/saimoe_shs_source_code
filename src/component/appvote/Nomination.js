import React, {useState} from 'react';
import Article from "../Article";
import LoginWindow from "../usersystem/LoginWindow";
import './Nomination.css'

function Nomination() {
    const createSubject = () => {
        alert("功能开发中")
    }
    return (
        <Article>
            <h1>第三届上萌角色提名页面</h1>
            <p>您最多可在萌王赛道（女子组）及燃王赛道（男子组）各提名10个角色，请勿重复提名，请勿将女性角色填入男子组或将男性角色填入女子组，请勿填写已经成为萌王或燃王的角色。部分<b>极少或极不主要</b>出场于动漫的角色可能被组委会删除，请留意。
            </p>
            <p>提名赛的角色列表获取自 Bangumi.TV，在此为其提供的便利表达感谢。</p>
            <p>您可通过搜索中文译名、日文原名或罗马音、外号等对角色进行搜索，结果显示前16个匹配内容，示例如下：</p>
            <p>&nbsp;&nbsp;涼宮ハルヒ&emsp;&emsp;搜索词：涼宮ハルヒ、凉宫春日、すずみや はるひ、Suzumiya
                Haruhi、团长</p>
            <p className="Akarin">&nbsp;&nbsp;赤座あかり&emsp;&emsp;搜索词：赤座あかり、赤座灯里、Akarin、あかざ あかり
                、Akaza Akari、阿卡林、アッカリ〜ン</p>
            <p onClick="createSubject">部分角色可能因为太新或太冷门而未被收录，如果您无法在搜索下拉框中找到您想要的角色，请单击此处创建新角色。</p>
            <p>--- 请完成下方的登录弹窗（如有） ---</p>
            <LoginWindow hide="1"/>
            <p>--- 请完成上方的登录弹窗（如有） ---</p>
            <br/><br/>
            <div className="MainApp">
                <div className="ChnlDivision ChnlFemale">
                    <h2>萌王提名</h2>
                </div>
                <div className="ChnlDivision ChnlMale">
                    <h2>燃王提名</h2>
                </div>
            </div>
        </Article>
    )
}

export default Nomination;
