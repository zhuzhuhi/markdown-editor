import React from "react";
import MarkdownIt from "markdown-it"; // 引入 markdown-it 解析库
import hljs from "highlight.js"; // 引入 highlight.js 代码高亮库
import "highlight.js/styles/github.css"; // 引入 GitHub 代码高亮样式
import '../assets/styles/_editor.scss';

// 创建 Markdown 解析器实例, 并添加代码高亮
const md = new MarkdownIt({
    highlight: function(str: string, lang: string | undefined): string {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch {
                //
            }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
});

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