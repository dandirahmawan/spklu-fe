import React from 'react';
import './App.css';
import Header from './component/header'
import InputBase from './component/input_base'
import MainBase from './component/main_base'
import axios from 'axios'
import './style/main.css'
import Alert from './component/alert'
import {numberOnlyInput, optzBiayaSewaLahanMaksimum, optzNpvMaksimum, optzRasiohargalistrikPLNmaksimum, optzRasioMinimumSPKLUBEV, optzRasioTarifJualSPKLUMinimum} from './function/function'

class App extends React.Component{

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
    dayaLuaran: 0,
    jsonParam:{},
    data:null,
    alertBase: null,
    isLoad: false,
    isOptimaziSolutif: true,
    isOptimize: false
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
  runSimulasi = this.runSimulasi.bind(this)
  hideAlert = this.hideAlert.bind(this)

  componentDidMount(){
    document.addEventListener("keydown", numberOnlyInput)
    // document.addEventListener("keyup", currencyInput)
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
    let dayaMaksimum = this.inputDayaMaksimum.current.value
    let kapasitasKbl = this.inputKapasitasKbl.current.value
    let rugiDayaPendukung = this.inputRugiDayaPendukung.current.value
    let startYear = this.inputStartYear.current.value
    let finishYear = this.inputFinishYear.current.value
    let sewaLahan = this.inputBiayaSewaLahan.current.value
    let penggunaanEvse = this.inputPenggunaanEvse.current.value
    let biayaSpklu = parseFloat(biayaEvse) + parseFloat(biayaKelistrikan) + parseFloat(biayaSipil)
    let dayaLuaran = 0

    /*get total daya*/
    let elms = document.getElementsByClassName("kwh-jmk-chl")
    for(let i = 0;i<elms.length;i++){
      let val = elms[i].value
      dayaLuaran = parseInt(dayaLuaran) + parseInt(val)
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

    /*set parameter bisnis json*/
    jsonObjectBisnis.hargaJualPln = hargaJualPln
    jsonObjectBisnis.hargaJualKonsumen = hargaJualKonsumen
    jsonObjectBisnis.pertumbuhanKblPerTahun = pertumbuhanKblPerTahun
    jsonObjectBisnis.rasioSpklu = rasioSpklu
    jsonObjectBisnis.biayaSewaLahan = sewaLahan
    jsonObjectBisnis.penggunaanEvsePerJam = penggunaanEvse

    /*set parameter teknis json*/
    jsonObjectTeknis.jumlahKonektor = jumlahKonektor
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
        if(input.value == "") {
          altClass[i].style.display = "block"
          isValid = false
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

    /*validation year input is here*/
    let elmYearInput = document.getElementsByClassName("year-input")
    for(let i = 0;i<elmYearInput.length;i++){
      if(elmYearInput[i].value < 0){
        let parent = elmYearInput[i].parentElement.parentElement.parentElement
        parent.children[1].style.display = "block"
      }
    }
    
    if(!isValid){
      let desc = "<div>Pastikan semua form data pada <span class='bold'>kondisi ekonomi</span>, "+ 
              "<span class='bold'>parameter bisnis</span>, <span class='bold'>parameter teknis</span> dan <span class='bold'>rentang waktu</span> terisi.</div>"
      this.setState({
        alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
      })

      return false
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
              let p = dayaLuaran
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

  render(){
      return (
        <div>
          {this.state.alertBase}
          <Header/>
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
      )
  }
}

export default App;
