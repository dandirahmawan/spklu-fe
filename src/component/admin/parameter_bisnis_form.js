import React from 'react'
import { faCog, faMemory, faSdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const parameter_bisnis_form = () => {
    return(
        <div style={{marginLeft: "350px", marginTop: "60px"}}>
            <table>
                <tr>
                    <td></td>
                    <td><div style={{marginBottom: "20px"}}>
                            <span className="main-font-size gryscale-font-color">
                                <FontAwesomeIcon icon={faCog}/> default value
                            </span>
                            <h2>Parameter Bisnis</h2>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Harga Jual Pln (Rp 707 X Q)</td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>
                        Harga jual Konsumen (Rp 1605 X N)
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Pertumbuhan KBL pertahun (%)</td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Rasio SPKLU / KBL</td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Durasi penggunaan EVSE / hari (jam)</td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Biaya sewa lahan SPKLU / tahun</td>
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

export default parameter_bisnis_form