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
import Privateroute from './components/Privateroute';
import Publicroute from './components/Publicroute';

function App() {
  return (
    <div>
      <Routes>
        {/* --------------Public routes----------------- */}
        <Route path='/' element={<Publicroute><Navigate replace to='/login'/></Publicroute>} />
        <Route path='/login' element={<Publicroute><Login/></Publicroute>} />
        <Route path='/signup' element={<Publicroute><Register/></Publicroute>} />
        <Route path='/registered' element={<Publicroute><Registered/></Publicroute>}/>
        <Route path='/active/:id' element={<Publicroute><Activate/></Publicroute>}/>
        <Route path='/forgotpassword' element={<Publicroute><Forgotpassword/></Publicroute>} />
        <Route path='/:id/:code' element={<Publicroute><Resetpassord/></Publicroute>}/>
        {/* -------------------Private routes------------------- */}
        <Route path='/home/*' element={<Privateroute><Home/></Privateroute>}>
          <Route path='dashboard' element={<Privateroute><Nhome/></Privateroute>} />
          <Route path=':id' element={<Privateroute><Transaction/></Privateroute>} />
          <Route path='about' element={<Privateroute><About/></Privateroute>} />
          <Route path='setting' element={<Privateroute><Changepassword/></Privateroute>} />
        </Route> 
        <Route path = '*' element={<Publicroute><Navigate replace to='/login'/></Publicroute>} />
      </Routes>
    </div>
  );
}

export default App;
