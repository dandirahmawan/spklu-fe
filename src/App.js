import React from 'react';
import './App.css';
import Header from './component/header'
import InputBase from './component/input_base'
import MainBase from './component/main_base'
import axios from 'axios'
import './style/main.css'
import Alert from './component/alert'

function test(){
  alert("dandi rahmawan")
}

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
    jsonParam:{},
    data:null,
    alertBase: null
  }

  inputBiayaSpklu = React.createRef()
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
  runSimulasi = this.runSimulasi.bind(this)
  hideAlert = this.hideAlert.bind(this)
  
  runSimulasi(){
    let pph = this.inputPph.current.value
    let inflasi = this.inputInflasi.current.value
    let discountRate = this.inputDiscountRate.current.value
    let jumlahKendaraanInisial = this.inputJumlahKendaraanInisial.current.value
    let biayaSpklu = this.inputBiayaSpklu.current.value
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

    console.log(this.inputFinishYear)
    
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
      let input = child.children[0].children[1]
      
      altClass[i].style.display = "none"
      if(input.value == 0) {
        altClass[i].style.display = "block"
        isValid = false
      }
    }
    
    if(!isValid){
      let desc = "<div>Pastikan semua form data pada <span class='bold'>kondisi ekonomi</span>, "+ 
              "<span class='bold'>parameter bisnis</span> dan <span class='bold'>parameter teknis</span> terisi.</div>"
      this.setState({
        alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
      })

      return false
    }

    axios.post("http://localhost:8080/calculate", jsonObject).then(res => {
        this.setState({
          data: res.data
        })
    })
  }

  hideAlert(){
    this.setState({
      alertBase: null
    })
  }

  render(){
      return (
        <div>
          {this.state.alertBase}
          <Header/>
          <InputBase
              inputPph={this.inputPph}
              inputBiayaSpklu={this.inputBiayaSpklu}
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
          />

          <MainBase 
              startYear={this.inputStartYear} 
              finishYear={this.inputFinishYear} 
              runSimulasi={this.runSimulasi}
              data={this.state.data}
          />
          
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header> */}
        </div>
      )
  }
}

export default App;
