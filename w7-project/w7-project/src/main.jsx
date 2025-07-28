import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './routes/Layout.jsx'
import NotFound from './routes/NotFound.jsx'
import Create from './pages/Create.jsx'
import Detail from './pages/Detail.jsx'
import Edit from './pages/Edit.jsx'
import Gallery from './pages/Gallery.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Layout/>}>
          <Route index element={<App/>}/>
          <Route path="create" element={<Create />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path = "edit/:id" element={<Edit/>}/>
          <Route path="crewmate/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
