import React from 'react';
import './App.css';
import './style/main.css'
import Kalkulator from './component/kalkulator'
import Admin from './component/admin'
import Home from './component/home'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

class App extends React.Component{
  render(){
      return (
      
          <BrowserRouter>
          <Route
              exact
              path="/"
              render={() => {
                  return (
                    <Redirect to="/home"/>
                  )
              }}
            />
            <Route path="/home" component={Home}/>
            <Route path="/kalkulator" component={Kalkulator}/>
            <Route path="/admin" component={Admin}/>
          </BrowserRouter>
      )
  }
}

export default App;
