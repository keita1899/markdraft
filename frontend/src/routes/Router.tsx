import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import InternalServerError from '../pages/InternalServerError'
import NotFound from '../pages/NotFound'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/500" element={<InternalServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
