import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RecipeDetail from './Components/RecipeDetail.jsx'
import NotFound from './routes/NotFound.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Layout/>}>
          <Route index element={<App/>}/>
          <Route path="recipe/:id" element={<RecipeDetail/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
