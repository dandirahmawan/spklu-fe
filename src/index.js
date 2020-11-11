import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import {environment} from './const/environment';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import { reducer } from './redux/reducer';
import { getCookieToken } from './function/function';

/*set default / interceptor request*/
axios.defaults.baseURL = environment.baseUrl;
axios.defaults.headers.common['token'] = getCookieToken();
let store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
