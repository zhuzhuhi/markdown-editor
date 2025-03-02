import React, { useEffect, useRef } from "react";
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
    editorRef: React.RefObject<HTMLTextAreaElement | null> // 引用编辑区
    onScroll: () => void // 处理滚动事件的函数
}

const Editor: React.FC<EditorProps> = ({ setHtmlString, editorRef, onScroll }) => {
    // 用一个ref来标记当前滚动是否由用户主动触发
    const isUserScrolling = useRef(false)

    // 当 <textarea> 绑定到 DOM 后，监听 wheel 事件，表示用户主动滚轮滚动
    useEffect(() => {
        const el = editorRef.current
        if(!el) return

        const handleWheel = () => {
            isUserScrolling.current = true
        }

        el.addEventListener('wheel', handleWheel)

        return() => {
            el.removeEventListener('wheel', handleWheel)
        }
    }, [editorRef])

    // 文本内容变化时（onChange），表示是输入导致的高度变动，不做同步
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        isUserScrolling.current = false // 输入发生后，暂时禁用滚动同步
        setHtmlString(md.render(e.target.value))
    }

    const handleScroll = () => {
        if(!isUserScrolling.current) return
        onScroll()
    }

    return (
        <div className="editor-container">
            <h2>编辑区</h2>
            <textarea className="edit"
            placeholder="在这里输入 Markdown..."
            ref={editorRef}
            onChange={handleChange}
            onScroll={handleScroll} />
        </div>
    );
};

export default Editor;