import React from "react";
import Article from "../component/Article";
import './Playback.css'

function Playback() {
    return (
        <Article>
            <h1>往届上萌赛况回顾！</h1>
            <h2>第二届上海市上海中学最受欢迎动漫人物赏</h2>
            <h3>&emsp;萌王：初音未来&emsp;&emsp;燃王：黑羽快斗</h3>
            <table className="PlaybackStats">
                <tbody>
                <tr>
                    <th colSpan="2">女子组（萌王赛道）</th>
                    <th colSpan="2">男子组（燃王赛道）</th>
                </tr>
                <tr>
                    <td>名称</td>
                    <td>轮次 / 得票</td>
                    <td>名称</td>
                    <td>轮次 / 得票</td>
                </tr>
                <tr>
                    <td>初音未来</td>
                    <td>半/158 四/203</td>
                    <td>黑羽快斗</td>
                    <td>半/161 四/192</td>
                </tr>
                <tr>
                    <td>后藤独</td>
                    <td>半/141 四/158</td>
                    <td>折木奉太郎</td>
                    <td>半/130 四/150</td>
                </tr>
                <tr>
                    <td>御坂美琴</td>
                    <td>半/112 四/154</td>
                    <td>五条悟</td>
                    <td>半/86 四/134</td>
                </tr>
                <tr>
                    <td>爱蜜莉雅</td>
                    <td>半/85 四/140</td>
                    <td>太宰治</td>
                    <td>半/79 四/127</td>
                </tr>
                <tr>
                    <td>小鸟游六花</td>
                    <td>四强赛 / 130</td>
                    <td>碇真嗣</td>
                    <td>四强赛 / 110</td>
                </tr>
                <tr>
                    <td>伊蕾娜</td>
                    <td>四强赛 / 118</td>
                    <td>渚薰</td>
                    <td>四强赛 / 109</td>
                </tr>
                <tr>
                    <td>明日香</td>
                    <td>四强赛 / 113</td>
                    <td>杀老师</td>
                    <td>四强赛 / 98</td>
                </tr>
                <tr>
                    <td>樱岛麻衣</td>
                    <td>四强赛 / 111</td>
                    <td>艾伦耶格尔</td>
                    <td>四强赛 / 90</td>
                </tr>
                </tbody>
            </table>
            <h2>第一届上海市上海中学最受欢迎动漫人物赏</h2>
            <h3>&emsp;萌王：薇尔莉特·伊芙加登&emsp;&emsp;燃王：一方通行</h3>
            <table className="PlaybackStats">
                <tbody>
                <tr>
                    <th colSpan="2">女子组（萌王赛道）</th>
                    <th colSpan="2">男子组（燃王赛道）</th>
                </tr>
                <tr>
                    <td>名称</td>
                    <td>轮次 / 得票</td>
                    <td>名称</td>
                    <td>轮次 / 得票</td>
                </tr>
                <tr>
                    <td>薇尔莉特·伊芙加登</td>
                    <td>决赛 / 163</td>
                    <td>一方通行</td>
                    <td>决赛 / 144</td>
                </tr>
                <tr>
                    <td>御坂美琴</td>
                    <td>决赛 / 115</td>
                    <td>梓川咲太</td>
                    <td>决赛 / 110</td>
                </tr>
                <tr>
                    <td>雪之下雪乃</td>
                    <td>季军赛 / 136</td>
                    <td>黑羽快斗</td>
                    <td>季军赛 / 145</td>
                </tr>
                <tr>
                    <td>千反田爱瑠</td>
                    <td>季军赛 / 118</td>
                    <td>石上优</td>
                    <td>季军赛 / 103</td>
                </tr>
                <tr>
                    <td>樱岛麻衣</td>
                    <td>四强赛 / 88</td>
                    <td>折木奉太郎</td>
                    <td>四强赛 / 108</td>
                </tr>
                <tr>
                    <td>平泽唯</td>
                    <td>四强赛 / 94</td>
                    <td>金木研</td>
                    <td>四强赛 / 82</td>
                </tr>
                <tr>
                    <td>初音未来</td>
                    <td>四强赛 / 96</td>
                    <td>上条当麻</td>
                    <td>四强赛 / 90</td>
                </tr>
                <tr>
                    <td>宫水三叶</td>
                    <td>四强赛 / 68</td>
                    <td>五条悟</td>
                    <td>四强赛 / 81</td>
                </tr>
                </tbody>
            </table>
            <p>表格：八强赛况（第5~8名排名由后续排位赛决定，四强赛数据仅供参考）<a href={"https://www.bilibili.com/opus/769244263743488018"} target={"_blank"} rel="noreferrer">点此查看比赛详情</a></p>
        </Article>
    )
}

export default Playback;