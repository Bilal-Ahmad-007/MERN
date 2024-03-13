import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';




function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route  path='/Signup'  element={<Signup/>}/>
     <Route  path='/login'  element={<Login/>}/>
     <Route  path='/'  element={<Home/>}/>
     <Route  path='/dashboard'  element={<Dashboard/>}/>
     <Route  path='/forgotPassword'  element={<ForgotPassword/>}/>
     <Route  path='/resetPassword/:token'  element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
