
import React, { Component, Fragment } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faDeaf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import Alert from '../kalkulator/alert'
import { convertDate_dd_MMM_yyy } from '../../function/function';

class dashboard extends Component{
    
    constructor(){
        super()
        this.state = {
            userType:[],
            totalVisit:[],
            enddate:"",
            startdate:"",
            loadChart: true,
            popup:"",
            titleDate: ""
        }

        this.changeStartDate = this.changeStartDate.bind(this)
        this.changeEndDate = this.changeEndDate.bind(this)
        this.fetchDataPost = this.fetchDataPost.bind(this)
        this.okAlert = this.okAlert.bind(this)
    }

    okAlert(){
        this.setState({
            popup: ""
        })
    }

    componentDidMount(){
        let date = new Date()
        let mm = date.getMonth() + 1
        let dd = date.getDate()
        let yy = date.getFullYear()
        
        let stDate = yy+"-"+mm+"-"+dd+" 00:00:00"
        let edDate = yy+"-"+mm+"-"+dd+" 23:59:59"

        this.setState({
            startdate: stDate,
            enddate: edDate
        })

        this.fetchDataPost(stDate, edDate)
    }

    changeStartDate(e){
        let enddate = this.state.enddate
        let val = e.target.value+" 00:00:00"
        
        this.setState({
            startdate: val
        })

        let st = val.split(" ").join("").split("-").join("").split(":").join("")
        let ed = enddate.split(" ").join("").split("-").join("").split(":").join("")
        
        if(ed != "" && ed >= st){
            this.fetchDataPost(val, enddate)
        }else{
            if(ed != ""){
                this.setState({
                    popup: <Alert alertDescription="Maaf, <span class='bold'>tanggal awal</span> tidak boleh lebih besar dari <span class='bold'>tanngal akhir</span>" okAlert={this.okAlert}/>
                })
            }
        }
    }

    changeEndDate(e){
        let startdate = this.state.startdate
        let val = e.target.value+" 23:59:59"

        let date = new Date()
        let mm = date.getMonth() + 1
        let dd = date.getDate()
        let yy = date.getFullYear()
        let hh = date.getHours()
        let ii = date.getMinutes()
        let ss = date.getSeconds()
        let curdate = yy+"-"+mm+"-"+dd+" "+hh+":"+ii+":"+ss
        
        let st = startdate.split(" ").join("").split("-").join("").split(":").join("")
        let ed = val.split(" ").join("").split("-").join("").split(":").join("")
        
        let fd = (curdate.split(" ")[0] == val.split(" ")[0]) ? curdate : val
        
        this.setState({
            enddate: fd
        })

        if(st != "" && ed >= st){
            this.fetchDataPost(startdate, fd)
        }else{
            if(st != ""){
                this.setState({
                    popup: <Alert alertDescription="Maaf, <span class='bold'>tanggal awal</span> tidak boleh lebih besar dari <span class='bold'>tanngal akhir</span>" okAlert={this.okAlert}/>
                })
            }
        }
    }

    fetchDataPost(st, ed){
        let par = {
                    "startDate": st,
                    "endDate": ed
                }
        
        let resetTv = []
        for(let i = 0 ;i<this.state.userType.length;i++){
            resetTv.push(0)
        }
        

        this.setState({
            loadChart: true,
            totalVisit: resetTv
        })      

        axios.post("/api/statistic", par).then(res => {
            let data = res.data.data
            let userType = []
            let totalVisit = []
            data.groupUserType.map(dt => {
                userType.push(dt.userType.name)
                totalVisit.push(dt.totalVisit)
            })

            let ttlDate = "" 
            if(st.split(" ")[0] == ed.split(" ")[0]){
                ttlDate = "<span class='bold'>"+convertDate_dd_MMM_yyy(new Date(Date.parse(this.state.startdate)))+"</span>"
                console.log(ttlDate)
            }else{
                ttlDate = "<span class='bold'>"+convertDate_dd_MMM_yyy(new Date(Date.parse(this.state.startdate)))+"</span>"
                        +"<div class='gryscale-font-color'> - </div>"  
                        +"<span class='bold'>"+convertDate_dd_MMM_yyy(new Date(Date.parse(this.state.enddate)))+"</span>"
            }

            this.setState({
                userType: userType,
                totalVisit: totalVisit,
                loadChart: false,
                titleDate: ttlDate
            })
        })
    }

    render(){
        const chartData = {
            chart: {
                type: 'column'
            },
            backgroundColor: '#000000',
            title: {
                text: 'Kunjungan Kalkulator Tekno-Ekonomi FCS BPPT'
            },
            subtitle: {
                text: this.state.titleDate
            },
            xAxis: {
                categories: this.state.userType,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Jumlah Kunjungan'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Kunjungan',
                data: this.state.totalVisit
        
            }]
        }

        return(
            <Fragment>
                {this.state.popup}
                <div style={{marginLeft: "300px", marginTop: "70px", marginRight: "50px"}}>
                    <div className="main-border-bottom" 
                        style={{paddingTop: "10px", paddingBottom: "10px", overflow: "hidden", marginBottom: "10px"}}>
                        <div className="bold main-font-size" style={{float: "left", paddingTop: "10px"}}>
                            <FontAwesomeIcon icon={faChartArea}/> Chart Kunjungan
                        </div>
                        <div style={{float: "right"}}>
                            <span className="bold main-font-size">Range Tanggal</span>&nbsp;&nbsp;&nbsp;
                            <input className="main-border" onChange={this.changeStartDate} 
                                value={this.state.startdate.split(" ")[0]} style={{padding: "5px"}} type="date"/>
                            &nbsp;&nbsp;<span className="bold main-font-size">s.d</span>&nbsp;&nbsp;
                            <input className="main-border" onChange={this.changeEndDate} 
                                value={this.state.enddate.split(" ")[0]} style={{padding: "5px"}} type="date"/>
                        </div>
                    </div>

                    {
                        (this.state.loadChart) 
                        ?
                            <div style={{margin:"auto", width: "70px"}}>
                                <div style={{background: "#000", color: "#fff", padding: "5px",fontSize: "11px",borderRadius: "3px", 
                                    position: "fixed", width: "70px", zIndex: "1", textAlign: "center", marginTop: "80px"}}>memuat..</div>
                            </div>
                        : ""
                    }
                
                    <HighchartsReact highcharts={Highcharts} options={chartData} />
                </div>
            </Fragment>
        )
    }
}

export default dashboard