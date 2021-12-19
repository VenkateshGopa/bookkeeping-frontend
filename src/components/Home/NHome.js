import uwillget from "../../youWillGet.svg";
import uwillpay from "../../youWillGive.svg";
import netball from "../../NetBalance.svg";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import Newbook from "./Newbook";
import axios from "axios";
import { useNavigate } from "react-router";

const Nhome = () => {
    const [newbook , setnewbook] = useState(false);
    const [book , setbooks] = useState([]);
    const [dashboard , setdashboard] = useState({});

    const navigate = useNavigate();
    useEffect( () =>{
        fetch();
    },[])
    const fetch = async() =>{
      const {data}= await axios.get('https://abookkeeping.herokuapp.com/books',{
      headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
      let give = 0 , got = 0 
      for( let i=0; i<data.length ; i++){
          if(data[i].transaction === "You'll Get")
          {
              got = got +data[i].bal
          }
          else{
              give = give +data[i].bal
          }
      }
      setbooks(data);
      setdashboard({got, give, total:got+give})
      console.log(data , give , got,  give+got)
  }
    const redirect = (props) =>{
        navigate(`/home/${props._id}`)
    }
    const deletedata = async (props) =>{
      confirm("Do you want to delete ?");
      await axios.get(`http://localhost:3001/delete/${props}`,{
      headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
      fetch();
    }
    const shownew = () =>{
        setnewbook(prev => !prev);
    }

  return (
    <div className={classes.rightbottom}>
    {newbook && <Newbook onClick={shownew} refresh={fetch}/>}
      <div className={classes.cards}>

        <div className={classes.card}>
          <img src={netball} alt="netpay" />
          <div>
            <p className={classes.muted}>Net Balance</p>
            <p className={dashboard.total < 0 ? classes.neg : classes.pos }>₹ {dashboard.total < 0 ? -(dashboard.total) : dashboard.total}</p>
          </div>
        </div>

        <div className={classes.card}>
          <img src={uwillget} alt="netpay" />
          <div>
            <p className={classes.muted}>You'll Get</p>
            <p className={classes.amount}>₹ {dashboard.got < 0 ? -(dashboard.got) : dashboard.got}</p>
          </div>
        </div>

        <div className={classes.card}>
          <img src={uwillpay} alt="netpay" />
          <div>
            <p className={classes.muted}>You'll Give</p>
            <p className={classes.amount}>₹ {dashboard.give < 0 ? -(dashboard.give) : dashboard.give}</p>
          </div>
        </div>
      </div>

      <div className={classes.customernum}>
        <p>Customers List <span>({book.length} Customers)</span></p>
        <button onClick={shownew}> + ADD CUSTOMER</button>
      </div>

      <div className={classes.customerlist}>
          <table width="100%">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Transaction Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              
              <tbody>
                  {book.map(ele => <>
                <tr key={ele._id} >
                  <td onClick={() =>(redirect(ele))}>
                    <div className={classes.profilec}>
                    <p className={classes.smallavatarc}>{ele.name[0].toUpperCase()}</p>
                    <p className={classes.cname}>{ele.name}</p>
                  </div></td>
                <td onClick={() =>(redirect(ele))} className={ele.transaction === "You'll Get" ? classes.red : classes.green}>{ele.transaction === "You'll Get" ? <i className="fas fa-arrow-down">You'll Get</i>  : <i className="fas fa-arrow-up">You'll Give</i> } </td>
                <td onClick={() =>(redirect(ele))} className={ele.transaction === "You'll Get" ? classes.redbal : classes.greenbal}>₹ {ele.bal <0 ? -(ele.bal) : ele.bal}</td>
                <td><button onClick={() =>(deletedata(ele._id))}>Delete</button></td>
                </tr>
                </>
                )}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default Nhome;
