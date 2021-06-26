import React, { Component } from 'react'

class SlideForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      firstname: '',
      lastname: '',
      address: '',
      usergender: '',
    }
  }
  resetState() {
    this.setState({
      currentStep: 1,
      firstname: '',
      lastname: '',
      address: '',
      usergender: '',
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { firstname, lastname, address, usergender } = this.state
    alert(`Twoje dane: \n 
             Imię: ${firstname} \n 
             Nazwisko: ${lastname} \n
             Adres: ${address} \n
             Płeć: ${usergender}`)
    fetch('https://localhost:5001/api/form', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        address: address,
        usergender: usergender,
      }),
    })
    this.resetState()
  }

  next = () => {
    let currentStep = this.state.currentStep
    currentStep = 2
    this.setState({
      currentStep: currentStep,
    })
  }

  prev = () => {
    let currentStep = this.state.currentStep
    currentStep = 1
    this.setState({
      currentStep: currentStep,
    })
  }

  previousButton() {
    let currentStep = this.state.currentStep
    if (currentStep !== 1) {
      return (
        <button className="btn btn-secondary" type="button" onClick={this.prev}>
          Cofnij
        </button>
      )
    }
    return null
  }

  nextButton() {
    let currentStep = this.state.currentStep
    if (currentStep < 2) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this.next}
        >
          Dalej
        </button>
      )
    }
    return null
  }

  render() {
    return (
      <React.Fragment>
        <h1>Formularz użytkownika</h1>
        <p>Krok {this.state.currentStep} </p>

        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            address={this.state.address}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            usergender={this.state.usergender}
          />
          {this.previousButton()}
          {this.nextButton()}
        </form>
      </React.Fragment>
    )
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (
    <div className="form-group">
      <label htmlFor="firstname">Imię</label>
      <input
        className="form-control"
        id="firstname"
        name="firstname"
        type="text"
        placeholder="Podaj swoję imię"
        value={props.firstname}
        onChange={props.handleChange}
      />
      <label htmlFor="lastname">Nazwisko</label>
      <input
        className="form-control"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Podaj swoje nazwisko"
        value={props.lastname}
        onChange={props.handleChange}
      />
      <label htmlFor="address">Adres</label>
      <input
        className="form-control"
        id="address"
        name="address"
        type="text"
        placeholder="Podaj swój adres"
        value={props.address}
        onChange={props.handleChange}
      />
    </div>
  )
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="gender">Płeć</label>
        <select
          className="form-control"
          id="usergender"
          name="usergender"
          type="text"
          placeholder="Podaj swoją płeć"
          value={props.usergender}
          onChange={props.handleChange}
        >
          <option>Kobieta</option>
          <option>Mężczyczna</option>
          <option>Nie chcę podawać</option>
        </select>
      </div>
      <button className="btn btn-success btn-block">Wyślij</button>
    </React.Fragment>
  )
}

export default SlideForm
