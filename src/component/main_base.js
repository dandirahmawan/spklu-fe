import React from 'react'
import IndikatorKunci from './indikator_kunci'
import Charts from './charts'
import Conclussions from './conclusion'
import Logo from '../image/Logo_BPPT.png'

class main_base extends React.Component{
    render(){
        return(
            <div id="main-base">
                <div className="main-border-bottom" style={{padding: "20px", background: "#FFF"}}>
                    <div className="bold">Rentang Waktu</div>
                    <div style={{display: "flex", marginTop: "5px"}}>
                        <div>
                            <div className="gryscale-font-color" style={{marginBottom: "3px", fontSize: "11px"}}>Tahun mulai</div>
                            <div>
                                <select ref={this.props.startYear} className="main-border shadow">
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <div className="gryscale-font-color" style={{marginBottom: "3px", fontSize: "11px"}}>Tahun selesai</div>
                            <div>
                                <select ref={this.props.finishYear} className="main-border shadow">
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            </div>
                        </div>
                        <div style={{marginTop: "16px", marginLeft: "30px", display: "flex"}}>
                            <button onClick={this.props.runSimulasi} className="btn-primary main-font-size shadow">Run</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="btn-primary main-font-size shadow">Get CSV</button>
                            <div className="main-border-left" style={{marginLeft: "10px", paddingLeft: "10px"}}>
                                <select className="main-border shadow" style={{width: "100px"}}>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                </select>
                                &nbsp;&nbsp;
                            </div>
                            <button className="btn-primary main-font-size shadow">Optimize</button>    
                        </div>
                    </div>
                </div>
                
                {
                    (this.props.data == null)
                    ?
                        <div style={{background: "#FFF", textAlign: "center"}}>
                            <img src={Logo} style={{opacity: "0.2", width: "100px", marginTop: "50px"}}/>
                        </div>
                    :
                        <div>
                            <IndikatorKunci/>
                            <div style={{overflow: "hidden", position: "relative", zIndex: "1", padding: "20px"}}>
                                <Conclussions/>
                                <Charts/>
                            </div>    
                        </div>    
                }            
            </div>
        )
    }
}

export default main_base