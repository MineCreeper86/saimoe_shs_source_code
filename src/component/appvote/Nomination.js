import React, {useEffect, useState} from 'react';
import Article from "../Article";
import LoginWindow from "../usersystem/LoginWindow";
import './Nomination.css'
import axios from "axios";

function Nomination() {
    const [maleData, setMaleData] = useState([]);
    const [femaleData, setFemaleData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [started, setStarted] = useState(false);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [submitCallback, setSubmitCallback] = React.useState("");
    const createSubject = () => {
        alert("功能开发中")
    }
    const SubjectInput = (props) => {
        const [lastRequestTime, setLastRequestTime] = React.useState(0);
        const [searchResult, setSearchResult] = React.useState([]);
        let status = true;
        const searchSubject = async () => {
            if (document.getElementById('input-' + props.vid).value) {
                const result = await axios.get(
                    'https://api.shswafu.club/v0/vote/nominate/search_character',
                    {
                        params: {
                            keyword: document.getElementById('input-' + props.vid).value,
                        },
                        withCredentials: true
                    }
                );
                if (result.data.code === 0) setSearchResult(result.data.data);
            } else setSearchResult([]);
        }
        const searchSubjectByComp = () => {
            status = true;
            searchSubject();
        }
        const searchSubjectByInput = (event) => {
            setLastRequestTime(Date.now())
            event.target.style.backgroundColor = "white";
            document.getElementById('hidden-' + props.vid).value = null;
            setTimeout((value) => {
                if (lastRequestTime < Date.now() - 500 && status && value === document.getElementById('input-' + props.vid).value) {
                    searchSubject();
                }
            }, 600, document.getElementById('input-' + props.vid).value)
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
                        <span>{element.name_cn === "" ? element.name_jp : element.name_cn}</span>
                        {element.src === "" ? <span className="AnimeNotFound">（无相关动漫）</span> :
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
            <span className="SequenceTag">提名{1 + parseInt(props.vid.split("-")[1])}</span>
            <input type="text" className="NominationInput" id={fatherElementId}
                   onCompositionEnd={searchSubjectByComp}
                   onCompositionStart={() => {
                       status = false;
                   }}
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
    const startNomination = async () => {
        if (!loaded) {
            console.log("正在加载数据，请稍候");
        } else {
            const result = await axios.post(
                'https://api.shswafu.club/v0/vote/event', null,
                {
                    params: {
                        channel: "nomination",
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
                    channel: "nomination",
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
    const NominationSubmit = () => {
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
                            channel: "nomination",
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
                        setMaleData([])
                        setFemaleData([])
                        break;
                    default:
                        setSubmitCallback(result.data.message);
                }
                setLastSubmit(currSubmit);
            } else {
                setSubmitCallback("您提名的部分角色未知，请重新填写标黄的输入框并在弹出的搜索结果中选择一个角色或清除输入框的内容。如果没有找到要提名的角色请新建角色。")
            }
        }
        return (
            <div className="NominationSubmit">
                <button className="NominationButton" onClick={submitNomination}>提交</button>
                <p>{submitCallback}</p>
            </div>)
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
            <p onClick={createSubject}>部分角色可能因为太新或太冷门而未被收录，如果您无法在搜索下拉框中找到您想要的角色，请<b>单击此处创建新角色</b>。
            </p>
            <LoginWindow hide="1"/>
            <div className="MainApp">
                <div className="NominationStart">
                    {loaded ||
                        <span style={{margin: "0 auto"}}>请完成上方的登录弹窗并按照要求验证邮箱（如有），由于直连网络波动较大，假如弹窗与开始提名按钮均未出现，可尝试特殊的上网方式。</span>}
                    {loaded && !started &&
                        <button className="NominationButton" onClick={startNomination}>开始提名</button>}
                </div>
                {started && <div className="ChnlDivision ChnlFemale">
                    <h2>萌王提名</h2>
                    {generateChildTree("fem", femaleData)}
                </div>}
                {started && <div className="ChnlDivision ChnlMale">
                    <h2>燃王提名</h2>
                    {generateChildTree("male", maleData)}
                </div>}
                {started && <NominationSubmit/>}
            </div>
        </Article>
    )
}

export default Nomination;
