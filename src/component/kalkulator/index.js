import React, {useRef} from 'react';
import Header from './header'
import InputBase from './input_base'
import MainBase from './main_base'
import axios from 'axios'
import '../../style/main.css'
import Alert from './alert'
import {numberOnlyInput, optzBiayaSewaLahanMaksimum, optzNpvMaksimum, optzRasiohargalistrikPLNmaksimum, optzRasioMinimumSPKLUBEV, optzRasioTarifJualSPKLUMinimum} from '../../function/function'
import { connect } from 'react-redux';
import { setDefaultValue } from '../../redux/action';
import LoadGif from '../../image/Pulse-1s-200px.gif';
import LoadRoll from '../../image/Rolling-1s-45px.gif'
import { choicesOptimize } from '../../const/const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faTimes } from '@fortawesome/free-solid-svg-icons';

class index extends React.Component{

  state = {
    pph: null,
    inflasi:null,
    discountRate:null,
    jumlahKendaraanInisial:null,
    biayaSpklu:null,
    hargaJualPln:null,
    hargaJualKonsumen:null,
    pertumbuhanKblPerTahun:null,
    rasioSpklu:null,
    biayaEvse: "",
    biayaSipil: "",
    biayaKelistrikan: "",
    biayaSewaLahan: "",
    dayaLuaran: 0,
    jsonParam:{},
    data:null,
    alertBase: null,
    isLoad: false,
    isOptimaziSolutif: true,
    isOptimize: false,
    typeOptimize: null,
    isLoadStart: true,
    hideOptimize: true,
    requestCalculate: {}
  }

  inputBiayaEvse = React.createRef()
  inputBiayaSipil = React.createRef()
  inputBiayaKelistrikan = React.createRef()
  inputDiscountRate = React.createRef()
  inputSubsidiEnergi = React.createRef()
  inputHargaJualKonsumen = React.createRef()
  inputHargaJualPln = React.createRef()
  inputInflasi = React.createRef()
  inputJumlahKendaraanInisial = React.createRef()
  inputPph = React.createRef()
  inputPertumbuhanKblPerTahun = React.createRef() 
  inputRasioSpklu = React.createRef()
  inputJumlahKonektor = React.createRef()
  // inputDayaMaksimum = React.createRef()
  inputKapasitasKbl = React.createRef()
  inputRugiDayaPendukung = React.createRef()
  inputStartYear = React.createRef()
  inputFinishYear = React.createRef()
  inputOptimizeType = React.createRef()
  inputBiayaSewaLahan = React.createRef()
  inputPenggunaanEvse = React.createRef()
  baseKalkulator = React.createRef()
  inputJumlahDispenser = React.createRef()

  changeBiayaEvse = this.changeBiayaEvse.bind(this)
  changeBiayaKelistrikan = this.changeBiayaKelistrikan.bind(this)
  changeBiayaSipil = this.changeBiayaSipil.bind(this)
  changeBiayaSewaLahan = this.changeBiayaSewaLahan.bind(this)
  hideOptimizeAction = this.hideOptimizeAction.bind(this)
  runSimulasi = this.runSimulasi.bind(this)
  hideAlert = this.hideAlert.bind(this)
  copyOptimize = this.copyOptimize.bind(this)

