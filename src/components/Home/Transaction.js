import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from 'react-router' 
import classes from "./Home.module.css";
import clas from "./Transaction.module.css";
import bal from '../../bal.svg';
import Entry from "./entry";
const Transaction = () =>{
    const [books , setbooks] = useState([]);
    const [trans, settrans] =useState([]);
    const [form , setform] = useState({got:false , give:false});
    const params = useParams();
    useEffect( () =>{
        const fetch = async() =>{
            const {data}= await axios.get('https://abookkeeping.herokuapp.com/books',{
            headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
            const data1 =data.find( ele => (ele._id).toString() === params.id)
            setbooks({...data1 , logo:data1.name[0].toUpperCase(), number:data1.trans.length});
            settrans(data1.trans)
        }
        fetch();
    },[ params.id]);
    const fetch = async() =>{
        const {data}= await axios.get('https://abookkeeping.herokuapp.com/books',{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        const data1 =data.find( ele => (ele._id).toString() === params.id)
        setbooks({...data1 , logo:data1.name[0].toUpperCase(), number:data1.trans.length});
        settrans(data1.trans)
    }
    const close = () =>{
        setform({got:false , give:false});
    }
    const deletedata = async () =>{
        console.log(books , params.id)
        await axios.get(`http://localhost:3001/delete/${params.id}`,{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        navigate('/home/dashboard')
      }
    
return(
    <div className={classes.rightbottom}>
        {form.got && <Entry close={close} name={books.name} type='got' refresh={fetch}/>}
        {form.give && <Entry close={close} name={books.name} type='give'  refresh={fetch}/>}
        {console.log(books)}
        <div className={clas.topbar}>
          <div className={clas.profile}>
            <p className={clas.logo}>{books.logo}</p>
            <p className={clas.name}>{books.name}</p>
          </div>
          <div className={classes.card}>
          <img src={bal} alt="bal" />
          <div>
            <p className={classes.muted}>{books.transaction}</p>
            <p className={books.bal < 0 ? classes.neg : classes.pos }>₹ {books.bal < 0 ? -(books.bal) : books.bal}</p>
          </div>
        </div>
        </div>
         <button className={classes.deletebtn} onClick={deletedata}>Delete data</button>
        <div className={clas.buttondiv}>
            <p className={clas.message}>Transactions({books.number} Transactions)</p>
            <div className={clas.buttons}>
                <button className={clas.redbtn} onClick={() =>{setform({got:false, give:true})} }>You Give</button>
                <button className={clas.greenbtn} onClick={() =>{setform({got:true, give:false})} }>You Got</button>
            </div>
        </div>

        <div className={clas.trans}>
            {console.log(form)}
            {trans.map(ele =>
            <div key={ele._id} className={clas.back}>
                <p>{ele.date}</p>
                <p className={ele.type=== "got" ? classes.green : classes.red}>{ele.type === "got" ? <i className="fas fa-arrow-down">You got</i>  : <i className="fas fa-arrow-up">You Give</i> } </p>
                <p className={ele.type === "got" ? classes.greenbal : classes.redbal}>₹ {ele.amount <0 ? -(ele.amount) : ele.amount}</p>
            </div> )}
            
        </div>
    </div>
);
}
export default Transaction;
