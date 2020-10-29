import React from 'react'
import Evse from '../../image/redesignn-01.jpg'
import BpptLogo from '../../image/Logo_BPPT.png'
import {Link} from 'react-router-dom'

class index extends React.Component{
    render(){
        return(
            <div style={{background: "url("+Evse+") no-repeat center", 
                        position: "fixed",
                        width: "100%",
                        backgroundSize: "cover", 
                        height: "100%"}}>
                
                    <div style={{padding: "20px", textAlign: "center"}}>
                        <img src={BpptLogo} style={{width: "100px"}}/>
                    </div>

                    <div className="bold" style={{padding: "10px", textAlign: "center", zIndex: "1", fontSize: "25px", marginTop: "50px"}}>
                        Kalkualtor Tekno-Ekonomi FCS BPPT
                    </div>
                    
                    <div style={{textAlign: "center", marginTop: "10px", zIndex: "1"}}>
                        <Link to="/kalkulator"><button className="btn-primary-unhover bold" style={{fontSize: "18px", padding: "10px"}}>Launch Aplikasi</button></Link>
                    </div>
            </div>
        )
    }
}

export default index