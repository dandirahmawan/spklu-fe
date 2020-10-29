import React, { Component } from 'react'
import { faCog, faSdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

class kondisi_ekonomi_form extends Component{
    render(){
        return(
            <div style={{marginLeft: "350px", marginTop: "60px"}}>
                <table>
                    <tr>
                        <td></td>
                        <td><div style={{marginBottom: "20px"}}>
                                <span className="main-font-size gryscale-font-color">
                                    <FontAwesomeIcon icon={faCog}/> default value
                                </span>
                                <h2>Kondisi Ekonimi</h2>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>PPH</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>Inflase / Tahun</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>Discount Rate</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>Jumlah Kendaraan Inisial</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>Biaya Pekerja Sipil</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>Biaya Pekerja Kelitrikan</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}>Harga EVSE</td>
                        <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                    </tr>
                    <tr>
                        <td className="main-font-size bold" style={{textAlign: "right"}}></td>
                        <td>&nbsp;&nbsp;&nbsp;
                            <button className="btn-primary main-font-size bold" style={{padding: "10px", marginTop: "10px"}}>
                                <FontAwesomeIcon icon={faSdCard}/> Simpan Perubahan
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
}

const mapDispatchToProps = dispatch => {
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (kondisi_ekonomi_form)