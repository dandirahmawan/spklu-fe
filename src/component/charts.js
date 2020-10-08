import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class charts extends React.Component{
    render(){
        const chartData1 = {
            chart: {
                type: 'spline'
            },
            title: {
                text: '<span class="bold">Cashflow SPKLU 2020 - 2030</span>'
            },

            xAxis: {
                title:{text: '<span class="bold">Tahun</span>'},
                categories: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
            },

            yAxis: {
                title: {
                   text: '<span class="bold">Rp in kIDR (x 1000)</span>'         
                }      
            },

            series: [
                {
                    data: [-1000000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000]
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
                categories: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
            },

            yAxis: {
                title: {
                   text: '<span class="bold">Rp in kIDR (x 1000)</span>'         
                }      
            },

            series: [
                {
                    name    : 'Jumlah EV',
                    color   : 'green',
                    data    : [-1000000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000],
                }, {
                    name    : 'Jumlah SPKLU',
                    color   : '#F00',
                    data    : [1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000]
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
                categories: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
            },

            yAxis: {
                title: {
                   text: '<span class="bold">Rp in kIDR (x 1000)</span>'         
                }      
            },

            series: [
                {
                    name    : 'Biaya Energi Pertahun',
                    color   : 'orange',
                    data    : [-1000000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000],
                }, {
                    name: 'Capex untuk belanja SPKLU',
                    color: 'yellow',
                    data: [1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000]
                }
            ]
        }
        return(
            <div style={{marginRight: "320px", position: "relative", zIndex: "-1"}}>
                <div className="main-border shadow" style={{borderRadius: "4px", overflow: "hidden", marginBottom: "20px"}}>
                    <HighchartsReact highcharts={Highcharts} options={chartData1} />
                </div>
                <div className="main-border shadow" style={{borderRadius: "4px", overflow: "hidden", marginBottom: "20px"}}>
                    <HighchartsReact highcharts={Highcharts} options={chartData2} />
                </div>
                <div className="main-border shadow" style={{borderRadius: "4px", overflow: "hidden", marginBottom: "20px"}}>
                    <HighchartsReact highcharts={Highcharts} options={chartData3} />
                </div>
            </div>
        )
    }
}

export default charts