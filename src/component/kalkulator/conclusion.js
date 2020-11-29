import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCopy, faExclamationTriangle, faInfoCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

class conclusionns extends React.Component{

    state = {
        layak: true,
        halfYear: 3.5
    }

    setKelayakan = this.setKelayakan.bind(this)
    copyVariableKeputusan = this.copyVariableKeputusan.bind(this)

    componentDidMount(){
        this.setKelayakan(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setKelayakan(nextProps)
    }

    setKelayakan(props){
        let kelayakan = true;
        if(parseFloat(props.npv) <= 0){
            kelayakan = false
        }
        
        if(parseFloat(props.pp) > this.state.halfYear){
            kelayakan = false
        }

        if(parseFloat(props.irr) <= this.props.discountRate){
            kelayakan = false
        }

        if(parseFloat(props.pi) <= 1){
            kelayakan = false
        }

        this.setState({
            layak: kelayakan
        })
    }

    baseConsclusion(e, id){
        let elm1 = document.getElementById("skema-bisnis")
        let elm2 = document.getElementById("variable-keputusan")
        
        let class1 = "bold bc-btn main-font-size"
        let class2 = "bold bc-btn gryscale-font-color main-font-size"

        let elmClass = document.getElementsByClassName("bc-btn")
        for(let i = 0;i<elmClass.length;i++){
            elmClass[i].setAttribute("class", class2)
        }

        e.target.setAttribute("class", class1)
        if(id == "skema-bisnis"){
            elm1.style.display = "block"
            elm2.style.display = "none"
        }else{
            elm1.style.display = "none"
            elm2.style.display = "block"
        }
    }

    copyVariableKeputusan(type, val){
        this.props.setDefaultValueByName(type, val)
        let elmTxyCpy = document.getElementsByClassName("txt-cpy")

        for(let i = 0;i<elmTxyCpy.length;i++){
            this.collapseInputMenu("collapseTwo")
            let ib = document.getElementById("input-form-base")
            ib.style.overflowY = "hidden"
            if(type == "rasio spklu"){
                if(elmTxyCpy[i].getAttribute("attr") == "spklu-txt-cpy"){
                    elmTxyCpy[i].style.display = "block"
                    setTimeout(() => {
                        elmTxyCpy[i].style.display = "none"
                        ib.style.overflowY = "auto"
                    }, 1500)
                }

            }
            
            if(type == "harga jual pln"){
                if(elmTxyCpy[i].getAttribute("attr") == "pln-txt-cpy"){
                    elmTxyCpy[i].style.display = "block"
                    setTimeout(() => {
                        elmTxyCpy[i].style.display = "none"
                    }, 1500)
                }
            }

            if(type == "harga jual konsumen"){
                if(elmTxyCpy[i].getAttribute("attr") == "konsumen-txt-cpy"){
                    elmTxyCpy[i].style.display = "block"
                    setTimeout(() => {
                        elmTxyCpy[i].style.display = "none"
                    }, 1500)
                }
            }
        }
    }

    collapseInputMenu(targetCollapse){
        let bases = document.getElementsByClassName("collapse-base")
        for(let i = 0;i<bases.length;i++){
            bases[i].style.display = "none"
        }
        
        let idBase = document.getElementById(targetCollapse)
        idBase.style.display = "block"
    }

    render(){
        return(
            <div id="bs-rst-skm-bisnis" className="main-border shadow" style={{width: "300px", float: "right", borderRadius: "4px", background: "#FFF"}}>
                <div className="bold main-border-bottom" style={{textAlign: "center", display: "flex"}}>
                    <div style={{padding: "10px"}}><a onClick={(e) => this.baseConsclusion(e, "skema-bisnis")} className="bold bc-btn main-font-size">Skema Bisnis</a></div>
                    <div style={{padding: "10px"}}><a onClick={(e) => this.baseConsclusion(e, "variable-keputusan")} className="bold bc-btn gryscale-font-color main-font-size">Variable Keputusan</a></div>
                </div>
                <div id="skema-bisnis">
                    <div className="main-border shadow" 
                        style={{textAlign: "center", fontSize: "35px", padding: "10px", marginLeft: "20px", marginRight: "20px", marginTop: "10px", marginBottom: "10px", background: "#f8f8f8", overflow: "hidden", borderRadius: "3px"}}>
                        {
                            (this.state.layak)
                            ?
                                <Fragment>
                                    <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/>
                                    <div className="bold" style={{fontSize: "20px"}}>
                                        Layak
                                    </div>
                                </Fragment>
                            :
                                <Fragment>
                                    <FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}}/>
                                    <div className="bold" style={{fontSize: "20px"}}>
                                        Tidak layak
                                    </div>
                                </Fragment>
                        }
                    </div>
                    <div style={{paddingLeft: "20px", paddingRight: "20px", marginBottom: "30px"}}>
                        <div className="main-font-size main-border shadow" 
                            style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                            <div>
                                {
                                    (parseFloat(this.props.npv) > 0)
                                    ?
                                        <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/>
                                    :
                                        <FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}}/>  
                                }
                            </div>
                            <div className="bold" style={{marginLeft: "10px"}}>
                                {"NPV > 0"}
                            </div>
                        </div>
                        <div className="main-font-size main-border shadow" 
                            style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                            <div>
                                {
                                    (parseFloat(this.props.pp) <= this.state.halfYear)
                                    ?
                                        <div><FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/></div>
                                    :
                                        <FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}}/>   
                                }
                            </div>
                            <div className="bold" style={{marginLeft: "10px"}}>
                                {"PP < 50% umur alat"}
                                {
                                    (parseFloat(this.props.pp) > this.state.halfYear)
                                    ?
                                        <div style={{color: "red", fontSize: "11px", marginTop: "4px"}}><FontAwesomeIcon icon={faExclamationTriangle}/> PP lebih dari {this.state.halfYear}</div>
                                    :
                                        ""
                                }
                            </div>
                        </div>
                        <div className="main-font-size main-border shadow" 
                            style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                            <div>
                                {
                                    (parseFloat(this.props.irr) > this.props.discountRate)
                                    ?
                                        <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/>
                                    :
                                        <FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}}/>   
                                }
                            </div>
                            <div className="bold" style={{marginLeft: "10px"}}>
                                {"IRR > "+this.props.discountRate+"%"}
                            </div>
                        </div>
                        <div className="main-font-size main-border shadow"  
                            style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                            <div>
                                {
                                    (parseFloat(this.props.pi) > 1)
                                    ?
                                        <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/>
                                    :
                                        <FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}}/>   
                                }
                            </div>
                            <div className="bold" style={{marginLeft: "10px"}}>
                                {"PI > 1"}
                            </div>
                        </div>
                        <div className="main-font-size main-border shadow" 
                            style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                            <div>
                                <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/>
                            </div>
                            <div className="bold" style={{marginLeft: "10px"}}>
                                {"BEP < 50% Kapasitas"}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="variable-keputusan" style={{display: "none"}}>
                    <div style={{padding: "10px"}}>
                        <table>
                            <tbody className="main-font-size">
                                <tr>
                                    <td className="bold" style={{padding: "5px", textAlign: "right"}}>Rasio Harga Beli Listrik : BEV</td>
                                    <td>:</td>
                                    <td style={{padding: "5px"}}>
                                        {this.props.data.requestCalculate.parameterBisnis.hargaJualPln}&nbsp;&nbsp;
                                        {
                                            (this.props.lastRequestParam.parameterBisnis.hargaJualPln != this.props.data.requestCalculate.parameterBisnis.hargaJualPln)
                                            ?
                                                <a onClick={() => this.copyVariableKeputusan("harga jual pln", this.props.data.requestCalculate.parameterBisnis.hargaJualPln)}>
                                                    <FontAwesomeIcon icon={faCopy} style={{color: "#3b92d0"}}/>
                                                </a>
                                            : 
                                                ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bold" style={{padding: "5px", textAlign: "right"}}>Rasio Harga Jual Konsumen</td>
                                    <td>:</td>
                                    <td style={{padding: "5px"}}>
                                        {this.props.data.requestCalculate.parameterBisnis.hargaJualKonsumen}&nbsp;&nbsp;
                                        {
                                            (this.props.lastRequestParam.parameterBisnis.hargaJualKonsumen != this.props.data.requestCalculate.parameterBisnis.hargaJualKonsumen)
                                            ?
                                                <a onClick={() => this.copyVariableKeputusan("harga jual konsumen", this.props.data.requestCalculate.parameterBisnis.hargaJualKonsumen)}>
                                                    <FontAwesomeIcon icon={faCopy} style={{color: "#3b92d0"}}/>
                                                </a>
                                            : 
                                                ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bold" style={{padding: "5px", textAlign: "right"}}>Rasio SPKLU : BEV</td>
                                    <td>:</td>
                                    <td style={{padding: "5px"}}>
                                        {this.props.data.requestCalculate.parameterBisnis.rasioSpklu}&nbsp;&nbsp;
                                        {
                                            (this.props.lastRequestParam.parameterBisnis.rasioSpklu != this.props.data.requestCalculate.parameterBisnis.rasioSpklu)
                                            ?
                                                <a onClick={() => this.copyVariableKeputusan("rasio spklu", this.props.data.requestCalculate.parameterBisnis.rasioSpklu)}>
                                                    <FontAwesomeIcon icon={faCopy} style={{color: "#3b92d0"}}/>
                                                </a>
                                            : 
                                                ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bold" style={{padding: "5px", textAlign: "right"}}>Pertumbuhan KBL Pertahun</td>
                                    <td>:</td>
                                    <td style={{padding: "5px"}}>
                                        {this.props.data.requestCalculate.parameterBisnis.pertumbuhanKblPerTahun}%&nbsp;&nbsp;
                                        {
                                            (this.props.lastRequestParam.parameterBisnis.pertumbuhanKblPerTahun != this.props.data.requestCalculate.parameterBisnis.pertumbuhanKblPerTahun)
                                            ?
                                                <a onClick={() => this.copyVariableKeputusan("pertumbuhan kbl", this.props.data.requestCalculate.parameterBisnis.hargaJualPln)}>
                                                    <FontAwesomeIcon icon={faCopy} style={{color: "#3b92d0"}}/>
                                                </a>
                                            : 
                                                ""
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="main-border-top" style={{display: "flex", marginTop: "20px", paddingTop: "10px"}}>
                            <div style={{marginRight: "5px"}}>
                                <FontAwesomeIcon className="gryscale-font-color" icon={faInfoCircle} style={{fontSize: "14px"}}/>
                            </div>
                            <div className="gryscale-font-color main-font-size">
                                Jika variable keputusan berbeda dengan data form input, maka akan muncul ikon <FontAwesomeIcon icon={faCopy} style={{color: "#3b92d0"}}/> untuk menyalin data ke dalam form input
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        rdxState: state
    }
}

export default connect(mapStateToProps) (conclusionns)