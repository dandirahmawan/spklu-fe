import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react'

class input_konektor extends Component{

    constructor(){
        super()
        this.state = {
            konektor: [{"no":1,"value":null}],
            jumlahKonektor: [1]
        }

        this.changeJumlahKonektor = this.changeJumlahKonektor.bind(this)
        this.changeJumlahKonektor = this.changeJumlahKonektor.bind(this)
    }

    componentDidMount(){
        let itv = setInterval(() => {
                        if(this.props.dataDefault !== undefined && this.props.dataDefault.konektor !== undefined){
                            this.setState({
                                konektor: this.props.dataDefault.konektor,
                                jumlahKonektor : this.props.dataDefault.konektor
                            })
                            
                            clearInterval(itv)
                        }
                    }, 100)
    }

    changeJumlahKonektor(e){
        let v = e.target.value
        let arr = []
        for(let i = 0;i<v;i++){
            let no = parseInt(i) + 1
            let jo = {"no":no,"value":null}
            arr.push(jo)
        }

        this.setState({
            konektor: arr,
            jumlahKonektor: e.target.value
        })
    }

    changeDaya(e, no){
        let i = no -1
        let data = this.state.konektor[i]
        data.value = e.target.value
        this.state.konektor[i] = data

        this.setState({
            konektor: this.state.konektor
        })
    }

    render(){
        let i = 0
        // console.log(this.state.konektor)
        const inputJumlahKonektor = this.state.konektor.map(dt => {
            i++
            let no = i
            return <div style={{alignItems: "center", marginBottom: "3px"}}>
                        <div style={{fontSize: "12px", marginBottom: "2px"}}>daya konektor ke {i} (Kw)</div>
                        <div className="main-border base-input-form" style={{width: "185px", display: "flex", }}>
                            <div className="bold main-font-size" style={{color: "#000", padding: "7px"}}>{i}.</div>
                            <input className="kwh-jmk-chl main-font-size" 
                                value={dt.value}
                                onChange={(e) => this.changeDaya(e, no)}
                                type="text" placeholder="(Kwh)" 
                                style={{width: "100%", boxSizing: "border-box"}}></input>
                        </div>
                        <div className="base-alt-ip kwh-alt-val-21" style={{marginBottom: "2px"}}>
                            <FontAwesomeIcon icon={faQuestionCircle}/> daya konektor ke {i} belum diisi
                        </div>
                    </div>
        })

        return(
            <Fragment>
                <div className="main-font-size">Jumlah Konektor EVSE {this.props.no}</div>
                <div style={{marginTop: "5px", marginBottom: "10px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div className="main-border base-input-form">
                            <FontAwesomeIcon style={{color: "#959595", fontSize: "11px", paddingLeft: "7px"}} icon={faPlus}/>
                            <select placeholder="jumlah konektor" 
                                    className="ipk-cd-prds"
                                    style={{border: "none", width: "100%", boxSizing: "border-box"}}
                                    onChange={this.changeJumlahKonektor}
                                    value={this.state.jumlahKonektor}>
                                <option style={{color: "#CCC", display: "none"}}>pilih jumlah konektor</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div style={{fontSize: "12px", marginLeft: "5px"}}>
                            {/* <a onClick={(e) => this.infoInput(e, "jumlah konektor")}>
                                <FontAwesomeIcon icon={faQuestionCircle}/>
                            </a> */}
                        </div>
                    </div>

                    <div style={{padding: "10px", paddingLeft: "20px", paddingBottom: "0px", paddingTop: "3px"}}>
                        {inputJumlahKonektor}
                    </div>    
                </div>
            </Fragment>
        )
    }
}

export default input_konektor;