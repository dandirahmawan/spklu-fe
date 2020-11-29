import { faCog, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const sidebar = (props) =>{
    return(
        <div className="side-bar main-border-right" style={{top: "50px"}}>
            <a onClick={() => props.menuClick("dashboard")}>
                <div className='side-bar-menu main-border-bottom'>
                    <FontAwesomeIcon icon={faHome}/>&nbsp;&nbsp;&nbsp;Dashboard
                </div>
            </a>
            <a onClick={() => props.menuClick("ekonomi")}>
                <div className='side-bar-menu main-border-bottom'>
                    <FontAwesomeIcon icon={faCog}/>&nbsp;&nbsp;&nbsp;Kondisi Ekonomi
                </div>
            </a>
            <a onClick={() => props.menuClick("bisnis")}>
                <div className='side-bar-menu main-border-bottom'>
                    <FontAwesomeIcon icon={faCog}/>&nbsp;&nbsp;&nbsp;Parameter Bisnis
                </div>
            </a>
            <a onClick={() => props.menuClick("teknis")}>
                <div className='side-bar-menu main-border-bottom'>
                    <FontAwesomeIcon icon={faCog}/>&nbsp;&nbsp;&nbsp;Parameter Teknis
                </div>
            </a>
        </div>
    )
}

export default sidebar
