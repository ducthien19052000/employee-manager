import React from 'react';
import Home from './components/Home';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { PrivateRoute } from './PrivateRoute';




function App() {
  return (
    
         <HashRouter>
        <Switch>
       
        <Route path="/" ><Login/></Route>
        <PrivateRoute path="/home"component={Home}/>
        
        </Switch>
         
      </HashRouter>
     
    
  );
}

export default App;
