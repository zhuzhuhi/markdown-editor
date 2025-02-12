import React from "react";
import '../assets/styles/styles.scss'
import '../assets/styles/github-markdown.css'

interface PreviewProps {
    content: string; // 定义props，传递HTML
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
    return (
        <div className="preview-container">
            <h2>预览区</h2>
            <div className="preview-content markdown-body" dangerouslySetInnerHTML={{ __html: content }}/>
        </div>
    )
}

export default Preview;