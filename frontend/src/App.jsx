import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewUsers from './Components/ViewUsers'
import AddUsers from './Components/AddUsers'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ViewUsers />} />
         <Route path='/add' element={<AddUsers/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
