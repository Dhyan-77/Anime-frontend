import React from 'react'
import Signup from './components/Signup'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
import Post from './components/Post'
import Detail from './components/Detail'


const App = () => {
  return (
    <div className='bg-zinc-900 h-screen w-screen'>
       <Nav/>
       <Routes>
         <Route path='/' element ={<Main/>}/>
          <Route path='/signup' element ={<Signup/>}/>
           <Route path='/login' element ={<Login/>}/>
           <Route path='/create' element ={<Post/>}/>
           <Route path='/detail/:id' element = {<Detail/>}/>
       </Routes>
    </div>
  
  )
}

export default App