import React, { Component, Fragment } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBatteryFull, faBatteryHalf, faCar, faChevronDown, faCoins, faInfo, faInfoCircle, faListAlt, faPercent, faPlus, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import { setHeightFixedPosition } from '../../function/function'
import InfoInput from './info_input'
import CurrencyFormat from 'react-currency-format'

class input_base extends Component{
    
    state = {
        popup:"",
        // biayaEvse: "",
        // biayaSipil: "",
        // biayaKelistrikan: "",
        // biayaSewaLahan: "",
        jumlahKonektor: []
    }

    infoElement = React.createRef()
    infoInput = this.infoInput.bind(this)
    hidePopup = this.hidePopup.bind(this)
    countConnector = this.countConnector.bind(this)

    componentDidMount(){
        let elm = document.getElementById("input-form-base")
        setHeightFixedPosition(elm)
        document.addEventListener("click", this.handleClickOutsideInfo)

        // this.setState({
        //     biayaEvse: this.props.biayaEvse,
        //     biayaKelistrikan: this.props.biayaKelistrikan,
        //     biayaSewaLahan: this.props.biayaSewaLahan,
        //     biayaSipil: this.props.biayaSipil
        // })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            let elm = document.getElementById("input-form-base")
            setHeightFixedPosition(elm)
            document.addEventListener("click", this.handleClickOutsideInfo)
        
            // this.setState({
            //     biayaEvse: nextProps.biayaEvse,
            //     biayaKelistrikan: nextProps.biayaKelistrikan,
            //     biayaSewaLahan: nextProps.biayaSewaLahan,
            //     biayaSipil: nextProps.biayaSipil
            // })
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

    countConnector(e){
        let v = e.target.value
        let arr = []
        for(let i = 0;i<v;i++){
            arr.push(1)
        }

        this.setState({
            jumlahKonektor: arr
        })
    }

    render(){

        let i = 0
        const inputJumlahKonektor = this.state.jumlahKonektor.map(dt => {
            i++
            return <div style={{alignItems: "center", marginBottom: "3px"}}>
                        <div className="main-border base-input-form" style={{width: "185px", display: "flex", }}>
                            <div className="bold main-font-size" style={{color: "#000", padding: "7px"}}>{i}.</div>
                            <input className="kwh-jmk-chl main-font-size" type="text" placeholder="(Kwh)" 
                                style={{width: "100%", boxSizing: "border-box"}}></input>
                        </div>
                        <div className="base-alt-ip kwh-alt-val-21" style={{marginBottom: "2px"}}>
                            <FontAwesomeIcon icon={faInfoCircle}/> kwh belum diisi
                        </div>
                    </div>
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

                                <div className="main-font-size">Harga EVSE</div>
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
                                        </div>
                                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                            <a onClick={(e) => this.infoInput(e, "biaya spklu")}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="base-alt-ip">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Harga EVSE belum diisi
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
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <input type="text" onKeyUp={this.props.keyUpInput} ref={this.props.inputRasioSpklu} placeholder="Rasio SPKLU / KBL" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
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
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
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
                                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPercent}/>
                                            <CurrencyFormat value={this.state.profit} 
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
                                <div className="main-font-size">Jumlah Konektor</div>
                                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                                    <div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div className="main-border base-input-form">
                                                <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPlus}/>
                                                <input type="text" onKeyUp={this.props.keyUpInput} onChange={this.countConnector} ref={this.props.inputJumlahKonetor} placeholder="Jumlah Konektor" style={{width: "100%", boxSizing: "border-box"}} className="main-font-size"></input>
                                            </div>
                                            <div style={{fontSize: "12px", marginLeft: "5px"}}>
                                                <a onClick={(e) => this.infoInput(e, "jumlah konektor")}>
                                                    <FontAwesomeIcon icon={faQuestionCircle}/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {
                                        (this.state.jumlahKonektor.length > 0)
                                        ?
                                            <div style={{padding: "10px", paddingLeft: "20px", paddingBottom: "0px", paddingTop: "3px"}}>
                                                {inputJumlahKonektor}
                                            </div>
                                        :
                                            ""
                                    }
                                    
                                    <div className="base-alt-ip base-alt-ip-1">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Jumlah konektor belum diisi
                                    </div>
                                </div>
                                
                                <div className="main-font-size">Daya Maksimum Konektor</div>
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
                                </div>

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