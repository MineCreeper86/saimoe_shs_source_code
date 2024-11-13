import React from "react";
import './Article.css'

function Article(props) {
    return (
        <div className="Article">
            <h2>服务器刚刚完成数据库重构，目前处于测试阶段，出现一切问题可联系微信：mofashiqiyao，或在年级群反馈。</h2>
            {props.children}
        </div>
    )
}

export default Article;