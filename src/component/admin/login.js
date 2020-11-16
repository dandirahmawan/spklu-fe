import axios from 'axios'
import React, { Component, createRef, Fragment } from 'react'
import BpptLogo from '../../image/Logo_BPPT.png'
import Alert from '../kalkulator/alert'
import reactCookies from 'react-cookies'

class login extends Component{

    constructor(props){
        super()
        this.state = {
            alertBase: ""
        }

        this.inputUserName = createRef()
        this.inputPassword = createRef()
        this.submit = this.submit.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
    }

    submit(){
        let userName = this.inputUserName.current.value
        let password = this.inputPassword.current.value
        
        if(userName == 0 || password == 0){
            this.setState({
                alertBase: <Alert okAlert={this.hideAlert} 
                                alertDescription={"Pastikan anda mengisi data <span class='bold'>username</span><br/>dan <span class='bold'>password</span>"}/>
            })
        }else{
            let jo = {}
            jo.username = userName
            jo.password = password
            axios.post("/api/user", jo).then(res => {
                let data = res.data.data
                reactCookies.save('username_tecs', data.username, {path: '/'})
                reactCookies.save('token_tecs', data.token, {path: '/'})
                reactCookies.save('email_tecs', data.email, {path: '/'})
                window.location.reload()
            }).catch(res => {
                if(res.response !== undefined){
                    let hd = res.response
                    if(hd.status == 400){
                        this.setState({
                            alertBase: <Alert okAlert={this.hideAlert} 
                                            alertDescription={"Username atau kata sandi yang anda masukan salah"}/>
                        })
                    }
                }
            })
        }
    }

    hideAlert(){
        this.setState({
            alertBase: ""
        })
    }

    render(){
        return(
            <Fragment>
                {this.state.alertBase}
                <div style={{margin: "auto", width: "250px", marginTop: "100px"}}>
                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                        <img src={BpptLogo} style={{width: "75px"}}/>
                    </div>
                    <h2 className="bold" style={{textAlign: "center"}}>Silahkan Masuk</h2>
                    <br/>
                    <div>
                        <div style={{marginBottom: "5px"}}>
                            <input ref={this.inputUserName} type="text" 
                                style={{width: "100%", border: "1px solid #bbb", borderRadius: "0px", padding: "8px", boxSizing: "border-box"}} 
                                placeholder="username"/>
                        </div>
                        <div>
                            <input ref={this.inputPassword} 
                                type="password" 
                                style={{width: "100%", border: "1px solid #bbb", borderRadius: "0px", padding: "8px", boxSizing: "border-box"}} 
                                className="main-border" placeholder="password"/>
                        </div>
                        <div className="gryscale-font-color" style={{fontSize: "11px", marginTop: "10px", display: "flex"}}>
                             <div className="bold">*</div>&nbsp;<div className="bold">Pastikan anda mengisi data username dan password</div>
                        </div>
                    </div>
                    <div style={{textAlign: "center", marginTop: "10px"}}>
                        <button onClick={this.submit} className="btn-primary bold" style={{width: "100%", padding: "10px"}}>Masuk</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default login