  componentDidMount(){
    document.addEventListener("keydown", numberOnlyInput)
    axios.get("/api/admin/form-value").then(res => {
      if(res.data.message == "success"){
        this.props.setDataDefaultRedux(res.data.data)
        this.inputBiayaKelistrikan.current.value = this.props.dataDefault.biayaPekerjaanKelistrikan
        this.inputBiayaSipil.current.value = this.props.dataDefault.biayaPekerjaanSipil
        this.inputBiayaSewaLahan.current.value =  this.props.dataDefault.biayaSewaLahan
        this.inputDiscountRate.current.value = this.props.dataDefault.discountRate
        this.inputPenggunaanEvse.current.value = this.props.dataDefault.durasiPenggunaanEvse
        this.inputBiayaSewaLahan.current.value = this.props.dataDefault.biayaSewaLahan
        this.inputHargaJualKonsumen.current.value = this.props.dataDefault.hargaJualKonsumen
        this.inputHargaJualPln.current.value = this.props.dataDefault.hargaJualPln
        this.inputInflasi.current.value = this.props.dataDefault.inflasi
        this.inputJumlahKendaraanInisial.current.value = this.props.dataDefault.jumlahKendaraanInisial
        this.inputSubsidiEnergi.current.value = this.props.dataDefault.subsidiEnergi
        
        this.inputKapasitasKbl.current.value = this.props.dataDefault.kapasitasKbl
        this.inputPertumbuhanKblPerTahun.current.value = this.props.dataDefault.pertumbuhanKbl
        this.inputPph.current.value = this.props.dataDefault.pph
        this.inputRasioSpklu.current.value = this.props.dataDefault.rasioSpklu
        this.inputRugiDayaPendukung.current.value = this.props.dataDefault.rugiDayaPendukung
        this.inputJumlahDispenser.current.value = this.props.dataDefault.jumlahDispenser

        this.setState({
          biayaKelistrikan: this.props.dataDefault.biayaPekerjaanKelistrikan,
          biayaSipil: this.props.dataDefault.biayaPekerjaanSipil,
          biayaSewaLahan: this.props.dataDefault.biayaSewaLahan,
          biayaEvse: this.props.dataDefault.hargaEVSE,
          isLoadStart: false
        })

        this.baseKalkulator.current.style.display = "block"
      }
    })
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps != this.props){
  //     this.setState({
  //       biayaEvse: this.props.dataDefault.hargaEVSE,
  //       biayaSewaLahan: this.props.dataDefault.biayaSewaLahan
  //     })
      
  //     this.inputRasioSpklu.current.value = this.props.dataDefault.rasioSpklu
  //     this.inputHargaJualPln.current.value = this.props.dataDefault.hargaJualPln
  //     this.inputHargaJualKonsumen.current.value = this.props.dataDefault.hargaJualKonsumen
  //     // console.log(this.props.dataDefault.biayaSewaLahan)
  //     // console.log(this.inputBiayaSewaLahan.current)
  //     this.inputBiayaSewaLahan.current.value = this.props.dataDefault.biayaSewaLahan
  //   } 
  // }

  runSimulasi(type, isGetCsv){
    let pph = this.inputPph.current.value
    let inflasi = this.inputInflasi.current.value
    let discountRate = this.inputDiscountRate.current.value
    let subsidiEnergi = this.inputSubsidiEnergi.current.value
    let jumlahKendaraanInisial = this.inputJumlahKendaraanInisial.current.value
    let biayaEvse = this.inputBiayaEvse.current.value
    let biayaKelistrikan = this.inputBiayaKelistrikan.current.value
    let biayaSipil = this.inputBiayaSipil.current.value
    let hargaJualPln = this.inputHargaJualPln.current.value
    let hargaJualKonsumen = this.inputHargaJualKonsumen.current.value
    let pertumbuhanKblPerTahun = this.inputPertumbuhanKblPerTahun.current.value
    let rasioSpklu = this.inputRasioSpklu.current.value
    let kapasitasKbl = this.inputKapasitasKbl.current.value
    let rugiDayaPendukung = this.inputRugiDayaPendukung.current.value
    let startYear = this.inputStartYear.current.value
    let finishYear = this.inputFinishYear.current.value
    let sewaLahan = this.inputBiayaSewaLahan.current.value
    let penggunaanEvse = this.inputPenggunaanEvse.current.value
    let biayaSpklu = parseFloat(biayaEvse)
    let biayaInvestasiLahan = parseFloat(biayaKelistrikan) + parseFloat(biayaSipil)

    /*get total daya*/
    this.state.dayaLuaran = 0
    let elms = document.getElementsByClassName("kwh-jmk-chl")
    for(let i = 0;i<elms.length;i++){
      let val = elms[i].value
      this.state.dayaLuaran = parseInt(this.state.dayaLuaran) + parseInt(val)
    }

    /*initiation json objet data*/
    let jsonObject = {}
    let jsonObjectEkonomi = {}
    let jsonObjectBisnis = {}
    let jsonObjectTeknis = {}
    let jsonObjectYears = {}
    
    /*set parameter ekonimi json*/
    jsonObjectEkonomi.pph = pph
    jsonObjectEkonomi.inflasi = inflasi
    jsonObjectEkonomi.discountRate = discountRate
    jsonObjectEkonomi.jumlahKendaraanInisial = jumlahKendaraanInisial
    jsonObjectEkonomi.biayaSpklu = biayaSpklu
    jsonObjectEkonomi.biayaInvestasiLahan = biayaInvestasiLahan
    jsonObjectEkonomi.subsidiEnergi = subsidiEnergi

    /*set parameter bisnis json*/
    jsonObjectBisnis.hargaJualPln = hargaJualPln
    jsonObjectBisnis.hargaJualKonsumen = hargaJualKonsumen
    jsonObjectBisnis.pertumbuhanKblPerTahun = pertumbuhanKblPerTahun
    jsonObjectBisnis.rasioSpklu = rasioSpklu
    jsonObjectBisnis.biayaSewaLahan = sewaLahan
    jsonObjectBisnis.penggunaanEvsePerJam = penggunaanEvse

    /*set parameter teknis json*/
    let dataKonektor = this.getDataInputKonektor()
    let totalDayaLuaran = dataKonektor.totalDayaLuaran
    jsonObjectTeknis.jumlahKonektor = dataKonektor.jumlahKonektor
    jsonObjectTeknis.kwhPerKonektor = dataKonektor.konektor
    // jsonObjectTeknis.dayaMaksimum = 0
    jsonObjectTeknis.kapasitasKbl = kapasitasKbl
    jsonObjectTeknis.rugiDayaPendukung = rugiDayaPendukung

    /*set paramter years*/
    jsonObjectYears.startYear = startYear
    jsonObjectYears.finishYear = finishYear

    jsonObject.kondisiEkonomi = jsonObjectEkonomi
    jsonObject.parameterBisnis = jsonObjectBisnis
    jsonObject.parameterTeknis = jsonObjectTeknis
    jsonObject.years = jsonObjectYears

    let isValid = true
    let altClass = document.getElementsByClassName("base-alt-ip")
    for(let i = 0;i<altClass.length;i++){
      let parent = altClass[i].parentElement
      let child = parent.children[0]
      altClass[i].style.display = "none"
      
      if(child.children[0] !== undefined){
        let input = child.children[0].children[1]
        if(input !== undefined){
          if(input.value == "") {
            altClass[i].style.display = "block"
            isValid = false
          }
        }
      } 
    }

    /*validation konektor*/
    let altClass1 = document.getElementsByClassName("base-alt-ip-1")
    for(let i = 0;i<altClass1.length;i++){
      let parent = altClass1[i].parentElement
      let child = parent.children[0]
      altClass1[i].style.display = "none"
      
      if(child.children[0] !== undefined){
        let input = child.children[0].children[0].children[1]
        if(input.value == "") {
          altClass1[i].style.display = "block"
          isValid = false
        }
      } 
    }

    /*validation tiap kwh konektor*/
    let inputEachKonektor = document.getElementsByClassName("kwh-jmk-chl")
    for(let i = 0;i < inputEachKonektor.length;i++){
      let value = inputEachKonektor[i].value
      if(value <= 0 || value == ""){
        isValid = false
        
        let prt = inputEachKonektor[i].parentElement.parentElement
        let child = prt.children[2]
        child.style.display = "block"
      }else{
        let prt = inputEachKonektor[i].parentElement.parentElement
        let child = prt.children[2]
        child.style.display = "none"
      }
    }

    /*validation year input is here*/
    let elmYearInput = document.getElementsByClassName("year-input")
    for(let i = 0;i<elmYearInput.length;i++){
      if(elmYearInput[i].value < 0 || elmYearInput[i].value == ""){
        let parent = elmYearInput[i].parentElement.parentElement.parentElement
        parent.children[1].style.display = "block"
        isValid = false
      }
    }

    if(!isValid){
      let desc = "<div>Pastikan semua form data pada <span class='bold'>kondisi ekonomi</span>, "+ 
              "<span class='bold'>parameter bisnis</span>, <span class='bold'>parameter teknis</span> dan <span class='bold'>rentang waktu</span> terisi.</div>"
      this.setState({
        alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
      })

      return false
    }else{
      if(jsonObjectYears.startYear > jsonObjectYears.finishYear){
        let desc = "<div>tahun mulai tidak boleh lebih dari tahun selesai"
        this.setState({
          alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
        })

        return false
      }
    }

    /*validation perkalian*/
    let xa = rasioSpklu * kapasitasKbl
    let xb = this.state.dayaLuaran * penggunaanEvse
    // console.log("total daya luaran : "+this.state.dayaLuaran)
    if(xa > xb){
      let desc = "hasil <span class='bold'>rasio spklu : bev * Kapasitas pengisian 1 kendaraan listrik</span> tidak boleh lebih dari "
                +"hasil <span class='bold'>Total daya luaran EVSE * Durasi penggunaan EVSE / hari</span>"
      this.setState({
        alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
      })

      return false
    }
    
    if(type == "optimize"){
      let typeOptimize = this.inputOptimizeType.current.value
      if(typeOptimize == ""){
        let desc = "Type optimize belum dipilih"
        this.setState({
          alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
        })
        return false
      }else{
        this.setState({
          isOptimize: true,
        })
      }
    }

    if(!isGetCsv){
      this.setState({isLoad: true})
      if(type == "optimize"){
        /*get variable type optimize*/
        let typeOptimize = this.inputOptimizeType.current.value
        let variable = "harga-evse"
        choicesOptimize.map(dt => {
          if(typeOptimize == dt.id){
            variable = dt.name
          }
        })

        this.setState({isOptimize: true, typeOptimize: typeOptimize})
        axios.post("/api/calculate?optimize=true&typeOptimize="+variable, jsonObject).then(res => {

          /*
          k : kapasitas pengisian kendaraan
          p : total daya luara evse
          d : durasi penggunaan evse / hari
          u : rasio spklu : bev
          q : rasio harga beli listrik
          n : rasio harga jual listrik
          g : pertumbuhan tahunan kendaraan 
          gapYear, 
          npv, discountRate, irr, pp
          */
          let outPutRequest = res.data.data.requestCalculate
          let k = outPutRequest.parameterTeknis.kapasitasKbl
          let p = totalDayaLuaran
          let d = outPutRequest.parameterBisnis.penggunaanEvsePerJam
          let u = outPutRequest.parameterBisnis.rasioSpklu
          let q = outPutRequest.parameterBisnis.hargaJualPln
          let n = outPutRequest.parameterBisnis.hargaJualKonsumen
          let g = outPutRequest.parameterBisnis.pertumbuhanKblPerTahun
          let npv = res.data.data.responseCalculate.npv
          let irr = res.data.data.responseCalculate.irr
          let pp = res.data.data.responseCalculate.pprd

          let isSolutif = true
          if(typeOptimize == "b" || typeOptimize == "c"){
            isSolutif = optzNpvMaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp)
          }else if(typeOptimize == "d"){
            isSolutif = optzRasioMinimumSPKLUBEV(k, p, d, u, q, n, g, npv, discountRate, irr, pp)
          }else if(typeOptimize == "e"){
            isSolutif = optzRasiohargalistrikPLNmaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp)
          }else if(typeOptimize == "f"){
            isSolutif = optzRasioTarifJualSPKLUMinimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp)
          }else if(typeOptimize == "g"){
            isSolutif = optzBiayaSewaLahanMaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp)
          }

          if(!isSolutif){
            this.setState({
              data: null,
              isLoad: false,
              alertBase: <Alert alertDescription={"hasil optimize tidak solutif"} okAlert={this.hideAlert}/>
            })
          }else{
            this.setState({
              data: res.data.data,
              discountRate: discountRate,
              requestCalculate: res.data.data.requestCalculate,
              isLoad: false,
              hideOptimize: false
            })
          }
        }).catch(err => {
          this.setState({
            data: null,
            isLoad: false,
            alertBase: <Alert alertDescription={"hasil optimize diluar yang dapat dihitung"} okAlert={this.hideAlert}/>
          })
        })
      }else{
        this.setState({isOptimize: false, typeOptimize: null})
        axios.post("/api/calculate", jsonObject).then(res => {
          this.setState({
            data: res.data.data,
            discountRate: discountRate,
            requestCalculate: res.data.data.requestCalculate,
            isLoad: false,
            hideOptimize: false
          })
        })
      }
    }else{
      let elm = document.getElementsByClassName("fx-loader-bse")[0]
      elm.style.display = "flex"

      let par = (!this.state.isOptimize) ? jsonObject : this.state.requestCalculate
      axios.post("/api/calculate/excel", par).then(res => {
        // console.log(res.data.data)
        // window.location.href = res.data.data
        setTimeout(() => {
          elm.style.display = "none"
        }, 1500)
      })
    }
  }
    

  hideAlert(){
    this.setState({
      alertBase: null
    })
  }

  keyUpInput(e){
    // let parent = e.target.parentElement.parentElement.parentElement
    // if(e.target.value != ""){
    //   parent.children[1].style.display = "none"
    // }
  }

  changeBiayaEvse(val){
    this.setState({
      biayaEvse: val
    })
  }

  changeBiayaSipil(val){
    this.setState({
      biayaSipil: val
    })
  }

  changeBiayaKelistrikan(val){
    this.setState({
      biayaKelistrikan: val
    })
  }

  changeBiayaSewaLahan(val){
    this.setState({
      biayaSewaLahan: val
    })
  }

  hideOptimizeAction(){
    this.setState({
      hideOptimize: true
    })
  }

  getDataInputKonektor(){
    let ipc = document.getElementsByClassName("ipk-cd-prds")
    let jumlahKonektor = 0
    let totalDaya = 0
    let joArr = []
    
    for(let i = 0;i<ipc.length;i++){
      let prt = ipc[i].parentElement.parentElement.parentElement
      let chld = prt.children[1].children
      let jo = {}
      jo.evse = parseInt(1) + i

      let arrJo = []
      for(let ii = 0;ii<chld.length;ii++){
        let valData = chld[ii].children[1].children[1].value
        let joKonektor = {}
        joKonektor.no = parseInt(1) + i
        joKonektor.value = valData
        arrJo.push(joKonektor)
        
        /*set jumlah konektor*/
        jumlahKonektor++
        totalDaya += parseInt(valData)
      }

      jo.konektor = arrJo
      joArr.push(jo)
    }

    let data = {}
    data.jumlahKonektor = jumlahKonektor
    data.konektor       = joArr
    data.totalDayaLuaran = totalDaya
    return data
  }

  copyOptimize(type, val){
    if(type == "harga evse"){
      this.setState({
        biayaEvse: val
      })
    }
    
    if(type == "biaya sewa lahan"){
      this.setState({
        biayaSewaLahan: val
      })
    }

    if(type == "rasio spklu"){
      this.inputRasioSpklu.current.value = val
    }

    if(type == "harga jual pln"){
      this.inputHargaJualPln.current.value = val
    }

    if(type == "harga jual konsumen"){
      this.inputHargaJualKonsumen.current.value = val
    }

    if(type == "subsidi energi"){
      this.inputSubsidiEnergi.current.value = val
    }
  }

  hideFxBse(){
    let elm = document.getElementsByClassName("fx-loader-bse")[0]
    elm.style.display = "none"
  }

  render(){
      return (
        <div>
          {this.state.alertBase}
          <Header/>
          {
            (this.state.isLoadStart)
            ?
              <div>
                  <div className="gryscale-font-color" style={{background: "#FFF", textAlign: "center", paddingTop: "80px"}}>
                      <img src={LoadGif} style={{width: "100px"}}/>
                      <div className="main-font-size bold" style={{marginTop: "-35px"}}>memuat..</div>
                  </div>
              </div>
            :
              ""
          }

          <div id="demo"/>
          
          <div ref={this.baseKalkulator} id="base-kalkulator" style={{display: "none"}}>
            <InputBase
                inputPph={this.inputPph}
                inputBiayaEvse={this.inputBiayaEvse}
                inputBiayaKelistrikan={this.inputBiayaKelistrikan}
                inputBiayaSipil={this.inputBiayaSipil}
                inputDiscountRate={this.inputDiscountRate}
                inputSubsidiEnergi={this.inputSubsidiEnergi}
                inputHargaJualKonsumen={this.inputHargaJualKonsumen}
                inputHargaJualPln={this.inputHargaJualPln}
                inputInflasi={this.inputInflasi}
                inputJumlahKendaraanInisial={this.inputJumlahKendaraanInisial}
                inputPertumbuhanKblPerTahun={this.inputPertumbuhanKblPerTahun}
                inputRasioSpklu={this.inputRasioSpklu}
                inputJumlahKonetor={this.inputJumlahKonektor}
                jumlahKonektorData={this.props.dataDefault.jumlahKonektor}
                inputJumlahDispenser={this.inputJumlahDispenser}
                // inputDayaMaksimum={this.inputDayaMaksimum}
                inputKapasitasKbl={this.inputKapasitasKbl}
                inputRugiDayaPendukung={this.inputRugiDayaPendukung}
                inputBiayaSewaLahan={this.inputBiayaSewaLahan}
                inputPenggunaanEvse={this.inputPenggunaanEvse}
                biayaEvse= {this.state.biayaEvse}
                biayaSipil= {this.state.biayaSipil}
                biayaKelistrikan= {this.state.biayaKelistrikan}
                biayaSewaLahan= {this.state.biayaSewaLahan}
                changeBiayaEvse= {this.changeBiayaEvse}
                changeBiayaKelistrikan= {this.changeBiayaKelistrikan}
                changeBiayaSipil= {this.changeBiayaSipil}
                changeBiayaSewaLahan= {this.changeBiayaSewaLahan}
                keyUpInput={this.keyUpInput}
            />

            <MainBase 
                startYear={this.inputStartYear} 
                finishYear={this.inputFinishYear} 
                runSimulasi={this.runSimulasi}
                inputOptimizeType={this.inputOptimizeType}
                discountRate={this.state.discountRate}
                isLoad={this.state.isLoad}
                hideOptimize={this.state.hideOptimize}
                hideOptimizeAction={this.hideOptimizeAction}
                data={this.state.data}
                isOptimize={this.state.isOptimize}
                typeOptimize={this.state.typeOptimize}
                tsOptimizeSolutif={this.state.isOptimaziSolutif}
                copyOptimize={this.copyOptimize}
            />
          </div>
          
          <div className="fx-loader-bse main-border shadow" style={{background: "#000", color: "#FFF", alignItems: "center"}}>
            <img src={LoadRoll} style={{width: "20px"}}/>&nbsp;&nbsp;&nbsp;
            <div>
              <FontAwesomeIcon icon={faFileExcel} style={{color: "green"}}/>&nbsp;&nbsp;
              <span>generate to excel...</span>
            </div>
            <div style={{marginLeft: "20px", borderLeft: "1px solid #CCC", paddingLeft: "10px"}}>
              <a onClick={this.hideFxBse}><FontAwesomeIcon icon={faTimes} style={{color: "FFF"}}/></a>
            </div>
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return{
    dataDefault : state
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setDataDefaultRedux : (data) => dispatch(setDefaultValue(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (index);