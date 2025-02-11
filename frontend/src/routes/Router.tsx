import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import InternalServerError from '../pages/InternalServerError'
import NotFound from '../pages/NotFound'
import Signin from '../pages/Signin'
import Signout from '../pages/Signout'
import Signup from '../pages/Signup'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="/500" element={<InternalServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
