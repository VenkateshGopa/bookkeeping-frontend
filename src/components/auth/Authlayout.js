import classes from './Authlayout.module.css';
import logo from '../../logo.png';
import img from '../../authimg1.png';
import { useNavigate } from 'react-router';
const Authlayout = (props) => {
    const navigate = useNavigate();
    const redirect = () =>{
        navigate('/login');
    }
    return (
        <div className={classes.authlogin}>
            <div className={classes.branding}>
                <div className={classes.brandwithname}>
                  <img onClick={redirect} src={logo} alt="logo"/> 
                  <p onClick={redirect}>Book keeping</p>
                </div>
                <div className={classes.img}>
                  <img src={img} alt='img'/>
                </div>
            </div>
            <div className={`${props.className} ${classes.form}` }>{props.children}</div>
        </div>
    );
}

export default Authlayout;