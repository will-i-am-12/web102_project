import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import NotFound from './routes/NotFound.jsx'
import CreatePost from './pages/CreatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import Edit from './pages/Edit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Layout/>}>
          <Route index element={<App/>}/>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path = "edit/:id" element={<Edit/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
