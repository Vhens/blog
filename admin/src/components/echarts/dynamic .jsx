import React, { Component } from 'react';
import ReactEcharts from './echarts';
export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  timeTicket = null;
  count = 11;
  getInitialState = () => ({option: this.getOption()});

  fetchNewDate = () => {
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    let option = this.state.option;
    option.title.text = '每日动态数据收集' + new Date().getSeconds();
    let data0 = option.series[0].data;
    let data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(this.count++);
    this.setState({option: option});
  };

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  };

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };

  getOption = () => ({
    title: {
      text:'每日动态数据收集',
    },
    tooltip: {
      trigger: 'cross'
    },
    legend: {
      data:['云数据', '收藏']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom:30
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let now = new Date();
          let res = [];
          let len = 10;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(now - 2000);
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let res = [];
          let len = 20;
          while (len--) {
            res.push(20 - len + 1);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '云数据',
        max: 20,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: '收藏',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name:'云数据队列',
        type:'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          }
        },
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        },
        data:(function (){
          let res = [];
          let len = 20;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })()
      },
      {
        name:'收藏量',
        type:'line',
        data:(function (){
          let res = [];
          let len = 0;
          while (len < 10) {
            res.push((Math.random()*10 + 5).toFixed(1) - 0);
            len++;
          }
          return res;
        })()
      }
    ]
  });

  render() {
    let code = "<ReactEcharts ref='echartsInstance' \n" +
    "  option={this.state.option} />\n";

    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts ref='echarts_react'
            option={this.state.option}
            style={{height: 400}} />
          <label> 博客后台系统数据统计图表</label>
        </div>
      </div>
    );
  }
}