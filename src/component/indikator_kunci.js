import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor, faClock, faCoins, faDollarSign, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CurrencyFormat from 'react-currency-format'

class indikator_kunci extends React.Component{
    render(){
        return(
            <div style={{padding: "20px", paddingBottom: "10px", paddingTop: "10px", overflow: "hidden", display: "flex"}}>
                <div className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "40px"}} icon={faClock}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "20px"}}>NPV</div>
                            <div className="main-font-size">
                                <CurrencyFormat value={this.props.npv} 
                                                displayType={'text'} 
                                                thousandSeparator={true} prefix={'Rp. '} 
                                                renderText={value => <div>{value}</div>}/>
                            </div>
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
                            <div className="main-font-size">{this.props.irr}</div>
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
                            <div className="main-font-size">
                                <CurrencyFormat value={this.props.bep} 
                                                displayType={'text'} 
                                                thousandSeparator={true} prefix={'Rp. '} 
                                                renderText={value => value}/>
                            </div>
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
                            <div className="main-font-size">{this.props.pi}</div>
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
                            <div className="main-font-size">{this.props.pp} TH</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default indikator_kunci