import React from 'react'
import './index.css'
import { Button, Layout } from 'antd';
import { useAuth0 } from '@auth0/auth0-react'
import {useHistory} from "react-router"

const { Header, Content } = Layout;

export default function Login() {
   const { loginWithRedirect,isAuthenticated,user} = useAuth0();

  let history = useHistory();
    const loginWithRedirec=()=>{
      loginWithRedirect();
     
      
    }

    if(isAuthenticated){
      localStorage.setItem('isLogin',isAuthenticated)
      localStorage.setItem('isUser',JSON.stringify(user))
      history.push("/home")
    }
    return (
        <Layout>
        <Header></Header>
        <Content className="main-login">
        
      
        <Button className="ml-4 mt-2" type="primary" onClick={() => loginWithRedirec()}>
                Login
                </Button>
           
           
      </Content>
        
      </Layout>
    )
}
