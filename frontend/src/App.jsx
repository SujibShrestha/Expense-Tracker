import Login from './pages/Login'
import { Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Register from './pages/Register'

function App() {


  return (
    <><div className="w-full h-[100vh] flex justify-center items-center ">
    
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
      </div>
   
    </>
  )
}

export default App
