import classes from './model.module.css';
import logo from '../../logo.png'

const Model = (props) =>{
    return(
    <>
      <div className={classes.backdrop} onClick={props.close}></div>
      <div className={classes.model} >
        <div className={classes.close}>
            <p onClick={props.close}>X</p>
        </div>
        <div className={classes.brandwithname}>
          <img src={logo} alt="logo"/> 
          <p>Book keeping</p>
        </div>
        {props.children}
        <button disabled={props.disabled} onClick={props.submit}>{props.bname}</button>
      </div>
    </>
    );
}

export default Model;
