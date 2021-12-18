import { useState } from 'react';
import classes from './successmodel.module.css';

const Successmodel = (props) =>{
    const [show, setshow] = useState(true);
    const display  = () =>{
        setshow(false)
    }
    return(
        <div className={show ? classes.div : classes.divnone}>
            <p>{props.message}</p>
            <p onClick={display}>X</p>
        </div>
    );
}

export default Successmodel;