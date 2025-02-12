import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Editor from './components/Editor'
import Preview from './components/Preview'
import './assets/styles/styles.scss'

const App: React.FC = () => {
  // 定义 state， 存储 Markdown 解析后的 HTML
  const [htmlString, setHtmlString] = useState("");

  return (
    <div className='container'>
      <Editor setHtmlString={setHtmlString} />
      <Preview content={htmlString} />
    </div>
  )
}

export default App
