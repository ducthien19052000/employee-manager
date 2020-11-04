import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { PrivateRoute } from './PrivateRoute';




function App() {
  return (
    
         <Router>
        <Switch>
       
        <Route path="/" exact><Login/></Route>
        <PrivateRoute path="/home"component={Home}/>
        
        </Switch>
         
      </Router>
     
    
  );
}

export default App;
