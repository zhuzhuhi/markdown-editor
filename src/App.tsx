import React, { useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Editor from './components/Editor'
import Preview from './components/Preview'
import './assets/styles/styles.scss'

const App: React.FC = () => {
  // 定义 state， 存储 Markdown 解析后的 HTML
  const [htmlString, setHtmlString] = useState("");

  const editorRef = useRef<HTMLTextAreaElement | null>(null) // 编辑区的ref
  const previewRef = useRef<HTMLDivElement | null>(null) // 预览区的ref

  // 同步滚动：当编辑区滚动时，更新预览区的滚动
  const handleEditorScroll = () => {
    if(editorRef.current && previewRef.current) {
      const editor = editorRef.current
      const preview = previewRef.current

      // 计算编辑区的滚动比例
      const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
    
      // 根据滚动比例来更新预览区的滚动位置
      preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight)
    }

  }

  return (
    <div className='container'>
      <Editor setHtmlString={setHtmlString} editorRef={editorRef} onScroll={handleEditorScroll} />
      <Preview content={htmlString} previewRef={previewRef} />
    </div>
  )
}

export default App
