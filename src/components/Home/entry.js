import axios from "axios";
import { useState } from "react";
import Model from "../models/model";
import classes from './Newbook.module.css';
import errclass from '../auth/style.module.css';

const Entry = (props) =>{
    const [data, setdata] = useState({date:'' , details: '' , amount:''});
    const [err,seterr] = useState('')
    const [clicked , setclicked] = useState(false);


    const submithandler = async () =>{
        if(data.date.length===0 || data.amount.length===0 )
        {
            seterr("enter all details")
        }
        else
        try{
        setclicked(true)
        await axios.post('https://abookkeeping.herokuapp.com/newbook', {...data , type:props.type , name:props.name},{
            headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
            // console.log({...data , type:props.type , name:props.name})
            props.refresh();
            props.close();
        }
        catch(err){
            setclicked(false)
            seterr("Something went wrong while adding");
        }
        
    }
    const changehandler = ({target:{value ,name}}) =>{
        setdata( prev => ({ ...prev , [name]:value }));
    }

    return(
        <Model bname="Add" close={props.close} submit={submithandler} disabled={clicked} >
            {err && <p className={errclass.error}>{err}</p>}
            <div className={classes.form}>
            {/* <p>Add New Customer</p> */}
            <input type='number' value={data.amount} onChange={changehandler} name='amount' placeholder="Amount"/>
            <input type='details' value={data.details} onChange={changehandler} placeholder="Details" name='details'/>
            <input type='date' value={data.date} onChange={changehandler} name='date'/>
            </div>
        </Model>
    );
}
export default Entry;
