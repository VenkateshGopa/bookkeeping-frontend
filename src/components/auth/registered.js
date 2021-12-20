import classes from './registered.module.css';
import logo from '../../logo.png'

const Registered = () =>{
    return (
        <div className={classes.div}>
            <div className={classes.top}>
            <img src={logo} alt="logo"/>
            <div className={classes.main}>
              <p className={classes.heading}>Thank you! You're almost done</p>
              <p className={classes.points}>Please click on the activation link we sent to your mail</p>
            </div>
            </div>
            
            <div className={classes.steps}>
                <p className={classes.heading}>Your next steps</p>
                <p className={classes.points}>1. <span>Check your email:</span> Go to your inbox and open the activation email you received from us If you don't see an email from us in the next few minutes, these are the things that could have happened</p>
                <li className={classes.pointspad}>The email could have landed in your spam/junk folder Please search for an email with the subject "Activate your book keeping Account"</li>
                <li className={classes.pointspad}>You accidentally gave us annther email address </li>
                <p className={classes.points}>2. <span>Click the activation link and login</span></p>
                <p className={classes.points}>3. <span>Start using book keeping </span></p>
            </div>

        </div>
    );
}

export default Registered;
