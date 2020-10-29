import React from 'react';
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
    dayaLuaran: "",
    jsonParam:{},
    data:null,
    alertBase: null,
    isLoad: false,
    isOptimaziSolutif: true,
    isOptimize: false,
    isLoadStart: true
  }

  inputBiayaEvse = React.createRef()
  inputBiayaSipil = React.createRef()
  inputBiayaKelistrikan = React.createRef()
  inputDiscountRate = React.createRef()
  inputHargaJualKonsumen = React.createRef()
  inputHargaJualPln = React.createRef()
  inputInflasi = React.createRef()
  inputJumlahKendaraanInisial = React.createRef()
  inputPph = React.createRef()
  inputPertumbuhanKblPerTahun = React.createRef() 
  inputRasioSpklu = React.createRef()
  inputJumlahKonektor = React.createRef()
  inputDayaMaksimum = React.createRef()
  inputKapasitasKbl = React.createRef()
  inputRugiDayaPendukung = React.createRef()
  inputStartYear = React.createRef()
  inputFinishYear = React.createRef()
  inputOptimizeType = React.createRef()
  inputBiayaSewaLahan = React.createRef()
  inputPenggunaanEvse = React.createRef()
  baseKalkulator = React.createRef()

  changeBiayaEvse = this.changeBiayaEvse.bind(this)
  changeBiayaKelistrikan = this.changeBiayaKelistrikan.bind(this)
  changeBiayaSipil = this.changeBiayaSipil.bind(this)
  changeBiayaSewaLahan = this.changeBiayaSewaLahan.bind(this)

  runSimulasi = this.runSimulasi.bind(this)
  hideAlert = this.hideAlert.bind(this)

  componentDidMount(){
    document.addEventListener("keydown", numberOnlyInput)
    axios.get("/api/admin/form-value").then(res => {
      if(res.data.message == "success"){
        this.props.setDataDefaultRedux(res.data.data)

        this.inputBiayaKelistrikan.current.value = this.props.dataDefault.biayaPekerjaanKelistrikan
        this.inputBiayaSipil.current.value = this.props.dataDefault.biayaPekerjaanSipil
        this.inputBiayaSewaLahan.current.value =  this.props.dataDefault.biayaSewaLahan
        this.inputDayaMaksimum.current.value = this.props.dataDefault.dayaMaksimumKonektor
        this.inputDiscountRate.current.value = this.props.dataDefault.discountRate
        this.inputPenggunaanEvse.current.value = this.props.dataDefault.durasiPenggunaanEvse
        this.inputBiayaSewaLahan.current.value = this.props.dataDefault.biayaSewaLahan
        // this.props.dataDefault.hargaEVSE
        this.inputHargaJualKonsumen.current.value = this.props.dataDefault.hargaJualKonsumen
        this.inputHargaJualPln.current.value = this.props.dataDefault.hargaJualPln
        this.inputInflasi.current.value = this.props.dataDefault.inflasi
        this.inputJumlahKendaraanInisial.current.value = this.props.dataDefault.jumlahKendaraanInisial
        this.inputJumlahKonektor.current.value = this.props.dataDefault.jumlahKonektor
        this.inputKapasitasKbl.current.value = this.props.dataDefault.kapasitasKbl
        this.inputPertumbuhanKblPerTahun.current.value = this.props.dataDefault.pertumbuhanKbl
        this.inputPph.current.value = this.props.dataDefault.pph
        this.inputRasioSpklu.current.value = this.props.dataDefault.rasioSpklu
        this.inputRugiDayaPendukung.current.value = this.props.dataDefault.rugiDayaPendukung
        
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

  runSimulasi(type, isGetCsv){
    let pph = this.inputPph.current.value
    let inflasi = this.inputInflasi.current.value
    let discountRate = this.inputDiscountRate.current.value
    let jumlahKendaraanInisial = this.inputJumlahKendaraanInisial.current.value
    let biayaEvse = this.inputBiayaEvse.current.value
    let biayaKelistrikan = this.inputBiayaKelistrikan.current.value
    let biayaSipil = this.inputBiayaSipil.current.value
    let hargaJualPln = this.inputHargaJualPln.current.value
    let hargaJualKonsumen = this.inputHargaJualKonsumen.current.value
    let pertumbuhanKblPerTahun = this.inputPertumbuhanKblPerTahun.current.value
    let rasioSpklu = this.inputRasioSpklu.current.value
    
    let jumlahKonektor = this.inputJumlahKonektor.current.value
    let kwhPerKonektor = []
    let itemJumlahKonektor = document.getElementsByClassName("kwh-jmk-chl")
    for(let i = 0;i<itemJumlahKonektor.length;i++){
      let itemValue = parseInt(itemJumlahKonektor[i].value)
      let json = {}
      json.no = i + 1
      json.value = itemValue
      kwhPerKonektor.push(json)
    }
    
    let dayaMaksimum = this.inputDayaMaksimum.current.value
    let kapasitasKbl = this.inputKapasitasKbl.current.value
    let rugiDayaPendukung = this.inputRugiDayaPendukung.current.value
    let startYear = this.inputStartYear.current.value
    let finishYear = this.inputFinishYear.current.value
    let sewaLahan = this.inputBiayaSewaLahan.current.value
    let penggunaanEvse = this.inputPenggunaanEvse.current.value
    let biayaSpklu = parseFloat(biayaEvse)
    let biayaInvestasiLahan = parseFloat(biayaKelistrikan) + parseFloat(biayaSipil)

    /*get total daya*/
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

    /*set parameter bisnis json*/
    jsonObjectBisnis.hargaJualPln = hargaJualPln
    jsonObjectBisnis.hargaJualKonsumen = hargaJualKonsumen
    jsonObjectBisnis.pertumbuhanKblPerTahun = pertumbuhanKblPerTahun
    jsonObjectBisnis.rasioSpklu = rasioSpklu
    jsonObjectBisnis.biayaSewaLahan = sewaLahan
    jsonObjectBisnis.penggunaanEvsePerJam = penggunaanEvse

    /*set parameter teknis json*/
    jsonObjectTeknis.jumlahKonektor = jumlahKonektor
    jsonObjectTeknis.kwhPerKonektor = kwhPerKonektor
    jsonObjectTeknis.dayaMaksimum = dayaMaksimum
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
        let child = prt.children[1]
        child.style.display = "block"
      }else{
        let prt = inputEachKonektor[i].parentElement.parentElement
        let child = prt.children[1]
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

    if(!isGetCsv){
      this.setState({isLoad: true})
      axios.post("/api/calculate", jsonObject).then(res => {
            let optimize = true
            let isOptimizing = false

            /*optimze run validation*/
            if(type == "optimize"){
              let typeOptimize = this.inputOptimizeType.current.value
              let u = parseFloat(rasioSpklu)
              let q = parseFloat(hargaJualPln)
              let n = parseFloat(hargaJualKonsumen)
              let g = parseFloat(pertumbuhanKblPerTahun)
              let k = parseFloat(kapasitasKbl)
              let p = this.state.dayaLuaran
              let d = parseFloat(penggunaanEvse)
              let l = parseFloat(rugiDayaPendukung)
              let irr = parseFloat(res.data.data.irr)
              let npv = parseFloat(res.data.data.npv)
              let pp = parseFloat(res.data.data.pprd)
              
              let gapYear =  parseInt(1) + (finishYear - startYear)
              if(typeOptimize == 'a' || typeOptimize == 'b' || typeOptimize == 'c'){
                optimize = optzNpvMaksimum(k,p,d,u,q,n,g, gapYear, npv, parseFloat(discountRate),irr, pp)
                isOptimizing = true

                if(!optimize){
                    let desc = "Hasil optimasi tidak solutif"
                    this.setState({
                      alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
                    })
                }
              }

              if(typeOptimize = 'd'){
                optimize = optzRasioMinimumSPKLUBEV(k,p,d,u,q,n,g, gapYear, npv, parseFloat(discountRate),irr, pp)
                isOptimizing = true

                if(!optimize){
                    let desc = "Hasil optimasi tidak solutif"
                    this.setState({
                      alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
                    })
                }
              }

              if(typeOptimize = 'e'){
                optimize = optzRasiohargalistrikPLNmaksimum(k,p,d,u,q,n,g, gapYear, npv, parseFloat(discountRate),irr, pp)
                isOptimizing = true

                if(!optimize){
                    let desc = "Hasil optimasi tidak solutif"
                    this.setState({
                      alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
                    })
                }
              }

              if(typeOptimize = 'f'){
                optimize = optzRasioTarifJualSPKLUMinimum(k,p,d,u,q,n,g, gapYear, npv, parseFloat(discountRate),irr, pp)
                isOptimizing = true

                if(!optimize){
                    let desc = "Hasil optimasi tidak solutif"
                    this.setState({
                      alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
                    })
                }
              }

              if(typeOptimize = 'g'){
                optimize = optzBiayaSewaLahanMaksimum(k,p,d,u,q,n,g, gapYear, npv, parseFloat(discountRate),irr, pp)
                isOptimizing = true

                if(!optimize){
                    let desc = "Hasil optimasi tidak solutif"
                    this.setState({
                      alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
                    })
                }
              }
            }else{
              isOptimizing = false
            }

            this.setState({
              data: res.data,
              discountRate: discountRate,
              isLoad: false,
              isOptimize: isOptimizing,
              isOptimaziSolutif : optimize
            })
        })
      }else{
        axios.post("/api/calculate/excel", jsonObject).then(res => {
          window.open(res.data.data)
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
          
          <div ref={this.baseKalkulator} id="base-kalkulator" style={{display: "none"}}>
            <InputBase
                inputPph={this.inputPph}
                inputBiayaEvse={this.inputBiayaEvse}
                inputBiayaKelistrikan={this.inputBiayaKelistrikan}
                inputBiayaSipil={this.inputBiayaSipil}
                inputDiscountRate={this.inputDiscountRate}
                inputHargaJualKonsumen={this.inputHargaJualKonsumen}
                inputHargaJualPln={this.inputHargaJualPln}
                inputInflasi={this.inputInflasi}
                inputJumlahKendaraanInisial={this.inputJumlahKendaraanInisial}
                inputPertumbuhanKblPerTahun={this.inputPertumbuhanKblPerTahun}
                inputRasioSpklu={this.inputRasioSpklu}
                inputJumlahKonetor={this.inputJumlahKonektor}
                inputDayaMaksimum={this.inputDayaMaksimum}
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
                data={this.state.data}
                isOptimize={this.state.isOptimize}
                tsOptimizeSolutif={this.state.isOptimaziSolutif}
            />
          </div>
          
        </div>
      )
  }
}

const mapStateToProps = state => {
  return{
    dataDefault : state.defaultParameter
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setDataDefaultRedux : (data) => dispatch(setDefaultValue(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (index);