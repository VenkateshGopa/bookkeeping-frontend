import { Navigate } from "react-router";

const Publicroute = (props) =>{
    const token = localStorage.getItem('loggedin');
    if(token){
        return <Navigate to='/home/dashboard'/>
    }
    else{
        return props.children;
    }
}
export default Publicroute;