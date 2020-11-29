import React, { Fragment } from 'react'
import IndikatorKunci from './indikator_kunci'
import Charts from './charts'
import Conclussions from './conclusion'
import YearPicker from 'react-year-picker'
import {choicesOptimize} from '../../const/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faFileExcel, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import LoadGif from '../../image/Pulse-1s-200px.gif'
import { connect } from 'react-redux'
class main_base extends React.Component{
    
    state = {
        startYear       : null,
        finishYear      : null,
        hideOptimize    : true
    }

    handleChange = this.handleChange.bind(this)
    handleChange2 = this.handleChange2.bind(this)
    runSimulasi = this.runSimulasi.bind(this)
    setDefaultValue = this.setDefaultValue.bind(this)

    handleChange(date) {
        this.setState({
            startYear : date
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            this.setState({
                hideOptimize: this.props.hideOptimize
            })
        }
    }
    
    handleChange2(date) {
        this.setState({
            finishYear : date
        })
    }

    runSimulasi(a, b){
        this.props.runSimulasi(a, b)
    }

    setDefaultValue(n, v){
        this.props.copyOptimize(n, v)
    }

    render(){
        const optionOptimize = choicesOptimize.map(dt => {
            return <option value={dt.id}>{dt.desc}</option>
        })

        return(
            <div id="main-base">
                <div className="main-border-bottom" style={{padding: "20px", background: "#FFF"}}>
                    <div className="bold">Rentang Waktu</div>
                    <div style={{display: "flex", marginTop: "5px"}}>
                        <div>
                            <div className="gryscale-font-color" style={{marginBottom: "3px", fontSize: "11px"}}>Tahun mulai</div>
                            <div>
                                <YearPicker onChange={this.handleChange} className="main-border shadow" style={{zIndex: "100"}}/>  
                                <div className="base-alt-ip" style={{color: "red", marginTop: "5px"}}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;
                                    Tahun belum dipilih
                                </div> 
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <div className="gryscale-font-color" style={{marginBottom: "3px", fontSize: "11px"}}>Tahun selesai</div>
                            <div>
                                <YearPicker onChange={this.handleChange2} className="main-border shadow" style={{zIndex: "100"}}/>
                                <div className="base-alt-ip" style={{color: "red", marginTop: "5px"}}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;
                                    Tahun belum dipilih
                                </div> 
                            </div>
                        </div>
                        <div style={{marginTop: "16px", marginLeft: "30px", display: "flex"}}>
                            
                            {
                                (this.state.hideOptimize)
                                ?
                                    <Fragment>
                                        <button onClick={() => this.runSimulasi(null, false)} style={{height: "30px"}} 
                                        className="btn-primary main-font-size shadow">Run</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    </Fragment>
                                :
                                    ""
                            }
                            
                            <button onClick={() => this.runSimulasi(null, true)} 
                                className="btn-primary-white main-font-size shadow" 
                                style={{height: "30px"}}>
                                <FontAwesomeIcon icon={faFileExcel}/> Get Excel
                            </button>
                            
                            {
                                (!this.state.hideOptimize)
                                ?
                                    <Fragment>
                                        <div className="main-border-left" 
                                            style={{marginLeft: "10px", paddingLeft: "10px"}}>
                                                <select ref={this.props.inputOptimizeType} id="slc-typ-optmz" className="main-border shadow">
                                                    <option value="" style={{display: "none"}}>pilih tipe optimize</option>
                                                    {optionOptimize}
                                                </select>
                                                &nbsp;&nbsp;
                                        </div>
                                        <button onClick={() => this.props.runSimulasi("optimize", false)} 
                                                className="btn-primary main-font-size shadow" style={{height: "30px"}}>
                                            Optimize</button>

                                        <div style={{marginLeft: "10px", paddingLeft: "10px", fontSize: "11px", paddingTop: "5px"}} 
                                            className="main-font-size bold main-border-left">
                                            <input onClick={this.props.hideOptimizeAction} style={{cursor: "pointer"}} type="checkbox"/> 
                                            <div className="bold" style={{marginLeft: "20px", marginTop: "-22px"}}>
                                                Kembali ke<br/>simulasi awal
                                            </div>
                                        </div>
                                    </Fragment>
                                :
                                    ""
                            }
                        </div>
                    </div>
                </div>
                
                {
                    (this.props.data != null)
                    ?
                        (this.props.isLoad)
                        ?
                            <div className="gryscale-font-color" style={{background: "#FFF", textAlign: "center", paddingTop: "50px"}}>
                                <img src={LoadGif} style={{width: "100px"}}/>
                                <div className="main-font-size bold" style={{marginTop: "-35px"}}>calculate..</div>
                            </div>
                        :
                            <div>
                                <IndikatorKunci npv={this.props.data.responseCalculate.npv}
                                                npvNormal={this.props.npvNormal}
                                                isOptimize={this.props.isOptimize}
                                                typeOptimize={this.props.typeOptimize}
                                                dataRequest={this.props.data.requestCalculate}
                                                irr={this.props.data.responseCalculate.irr}
                                                mirr={this.props.data.responseCalculate.mirr}
                                                bep={this.props.data.responseCalculate.bep}
                                                pi={this.props.data.responseCalculate.pi}
                                                setDefaultValueByName={this.setDefaultValue}
                                                pp={this.props.data.responseCalculate.pprd}
                                                />
                                <div style={{overflow: "hidden", position: "relative", zIndex: "1", padding: "20px", paddingTop: "10px"}}>
                                    <Conclussions npv={this.props.data.responseCalculate.npv}
                                                lastRequestParam={this.props.lastRequestParam}
                                                irr={this.props.data.responseCalculate.irr}
                                                mirr={this.props.data.responseCalculate.mirr}
                                                bep={this.props.data.responseCalculate.bep}
                                                pi={this.props.data.responseCalculate.pi}
                                                pp={this.props.data.responseCalculate.pprd}
                                                discountRate={this.props.discountRate}
                                                data={this.props.data}
                                                startYear={this.props.startYear}
                                                finishYear={this.props.finishYear}
                                                setDefaultValueByName={this.setDefaultValue}
                                                />
                                    <Charts data={this.props.data.responseCalculate}
                                            startYear={this.props.startYear}
                                            finishYear={this.props.finishYear}/>
                                </div>    
                            </div>
                        :
                            (this.props.isLoad)
                            ?
                                <div className="gryscale-font-color" style={{background: "#FFF", textAlign: "center", paddingTop: "50px"}}>
                                    <img src={LoadGif} style={{width: "100px"}}/>
                                    <div className="main-font-size bold" style={{marginTop: "-35px"}}>calculate..</div>
                                </div>
                            :   
                                <div className="gryscale-font-color" style={{background: "#FFF", textAlign: "center", paddingTop: "50px"}}>
                                    <FontAwesomeIcon style={{fontSize: "100px", opacity: "0.8"}} icon={faCalculator}/>
                                    <div className="bold" style={{fontSize: "12px", marginTop: "10px"}}>Hasil perhitungan simulasi akan<br/>ditampilkan disini</div>
                                </div>   
                }
                <div style={{display: "none"}}>
                    <input type="text" ref={this.props.startYear} value={this.state.startYear}/>
                    <input type="text" ref={this.props.finishYear} value={this.state.finishYear}/>
                </div>       
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // setDefaultValueByName : (n, v) => dispatch(setDefaultValueByName(n, v))
    }
}

const mapStateToProps = state => {
    return{
        dataDefaultRdx : state
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (main_base)