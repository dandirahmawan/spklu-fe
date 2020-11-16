import React, { Component } from 'react'
import { faClock, faCog, faCoins, faMemory, faPercent, faPlus, faPlusCircle, faSave, faSdCard, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CurrencyFormat from 'react-currency-format'
import { connect } from 'react-redux'
import { setDefaultValue, setParameterBisnis } from '../../redux/action'
import Axios from 'axios'
import LoadRoll from '../../image/Rolling-1s-45px.gif'

class parameter_bisnis_form extends Component {

    constructor(){
        super()
        this.state = {
            hargaJualPln: "",
            hargaJualKonsumen: "",
            pertumbauhanKbl: "",
            rasioSpklu: "",
            durasiPenggunaan: "",
            biayaSewaLahan: "",
            jumlahEvse: "",
            dataKonektor: [],
            isSaving: false
        }

        this.changeEvse = this.changeEvse.bind(this)
        this.save = this.save.bind(this)
        this.changeBiayaSewaLahan = this.changeBiayaSewaLahan.bind(this)
        this.changeDurasiPenggunaan = this.changeDurasiPenggunaan.bind(this)
        this.changeEvse = this.changeEvse.bind(this)
        this.changeHargaJualKonsumen = this.changeHargaJualKonsumen.bind(this)
        this.changeHargaJualPln = this.changeHargaJualPln.bind(this)
        this.changePertumbuhanKb = this.changePertumbuhanKb.bind(this)
        this.changeRasioSpklu = this.changeRasioSpklu.bind(this)
    }

    componentDidMount(){
        let data = this.props.data
        this.setState({
            hargaJualPln: data.hargaJualPln,
            hargaJualKonsumen: data.hargaJualKonsumen,
            pertumbauhanKbl: data.pertumbuhanKbl,
            rasioSpklu: data.rasioSpklu,
            durasiPenggunaan: data.durasiPenggunaanEvse,
            biayaSewaLahan: data.biayaSewaLahan,
            jumlahEvse: data.jumlahDispenser,
            dataKonektor: JSON.parse(data.jumlahKonektor)
        })
    }

    changeHargaJualPln(e){
        this.setState({
            hargaJualPln: e.target.value
        })
    }

    changeHargaJualKonsumen(e){
        this.setState({
            hargaJualKonsumen: e.target.value
        })
    }

    changePertumbuhanKb(e){
        this.setState({
            pertumbauhanKbl: e.target.value
        })
    }

    changeRasioSpklu(e){
        this.setState({
            rasioSpklu: e.target.value
        })
    }

    changeDurasiPenggunaan(e){
        this.setState({
            durasiPenggunaan: e.target.value
        })
    }

    changeBiayaSewaLahan(val){
        this.setState({
            biayaSewaLahan: val
        })
    }

    changeEvse(e){
        let val = e.target.value
        this.setState({
            jumlahEvse: val
        })
    }

    save(){
         /*set data konektor*/
         let je = this.state.jumlahEvse
         let ddk = this.state.dataKonektor
         let jol = this.state.dataKonektor.length
         if(je > jol){
             for(let i = jol;i<je;i++){
                 let no = parseInt(i) + 1
                 let newData = {"evse": no,"konektor":[]}
                 ddk.push(newData)
             }
         }else{
             for(let i = je;i<jol;i++){
                 console.log(i)
                 ddk.splice(1, i)
             }
         }

        let params = []
        let hargaJualPln = this.setObj("harga_jual_pln", this.state.hargaJualPln, null)
        let hargaJualKonsumen = this.setObj("harga_jual_konsumen", this.state.hargaJualKonsumen, null)
        let pertumbauhanKbl = this.setObj("pertumbuhan_kbl", this.state.pertumbauhanKbl, null)
        let rasioSpklu = this.setObj("rasio_spklu", this.state.rasioSpklu, null)
        let durasiPenggunaan = this.setObj("durasi_penggunaan_evse", this.state.durasiPenggunaan, null)
        let biayaSewaLahan = this.setObj("biaya_sewa_lahan", this.state.biayaSewaLahan, null)
        let jumlahEvse = this.setObj("jumlah_evse", this.state.jumlahEvse, null)
        let jumlahKonektor = this.setObj("jumlah_konektor", JSON.stringify(this.state.dataKonektor), null)

        params.push(hargaJualPln)
        params.push(hargaJualKonsumen)
        params.push(pertumbauhanKbl)
        params.push(rasioSpklu)
        params.push(durasiPenggunaan)
        params.push(biayaSewaLahan)
        params.push(jumlahEvse)
        params.push(jumlahKonektor)

        this.setState({
            isSaving: true
        })

        Axios.post("/api/admin/form-values", params).then(res => {
            let resp = res.data
            this.props.setDataDefault(resp.data)

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
                                    <h1 className="bold"><FontAwesomeIcon icon={faCog}/> Parameter Bisnis</h1>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Harga Jual Pln (Rp 707 X Q)</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input value={this.state.hargaJualPln}
                                        onChange={this.changeHargaJualPln}
                                        placeholder="harga jual pln" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>
                                Harga jual Konsumen (Rp 1605 X N)
                            </td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input value={this.state.hargaJualKonsumen}
                                        onChange={this.changeHargaJualKonsumen}
                                        placeholder="harga jual konsumen" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Pertumbuhan KBL pertahun (%)</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPercent} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input value={this.state.pertumbauhanKbl}
                                        onChange={this.changePertumbuhanKb}
                                        placeholder="Pertumbuhan KBL pertahun" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Rasio SPKLU / KBL</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPlusCircle} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input value={this.state.rasioSpklu}
                                        onChange={this.changeRasioSpklu}
                                        placeholder="rasio SPKLU / KBL" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Durasi penggunaan EVSE / hari (jam)</td>
                            <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faClock} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input value={this.state.durasiPenggunaan}
                                        onChange={this.changeDurasiPenggunaan}
                                        placeholder="Durasi penggunaan EVSE / hari" 
                                        type="text" 
                                        style={{width: "200px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Biaya sewa lahan SPKLU / tahun</td>
                            <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    <CurrencyFormat placeholder="Biaya pekerjaan kelistrikan"
                                                value={this.state.biayaSewaLahan}
                                                style={{width: "200px"}} 
                                                thousandSeparator={true} prefix={''} 
                                                onValueChange={(values) => {
                                                    const {formattedValue, value} = values
                                                    this.changeBiayaSewaLahan(value)
                                                }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Jumlah EVSE</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPlus} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input onChange={this.changeEvse} value={this.state.jumlahEvse}
                                        placeholder="rasio SPKLU / KBL" 
                                        type="text" 
                                        style={{width: "200px"}}/>
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
        setParamterBisnis: (data) => dispatch(setParameterBisnis(data)),
        setDataDefault : (data) => dispatch(setDefaultValue(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (parameter_bisnis_form)