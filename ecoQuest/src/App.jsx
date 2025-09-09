import './App.css'
import ForestLoader from './components/Loader'
import Cards from './components/Cards'
import DuolingoRoadmap from './components/test'  
import EcoNavbar from './components/NavBar'

function App() {

  return (
    <>
      <EcoNavbar/>
      <ForestLoader/>
      <Cards/>
      <DuolingoRoadmap />   {/* road-map*/}
      
    </>
  )
}

export default App
