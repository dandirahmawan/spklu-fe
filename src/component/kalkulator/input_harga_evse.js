import React, { Fragment } from 'react'
import { Component } from 'react';

class input_harga_evse extends Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <Fragment>
                <div className="main-font-size">Harga EVSE {x}</div>
                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div className="main-border base-input-form">
                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                            <CurrencyFormat value={this.state.profit} 
                                placeholder="Harga EVSE"
                                style={{width: "100%", boxSizing: "border-box"}} 
                                value={val}
                                thousandSeparator={true} prefix={''} 
                                onValueChange={(values) => {
                                    const {formattedValue, value} = values
                                    this.props.changeBiayaEvse(x, value)
                                }
                            }/>
                            <input type="text" ref={this.props.inputBiayaEvse} value={this.props.biayaEvse} placeholder="Biaya SPKLU / site" style={{display: "none"}} className="main-font-size"></input>
                            
                            <div className="txt-cpy" attr="evse-txt-cpy">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <span style={{marginTop: "2px"}}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                                    &nbsp;&nbsp;&nbsp;Hasil optimasi telah disalin
                                </div>
                            </div>
                        </div>
                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                            <a onClick={(e) => this.infoInput(e, "biaya spklu")}>
                                <FontAwesomeIcon icon={faQuestionCircle}/>
                            </a>
                        </div>
                    </div>
                    <div className="base-alt-ip">
                        <FontAwesomeIcon icon={faInfoCircle}/>Harga EVSE belum diisi
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default input_harga_evse