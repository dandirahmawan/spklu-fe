import React from 'react'
import IndikatorKunci from './indikator_kunci'
import Charts from './charts'
import Conclussions from './conclusion'
import YearPicker from 'react-year-picker'
import {choicesOptimize} from '../const/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import LoadGif from '../image/Pulse-1s-200px.gif'

class main_base extends React.Component{
    
    state = {
        startYear   : null,
        finishYear  : null
    }

    handleChange = this.handleChange.bind(this)
    handleChange2 = this.handleChange2.bind(this)

    handleChange(date) {
        this.setState({
            startYear : date
        })
    }

    handleChange2(date) {
        this.setState({
            finishYear : date
        })
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
                            <button onClick={() => this.props.runSimulasi(null, false)} style={{height: "30px"}} className="btn-primary main-font-size shadow">Run</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => this.props.runSimulasi(null, true)} className="btn-primary main-font-size shadow" style={{height: "30px"}}>Get CSV</button>
                            <div className="main-border-left" style={{marginLeft: "10px", paddingLeft: "10px"}}>
                                <select ref={this.props.inputOptimizeType} id="slc-typ-optmz" className="main-border shadow">
                                    {optionOptimize}
                                </select>
                                &nbsp;&nbsp;
                            </div>
                            <button onClick={() => this.props.runSimulasi("optimize", false)} className="btn-primary main-font-size shadow" style={{height: "30px"}}>Optimize</button>    
                        </div>
                    </div>
                </div>
                
                {
                    (this.props.data == null)
                    ?
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
                    :
                        (!this.props.isOptimize)
                        ?
                            <div>
                                <IndikatorKunci npv={this.props.data.data.npv}
                                                irr={this.props.data.data.irr}
                                                mirr={this.props.data.data.mirr}
                                                bep={this.props.data.data.bep}
                                                pi={this.props.data.data.pi}
                                                pp={this.props.data.data.pprd}
                                                />
                                <div style={{overflow: "hidden", position: "relative", zIndex: "1", padding: "20px", paddingTop: "10px"}}>
                                    <Conclussions npv={this.props.data.data.npv}
                                                irr={this.props.data.data.irr}
                                                mirr={this.props.data.data.mirr}
                                                bep={this.props.data.data.bep}
                                                pi={this.props.data.data.pi}
                                                pp={this.props.data.data.pprd}
                                                discountRate={this.props.discountRate}
                                                startYear={this.props.startYear}
                                                finishYear={this.props.finishYear}
                                                />
                                    <Charts data={this.props.data.data}
                                            startYear={this.props.startYear}
                                            finishYear={this.props.finishYear}/>
                                </div>    
                            </div>
                        :
                            (this.props.tsOptimizeSolutif)
                            ?
                                <div>
                                    <IndikatorKunci npv={this.props.data.data.npv}
                                                    irr={this.props.data.data.irr}
                                                    mirr={this.props.data.data.mirr}
                                                    bep={this.props.data.data.bep}
                                                    pi={this.props.data.data.pi}
                                                    pp={this.props.data.data.pprd}
                                                    />
                                    <div style={{overflow: "hidden", position: "relative", zIndex: "1", padding: "20px", paddingTop: "10px"}}>
                                        <Conclussions npv={this.props.data.data.npv}
                                                    irr={this.props.data.data.irr}
                                                    mirr={this.props.data.data.mirr}
                                                    bep={this.props.data.data.bep}
                                                    pi={this.props.data.data.pi}
                                                    pp={this.props.data.data.pprd}
                                                    discountRate={this.props.discountRate}
                                                    startYear={this.props.startYear}
                                                    finishYear={this.props.finishYear}
                                                    />
                                        <Charts data={this.props.data.data}
                                                startYear={this.props.startYear}
                                                finishYear={this.props.finishYear}/>
                                    </div>    
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

export default main_base