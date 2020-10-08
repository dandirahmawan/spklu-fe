import React, { Component, Fragment } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBatteryFull, faBatteryHalf, faCar, faChevronDown, faCoins, faInfo, faInfoCircle, faListAlt, faPercent, faPlus, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import { setHeightFixedPosition } from '../function/function'
import InfoInput from './info_input'

class input_base extends Component{
    state = {
        popup:null
    }

    infoElement = React.createRef()
    infoInput = this.infoInput.bind(this)
    hidePopup = this.hidePopup.bind(this)

    componentDidMount(){
        let elm = document.getElementById("input-form-base")
        setHeightFixedPosition(elm)

        document.addEventListener("click", this.handleClickOutsideInfo)
    }

    menu(targetCollapse){
        let bases = document.getElementsByClassName("collapse-base")
        for(let i = 0;i<bases.length;i++){
            bases[i].style.display = "none"
        }
        
        let idBase = document.getElementById(targetCollapse)
        idBase.style.display = "block"
        let maxHeight = idBase.offsetHeight
        idBase.style.height = "0px"
        let add = maxHeight / 10
        let i = 0
        
        let itv = setInterval(() => {
            i = parseInt(i) + add
            if(i < maxHeight){
                idBase.style.height = i+"px"
            }else{
                idBase.style.height = "auto"
                clearInterval(itv)
            }
        }, 25)
    }

    infoInput(e, noInfo){
        let x = e.clientX + parseInt("10")
        let y = e.clientY - 5
        this.setState({
           popup: <InfoInput x={x} y={y} noInfo={noInfo} hideInfo={this.hidePopup}/>
        })
    }

    hidePopup(){
        this.setState({
            popup: null
        })
    }

