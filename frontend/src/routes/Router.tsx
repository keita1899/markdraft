import { Routes, Route } from 'react-router-dom'
import ChangePasswordForm from '../pages/ChangePasswordForm'
import DraftForm from '../pages/DraftForm'
import DraftIndex from '../pages/DraftIndex'
import Home from '../pages/Home'
import InternalServerError from '../pages/InternalServerError'
import NotFound from '../pages/NotFound'
import Signin from '../pages/Signin'
import Signout from '../pages/Signout'
import Signup from '../pages/Signup'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="/password/edit" element={<ChangePasswordForm />} />
      <Route path="/drafts" element={<DraftIndex />} />
      <Route path="/drafts/new" element={<DraftForm />} />
      <Route path="/drafts/:id" element={<DraftForm />} />
      <Route path="/500" element={<InternalServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
