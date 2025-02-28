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

  // 设置一个布尔值用来标记当前的滚动事件是否来自于编辑区
  let isSyncingFromEditor = false
  // 设置一个布尔值用来标记当前的滚动事件是否来自于预览区
  let isSyncingFromPreview = false

  // 同步滚动：当编辑区滚动时，更新预览区的滚动
  const handleEditorScroll = () => {
    // 如果正在从预览区发起同步，就不要再重复同步了
    if(isSyncingFromPreview) return

    // 开始同步
    isSyncingFromEditor = true

    if(editorRef.current && previewRef.current) {
      const editor = editorRef.current
      const preview = previewRef.current

      // 计算编辑区的滚动比例
      const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
    
      // 根据滚动比例来更新预览区的滚动位置
      preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight)
    }

    // 同步结束，解锁
    isSyncingFromEditor = false
  }

  // 同步滚动：当预览区滚动时，更新编辑区的滚动
  const handlePreviewScroll = () => {
    // 如果正在从编辑区发起同步，就不要再重复同步了
    if(isSyncingFromEditor) return

    // 开始同步
    isSyncingFromPreview = true

    if(editorRef.current && previewRef.current) {
      const editor = editorRef.current
      const preview = previewRef.current

      // 计算预览区滚动的比例
      const scrollPercentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight)

      //根据滚动比例更新编辑区的滚动位置
      editor.scrollTop = scrollPercentage * (editor.scrollHeight - editor.clientHeight)
    }

    // 同步结束，解锁
    isSyncingFromPreview = false
  }

  return (
    <div className='container'>
      <Editor setHtmlString={setHtmlString} editorRef={editorRef} onScroll={handleEditorScroll} />
      <Preview content={htmlString} previewRef={previewRef} onScroll={handlePreviewScroll} />
    </div>
  )
}

export default App
