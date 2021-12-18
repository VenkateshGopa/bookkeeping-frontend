import classes from './Home.module.css';
import logo from '../../logo.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router';

const Home = () =>{
    const [showmenu , setshowmenu] = useState(false);
    const [books , setbooks] = useState();
    const [profile , setprofile] = useState({});
    const navigate = useNavigate();

    useEffect( () =>{ 
        fetch();
    },[])
    const fetch = async() =>{
        const {data}= await axios.get('https://abookkeeping.herokuapp.com/books',{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        setbooks(data.length);

        const data1= await axios.get('https://abookkeeping.herokuapp.com/profile',{
            headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
            setprofile({...data1.data , logo:data1.data.firstname[0] });
    }
    const menu = () =>{
        setshowmenu( prev => !prev);
    }


    
    return (
        <div className={classes.main}>
            <div className={showmenu ? classes.left : classes.lefth}>
                <div className={classes.brandwithname}>
                  <img src={logo} alt="logo"/> 
                  <p>Book keeping</p>
                </div>
                <div className={classes.selectordiv}>
                    <p className={classes.avatar}>{profile.logo}</p>
                    <p className={classes.name}>{profile.firstname}</p>
                    <p className={classes.count}> {books} Customers</p>
                </div>

                <div className={classes.nav} onClick={() =>{navigate('/home/dashboard')}}>
                    <p><i className="fas fa-home"></i></p>
                    <p>Home</p>
                </div>
                <div className={classes.nav} onClick={() =>{navigate('/home/setting')}} >
                    <p><i className="fas fa-cog" ></i></p>
                    <p>Settings</p>
                </div>
                <div className={classes.nav} onClick={() =>{navigate('/home/about')}}>
                    <p><i className="fas fa-info-circle"></i></p>
                    <p>About</p>
                </div>
                <div className={classes.navbtn} onClick={() =>{localStorage.removeItem('loggedin') ;navigate('/login')}}>
                   <button> LogOut </button>
                </div>
            </div>
           
            <div className={classes.right}>
                <div className={classes.navbar}>
                  <p className={classes.menu} onClick={menu}> {!showmenu ? '|||' : 'X' } </p>
                  <div className={classes.profile}>
                    <p className={classes.smallavatar}>{profile.logo}</p>
                    <p className={classes.pname}>{profile.firstname}</p>
                  </div>
                </div>

                <Outlet reload={fetch}/>
            </div>
        </div>
    );
}

export default Home;