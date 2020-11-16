import React, { Fragment, useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'
import MainBase from './main-base'
import { connect } from 'react-redux'
import { setDefaultValue } from '../../redux/action'
import axios from 'axios'
import LoadGif from '../../image/Pulse-1s-200px.gif'
import Login from './login'
import { getCookieToken, getCookieUsername } from '../../function/function'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class index extends React.Component {

    constructor(){
        super()
        this.state = {
            section: "ekonomi",
            isLoad: true
        }

        this.setSection = this.setSection.bind(this)
    }

    componentDidMount(){
        if(document.cookie != ""){
            if(getCookieUsername() != "" && getCookieToken() !== "")
            axios.get("/api/admin/form-value").then(res => {
                if(res.data.message == "success"){
                    this.props.setDataDefaultRedux(res.data.data)
                    this.setState({
                        isLoad: false
                    })
                }
            })
        }
    }

    setSection(name){
        this.setState({
            section: name
        })
    }

    render(){
        return (
            <Fragment>
                {
                    (getCookieUsername() == "" || getCookieToken() == "")
                    ?
                        <Login/>
                    :
                        (this.state.isLoad)
                        ?
                            <div>
                                <div className="gryscale-font-color" style={{background: "#FFF", textAlign: "center", paddingTop: "80px"}}>
                                    <img src={LoadGif} style={{width: "100px"}}/>
                                    <div className="main-font-size bold" style={{marginTop: "-35px"}}>memuat..</div>
                                </div>
                            </div>
                        :
                            <Fragment>
                                <Header/>
                                <Sidebar menuClick={this.setSection}/>
                                <MainBase section={this.state.section}/>
                            </Fragment>
                }
                
                <div className="fx-loader-bse main-border shadow" style={{background: "#000", color: "#FFF", alignItems: "center"}}>
                    <div>
                        <FontAwesomeIcon icon={faCheckCircle} style={{color: "green", fontSize: "14px"}}/>&nbsp;&nbsp;
                        <span>data default berhasil diubah</span>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setDataDefaultRedux: (data) => dispatch(setDefaultValue(data))
    }
}

export default connect("", mapDispatchToProps) (index)