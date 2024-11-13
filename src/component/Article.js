import React from "react";
import './Article.css'

function Article(props) {
    return (
        <div className="Article">
            <h1 style={{color:"red"}}>服务器正在进行数据库重构测试，预计21:00完成。请同学们不要摸鱼，认真完成晚自习再来。</h1>
            {props.children}
        </div>
    )
}

export default Article;