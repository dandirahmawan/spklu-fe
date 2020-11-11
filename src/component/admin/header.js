import { faPowerOff, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import Logo from '../../image/Logo_BPPT.png'
import {getCookieUsername} from '../../function/function'

class header extends Component{

    logout(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            name = name.replace(" ", "")
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        window.location.reload()
    }

    render(){
        return(
            <div id="header" className="shadow main-border-bottom">
                <div style={{paddingRight: "20px", paddingLeft: "20px"}}>
                    <div style={{float: "left"}}>
                        <img src={Logo} width="60px" style={{marginTop: "6px"}}/>
                    </div>
                    <div style={{float: "right"}}>
                        <div className="bold" style={{paddingTop: "15px", display: "flex", alignItems: "center"}}>
                            <div className="main-border-right bold" style={{paddingRight: "10px", display: "flex", alignItems: "center"}}>
                                <FontAwesomeIcon icon={faUserCircle} style={{fontSize: "14px"}}/>
                                &nbsp;<span style={{fontSize: "13px"}}>
                                    {getCookieUsername()}
                                </span>
                            </div>
                            <div className="gryscale-font-color" style={{paddingLeft: "10px"}}>
                                <a onClick={this.logout} style={{cursor: "pointer"}}>
                                    <FontAwesomeIcon icon={faPowerOff}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bold gryscale-font-color" 
                        style={{paddingTop: "15px", 
                                position: "", 
                                top: "0", 
                                textAlign: "center"}}>Administrator</div>
                </div>
            </div>
        )
    }
}

export default header