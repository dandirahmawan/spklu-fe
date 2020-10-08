import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

class conclusionns extends React.Component{
    render(){
        return(
            <div id="bs-rst-skm-bisnis" className="main-border shadow" style={{width: "300px", float: "right", borderRadius: "4px", background: "#44a369"}}>
                <div className="bold" style={{padding: "30px", paddingTop: "20px", paddingBottom: "10px"}}>
                    SKEMA BISNIS
                </div>
                <div className="bold" style={{textAlign: "center", fontSize: "35px", padding: "20px"}}>Layak</div>
                <div style={{paddingLeft: "30px", paddingRight: "30px", marginBottom: "30px"}}>
                    <div className="main-font-size" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#FFF", marginBottom: "10px"}}>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            NPV > 0
                        </div>
                    </div>
                    <div className="main-font-size" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#FFF", marginBottom: "10px"}}>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            NPV > 0
                        </div>
                    </div>
                    <div className="main-font-size" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#FFF", marginBottom: "10px"}}>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            NPV > 0
                        </div>
                    </div>
                    <div className="main-font-size" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#FFF", marginBottom: "10px"}}>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            NPV > 0
                        </div>
                    </div>
                    <div className="main-font-size" 
                        style={{display: "flex", padding: "10px", borderRadius: "3px", background: "#FFF", marginBottom: "10px"}}>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <div className="bold" style={{marginLeft: "10px"}}>
                            NPV > 0
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default conclusionns