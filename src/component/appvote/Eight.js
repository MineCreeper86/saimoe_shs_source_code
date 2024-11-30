import React, {useEffect, useState} from 'react';
import Article from "../Article";
import LoginWindow from "../usersystem/LoginWindow";
import './Eight.css'
import axios from "axios";

function Eight() {
    const [maleData, setMaleData] = useState([]);
    const [femaleData, setFemaleData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [started, setStarted] = useState(false);
    const [candidate, setCandidate] = useState({});
    const [state, setState] = useState(0);
    const [maleSelected, setMaleSelected] = useState([]);
    const [femaleSelected, setFemaleSelected] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const debug = false;
    const SubjectInput = (props) => {
        let fatherElementId = 'input-' + props.vid
        const children = props.option.characters.map((character) => (<td className="CandidateTag" onClick={()=>{}}>{character.name_cn}</td>))
        console.log(props.defaultValue);
        return <tr><td><span className="SequenceTag">小组{props.option.code}</span></td>{children}</tr>
    }
    const generateChildTree = (prefix, initial, candidate) => {
        let lst = []
        for (let i = 0; i < candidate.length; i++) {
            lst.push(<SubjectInput vid={prefix + "-" + i} defaultValue={initial} option={candidate[i]}/>)
        }
        return lst
    }
    const startVoting = async () => {
        if (!loaded) {
            console.log("正在加载数据，请稍候");
        } else if (!debug) {
            const result = await axios.post(
                'https://api.shswafu.club/v0/vote/event', null,
                {
                    params: {
                        channel: "eight",
                        event: "start",
                    },
                    withCredentials: true
                });
            if (result.data.code === 0) setStarted(true);
            else alert(result.data.message)
        }
    }

    async function apply() {
        if(!debug) {
            const result = await axios.post(
                'https://api.shswafu.club/v0/vote/event', null,
                {
                    params: {
                        channel: "eight",
                        event: "apply",
                    },
                    withCredentials: true
                });
            if (result.data.code === 1) {
                setTimeout(forceUpdate, 1000)
            } else {
                if (result.data.data.details.length === 0) {
                    setLoaded(true)
                } else if (result.data.data.details.length > 0) {
                    const latest = result.data.data.details[result.data.data.details.length - 1]
                    setMaleData(latest.males)
                    setFemaleData(latest.females)
                    setLoaded(true)
                }
            }
        }
    }

    if (!loaded) apply().then();
    const VoteSubmit = () => {
        const [submitCallback, setSubmitCallback] = React.useState("");
        const [lastSubmit, setLastSubmit] = React.useState([]);
        const submitVote = async () => {
            let male_submission = []
            let female_submission = []
            let warning = false;
            for (let i = 0; i < 12; i++) {
                if (document.getElementById('hidden-male-' + i).value) {
                    male_submission.push(parseInt(document.getElementById('hidden-male-' + i).value));
                } else if (document.getElementById('input-male-' + i).value) {
                    warning = true;
                    document.getElementById('input-male-' + i).style.backgroundColor = "yellow";
                }
            }
            for (let j = 0; j < 16; j++) {
                if (document.getElementById('hidden-fem-' + j).value) {
                    female_submission.push(parseInt(document.getElementById('hidden-fem-' + j).value));
                } else if (document.getElementById('input-fem-' + j).value) {
                    warning = true;
                    document.getElementById('input-fem-' + j).style.backgroundColor = "yellow";
                }
            }
            const currSubmit = [male_submission, female_submission];
            if (!warning) {
                setSubmitCallback("お待ちください")
                const result = currSubmit.toString() === lastSubmit.toString() ? await axios.post(
                    'https://api.shswafu.club/v0/vote/event', null,
                    {
                        params: {
                            channel: "eight",
                            event: "submit",
                            m: encodeURIComponent(JSON.stringify(male_submission)),
                            f: encodeURIComponent(JSON.stringify(female_submission)),
                            force: "force"
                        },
                        withCredentials: true
                    }) : await axios.post(
                    'https://api.shswafu.club/v0/vote/event', null,
                    {
                        params: {
                            channel: "eight",
                            event: "submit",
                            m: encodeURIComponent(JSON.stringify(male_submission)),
                            f: encodeURIComponent(JSON.stringify(female_submission)),
                        },
                        withCredentials: true
                    });
                switch (result.data.code) {
                    case 0:
                        setSubmitCallback("提交成功！")
                        break;
                    case 6:
                        setSubmitCallback("检查到以下问题，若忽略请再次点击提交：" + result.data.message);
                        break;
                    case 10:
                        setSubmitCallback("线下选票提交成功！")
                        for (let i = 0; i < 10; i++) {
                            document.getElementById('input-male-' + i).value = ""
                            document.getElementById('input-male-' + i).style.backgroundColor = "white";
                            document.getElementById('input-fem-' + i).value = ""
                            document.getElementById('input-fem-' + i).style.backgroundColor = "white";
                            document.getElementById('hidden-fem-' + i).value = ""
                            document.getElementById('hidden-male-' + i).value = ""
                        }
                        break;
                    default:
                        setSubmitCallback(result.data.message);
                }
                setLastSubmit(currSubmit);
            } else {
                setSubmitCallback("您所选中的部分角色貌似不在对应小组中，请重新填写标黄的输入框并在弹出的搜索结果中选择一个角色或清除输入框的内容。")
            }
        }
        return (
            <div className="NominationSubmit">
                <button className="NominationButton" onClick={submitVote}>提交</button>
                <p>{submitCallback}</p>
            </div>)
    }
    const fetchCandidate = async () => {
        const result = await axios.get('/3/group.json')
        setCandidate(result.data);
        setState(1);
    }
    useEffect(() => {
        if (state === 0) fetchCandidate();
    })
    return (
        <Article>
            <h1>第三届上萌八强页面</h1>
            <p>您可在每个小组中选择 2 个角色，总得票排名前两名的角色将成功晋级下一轮。</p>
            <p>请点击你想要投票的角色直至其名字显示为绿色。</p>
            <p>应援作品记为 5 票。应援作品可以电子形式发至admin@shswafu.club或线下递交。</p>
            {!debug && <LoginWindow hide="1"/>}
            <div className="MainApp">
                <div className="VoteStart">
                    {loaded ||
                        <span
                            style={{margin: "0 auto"}}>请完成上方的登录弹窗并按照要求验证邮箱（如有），由于直连网络波动较大，假如弹窗与开始提名按钮均未出现，可尝试特殊的上网方式。</span>}
                    {loaded && !started &&
                        <button className="VoteButton" onClick={startVoting}>开始投票</button>}
                </div>
                {started && state !== 1 && <p>加载候选数据中……</p>}
                {(started || debug) && state === 1 && <div className="ChnlDivision ChnlFemale">
                    <h2>萌王八强赛</h2>
                    <table style={{width: '100%'}}>
                        <tbody style={{width: '100%'}}>
                            {generateChildTree("fem", femaleData, candidate.female)}
                        </tbody>
                    </table>
                </div>}
                {(started || debug) && state === 1 && <div className="ChnlDivision ChnlMale">
                    <h2>燃王八强赛</h2>
                    <table style={{width: '100%'}}>
                        <tbody style={{width: '100%'}}>
                            {generateChildTree("male", maleData, candidate.male)}
                        </tbody>
                    </table>
                </div>}
                {started && state === 1 && <VoteSubmit/>}
            </div>
        </Article>
    )
}

export default Eight;