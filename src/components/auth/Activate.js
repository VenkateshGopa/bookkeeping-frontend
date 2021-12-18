import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import logo from '../../logo.png'
import classes from './Activate.module.css';
const Activate = ( ) =>{

    const [active, setactive] = useState();
    const [loading , setloading] = useState();
    const navigate = useNavigate();
    const params = useParams();

    useEffect( ()=>{
    setloading(true)
        const fetch = async() => {
        try{
            await axios.post(`https://abookkeeping.herokuapp.com/auth/activation`, {id:params.id });
            setactive("Thank you! your book keeping account is 'Activated' click here to login")
            setloading(false)
        }
        catch(error){
            setactive(error.response.data.error)
            setloading(false)
        }
    }
    fetch()
    },[params.id , params.code])

    const login = () =>{
        navigate('/login');
    }
    return(
        <div className={classes.topdiv}>
            {loading && <p className={classes.center}>loading...</p>}
            {!loading && 
            (<div className={classes.div}>
                <img src={logo} alt="logo" />
                <div className={classes.message}>
                  <p>{active}</p>
                  <button onClick={login}>Login</button>
                </div>
            </div>)}
        </div>
    )
}
export default Activate;