    render(){
        return(
            <Fragment>
                {this.state.popup}
                <div id="input-form-base" className="main-background-color" style={{height: "1000px", position: "fixed", width: "270px", zIndex: "100"}}>
                    <div style={{borderBottom: "1px solid #64a0bf"}}>
                        <a onClick={() => this.menu("collapseOne")}>
                            <div className="bold menu-input" style={{fontSize: "14px"}}>
                                <FontAwesomeIcon icon={faListAlt}/>&nbsp;&nbsp;Kondisi Ekonomi
                                <FontAwesomeIcon style={{float: "right"}} icon={faChevronDown}/>
                            </div>
                        </a>
                        <div id="collapseOne" className="collapse-base" style={{display: "block"}}>
                            <div style={{padding: "20px", overflow: "hidden"}}>
                                <div className="main-font-size">PPH</div>
                                <div  style={{marginTop: "5px", marginBottom:"10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" ref={this.props.inputPph} placeholder="PPH" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> PPH belum diisi
                                    </div>
                                </div>
                                
                                <div className="main-font-size">Inflasi / tahun</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" ref={this.props.inputInflasi} placeholder="Inflasi / tahun" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Inflasi / tahun belum diisi
                                    </div>
                                </div>

                                <div className="main-font-size">Discount rate</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" ref={this.props.inputDiscountRate} placeholder="Discount rate" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Discount rate belum diisi
                                    </div>
                                </div>
                                
                                <div className="main-font-size">Jumlah kendaraan inisial</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCar}/>
                                            <input type="text" ref={this.props.inputJumlahKendaraanInisial} placeholder="Jumlah kendaraan inisial" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> jumlah kendaraan inisial belum diisi
                                    </div>
                                </div>
  
                                <div className="main-font-size">Biaya SPKLU / site</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <input type="text" ref={this.props.inputBiayaSpklu} placeholder="Biaya SPKLU / site" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Biaya spklu / site belum diisi
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div style={{borderBottom: "1px solid #64a0bf"}}>
                        <a onClick={() => this.menu("collapseTwo")}>
                            <div className="bold menu-input" style={{fontSize: "14px"}}>
                                <FontAwesomeIcon icon={faListAlt}/>&nbsp;&nbsp;Parameter Bisnis
                                <FontAwesomeIcon style={{float: "right"}} icon={faChevronDown}/>
                            </div>
                        </a>
                        <div id="collapseTwo" className="collapse-base">
                            <div style={{padding: "20px", overflow: "hidden"}}>
                                <div className="main-font-size">Harga Jual PLN (Rp 707 X Q)</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <input type="text" ref={this.props.inputHargaJualPln} placeholder="Harga Jual PLN (Rp 707 X Q)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Harga jual pln belum diisi
                                    </div>
                                </div>
                                
                                <div className="main-font-size">Harga jual Konsumen (Rp 1605 X N)</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <input type="text" ref={this.props.inputHargaJualKonsumen} placeholder="Harga jual Konsumen (Rp 1605 X N)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Harga jual konsumen belum diisi
                                    </div>
                                </div>

                                <div className="main-font-size">Pertumbuhan KBL pertahun (%)</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" ref={this.props.inputPertumbuhanKblPerTahun} placeholder="Pertumbuhan KBL pertahun (%)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Pertumbukan KBL pertahun belum diisi
                                    </div>
                                </div>

                                <div className="main-font-size">Rasio SPKLU / KBL</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" ref={this.props.inputRasioSpklu} placeholder="Rasio SPKLU / KBL" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Rasio SPKLU / KBL belum diisi
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{borderBottom: "1px solid #64a0bf"}}>
                        <a onClick={() => this.menu("collapseThree")}>
                            <div className="bold menu-input" style={{fontSize: "14px"}}>
                                <FontAwesomeIcon icon={faListAlt}/>&nbsp;&nbsp;Parameter Teknis
                                <FontAwesomeIcon style={{float: "right"}} icon={faChevronDown}/>
                            </div>
                        </a>
                        <div id="collapseThree" className="collapse-base">
                            <div style={{padding: "20px", overflow: "hidden"}}>
                                <div className="main-font-size">Jumlah Konektor</div>
                                <div style={{marginTop: "5px", marginBottom: "10px", display: "flex", alignItems: "center"}}>
                                    <div className="main-border base-input-form">
                                        <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPlus}/>
                                        <input type="text" ref={this.props.inputJumlahKonetor} placeholder="Jumlah Konektor" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                    </div>
                                    <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                        <a onClick={(e) => this.infoInput(e, "0")}>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="main-font-size">Daya Maksimum Konektor</div>
                                <div style={{marginTop: "5px", marginBottom: "10px", display: "flex", alignItems: "center"}}>
                                    <div className="main-border base-input-form">
                                        <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faBatteryHalf}/>
                                        <input type="text" ref={this.props.inputDayaMaksimum} placeholder="Daya Maksimum Konektor" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                    </div>
                                    <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                        <a onClick={(e) => this.infoInput(e, "0")}>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </a>
                                    </div>
                                </div>

                                <div className="main-font-size">Kapasitas 1 KBL (Kwh)</div>
                                <div style={{marginTop: "5px", marginBottom: "10px", display: "flex", alignItems: "center"}}>
                                    <div className="main-border base-input-form">
                                        <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faBatteryFull}/>
                                        <input type="text" ref={this.props.inputKapasitasKbl} placeholder="Kapasitas 1 KBL (Kwh)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                    </div>
                                    <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                        <a onClick={(e) => this.infoInput(e, "0")}>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </a>
                                    </div>
                                </div>

                                <div className="main-font-size">Rugi - rugi dan daya pendukung</div>
                                <div style={{marginTop: "5px", marginBottom: "10px", display: "flex", alignItems: "center"}}>
                                    <div className="main-border base-input-form">
                                        <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                        <input type="text" ref={this.props.inputRugiDayaPendukung} placeholder="Rugi - rugi dan daya pendukung" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                    </div>
                                    <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                        <a onClick={(e) => this.infoInput(e, "0")}>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*ini adalah element info tiap input*/}
                <div ref={this.infoElement} style={{display: "none", position: "fixed", zIndex: "100"}}>
                    <div className="tip-text-input main-border shadow main-font-size flex-top">
                        <div style={{marginRight: "5px", color: "#8baec2"}}>
                            <FontAwesomeIcon style={{fontSize: "16px"}} icon={faInfoCircle}/>
                        </div>
                        <div>ini adalah description dari sebuah input</div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default input_base