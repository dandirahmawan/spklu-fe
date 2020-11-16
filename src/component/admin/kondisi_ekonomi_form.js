import React, { Component } from 'react'
import { faCar, faCheckCircle, faCog, faCoins, faPercent, faSave, faSdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import {setDefaultValue} from '../../redux/action'
import Axios from 'axios'
import LoadRoll from '../../image/Rolling-1s-45px.gif'

class kondisi_ekonomi_form extends Component{

    state = {
        pph:"",
        inflasi: "",
        discountRate: "",
        jumlahKendaraanInisial: "",
        biayaPekerjaSipil: "",
        biayaPekerjaKelistrikan: "",
        hargaEvse: "",
        subsidiEnergi: "",
        isSaving: false
    }

    changeBiayaKelistrikan = this.changeBiayaKelistrikan.bind(this)
    changeBiayaSipil = this.changeBiayaSipil.bind(this)
    changeDiscountRate = this.changeDiscountRate.bind(this)
    changeHargaEvse = this.changeHargaEvse.bind(this)
    changeInflasi = this.changeInflasi.bind(this)
    changeJumlahKendaraan = this.changeJumlahKendaraan.bind(this)
    changePph = this.changePph.bind(this)
    changeSubsidiEnergi = this.changeSubsidiEnergi.bind(this)

    componentDidMount(){
        let data = this.props.data
        this.setState({
            pph: data.pph,
            inflasi: data.inflasi,
            discountRate: data.discountRate,
            jumlahKendaraanInisial: data.jumlahKendaraanInisial,
            biayaPekerjaSipil: data.biayaPekerjaanSipil,
            biayaPekerjaKelistrikan: data.biayaPekerjaanKelistrikan,
            hargaEvse: data.hargaEVSE,
            subsidiEnergi: data.subsidiEnergi
        })

        this.save = this.save.bind(this)
    }

    changePph(e){
        this.setState({
            pph: e.target.value
        })
    }

    changeInflasi(e){
        this.setState({
            inflasi: e.target.value
        })
    }

    changeDiscountRate(e){
        this.setState({
            discountRate: e.target.value
        })
    }

    changeJumlahKendaraan(e){
        this.setState({
            jumlahKendaraanInisial: e.target.value
        })
    }

    changeBiayaKelistrikan(val){
        this.setState({
            biayaPekerjaKelistrikan: val
        })
    }

    changeBiayaSipil(val){
        this.setState({
            biayaPekerjaSipil: val
        })
    }

    changeHargaEvse(val){
        this.setState({
            hargaEvse: val
        })
    }

    changeSubsidiEnergi(e){
        let val = e.target.value
        this.setState({
            subsidiEnergi: val
        })
    }

    save(){
        /*set objet param*/
        let params = []
        let pph = this.setObj("pph", this.state.pph, null)
        let inflasi = this.setObj("inflasi", this.state.inflasi, null)
        let discountRate = this.setObj("discount_rate", this.state.discountRate, null)
        let jumlahKendaraanInisial = this.setObj("jumlah_kendaraan", this.state.jumlahKendaraanInisial, null)
        let biayaSpil = this.setObj("biaya_sipil", this.state.biayaPekerjaSipil, null)
        let biayaKelistrikan = this.setObj("biaya_kelistrikan", this.state.biayaPekerjaKelistrikan, null)
        let hargaEvse = this.setObj("harga_evse", this.state.hargaEvse, null)
        let subsidiEnergi = this.setObj("subsidi_energi", this.state.subsidiEnergi, null)

        params.push(pph)
        params.push(inflasi)
        params.push(discountRate)
        params.push(jumlahKendaraanInisial)
        params.push(biayaSpil)
        params.push(biayaKelistrikan)
        params.push(hargaEvse)
        params.push(subsidiEnergi)

        this.setState({
            isSaving: true
        })

        Axios.post("/api/admin/form-values", params).then(res => {
            let resp = res.data
            let data = resp.data
            this.props.setDataDefault(data)

            this.setState({
                isSaving: false
            })

            let elm = document.getElementsByClassName("fx-loader-bse")[0]
            elm.style.display = "flex"

            setTimeout(()=> {
                elm.style.display = "none"
            }, 2000)
        })
    }

    setObj(name, val, desc){
        let obj = {}
        obj.name = name
        obj.value = val
        obj.decription = desc
        return obj
    }

    render(){
        return(
            <div style={{marginLeft: "350px", marginTop: "70px"}}>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><div style={{marginBottom: "20px"}}>
                                    {/* <span className="main-font-size gryscale-font-color">
                                        <FontAwesomeIcon icon={faCog}/> default value
                                    </span> */}
                                    <h1 className="bold"><FontAwesomeIcon icon={faCog}/> Kondisi Ekonomi</h1>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>PPH</td>
                            <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                    <FontAwesomeIcon icon={faPercent} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    <input
                                        value={this.state.pph}
                                        onChange={this.changePph} 
                                        placeholder="pph" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Inflasi / Tahun</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPercent} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>

                                    <input value={this.state.inflasi} 
                                        onChange={this.changeInflasi}
                                        placeholder="inflasi" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Discount Rate</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPercent} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>

                                    <input value={this.state.discountRate} 
                                        onChange={this.changeDiscountRate}
                                        placeholder="discount rate" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Subsidi energi</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPercent} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>

                                    <input value={this.state.subsidiEnergi} 
                                        onChange={this.changeSubsidiEnergi}
                                        placeholder="discount rate" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Jumlah Kendaraan Inisial</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCar} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>

                                    <input value={this.state.jumlahKendaraanInisial} 
                                        onChange={this.changeJumlahKendaraan}
                                        placeholder="jumlah kendaraan inisial" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Biaya Pekerjaan Sipil</td>
                            <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <CurrencyFormat placeholder="Biaya pekerjaan kelistrikan"
                                            value={this.state.biayaPekerjaSipil}
                                            style={{width: "200px"}} 
                                            thousandSeparator={true} prefix={''} 
                                            onValueChange={(values) => {
                                                const {formattedValue, value} = values
                                                this.changeBiayaSipil(value)
                                                // this.props.keyUpInput()
                                            }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Biaya Pekerjaan Kelitrikan</td>
                            <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>

                                    <CurrencyFormat placeholder="Biaya pekerjaan kelistrikan"
                                                value={this.state.biayaPekerjaKelistrikan}
                                                style={{width: "200px"}} 
                                                thousandSeparator={true} prefix={''} 
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.changeBiayaKelistrikan(value)
                                                }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Harga EVSE</td>
                            <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    <CurrencyFormat placeholder="Biaya pekerjaan kelistrikan"
                                                value={this.state.hargaEvse}
                                                style={{width: "200px"}} 
                                                thousandSeparator={true} prefix={''} 
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.changeHargaEvse(value)
                                                    // this.props.keyUpInput()
                                                }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}></td>
                            <td>&nbsp;&nbsp;&nbsp;
                                {
                                    (!this.state.isSaving)
                                    ?
                                        <button onClick={this.save} 
                                            className="btn-primary main-font-size bold" 
                                            style={{padding: "10px", marginTop: "10px"}}>
                                            <FontAwesomeIcon icon={faSave}/> Simpan Perubahan
                                        </button>
                                    :
                                        <button 
                                            className="btn-primary main-font-size bold" 
                                            style={{padding: "5px", marginTop: "10px", width: "120px", opacity: "0.8"}}>
                                            <img src={LoadRoll} style={{width: "20px"}}/>
                                        </button>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        data : state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataDefault : (data) => dispatch(setDefaultValue(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (kondisi_ekonomi_form)