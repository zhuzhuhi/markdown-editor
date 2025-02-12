import React from "react";
import MarkdownIt from "markdown-it"; // 引入 markdown-it 解析库
import '../assets/styles/_editor.scss';

// 创建 Markdown 解析器实例
const md = new MarkdownIt();

interface EditorProps {
    setHtmlString: (html: string) => void; // 定义 props，传递 Markdown 解析后的 HTML
}

const Editor: React.FC<EditorProps> = ({ setHtmlString }) => {
    return (
        <div className="editor-container">
            <h2>编辑区</h2>
            <textarea className="edit"
            placeholder="在这里输入 Markdown..."
            onChange={(e) => setHtmlString(md.render(e.target.value))} />
        </div>
    );
};

export default Editor;