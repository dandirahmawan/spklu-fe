import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

class conclusionns extends React.Component{

    state = {
        layak: true,
        halfYear: 0
    }

    setKelayakan = this.setKelayakan.bind(this)

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
        
        let startYear = props.startYear.current.value
        let finishYear = props.finishYear.current.value
        let halfYear = (parseInt(1) + (parseInt(finishYear) - parseInt(startYear))) / 2
        this.setState({halfYear: halfYear})
        if(parseFloat(props.pp) > halfYear){
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

    render(){
        return(
            <div id="bs-rst-skm-bisnis" className="main-border shadow" style={{width: "300px", float: "right", borderRadius: "4px", background: "#FFF"}}>
                <div className="bold main-border-bottom" style={{padding: "10px", textAlign: "center"}}>
                    SKEMA BISNIS
                </div>
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
                                (parseFloat(this.props.pp) < this.state.halfYear)
                                ?
                                    <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}}/>
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
        )
    }
}

export default conclusionns