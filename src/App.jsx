import React, { Component } from 'react'
import './App.css'
import TemperatureChart from './components/TemperatureChart'
import TemperatureForm from './components/TemperatureForm'
import RefreshButton from './components/RefreshButton'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [], // Tyhjä taulukko lämpötiloille
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/temperatureData');
      const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
      this.setState({ data: sortedData })
    } catch (error) {
      console.error('Ongelma lämpötiladatan haussa:', error)
    }
  }

  addTemperatureData = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/temperatureData', data)
      this.setState((prevState) => ({ data: [...prevState.data, response.data] }))
    } catch (error) {
      console.error('Ongelma lämpötiladatan lisäämisessä:', error)
    }
  }

  handleRefresh = () => {
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <h1>Lämpötila kaavio</h1>
        <TemperatureChart data={this.state.data} />
        <TemperatureForm onSubmit={this.addTemperatureData} /> 
        <RefreshButton onClick={this.handleRefresh} />
      </div>
    )
  }
}

export default App