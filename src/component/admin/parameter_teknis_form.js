import React, { Fragment } from 'react'
import { faBatteryFull, faCog, faCoins, faMemory, faPercent, faPlus, faSave, faSdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { connect } from 'react-redux'
import { setDefaultValue } from '../../redux/action'
import LoadRoll from '../../image/Rolling-1s-45px.gif'

class parameter_teknis_form extends React.Component {

    constructor(){
        super()
        this.state = {
            jumlahEvse : [],
            dataKonektor : [],
            kapasitasKbl : 0,
            rugiDayaPendukung: 0,
            isSaving : false
        }

        this.changeKapasitasKbl = this.changeKapasitasKbl.bind(this)
        this.changeRugiDayaPendukung = this.changeRugiDayaPendukung.bind(this)
        this.changeKonektor = this.changeKonektor.bind(this)
        this.changeDaya = this.changeDaya.bind(this)
        this.save = this.save.bind(this)
    }

    componentDidMount(){
        console.log(this.props)
        let arr = []
        for(let i = 0;i<this.props.data.jumlahDispenser;i++){
            arr.push(1)
        }

        this.setState({
            dataKonektor: JSON.parse(this.props.data.jumlahKonektor),
            rugiDayaPendukung: this.props.data.rugiDayaPendukung,
            kapasitasKbl: this.props.data.kapasitasKbl,
            jumlahEvse: arr
        })
    }

    changeKapasitasKbl(e){
        this.setState({
            kapasitasKbl: e.target.value
        })
    }

    changeRugiDayaPendukung(e){
        this.setState({
            rugiDayaPendukung: e.target.value
        })
    }

    changeDaya(e, evse, konektor){
        const newData = this.state.dataKonektor[evse].konektor.map(dt => {
                            if(konektor == dt.no){
                                dt.value = e.target.value
                            }
                            return dt
                        })
        
        this.state.dataKonektor[evse].konektor = newData
        this.setState({
            dataKonektor: this.state.dataKonektor
        })
    }

    changeKonektor(e, evse){
        let val = e.target.value
        let data = this.state.dataKonektor[evse]
        let l = (data !== undefined) ? data.konektor.length : 0

        /*create new array*/
        if(data === undefined){
            data = {konektor: []}
        }

        if(l > val){
            let lastSplice = l - (l - val)
            for(let i = 0;i<l;i++){
                let sq = val - 1
                if(sq < i){
                    data.konektor.splice(lastSplice, 1) 
                }
            }

        }else{
            let st = l
            for(let i = l;i<val;i++){
                st += parseInt(1)
                let jo = {"no": st, "value": ""}
                data.konektor.push(jo)
            }
        }

        this.setState({
            dataKonektor: this.state.dataKonektor
        })
    }

    save(){
        let params = []
        let kapasitasKbl = this.setObj("kapasitas_kbl", this.state.kapasitasKbl, null)
        let rugiDayaPendukung = this.setObj("rugi_dan_daya_pendukung", this.state.rugiDayaPendukung, null)
        let dataKonektor = this.setObj("jumlah_konektor", JSON.stringify(this.state.dataKonektor), null)
        
        params.push(kapasitasKbl)
        params.push(rugiDayaPendukung)
        params.push(dataKonektor)
        
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

        let i = 0
        const inputKonektor = this.state.jumlahEvse.map(dt => {
            let input = ""
            let seq = i
            let jumlahKonektor = (this.state.dataKonektor[i] !== undefined) ? this.state.dataKonektor[i].konektor.length : ""
          
            if(this.state.dataKonektor[i] !== undefined){
                let ii = 0
                input = this.state.dataKonektor[i].konektor.map(dt => {
                            ii++
                            let kon = ii
                            return <div style={{alignItems: "center",  marginTop: "5px"}}>
                                        <div style={{fontSize: "11px", marginBottom: "2px"}}>daya konektor ke {kon} (Kw)</div>
                                        <div className="main-border base-input-form" style={{width: "185px", display: "flex", }}>
                                            <div className="bold main-font-size" style={{color: "#000", padding: "7px"}}>{kon}.</div>
                                            <input className="kwh-jmk-chl main-font-size" 
                                                value={dt.value}
                                                onChange={(e) => this.changeDaya(e, seq, kon)}
                                                type="text" placeholder="(Kw)" 
                                                style={{width: "100%", boxSizing: "border-box"}}></input>
                                        </div>
                                    </div>
                        })
            }

            i++
            return(
                <tr>
                    <td className="main-font-size bold" valign="top" style={{textAlign: "right", paddingTop: "9px"}}>
                        Konektor EVSE {i}</td>
                    <td>
                        <div className="main-font-size main-border" 
                            style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                            <div className="gryscale-font-color">
                                <FontAwesomeIcon icon={faPlus} style={{marginRight: "5px", marginLeft: "10px"}}/>
                            </div>
                            
                            <select onChange={(e) => this.changeKonektor(e, seq)} value={jumlahKonektor} style={{border: "none", width: "100%"}}>
                                <option value="" style={{display: "none"}}>pilih jumlah konektor</option>
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
                        </div>
                        <div style={{marginLeft: "15px", marginBottom: "5px", paddingLeft: "40px", borderLeft: "3px solid #CCC"}}>
                            {input}
                        </div>
                    </td>
                </tr>
            )
        })

        return(
            <div style={{marginLeft: "350px", marginTop: "70px", marginBottom: "10px"}}>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><div style={{marginBottom: "20px"}}>
                                    {/* <span className="main-font-size gryscale-font-color">
                                        <FontAwesomeIcon icon={faCog}/> default value
                                    </span> */}
                                    <h1 className="bold"><FontAwesomeIcon icon={faCog}/> Parameter Teknis</h1>
                                </div>
                            </td>
                        </tr>

                        {inputKonektor}
                        
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Kapasitas 1 KBL (Kwh)</td>
                            <td><div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faBatteryFull} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input onChange={this.changeKapasitasKbl} value={this.state.kapasitasKbl} 
                                        placeholder="kapasital 1 KBL (Kwh)" 
                                        type="text" 
                                        style={{width: "250px"}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}>Rugi - rugi dan Daya Pendukung</td>
                                <td>
                                <div className="main-font-size main-border" 
                                    style={{display: "flex", alignItems: "center", marginLeft: "10px", borderRadius: "3px"}}>
                                    <div className="gryscale-font-color">
                                        <FontAwesomeIcon icon={faPercent} style={{marginRight: "5px", marginLeft: "10px"}}/>
                                    </div>
                                    
                                    <input onChange={this.changeRugiDayaPendukung} value={this.state.rugiDayaPendukung} 
                                        placeholder="kapasital 1 KBL (Kwh)" 
                                        type="text" 
                                        style={{width: "250px"}}/>
                                </div>
                                </td>
                        </tr>
                        <tr>
                            <td className="main-font-size bold" style={{textAlign: "right"}}></td>
                            <td>&nbsp;&nbsp;&nbsp;
                                {
                                    (!this.state.isSaving)
                                    ?
                                        <button onClick={this.save} className="btn-primary main-font-size bold" style={{padding: "10px", marginTop: "10px"}}>
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

export default connect(mapStateToProps, mapDispatchToProps) (parameter_teknis_form)