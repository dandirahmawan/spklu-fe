import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBatteryFull, faBatteryHalf, faCar, faChevronCircleLeft, faChevronDown, faClock, faCoins, faInfo, faInfoCircle, faListAlt, faPercent, faPlus, faPlusCircle, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import { setHeightFixedPosition } from '../../function/function'
import InfoInput from './info_input'
import CurrencyFormat from 'react-currency-format'
import InputKonetor from './input_konektor'

class input_base extends Component{
    
    state = {
        popup:"",
        arrDispenser:[],
        jumlahKonektor: []
    }

    infoElement = React.createRef()
    infoInput = this.infoInput.bind(this)
    hidePopup = this.hidePopup.bind(this)
    countDispenser = this.countDispenser.bind(this)
    changeDayaKonektor = this.changeDayaKonektor.bind(this)
    setFormInputKonektor = this.setFormInputKonektor.bind(this)

    componentDidMount(){
        let elm = document.getElementById("input-form-base")
        setHeightFixedPosition(elm)
        document.addEventListener("click", this.handleClickOutsideInfo)
        
        let itv = setInterval(() => {
            this.setFormInputKonektor(this.props)
            clearInterval(itv)
        }, 100)
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            // this.setFormInputKonektor(this.props)
        }
    }

    setFormInputKonektor(props){
        let elm = document.getElementById("input-form-base")
        setHeightFixedPosition(elm)
        document.addEventListener("click", this.handleClickOutsideInfo)

        let jm = []
        JSON.parse(props.jumlahKonektorData).map(dt => {
            jm.push(1)
        })
        
        this.props.inputJumlahDispenser.current.value = jm.length
        this.setState({
            arrDispenser: jm
        })

        if(this.state.jumlahKonektor.length == 0){
            this.setState({
                jumlahKonektor: JSON.parse(props.jumlahKonektorData)
            })
        }
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

    infoInput(e, nameInfo){
        let x = e.clientX + parseInt("10")
        let y = e.clientY - 5
        this.setState({
           popup: <InfoInput x={x} y={y} nameInfo={nameInfo} hideInfo={this.hidePopup}/>
        })
    }

    hidePopup(){
        this.setState({
            popup: null
        })
    }

    countDispenser(e){
        let v = e.target.value
        let arr = []
        for(let i = 0;i<v;i++){
            arr.push(1)
        }

        this.setState({
            arrDispenser: arr
        })
    }

    changeDayaKonektor(e, no){
        let val = e.target.value
        this.setState(prev => {
            const data = prev.jumlahKonektor.map(dt => {
                if(dt.no == no){
                    dt.value = val
                }

                return dt
            })

            return{
                jumlahKonektor: data
            }
        })
    }

    renderInputKonektor(){
        let bs = document.getElementById("test-xcv")
        ReactDom.render(<InputKonetor/>, bs)
        for(let i = 0;i<2;i++){
             bs.append(<InputKonetor/>)
        }
    }

    render(){
        let i = 0
        const konektorDispenser = this.state.arrDispenser.map(dt => {
            i++
            let seq = parseInt(i) - 1
            return <InputKonetor no={i} dataDefault={this.state.jumlahKonektor[seq]}/>
        })

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
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputPph} placeholder="PPH" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "pph")}>
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
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputInflasi} placeholder="Inflasi / tahun" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "inflasi")}>
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
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputDiscountRate} placeholder="Discount rate" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "discount rate")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Discount rate belum diisi
                                    </div>
                                </div>

                                <div className="main-font-size">Subsidi energi</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputSubsidiEnergi} placeholder="Discount rate" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "discount rate")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Subsidi energi belum diisi
                                    </div>
                                </div>
                                
                                <div className="main-font-size">Jumlah kendaraan inisial</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCar}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputJumlahKendaraanInisial} placeholder="Jumlah kendaraan inisial" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "jumlah kbl")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> jumlah kendaraan inisial belum diisi
                                    </div>
                                </div>
  
                                <div className="main-font-size">Biaya pekerjaan sipil</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <CurrencyFormat value={this.state.profit} 
                                                placeholder=" Biaya pekerjaan sipil"
                                                value={this.props.biayaSipil}
                                                style={{width: "100%", boxSizing: "border-box"}} 
                                                thousandSeparator={true} prefix={''} 
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.props.changeBiayaSipil(value)
                                                    // this.props.keyUpInput()
                                                }
                                            }/>
                                            <input type="text" ref={this.props.inputBiayaSipil} value={this.props.biayaSipil} placeholder="Biaya SPKLU / site" style={{display: "none"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "biaya spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Biaya pekerjaan sipil
                                    </div>
                                </div>

                                <div className="main-font-size">Biaya pekerjaan kelistrikan</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <CurrencyFormat value={this.state.profit} 
                                                placeholder="Biaya pekerjaan kelistrikan"
                                                style={{width: "100%", boxSizing: "border-box"}} 
                                                value={this.props.biayaKelistrikan}
                                                thousandSeparator={true} prefix={''} 
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.props.changeBiayaKelistrikan(value)
                                                }
                                            }/>
                                            <input type="text" ref={this.props.inputBiayaKelistrikan} value={this.props.biayaKelistrikan} placeholder="Biaya SPKLU / site" style={{display: "none"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "biaya spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Biaya pekerjaan kelistrikan belum diisi
                                    </div>
                                </div>

                                <div className="main-font-size">Total harga EVSE</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <CurrencyFormat value={this.state.profit} 
                                                placeholder="Harga EVSE"
                                                style={{width: "100%", boxSizing: "border-box"}} 
                                                value={this.props.biayaEvse}
                                                thousandSeparator={true} prefix={''} 
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.props.changeBiayaEvse(value)
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
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputHargaJualPln} placeholder="Harga Jual PLN (Rp 707 X Q)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                            
                                            <div className="txt-cpy" attr="pln-txt-cpy">
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <span style={{marginTop: "2px"}}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                                                    &nbsp;&nbsp;&nbsp;Hasil optimasi telah disalin
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "harga jual pln")}>
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
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputHargaJualKonsumen} placeholder="Harga jual Konsumen (Rp 1605 X N)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                            
                                            <div className="txt-cpy" attr="konsumen-txt-cpy">
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <span style={{marginTop: "2px"}}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                                                    &nbsp;&nbsp;&nbsp;Hasil optimasi telah disalin
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "harga jual konsumen")}>
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
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputPertumbuhanKblPerTahun} placeholder="Pertumbuhan KBL pertahun (%)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "pertumbuhan kbl")}>
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
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPlusCircle}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputRasioSpklu} placeholder="Rasio SPKLU / KBL" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                            
                                            <div className="txt-cpy" attr="spklu-txt-cpy">
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <span style={{marginTop: "2px"}}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                                                    &nbsp;&nbsp;&nbsp;Hasil optimasi telah disalin
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "rasio spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Rasio SPKLU / KBL belum diisi
                                    </div>  
                                </div>

                                <div className="main-font-size">Durasi penggunaan EVSE / hari (jam)</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faClock}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputPenggunaanEvse} placeholder="Durasi penggunaan EVSE / hari (jam)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "rasio spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Durasi penggunaan EVSE belum diisi
                                    </div>  
                                </div>

                                <div className="main-font-size">Biaya sewa lahan SPKLU / tahun</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faCoins}/>
                                            <CurrencyFormat
                                                placeholder="Biaya sewa lahan SPKLU / tahun"
                                                style={{width: "100%", boxSizing: "border-box"}} 
                                                thousandSeparator={true} 
                                                prefix={''} 
                                                value={this.props.biayaSewaLahan}
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.props.changeBiayaSewaLahan(value)
                                                }
                                            }/>
                                            <input type="text" ref={this.props.inputBiayaSewaLahan} value={this.props.biayaSewaLahan} placeholder="Rasio SPKLU / KBL" style={{display: "none"}} className="main-font-size"></input>
                                            
                                            <div className="txt-cpy" attr="bsl-txt-cpy">
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <span style={{marginTop: "2px"}}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                                                    &nbsp;&nbsp;&nbsp;Hasil optimasi telah disalin
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "rasio spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Biaya sewa lahan belum diisi
                                    </div>  
                                </div>

                                <div className="main-font-size">Jumlah EVSE</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                            <div className="main-border base-input-form">
                                                <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPlus}/>
                                                <select placeholder="jumlah konektor" style={{border: "none", width: "100%", boxSizing: "border-box"}} 
                                                        onChange={this.countDispenser} 
                                                        ref={this.props.inputJumlahDispenser}>
                                                    <option style={{color: "#CCC", display: "none"}}>pilih jumlah EVSE</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                                {/* <input type="text" onKeyUp={this.props.keyUpInput} onChange={this.countConnector} ref={this.props.inputJumlahKonetor} placeholder="Jumlah Konektor" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input> */}
                                            </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "rasio spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Biaya sewa lahan belum diisi
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
                                
                                {konektorDispenser}

                                
                                {/* <div className="main-font-size">Daya Maksimum Konektor</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faBatteryHalf}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputDayaMaksimum} placeholder="Daya Maksimum Konektor" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "0")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Daya maksimum konktor belum diisi
                                    </div>
                                </div> */}

                                <div className="main-font-size">Kapasitas 1 KBL (Kwh)</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faBatteryFull}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputKapasitasKbl} placeholder="Kapasitas 1 KBL (Kwh)" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "kapasitas kbl")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Kanapsitas KBL belum diisi
                                    </div>
                                </div>

                                <div className="main-font-size">Rugi - rugi dan daya pendukung</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <div className="main-border base-input-form">
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputRugiDayaPendukung} placeholder="Rugi - rugi dan daya pendukung" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "rugi-rugi dan kebutuhan")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Rugi dan daya pendukung belum diisi
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