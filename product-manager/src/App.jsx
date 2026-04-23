import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="underline text-3xl font-bold">
        <p>Hello, Vite + React!</p>
      </div>
    </>
  )
}

export default App
