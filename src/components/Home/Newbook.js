import axios from "axios";
import { useState } from "react";
import Model from "../models/model";
import classes from './Newbook.module.css';
import errclass from '../auth/style.module.css';

const Newbook = (props) =>{
    const [data, setdata] = useState({name: '' , date:'' , details: '' , amount:'' , type:'give'});
    const [err,seterr] = useState('')
    const submithandler = async () =>{
        if(data.name.length === 0 || data.date.length===0 || data.amount.length===0 )
        {
            seterr("enter all details")
        }
        else
        try{
        await axios.post('https://abookkeeping.herokuapp.com/newbook', {...data},{
            headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
            console.log(data)
            props.refresh();
            props.onClick();
        }
        catch(err){
            seterr("Something went wrong while adding");
        }
        
    }
    const changehandler = ({target:{value ,name}}) =>{
        setdata( prev => ({ ...prev , [name]:value }));
    }
    const changehandlerc = ({target:{ value , checked , name}}) =>{
        if(checked){
        setdata((prev) => ({...prev , [name]:value }))
        }
    }
    return(
        <Model bname="Get Started" close={props.onClick} submit={submithandler}>
            {err && <p className={errclass.error}>{err}</p>}
            <div className={classes.form}>
            <p>Add New Customer</p>
            <input type='text' value={data.name} onChange={changehandler} placeholder="Name" name='name'/>
            <input type='details' value={data.details} onChange={changehandler} placeholder="Details" name='details'/>
            <div className={classes.sel}>
              <input type='radio' name='type' value='give' onChange={changehandlerc} checked />
              <label>You Give</label>
            </div>
            <div className={classes.sel}>
               <input type='radio' name='type' value='got' onChange={changehandlerc} />
               <label>You Got</label>
            </div>
            <input type='number' value={data.amount} onChange={changehandler} name='amount' placeholder="Amount"/>
            <input type='date' value={data.date} onChange={changehandler} name='date'/>
            </div>
        </Model>
    );
}
export default Newbook;