import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

class conclusionns extends React.Component{

    state = {
        layak: true
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
        
        if(parseFloat(props.pp) <= 3.5){
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
                                    <FontAwesomeIcon icon={faCheckCircle}/>
                                :
                                    <FontAwesomeIcon icon={faTimesCircle}/>   
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
                                (parseFloat(this.props.pp) > 3.5)
                                ?
                                    <FontAwesomeIcon icon={faCheckCircle}/>
                                :
                                    <FontAwesomeIcon icon={faTimesCircle}/>   
                            }
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            {"PP < 50% umur alat"}
                        </div>
                    </div>
                    <div className="main-font-size main-border shadow" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                        <div>
                            {
                                (parseFloat(this.props.irr) > this.props.discountRate)
                                ?
                                    <FontAwesomeIcon icon={faCheckCircle}/>
                                :
                                    <FontAwesomeIcon icon={faTimesCircle}/>   
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
                                    <FontAwesomeIcon icon={faCheckCircle}/>
                                :
                                    <FontAwesomeIcon icon={faTimesCircle}/>   
                            }
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            {"PI > 1"}
                        </div>
                    </div>
                    <div className="main-font-size main-border shadow" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#f8f8f8FF", marginBottom: "10px"}}>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
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