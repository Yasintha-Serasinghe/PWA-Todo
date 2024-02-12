import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Banner from './components/banner';

function App() {
  

  return (
    <Router className=' bg-[#F9F9F9]'>
    

    {/* <marquee>
      <Banner/>
    </marquee> */}
    
    

    <Routes>
        <Route path="/sign" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </Router>
  )
}

export default App
