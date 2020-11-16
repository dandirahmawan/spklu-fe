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
                        Kalkulator Tekno-Ekonomi FCS BPPT
                    </div>
                    
                    <div style={{textAlign: "center", marginTop: "10px", zIndex: "1"}}>
                        <div className="main-border" 
                            style={{width: "250px", background: "#FFF", margin: "auto", padding: "15px", borderRadius: "4px"}}>
                            <div style={{marginBottom: "5px"}}>
                                <h3 className="bold" style={{marginBottom: "10px"}}>Akses sebagai</h3>
                                <select className="main-border" style={{width: "100%", boxSizing: "border-box", padding: "8px"}}>
                                    <option>Tipe pengakses</option>
                                </select>
                            </div>
                            <Link to="/kalkulator">
                                <button className="btn-primary-unhover bold" 
                                    style={{fontSize: "12px", padding: "10px", width: "100%", boxSizing: "border-box"}}>
                                    Launch Aplikasi
                                </button>
                            </Link>
                        </div>
                    </div>
            </div>
        )
    }
}

export default index