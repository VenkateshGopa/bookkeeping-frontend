import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import logo from '../../logo.png'
import classes from './style.module.css';
import axios from 'axios';
import Authlayout from './Authlayout';
const Login = () =>{
    const [details , setdetails] = useState({});
    const [showpass, setshowpass] = useState(false);
    const [login , setlogin] = useState(null);
    const [clicked , setclicked] = useState(false);
    const navigation = useNavigate();
    const submitHandler = async (event) =>{
        event.preventDefault();
        if(!(details.password && details.email))
        {
            setlogin("Enter email and password")
        }
        else
        try{
        setclicked(true);
        const data = await axios.post('https://abookkeeping.herokuapp.com/auth/login', details);
        localStorage.setItem("loggedin", data.data.token)
        navigation('/home/dashboard')
        }
        catch(err){
            setclicked(false)
            setlogin(err.response.data.error);
        }
    }
    const changeHandler = ({target:{name, value}}) =>{
        setdetails((prev) => ({...prev , [name]:value}))
        setlogin(null);
    }

    const changeHandlerc = () =>{
           setshowpass(prev => !prev);
    }
    return(
      <Authlayout className={classes.div}>
       
        <div className={classes.maindiv}>
            <div>
                <div className={classes.brandwithname}>
                  <img src={logo} alt="logo"/> 
                  <p>Book keeping</p>
                </div>
                <p className={classes.message}>Login to your account</p>
            </div>
            <div>
                {login && <p className={classes.error}>{login}</p>}
                <form onSubmit={submitHandler} className={classes.form}>
                    <label>Email</label>
                    <input type="text" name='email' onChange={changeHandler} placeholder="Email"/>
                    <label>Password</label>
                    <input type={showpass ? "text":"password"} name='password' onChange={changeHandler} placeholder="Password"/>
                    <div className={classes.checkbox}><input type='checkbox' onChange={changeHandlerc}/><span>show password</span></div>
                    <button disabled={clicked}>Login</button>
                </form>
            </div>
            <div>
                <p className={classes.bottom}>Don’t have a Book keeping account yet? <Link to='/signup'>Get started</Link></p>
                <p className={classes.bottom}> forgot your password? <Link to='/forgotpassword'>Click here</Link></p>
            </div>
        </div>
      </Authlayout>
    );
}

export default Login;