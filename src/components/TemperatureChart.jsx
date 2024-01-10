import React, { Component } from 'react'
import Chart from 'chart.js/auto'
import moment from 'moment'

class TemperatureChart extends Component {
  chartRef = React.createRef()
  chart = null

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.destroyChart()
    this.createChart()
  }

  componentWillUnmount() {
    this.destroyChart()
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  createChart() {
    const ctx = this.chartRef.current.getContext('2d')

    const data = this.props.data.map((entry) => ({
      x: moment(entry.date).format('YY MMM DD'),
      y: entry.temperature,
    }))

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((entry) => entry.x),
        datasets: [
          {
            label: 'Lämpötila',
            data: data,
            borderColor: 'rgb(75, 230, 230)',
            borderWidth: 3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
      },
    })
  }

  render() {
    return <canvas ref={this.chartRef} />
  }
}

export default TemperatureChart