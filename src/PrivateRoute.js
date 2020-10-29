import React from 'react'
import {Route,Redirect} from 'react-router-dom'


export const PrivateRoute = ({component:Component,...rest}) => {
   
    let isLogin = localStorage.getItem('isLogin')
    return (
       <Route {...rest} render={props=>{
           if(isLogin==='true'){
               return <Component {...props}/>;
           }
           else{
               return <Redirect to="/"/>;
           }
        
       }
        
    }
        />
    )
}
