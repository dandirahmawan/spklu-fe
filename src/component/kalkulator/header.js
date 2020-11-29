import { faSign, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { getCookieUserTypeName } from '../../function/function'
import Logo from '../../image/Logo_BPPT.png'

class header extends Component{

    deleteCookie(){
        document.cookie = 'usertype_tecs=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.reload()
    }

    render(){
        return(
            <div id="header" className="shadow main-border-bottom">
                <div style={{paddingRight: "20px", paddingLeft: "20px"}}>
                    <div className="main-font-size bold" style={{float: "right", height: "45px", display: "flex", alignItems: "center"}}>
                        <div>
                            <FontAwesomeIcon icon={faUserAlt} className="gryscale-font-color" style={{fontSize: "14px"}}/>&nbsp;&nbsp;
                            {getCookieUserTypeName()}
                        </div>
                        <div className="main-border-left" style={{paddingLeft: "10px", marginLeft: "10px"}}>
                            <a onClick={this.deleteCookie} className="tooltip" style={{fontSize: "14px"}}>
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                                <div className="tooltip-text main-border gryscale-font-color shadow" style={{fontSize: '12px', marginLeft: "-30px", padding: "10px", background: "#FFF", marginTop: "5px"}}>Keluar</div>
                            </a>
                        </div>
                    </div>
                    <div style={{float: "left"}}>
                        <img src={Logo} width="60px" style={{marginTop: "6px"}}/>
                    </div>
                    <div className="bold" style={{paddingTop: "15px", float: "left", marginLeft: "10px"}}>Simulasi Bisnis SPKLU</div>
                </div>
            </div>
        )
    }
}

export default header