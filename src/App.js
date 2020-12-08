import React, { Fragment } from 'react';
import './App.css';
import './style/main.css'
import Kalkulator from './component/kalkulator'
import Admin from './component/admin'
import Home from './component/home'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import { getCookieUserType } from './function/function';
import {homepage} from '../package.json'

class App extends React.Component{
  render(){
      // console.log(window.location.pathname)
      // console.log(homepage+"/admin")
      // console.log(window.location.href)
      // console.log("---------------------------")
      return (
          <Fragment>
            {
                (getCookieUserType() == "")
                ?
                  (window.location.pathname != "/admin")
                  ?
                    <BrowserRouter basename={homepage}>
                      <Redirect to="/home"/>
                      <Route path="/home" component={Home}/>
                    </BrowserRouter>
                  :
                    <BrowserRouter basename={homepage}>
                      <Route path="/admin" component={Admin}/>
                    </BrowserRouter>
                :
                  <BrowserRouter basename={homepage}>
                    {
                      (window.location.pathname != "/admin")
                      ?
                        <Redirect to="/kalkulator"/>
                      : ""
                    }
                    
                    <Route path="/home" component={Home}/>
                    <Route path="/kalkulator" component={Kalkulator}/>
                    <Route path="/admin" component={Admin}/>
                  </BrowserRouter>
            } 
          </Fragment>
      )
  }
}

export default App;
