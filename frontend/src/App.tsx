import { useEffect, useState } from 'react'
import Router from './routes/Router'

const App = () => {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://localhost:3000/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage('API error'))
  }, [])

  return (
    <>
      Backend Status: {message}
      <Router />
    </>
  )
}

export default App
