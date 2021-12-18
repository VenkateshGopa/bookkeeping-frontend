import classes from '../auth/style.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import logo from '../../logo.png';
import clas from "./Home.module.css";

const Changepassword = () =>{
    const [details , setdetails] = useState({});
    const [error , seteror] = useState(null);
    const [showpass, setshowpass] = useState(false);
    const [clicked , setclicked] = useState(false);
    const [show ,setshow] = useState(false);
    const navigate = useNavigate();


    const submitHandler = async(event) =>{
        event.preventDefault();
        if(!(details.password && details.password1))
        {
            seteror("fill all the details")
        }
        else if(details.password !== details.password1){
            seteror("Passwords not matched")
        }
        else
        try{
        setclicked(true)
        await axios.post('https://abookkeeping.herokuapp.com/changepassword', {password:details.password},{
            headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        alert('password changed')
        navigate('/home/dashboard')
        }
        catch(err){
            setclicked(false)
            seteror(err.response.data.error);
        }

    }
    const changeHandlerc = () =>{
        setshowpass(prev => !prev);
    }

    const changeHandler = ({target:{name, value}}) =>{
        setdetails((prev) => ({...prev , [name]:value}) )
        seteror(null);
    }

    const changepass = () =>{
        setshow(true);
    }
    return(
    <div className={clas.rightbottom}>
    <button className={clas.btn} onClick={changepass}> Change Password</button>
    {show && <div className={classes.div}>
        <div className={classes.maindiv}>
            <div>
               <div className={classes.brandwithname}>
                  <img src={logo} alt="logo"/> 
                  <p>Book keeping</p>
                </div>
                <p className={classes.message}>Change Password</p>
            </div>
            <div>
              {error && <p className={classes.error}>{error}</p>}
              <form onSubmit={submitHandler} className={classes.form}>
              <label>Password</label>
              <input type={showpass ? "text":"password"} name='password' onChange={changeHandler} placeholder="Password"/>
              <label>Conform Password</label>
              <input type={showpass ? "text":"password"} name='password1' onChange={changeHandler} placeholder="Conform Password"/>
              <div className={classes.checkbox}><input type='checkbox' onChange={changeHandlerc}/><span>show password</span></div>
              <button disabled={clicked} className={classes.padding}>Reset password</button>
              </form>
            </div>
        </div>
      </div>}
    </div>);
}

export default Changepassword;