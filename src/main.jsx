import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Landing  from './Landing.jsx'
import Question from './Question.jsx'
import Result from './Result.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing />} />
    {/* tid-type id qid - question id */}
    <Route path = "/Questions/:tid/:qid" element = {<Question/>} />
    <Route path = "/Results" element = {<Result/>} />
  </Routes> 
    </BrowserRouter>
  </StrictMode>,
)
