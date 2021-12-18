import { Navigate, Route, Routes } from 'react-router';
import Activate from './components/auth/Activate';
import Forgotpassword from './components/auth/Forgotpassword';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Registered from './components/auth/registered';
import Resetpassord from './components/auth/Resetpassword';
import About from './components/Home/about';
import Changepassword from './components/Home/changepassword';
import Home from './components/Home/Home';
import Nhome from './components/Home/NHome';
import Transaction from './components/Home/Transaction';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login'/>} >
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Register/>} />
        <Route path='/registered' element={<Registered/>}/>
        <Route path='/active/:id' element={<Activate/>}/>
        <Route path='/forgotpassword' element={<Forgotpassword/>} />
        <Route path='/:id/:code' element={<Resetpassord/>}/>
        <Route path='/home/*' element={<Home/>}>
          <Route path='dashboard' element={<Nhome/>} />
          <Route path=':id' element={<Transaction/>} />
          <Route path='about' element={<About/>} />
          <Route path='setting' element={<Changepassword/>} />
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
