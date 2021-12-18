import classes from './style.module.css';
import axios from 'axios';
import logo from '../../logo.png'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Forgotpassword = () =>{
    const [details , setdetails] = useState({});
    const [error , seteror] = useState(null);
    const navigate = useNavigate();
    const [clicked , setclicked] = useState(false);
    const submitHandler = async(event) =>{
        const date = new Date();
        event.preventDefault();
        if(!(details.email))
        {
            seteror("fill all the details")
        }
        else
        try{
        setclicked(true)
        await axios.post('https://abookkeeping.herokuapp.com/auth/forgotpassword', {...details , time:date.getTime()});
        navigate('/login')
        }
        catch(err){
            setclicked(false)
            seteror(err.response.data.error);
        }

    }
    const changeHandler = ({target:{name, value}}) =>{
        setdetails((prev) => ({...prev , [name]:value}) )
        seteror(null);
    }
    return(
    <>
    <div className={classes.div}>
        <div className={classes.maindiv}>
            <div>
                <div className={classes.brandwithname}>
                  <img src={logo} alt="logo"/> 
                  <p>Book keeping</p>
                </div>
                <p className={classes.message}>Forgot Password</p>
                <p className={classes.fpmessage}>Enter your email address below and we'll send you a link to reset your password.</p>
            </div>
            <div>
              {error && <p className={classes.error}>{error}</p>}
              <form onSubmit={submitHandler} className={classes.form}>
              <label>Email</label>
              <input type="text" name='email' onChange={changeHandler} placeholder="Email"/>
              <button disabled={clicked} >Send email</button>
              </form>
            </div>
            <div>
                <p className={classes.bottom}>Don’t have a Book keeping account yet? <Link to='/signup'>Get started</Link></p>
                <p className={classes.bottom}> Already have an account? <Link to='/login'>Click here</Link></p>
            </div>
        </div>
      </div>
      
    </>

    );
}
export default Forgotpassword;