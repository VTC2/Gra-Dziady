import { useState } from 'react'
import './App.css'
import Gra from './gra.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>gra</h1>
      <main><Gra></Gra></main>
      
      
    </>
  )
}

export default App
