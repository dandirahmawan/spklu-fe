import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

class alert_base extends Component{

    baseAlert = React.createRef()

    componentDidMount(){
        let base = this.baseAlert.current
        let w = base.offsetWidth
        let lft = (window.innerWidth - w) / 2
        
        base.style.left = lft+"px"
    }

    render(){
        return(
            <div ref={this.baseAlert} 
                className="main-border" 
                style={{background: "#FFF", 
                        position: "fixed", 
                        zIndex: "1000",
                        boxShadow: "3px 5px 5px #CCC", 
                        width: "300px", 
                        borderRadius: "3px", 
                        overflow: "hidden", 
                        top: "70px"}}>

                <div className="main-border-bottom bold" style={{padding: "10px", fontSize: "14px"}}>
                    <FontAwesomeIcon icon={faExclamationTriangle} style={{color: "#e3a10b"}}/>
                    &nbsp;&nbsp;Alert
                </div>
                <div style={{padding: "10px", fontSize: "12px"}}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.alertDescription }}/>
                </div>
                <div style={{padding: "10px", fontSize: "12px", textAlign: "right"}}>
                    <button onClick={this.props.okAlert} className="btn-primary" style={{fontSize: "11px", width: "40px"}}>Ok</button>
                </div>
            </div>
        )
    }
}

export default alert_base