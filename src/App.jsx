import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './page/Home'
import Layaut from './layaut/Layaut'
import FullHome from './page/FullHome'
function App() {
  return (
    <div>
      <Layaut >
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/full' element={<FullHome/>}> </Route>
        
      </Routes>
      </Layaut>
    </div>
  )
}

export default App