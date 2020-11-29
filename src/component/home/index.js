import React from 'react'
import Evse from '../../image/redesignn-01.jpg'
import BpptLogo from '../../image/Logo_BPPT.png'
import loader from '../../image/Rolling-1s-45px.gif'
import Axios from 'axios'
import Alert from '../kalkulator/alert'
import reactCookies from 'react-cookies'

class index extends React.Component{

    constructor(){
        super()
        this.state = {
            option:[],
            alertBase: "",
            typePengakses: "",
            typePengaksesName: "",
            isLoad: false,
            loadStart: true
        }

        this.launch = this.launch.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
        this.chnageTypePengakses = this.chnageTypePengakses.bind(this)
    }

    componentDidMount(){
        Axios.get("api/user_type").then(res => {
            this.setState({
                option: res.data.data,
                loadStart: false
            })
        })
    }

    launch(e){
        let nameAkses = ""
        for(let i = 0;i<this.state.option.length;i++){
            let dt = this.state.option[i]
            if(dt.id == this.state.typePengakses){
                nameAkses = dt.name
                break;
            }
        }

        let desc = "Silahkan pilih <span class='bold'>tipe pengakses</span>, untuk mengakses halaman <span class='bold'>Kalkulator Tekno-Ekonomi FCS BPPT</span>"
        if(this.state.typePengakses == ""){
            this.setState({
                alertBase: <Alert alertDescription={desc} okAlert={this.hideAlert}/>
            })
        }else{
            this.setState({
                isLoad: true
            })

            reactCookies.save('usertype_tecs', this.state.typePengakses, {path: '/'})
            reactCookies.save('usertypename_tecs', nameAkses, {path: '/'})
            window.location.reload()
        }
    }

    chnageTypePengakses(e){
        this.setState({
            typePengakses: e.target.value
        })
    }

    hideAlert(){
        this.setState({
            alertBase: ""
        })
    }

    render(){

        const option = this.state.option.map(dt => {
            return <option value={dt.id}>{dt.name}</option>
        })

        return(
            <div style={{background: "url("+Evse+") no-repeat center", 
                        position: "fixed",
                        width: "100%",
                        backgroundSize: "cover", 
                        height: "100%"}}>
                    
                    {this.state.alertBase}
                    <div style={{padding: "20px", textAlign: "center"}}>
                        <img src={BpptLogo} style={{width: "100px"}}/>
                    </div>

                    <div className="bold" style={{padding: "10px", textAlign: "center", zIndex: "1", fontSize: "25px", marginTop: "50px"}}>
                        Kalkulator Tekno-Ekonomi FCS BPPT
                    </div>
                    

                    {/* <div style={{textAlign: "center"}}>
                        <Link to="/kalkulator">
                            <button className="btn-primary-unhover bold" 
                                style={{fontSize: "12px", padding: "10px", width: "170px", boxSizing: "border-box", margin: "auto"}}>
                                Launch Aplikasi
                            </button>
                        </Link>
                    </div> */}

                    <div style={{textAlign: "center", marginTop: "10px", zIndex: "1"}}>
                        {
                            (this.state.loadStart)
                            ?
                                <div className="main-border" 
                                    style={{width: "72px", background: "#FFF", margin: "auto", padding: "15px", borderRadius: "4px"}}>
                                    <img src={loader} style={{width: "20px"}}/>
                                    <div className="bold gryscale-font-color" style={{fontSize: "11px"}}>Memuat data..</div>
                                </div>
                            :
                                <div className="main-border" 
                                    style={{width: "250px", background: "#FFF", margin: "auto", padding: "15px", borderRadius: "4px"}}>
                                    <div style={{marginBottom: "5px"}}>
                                        <h3 className="bold main-font-size" style={{marginBottom: "10px"}}>Akses sebagai</h3>
                                        <select onChange={this.chnageTypePengakses} className="main-border" style={{width: "100%", boxSizing: "border-box", padding: "8px"}}>
                                            <option style={{display: "none"}}>Pilih tipe pengakses</option>
                                            {option}
                                        </select>
                                    </div>
                                    {
                                        (!this.state.isLoad)
                                        ?
                                            <button onClick={this.launch} className="btn-primary-unhover bold" 
                                                style={{fontSize: "12px", padding: "10px", width: "100%", boxSizing: "border-box"}}>
                                                Launch Aplikasi
                                            </button>
                                        :
                                            <button className="btn-primary-unhover"
                                                style={{fontSize: "12px", padding: "7px", width: "100%", boxSizing: "border-box"}}>
                                                <img src={loader} style={{width: "20px"}}/>
                                            </button>
                                    }
                                </div>
                        }
                        
                        
                    </div>
            </div>
        )
    }
}

export default index