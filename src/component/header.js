import React, { Component } from 'react'
import Logo from '../image/Logo_BPPT.png'

class header extends Component{
    render(){
        return(
            <div id="header" className="shadow main-border-bottom">
                <div style={{paddingRight: "20px", paddingLeft: "20px"}}>
                    <div className="bold" style={{paddingTop: "15px", float: "left"}}>Simulasi Bisnis SPKLU</div>
                    <div style={{float: "right"}}>
                        <img src={Logo} width="60px" style={{marginTop: "6px"}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default header