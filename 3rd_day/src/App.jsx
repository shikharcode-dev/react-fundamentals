import { useState } from 'react'
import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const App = () => {

  let [count, setCount] = useState(0)
  return (
    <div>
      <h1>Count is - {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}
export default App
