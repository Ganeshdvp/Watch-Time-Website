import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {
  const [sidebar,setSidebar]= useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
  return (
    <main>
      <Navbar setSidebar={setSidebar} setSearchQuery={setSearchQuery} /> {/* Pass setter */}
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} searchQuery={searchQuery} />} /> {/* Pass searchQuery */}
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
    </main>
  )
}

export default App


