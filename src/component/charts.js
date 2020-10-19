import React, { Fragment } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class charts extends React.Component{

    state = {
        chartNumber: 0,
        valuecf:[],
        valuepkl:[],
        valueSpklu:[],
        valueInfrastructireExp:[],
        valueBiayaEnergiTahunan:[]
    }

    chartBase = React.createRef()
    chartMenu = this.chartMenu.bind(this)

    componentDidMount(){
        this.setDataChart(this.props)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.setDataChart(nextProps)
        }
    }

    setDataChart(props){        
        let intData = []
        props.data.cf.map(dt => {
            let data = parseInt(dt)
            intData.push(data)
        })

        let intDataPkl = []
        props.data.pkl.map(dt => {
            let data = parseInt(dt)
            intDataPkl.push(data)
        })

        let intDataSpklu = []
        props.data.js.map(dt => {
            let data = parseInt(dt)
            intDataSpklu.push(data)
        })

        let intDataIeik = []
        props.data.ieik.map(dt => {
            let data = parseInt(dt)
            intDataIeik.push(Math.abs(data))
        })

        let intDataBet = []
        props.data.bet.map(dt => {
            let data = parseInt(dt)
            intDataBet.push(Math.abs(data))
        })

        this.setState({
            valuecf: intData,
            valuepkl: intDataPkl,
            valueSpklu: intDataSpklu,
            valueInfrastructireExp: intDataIeik,
            valueBiayaEnergiTahunan: intDataBet
        })
    }

    chartMenu(e, seq){
        let sq = parseInt(seq) - 1
        // let charts = this.chartBase.current.children
        let attr1 = "main-font-size chart-menu"
        let attr2 = "main-font-size gryscale-font-color chart-menu"
        
        /*menu item set style*/
        let menus = document.getElementsByClassName("chart-menu")
        for(let i = 0;i<menus.length;i++){
            menus[i].setAttribute("class", attr2)
        }

        e.target.setAttribute("class", attr1)
        
        this.setState({
            chartNumber: sq
        })
    }

    render(){
        const chartData1 = {
            chart: {
                type: 'spline'
            },
            title: {
                text: '<span class="bold">Cashflow SPKLU '+this.props.startYear.current.value+
                        ' - '+this.props.finishYear.current.value+'</span>'
            },

            xAxis: {
                title:{text: '<span class="bold">Tahun</span>'},
                categories: this.props.data.year
            },

            yAxis: {
                title: {
                   text: '<span class="bold">Rp in kIDR (x 1000)</span>'         
                }      
            },

            // plotOptions: {
            //     series: {
            //         cursor: 'pointer',
            //         point: {
            //             events: {
            //                 click: (event) => {
            //                     // this.test(this.category, this.y)
            //                     console.log(event)
            //                     alert(event.point.index)
            //                     alert(event.point.y)
            //                     // alert ('Category: '+ a.category +', value: '+ a.y);
            //                 }
            //             }
            //         }
            //     }
            // },

            series: [
                {
                    data: this.state.valuecf
                }
            ]
        };

        const chartData2 = {
            chart: {
                type: 'spline'
            },

            title: {
                text: '<span class="bold">Roadmap Kebutuhan SPKLU vs Jumlah EV</span>'
            },

            xAxis: {
                title:{text: '<span class="bold">Tahun</span>'},
                categories: this.props.data.year
            },

            yAxis: {
                title: {
                   text: ''         
                }      
            },

            series: [
                {
                    name    : 'Jumlah EV',
                    color   : 'green',
                    data    : this.state.valuepkl
                }, {
                    name    : 'Jumlah SPKLU',
                    color   : '#F00',
                    data    : this.state.valueSpklu
                }
            ]
        }

        const chartData3 = {
            chart: {
                type: 'spline'
            },

            title: {
                text: '<span class="bold">Chart Biaya Expenses</span>'
            },

            xAxis: {
                title:{text: '<span class="bold">Tahun</span>'},
                categories: this.props.data.year
            },

            yAxis: {
                title: {
                   text: 'Pengeluaran (kIDR)'         
                }      
            },

            series: [
                {
                    name    : 'Biaya Energi Pertahun',
                    color   : 'orange',
                    data    : this.state.valueBiayaEnergiTahunan,
                }, {
                    name: 'Capex untuk belanja SPKLU',
                    color: 'yellow',
                    data: this.state.valueInfrastructireExp
                }
            ]
        }
        return(
            <Fragment>
                <div style={{marginRight: "320px", position: "relative", zIndex: "-1"}}>
                    <div className="main-border" style={{padding: "10px", marginBottom: "5px", background: "#FFF"}}>
                        <a onClick={(e) => this.chartMenu(e, "1")} className="main-font-size chart-menu">Cashflow SPKLU</a>
                        <a onClick={(e) => this.chartMenu(e, "2")} className="main-font-size gryscale-font-color chart-menu" style={{paddingBottom: "10px"}}>Roadmap SPKLU dan EV</a>
                        <a onClick={(e) => this.chartMenu(e, "3")} className="main-font-size gryscale-font-color chart-menu" style={{paddingBottom: "10px"}}>Chart Biaya Expenses</a>
                    </div>
                    {this.state.popup}
                    <div ref={this.chartBase}>
                        <div className="main-border shadow" style={{borderRadius: "4px", overflow: "hidden", marginBottom: "20px"}}>
                            {
                                (this.state.chartNumber == 0) 
                                ?
                                    <HighchartsReact highcharts={Highcharts} options={chartData1} />
                                : "" 
                            }

                            {
                                (this.state.chartNumber == 1) 
                                ?
                                    <HighchartsReact highcharts={Highcharts} options={chartData2} />
                                : "" 
                            }
                            
                            {
                                (this.state.chartNumber == 2) 
                                ?
                                    <HighchartsReact highcharts={Highcharts} options={chartData3} />
                                : "" 
                            }

                        </div>
                    </div>
                </div>
            </Fragment>
            
        )
    }
}

export default charts