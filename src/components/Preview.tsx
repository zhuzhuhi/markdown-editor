import React, { useEffect } from "react";
import '../assets/styles/styles.scss'
import '../assets/styles/github-markdown.css'
import hljs from "highlight.js"; // 引入 highlight.js
import "highlight.js/styles/github.css"; // 代码高亮样式
import DOMPurify from "dompurify"; //引入DOMPurify

interface PreviewProps {
    content: string; // 定义props，传递HTML
    previewRef: React.RefObject<HTMLDivElement | null>
}

const Preview: React.FC<PreviewProps> = ({ content, previewRef }) => {
    useEffect(() => {
        // 让highlight.js 解析页面中的代码块
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block as HTMLElement)
        })
    }, [content]) // 当 content 变化时，执行高亮

    // 清理传入的 HTML 内容，避免 XSS 攻击
    const cleanContent = DOMPurify.sanitize(content)

    return (
        <div className="preview-container">
            <h2>预览区</h2>
            <div className="preview-content markdown-body" 
                ref={previewRef}
                dangerouslySetInnerHTML={{ __html: cleanContent }}/>
        </div>
    )
}

export default Preview;