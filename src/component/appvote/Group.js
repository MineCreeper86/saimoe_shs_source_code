import React, {useEffect, useState} from 'react';
import Article from "../Article";
import LoginWindow from "../usersystem/LoginWindow";
import './Group.css'
import axios from "axios";

function Group() {
    const [maleData, setMaleData] = useState([]);
    const [femaleData, setFemaleData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [started, setStarted] = useState(false);
    const [candidate, setCandidate] = useState({});
    const [state, setState] = useState(0);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const SubjectInput = (props) => {
        const [lastRequestTime, setLastRequestTime] = React.useState(0);
        const [searchResult, setSearchResult] = React.useState([]);
        const searchSubject = () => {
            //TODU read from json and setSearchResult(...)
        }
        const searchSubjectByInput = (event) => {
            setLastRequestTime(Date.now())
            event.target.style.backgroundColor = "white";
            document.getElementById('hidden-' + props.vid).value = null;
            searchSubject();
        }
        const transformResult = (belong) => {
            let resultObjects = [];
            let id = 0;
            const handleClick = (event) => {
                let element = event.target;
                if (element.children.length === 0) element = element.parentElement;
                let fatherElement = "-" + element.id.split("-")[1] + "-" + element.id.split("-")[2];
                const element1 = document.getElementById('input' + fatherElement);
                const element2 = document.getElementById('hidden' + fatherElement);
                element1.value = element.children[0].innerText
                element1.style.backgroundColor = "#dcffee";
                element2.value = element.id.split("-")[4];
                setSearchResult([])
            };
            searchResult.forEach(element => {
                const uniqueId = belong + "-" + id;
                resultObjects.push(
                    <p
                        id={uniqueId + '-' + element.id}
                        onClick={handleClick}
                        key={uniqueId}
                    >
                        <span>{element.name}</span>
                        {element.anime ? <span className="Game">（{element.src}）</span> :
                            <span className="Anime">（{element.src}）</span>}
                    </p>
                );
                id++;
            });
            return resultObjects;
        }
        useEffect(() => {
            if (props.defaultValue !== undefined && props.defaultValue !== null) {
                document.getElementById("input-" + props.vid).value = props.defaultValue.name;
                document.getElementById("hidden-" + props.vid).value = props.defaultValue.id;
                document.getElementById("hidden-" + props.vid).style.backgroundColor = "#dcffee";
            }
        }, []);
        let fatherElementId = 'input-' + props.vid
        return <div>
            <input type="hidden" id={'hidden-' + props.vid}/>
            <span className="SequenceTag">小组{1 + parseInt(props.vid.split("-")[1])}</span>
            <input type="text" className="VoteInput" id={fatherElementId}
                   onInput={searchSubjectByInput}/>
            {
                searchResult.length !== 0 &&
                <div className="SearchResultSet">
                    {transformResult(fatherElementId)}
                </div>
            }
        </div>
    }
    const generateChildTree = (prefix, initial) => {
        let lst = []
        for (let i = 0; i < 10; i++) {
            lst.push(<SubjectInput vid={prefix + "-" + i} defaultValue={initial[i]}/>)
        }
        return lst
    }
    const startVoting = async () => {
        if (!loaded) {
            console.log("正在加载数据，请稍候");
        } else {
            const result = await axios.post(
                'https://api.shswafu.club/v0/vote/event', null,
                {
                    params: {
                        channel: "group",
                        event: "start",
                    },
                    withCredentials: true
                });
            if (result.data.code === 0) setStarted(true);
            else alert(result.data.message)
        }
    }

    async function apply() {
        const result = await axios.post(
            'https://api.shswafu.club/v0/vote/event', null,
            {
                params: {
                    channel: "group",
                    event: "apply",
                },
                withCredentials: true
            });
        if (result.data.code === 1) {
            setTimeout(forceUpdate,1000)
        }
        else {
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
    if(!loaded) apply().then();
    const VoteSubmit = () => {
        const [submitCallback, setSubmitCallback] = React.useState("");
        const [lastSubmit, setLastSubmit] = React.useState([]);
        const submitNomination = async () => {
            let male_submission = []
            let female_submission = []
            let warning = false;
            for (let i = 0; i < 10; i++) {
                if (document.getElementById('hidden-male-' + i).value) {
                    male_submission.push(parseInt(document.getElementById('hidden-male-' + i).value));
                } else if (document.getElementById('input-male-' + i).value) {
                    warning = true;
                    document.getElementById('input-male-' + i).style.backgroundColor = "yellow";
                }
            }
            for (let j = 0; j < 10; j++) {
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
                            channel: "group",
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
                            channel: "nomination",
                            event: "group",
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
                <button className="NominationButton" onClick={submitNomination}>提交</button>
                <p>{submitCallback}</p>
            </div>)
    }
    const fetchCandidate = async () => {
        const result = await axios.get('/group_candidate.json')
        setCandidate(result.data);
        setState(1);
    }
    useEffect(() => {
        if(state === 0) fetchCandidate();
    })
    return (
        <Article>
            <h1>第三届上萌小组赛页面</h1>
            <p>您最多可在每个小组中选择 ？？ 个角色，得票排名前 ？？ 的角色将成功晋级下一轮。</p>
            <p>每个小组所对应的可选角色将在输入框的下拉框中进行展示，请先选中每个小组对应的输入框。</p>
            <LoginWindow hide="1"/>
            <div className="MainApp">
                <div className="VoteStart">
                    {loaded ||
                        <span style={{margin: "0 auto"}}>请完成上方的登录弹窗并按照要求验证邮箱（如有），由于直连网络波动较大，假如弹窗与开始提名按钮均未出现，可尝试特殊的上网方式。</span>}
                    {loaded && !started &&
                        <button className="VoteButton" onClick={startVoting}>开始小组赛投票</button>}
                </div>
                {started && <div className="ChnlDivision ChnlFemale">
                    <h2>萌王小组赛</h2>
                    {generateChildTree("fem", femaleData)}
                </div>}
                {started && <div className="ChnlDivision ChnlMale">
                    <h2>燃王小组赛</h2>
                    {generateChildTree("male", maleData)}
                </div>}
                {started && <VoteSubmit/>}
            </div>
        </Article>
    )
}

export default Group;
