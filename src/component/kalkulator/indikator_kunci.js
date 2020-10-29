import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor, faClock, faCoins, faDollarSign, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CurrencyFormat from 'react-currency-format'

class indikator_kunci extends React.Component{

    state = {
        hover: null
    }

    onMouseOver = this.onMouseOver.bind(this)
    onMouseLeave = this.onMouseLeave.bind(this)

    onMouseOver(e, v){

        let x = e.clientX + 10
        let y = e.clientY
        
        this.setState({
            hover: <div className="main-font-size main-border" 
                        style={{position: "fixed", 
                                background: "#FFF", 
                                padding: "5px", 
                                height: "auto", 
                                top: y+"px",
                                left: x+"px",
                                width: "150px", 
                                zIndex: "100",
                                borderRadius: "3px"}}>
                        {v}
                    </div>
        })
    }

    onMouseLeave(){
        this.setState({
            hover: ""
        })
    }

    render(){
        return(
            <div style={{padding: "20px", paddingBottom: "10px", paddingTop: "10px", overflow: "hidden", display: "flex"}}>
                
                {this.state.hover}

                <div onMouseOver={(e) => this.onMouseOver(e, "Net Present Value")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
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
                <div onMouseOver={(e) => this.onMouseOver(e, "Internal Rate of Return")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
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
                <div onMouseOver={(e) => this.onMouseOver(e, "Break Event Point")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
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
                <div onMouseOver={(e) => this.onMouseOver(e, "Profitability Index")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
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
                <div onMouseOver={(e) => this.onMouseOver(e, "Payback Period")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
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