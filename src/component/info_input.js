import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import {infoInput} from '../const/const'

class info_input extends Component{

    hide = true
    state = {
        textInfo: null
    }

    infoElement = React.createRef()
    handleClickOutsideInfo = this.handleClickOutsideInfo.bind(this)
    hideInfo = this.hideInfo.bind(this)
    
    componentDidMount(){    
        document.addEventListener("click", this.handleClickOutsideInfo)
        document.addEventListener("scroll", () => {
            if(this.hide) this.hideInfo()
        })

        let x = this.props.x
        let y = this.props.y
        
        let infoElm = this.infoElement.current
        infoElm.style.top = y+"px"
        infoElm.style.left = x+"px"
        infoElm.style.display = "block"

        let textInfo = "Belum ada deskripsi untuk ditampilkan"
        infoInput.map(dt => {
            if(this.props.nameInfo == dt.name){
                textInfo = dt.desc
            }
        })

        this.setState({
            textInfo : textInfo
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            let x = nextProps.x
            let y = nextProps.y
            
            let infoElm = this.infoElement.current
            infoElm.style.top = y+"px"
            infoElm.style.left = x+"px"
            infoElm.style.display = "block"
            this.hide = false
            
            let textInfo = "Belum ada deskripsi untuk ditampilkan"
            infoInput.map(dt => {
                if(nextProps.nameInfo == dt.name){
                    textInfo = dt.desc
                }
            })

            this.setState({
                textInfo : textInfo
            })
            
            let itv = setInterval(() => {
                this.hide = true
                clearInterval(itv)
            }, 500)
        }
    }

    handleClickOutsideInfo(e){
        if(this.infoElement.current != null){
            if (this.infoElement && !this.infoElement.current.contains(e.target)) {
                if(this.hide) this.hideInfo()
            }
        }
    }

    hideInfo(){
        this.props.hideInfo()
    }

    render(){
        return(
            <div ref={this.infoElement} style={{display: "none", position: "fixed", zIndex: "1000"}}>
                <div className="tip-text-input main-border shadow main-font-size flex-top">
                    <div style={{marginRight: "5px", color: "#8baec2"}}>
                        <FontAwesomeIcon style={{fontSize: "16px"}} icon={faInfoCircle}/>
                    </div>
                    <div>{this.state.textInfo}</div>
                </div>
            </div>
        )
    }
}

export default info_input