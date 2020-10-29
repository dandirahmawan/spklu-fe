import React, { Fragment, useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'
import MainBase from './main-base'
import { connect } from 'react-redux'
import { setDefaultValue } from '../../redux/action'
import axios from 'axios'
import LoadGif from '../../image/Pulse-1s-200px.gif';

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
        axios.get("/api/admin/form-value").then(res => {
            if(res.data.message == "success"){
                this.setState({
                    isLoad: false
                })
                this.props.setDataDefaultRedux(res.data.data)
            }
          })
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