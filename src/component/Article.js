import React from "react";
import './Article.css'

function Article(props) {
    return (
        <div className="Article">
            {props.children}
        </div>
    )
}

export default Article;
