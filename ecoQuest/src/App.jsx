import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ForestLoader from './components/Loader'
import Cards from './components/Cards'
import DuolingoRoadmap from './test'  

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ForestLoader/> */}
      <Cards/>
      <DuolingoRoadmap />   {/* road-map*/}
    </>
  )
}

export default App
