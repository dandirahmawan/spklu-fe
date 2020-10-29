import React from 'react'
import { faCog, faMemory, faSdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const parameter_teknis_form = () => {
    return(
        <div style={{marginLeft: "350px", marginTop: "60px"}}>
            <table>
                <tr>
                    <td></td>
                    <td><div style={{marginBottom: "20px"}}>
                            <span className="main-font-size gryscale-font-color">
                                <FontAwesomeIcon icon={faCog}/> default value
                            </span>
                            <h2>Parameter Teknis</h2>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Jumlah Konektor</td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>
                        Daya Maksimum Konektor
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Kapasitas 1 KBL (Kwh)</td>
                    <td>&nbsp;&nbsp;&nbsp;<input className="main-border" placeholder="pph" type="text" style={{width: "250px"}}/></td>
                </tr>
                <tr>
                    <td className="main-font-size bold" style={{textAlign: "right"}}>Rugi - rugi dan Daya Pendukung</td>
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

export default parameter_teknis_form