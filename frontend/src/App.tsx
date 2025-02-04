import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://localhost:3000/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage('API error'))
  }, [])

  return <div>Backend Status: {message}</div>
}

export default App
