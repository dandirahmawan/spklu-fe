import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor, faClock, faCoins, faDollarSign, faLightbulb } from '@fortawesome/free-solid-svg-icons';

class indikator_kunci extends React.Component{
    render(){
        return(
            <div style={{padding: "20px", paddingBottom: "10px", overflow: "hidden"}}>
                <div className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "40px"}} icon={faClock}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "20px"}}>NPV</div>
                            <div className="main-font-size">Rp. 3.398.332.000</div>
                        </div>
                    </div>
                </div>
                <div className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "40px"}} icon={faCoins}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "20px"}}>IRR</div>
                            <div className="main-font-size">20%</div>
                        </div>
                    </div>
                </div>
                <div className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "40px"}} icon={faAnchor}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "20px"}}>BEP</div>
                            <div className="main-font-size">Rp. 3.398.332.000</div>
                        </div>
                    </div>
                </div>
                <div className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "40px"}} icon={faDollarSign}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "20px"}}>PI</div>
                            <div className="main-font-size">Rp. 3.398.332.000</div>
                        </div>
                    </div>
                </div>
                <div className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "40px"}} icon={faLightbulb}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "20px"}}>PP</div>
                            <div className="main-font-size">Rp. 5.89 TH</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default indikator_kunci