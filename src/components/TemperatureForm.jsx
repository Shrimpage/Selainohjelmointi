import React, { Component } from 'react'

class TemperatureForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      temperature: '',
    }
  }

  handleDateChange = (event) => {
    this.setState({ date: event.target.value })
  }

  handleTemperatureChange = (event) => {
    this.setState({ temperature: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { date, temperature } = this.state
    this.props.onSubmit({ date, temperature })
    this.setState({ date: '', temperature: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="date"
          value={this.state.date}
          onChange={this.handleDateChange}
          required
        />
        <input
          type="number"
          value={this.state.temperature}
          onChange={this.handleTemperatureChange}
          required
        />
        <button type="submit">Lisää mittaus</button>
      </form>
    )
  }
}

export default TemperatureForm