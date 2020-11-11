import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor, faBalanceScaleLeft, faClock, faCoins, faCopy, faDollarSign, faLightbulb, faLowVision } from '@fortawesome/free-solid-svg-icons';
import CurrencyFormat from 'react-currency-format'
import {choicesOptimize} from '../../const/const'
import lib from 'react-year-picker';

class indikator_kunci extends React.Component{

    constructor(){
        super()
        this.state = {
            hover: null,
            textOptimize: null,
            valueOptimize: null
        }
    
        this.onMouseOver = this.onMouseOver.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.copyValue = this.copyValue.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            choicesOptimize.map(dt => {
               if(dt.id == this.props.typeOptimize){
                    let val = null
                    if(dt.id == "b"){
                        val = this.props.dataRequest.kondisiEkonomi.biayaSpklu
                    }

                    if(dt.id == "d"){
                        val = this.props.dataRequest.parameterBisnis.rasioSpklu
                    }

                    if(dt.id == "e"){
                        val = this.props.dataRequest.parameterBisnis.hargaJualPln
                    }

                    if(dt.id == "f"){
                        val = this.props.dataRequest.parameterBisnis.hargaJualKonsumen
                    }
                    
                    if(dt.id == "g"){
                        val = this.props.dataRequest.parameterBisnis.biayaSewaLahan
                    }

                    this.setState({
                        textOptimize: dt.text,
                        valueOptimize: val
                    })
               }
           })
        }
    }

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

    copyValue(){
        if(this.props.typeOptimize == "b"){
            let val = this.props.dataRequest.kondisiEkonomi.biayaSpklu
            this.props.setDefaultValueByName("harga evse", val)
        }

        if(this.props.typeOptimize == "d"){
            let val = this.props.dataRequest.parameterBisnis.rasioSpklu
            this.props.setDefaultValueByName("rasio spklu", val)
        }

        if(this.props.typeOptimize == "e"){
            let val = this.props.dataRequest.parameterBisnis.hargaJualPln
            this.props.setDefaultValueByName("harga jual pln", val)
        }

        if(this.props.typeOptimize == "f"){
            let val = this.props.dataRequest.parameterBisnis.hargaJualKonsumen
            this.props.setDefaultValueByName("harga jual konsumen", val)
        }

        if(this.props.typeOptimize == "g"){
            let val = this.props.dataRequest.parameterBisnis.biayaSewaLahan
            this.props.setDefaultValueByName("biaya sewa lahan", val)
        }

        let elmTxyCpy = document.getElementsByClassName("txt-cpy")
        for(let i = 0;i<elmTxyCpy.length;i++){
            if(this.props.typeOptimize == "b"){
                this.collapseInputMenu("collapseOne")
                if(elmTxyCpy[i].getAttribute("attr") == "evse-txt-cpy"){
                    let ib = document.getElementById("input-form-base")
                    ib.scrollTop = 0
                    ib.style.overflowY = "hidden"
                    elmTxyCpy[i].style.display = "block"
                    setTimeout(() => {
                        elmTxyCpy[i].style.display = "none"
                        ib.style.overflowY = "auto"
                    }, 1500)
                }
            }

            if(this.props.typeOptimize == "d" || this.props.typeOptimize == "e" || this.props.typeOptimize == "f" || this.props.typeOptimize == "g"){
                this.collapseInputMenu("collapseTwo")
                let ib = document.getElementById("input-form-base")
                ib.style.overflowY = "hidden"
                if(this.props.typeOptimize == "d"){
                    if(elmTxyCpy[i].getAttribute("attr") == "spklu-txt-cpy"){
                        elmTxyCpy[i].style.display = "block"
                        setTimeout(() => {
                            elmTxyCpy[i].style.display = "none"
                            ib.style.overflowY = "auto"
                        }, 1500)
                    }
    
                }
                
                if(this.props.typeOptimize == "e"){
                    if(elmTxyCpy[i].getAttribute("attr") == "pln-txt-cpy"){
                        elmTxyCpy[i].style.display = "block"
                        setTimeout(() => {
                            elmTxyCpy[i].style.display = "none"
                        }, 1500)
                    }
                }

                if(this.props.typeOptimize == "f"){
                    if(elmTxyCpy[i].getAttribute("attr") == "konsumen-txt-cpy"){
                        elmTxyCpy[i].style.display = "block"
                        setTimeout(() => {
                            elmTxyCpy[i].style.display = "none"
                        }, 1500)
                    }
                }

                if(this.props.typeOptimize == "g"){
                    if(elmTxyCpy[i].getAttribute("attr") == "bsl-txt-cpy"){
                        elmTxyCpy[i].style.display = "block"
                        setTimeout(() => {
                            elmTxyCpy[i].style.display = "none"
                        }, 1500)
                    }
                }
            }
        }
    }

    collapseInputMenu(targetCollapse){
        let bases = document.getElementsByClassName("collapse-base")
        for(let i = 0;i<bases.length;i++){
            bases[i].style.display = "none"
        }
        
        let idBase = document.getElementById(targetCollapse)
        idBase.style.display = "block"
    }

    render(){
        return(
            <div style={{padding: "20px", paddingBottom: "10px", paddingTop: "10px", overflow: "hidden", display: "flex"}}>
                
                {this.state.hover}

                <div onMouseOver={(e) => this.onMouseOver(e, "Net Present Value")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faClock}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "15px"}}>NPV</div>
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
                            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faCoins}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "15px"}}>IRR</div>
                            <div className="main-font-size">{this.props.irr}</div>
                        </div>
                    </div>
                </div>
                <div onMouseOver={(e) => this.onMouseOver(e, "Break Event Point")} onMouseLeave={this.onMouseLeave} className="card main-border shadow">
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faAnchor}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "15px"}}>BEP</div>
                            <div className="main-font-size">
                                <CurrencyFormat value={this.props.bep} 
                                                displayType={'text'} 
                                                thousandSeparator={true} prefix={'Rp. '} 
                                                renderText={value => value}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div onMouseOver={(e) => this.onMouseOver(e, "Profitability Index")} 
                    style={(this.props.isOptimize) ? {width: "500px"} : {}} onMouseLeave={this.onMouseLeave} 
                    className="card main-border shadow">
                    
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faDollarSign}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "15px"}}>PI</div>
                            <div className="main-font-size">{this.props.pi}</div>
                        </div>
                    </div>
                </div>
                <div onMouseOver={(e) => this.onMouseOver(e, "Payback Period")} 
                    style={(this.props.isOptimize) ? {width: "500px"} : {}} onMouseLeave={this.onMouseLeave} 
                    className="card main-border shadow">
                    
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px"}}>
                            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faLightbulb}/>
                        </div>
                        <div>
                            <div className="bold" style={{fontSize: "15px"}}>PP</div>
                            <div className="main-font-size">{this.props.pp} TH</div>
                        </div>
                    </div>
                </div>
                {
                    (this.props.isOptimize)
                    ?
                        <div style={{cursor: "unset", background: "#046e80"}} 
                            /*onMouseOver={(e) => this.onMouseOver(e,  this.state.textOptimize)} onMouseLeave={this.onMouseLeave}*/
                            className="card main-border shadow">
                            
                            <div style={{display: "flex"}}>
                                <div style={{marginRight: "10px"}}>
                                    {(this.props.typeOptimize == "b" || this.props.typeOptimize == "g") ? <FontAwesomeIcon style={{fontSize: "30px"}} icon={faCoins}/> : ""}
                                    {(this.props.typeOptimize == "d") ? <FontAwesomeIcon style={{fontSize: "30px"}} icon={faBalanceScaleLeft}/> : ""}
                                    {/* <FontAwesomeIcon style={{fontSize: "30px"}} icon={faLightbulb}/> */}
                                </div>
                                <div style={{width: "100%"}}>
                                    <div style={{fontSize: "12px", marginBottom: "3px"}}>
                                            Hasil optimasi
                                            <div className="tooltip" style={{float: "right"}}>
                                                <button onClick={this.copyValue} 
                                                    style={{padding: "3px", color: "#000", fontSize: "11px", borderRadius: "3px", border: "1px solid #CCC", marginTop: "-5px"}}>
                                                    <FontAwesomeIcon icon={faCopy}/> Salin
                                                </button>

                                                <div className="tooltip-text main-border" 
                                                    style={{background: "#FFF", 
                                                            color: "#000", 
                                                            padding: "5px", 
                                                            borderRadius: "3px",
                                                            marginTop: "5px",
                                                            marginLeft: "-60px", 
                                                            width: "110px"}}>
                                                    Salin hasil optimize ke dalam form input
                                                </div>
                                            </div>
                                    </div>
                                    <div className="bold" style={{fontSize: "15px"}}>
                                        {/* <div style={{fontSize: "12px", marginBottom: "3px"}}>
                                            Hasil optimasi
                                            <div style={{float: "right"}}>
                                                <a><FontAwesomeIcon icon={faCopy}/> Copy</a>
                                            </div>
                                        </div> */}
                                        {this.state.textOptimize}
                                    </div>
                                    
                                    {
                                        (this.props.typeOptimize == "b")
                                        ?   
                                            <div className="main-font-size">
                                                <CurrencyFormat value={this.props.dataRequest.kondisiEkonomi.biayaSpklu} 
                                                                displayType={'text'} 
                                                                thousandSeparator={true} prefix={'Rp. '} 
                                                                renderText={value => <div>{value}</div>}/>
                                            </div>
                                        :
                                            (this.props.typeOptimize == "g")
                                            ?
                                                <div className="main-font-size">
                                                    <CurrencyFormat value={this.props.dataRequest.parameterBisnis.biayaSewaLahan} 
                                                                    displayType={'text'} 
                                                                    thousandSeparator={true} prefix={'Rp. '} 
                                                                    renderText={value => <div>{value}</div>}/>
                                                </div>
                                            :
                                                <div className="main-font-size">
                                                    {this.state.valueOptimize}
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                    : ""
                }
            </div>
        )
    }
}

export default indikator_kunci