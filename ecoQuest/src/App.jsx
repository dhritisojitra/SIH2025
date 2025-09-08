import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ForestLoader from './components/Loader'
import Cards from './components/Cards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ForestLoader/> */}
      <Cards/>
    </>
  )
}

export default App
