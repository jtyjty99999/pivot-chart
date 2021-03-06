import React, { Component } from 'react';
import PivotTable from './components/pivot/index.js'
import 'whatwg-fetch';
import URL from './api.config.js'
import './App.css'
function avg (subset, MEASURES) {
  let sums = {}
  MEASURES.forEach((mea) => {
    sums[mea] = 0
  })
  subset.forEach((record) => {
    MEASURES.forEach((mea) => {
      sums[mea] += (Number(record[mea]) || 0)
    })
  })
  MEASURES.forEach((mea) => {
    // let value = (sums[mea] / subset.length).toFixed(2)
    // let color = value > 1000 ? 'red' : 'green'
    // sums[mea] = (<span style={{color: color}}>{value}</span>)
    sums[mea] = (sums[mea] / subset.length).toFixed(2)
  })
  return sums
}
class App extends Component {
  constructor () {
    super()
    this.state = {
      dataSource: [],
      Dimensions: [],
      Measures: [],
      aggFunc: avg
    }
  }
  componentDidMount () {
    let self = this
    fetch(URL, {
      method: 'get'
    }).then((res) => {
      return res.json()
    }).then((res) => {
      self.setState({
        dataSource: res.dataSource,
        Dimensions: res.config.Dimensions,
        Measures: res.config.Measures
      })
    })
  }
  render() {
    return (
      <div className="demo-container">
        <div className="demo-segment">
          <PivotTable 
          // height={700}
          size={'middle'}
          aggFunc={this.state.aggFunc}
          dataSource={this.state.dataSource}
          Dimensions={this.state.Dimensions.slice(3)} 
          Measures={this.state.Measures} />
        </div>
      </div>
    );
  }
}

export default App;