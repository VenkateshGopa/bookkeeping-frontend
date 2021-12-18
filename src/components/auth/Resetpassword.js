import classes from './style.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import logo from '../../logo.png'

const Resetpassord = () =>{
    const [details , setdetails] = useState({});
    const [error , seteror] = useState(null);
    const [showpass, setshowpass] = useState(false);
    const [loding ,  setloding] = useState(true);
    const [valid ,setvalid] =useState(null);
    const [clicked , setclicked] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() =>{
        const date = window.Date.now()
        setloding(true)
        const fetch = async() => {
        try{
            await axios.post(`https://abookkeeping.herokuapp.com/auth/linkvalid`, {id:params.id , code: params.code, time:date});
            setvalid(null)
            setloding(false)
        }
        catch(error){
            setvalid(error.response.data.message)
            setloding(false)
        }
    }
    fetch()
    },[params.id , params.code])

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
        await axios.post('http://localhost:3001/auth/Newpassword', {password:details.password , id: params.id });
        navigate('/login')
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
    return(
    <>
    {loding && <p className={classes.center}>...loading</p>}
    {!loding && ( valid!==null ? (<div className={classes.resetdiv}><p className={classes.label}>{valid}</p> <button onClick={() =>{navigate('/forgotpassword')}}>Resend Link</button> </div>) :(
    <div className={classes.div}>
        <div className={classes.maindiv}>
            <div>
               <div className={classes.brandwithname}>
                  <img src={logo} alt="logo"/> 
                  <p>Book keeping</p>
                </div>
                <p className={classes.message}>Reset Password</p>
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
      </div>))}
    </>);
}

export default Resetpassord;