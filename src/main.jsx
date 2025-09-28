import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Landing  from './Landing.jsx'
import Question from './Question.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path = "/Questions" element = {<Question/>} />
  </Routes> 
    </BrowserRouter>
  </StrictMode>,
)
