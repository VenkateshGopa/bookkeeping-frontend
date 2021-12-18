import { useState } from 'react';
import classes from './style.module.css';
import axios from 'axios';
import logo from '../../logo.png'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Authlayout from './Authlayout';
const Register = () =>{
    const [details , setdetails] = useState({});
    const [register , setregister] = useState(null);
    const [showpass, setshowpass] = useState(false);
    const [clicked , setclicked] = useState(false);
    const navigate =useNavigate();

    const submitHandler = async(event) =>{
        event.preventDefault();
        if(!(details.password && details.email && details.firstname && details.lastname))
        {
            setregister("fill all the details")
        }
        else
        try{
        setclicked(true);
        await axios.post('https://abookkeeping.herokuapp.com/auth/register', details);
        // alert("Email with a link has been sent to your registered email address to activate your account")
        navigate('/registered')
        }
        catch(err){
          setclicked(false)
          setregister(err.response.data.error);
        }

    }
    const changeHandler = ({target:{name, value}}) =>{
        setdetails((prev) => ({...prev , [name]:value}) )
        setregister(null);
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
                <p className={classes.message}>Create a new account</p>
            </div>
            <form onSubmit={submitHandler} className={classes.form}>
                {register && <p className={classes.error}>{register}</p>}
                <div className={classes.name}>
                  <div>
                    <label>First name</label>
                    <input type="text" name='firstname' onChange={changeHandler} placeholder="firstname"/>
                  </div>
                  <div>
                    <label>Last name</label>
                    <input type="text" name='lastname' onChange={changeHandler} placeholder="lastname"/>
                  </div>
                </div>
                <label>Email</label>
                <input type="text" name='email' onChange={changeHandler} placeholder="Email"/>
                <label>Password</label>
                <input type={showpass ? "text":"password"} name='password' onChange={changeHandler} placeholder="Password"/>
                <div className={classes.checkbox}><input type='checkbox' onChange={changeHandlerc}/><span>show password</span></div>
                <button disabled={clicked} >Create account</button>
            </form>
            <div>
                <p className={classes.bottom}>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
      </Authlayout>
    );
}

export default Register;