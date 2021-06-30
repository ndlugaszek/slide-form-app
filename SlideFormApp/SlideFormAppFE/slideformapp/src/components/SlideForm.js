import React, { Component } from 'react'

class SlideForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      firstname: null,
      lastname: null,
      address: null,
      usergender: null,
    }
  }
  resetState() {
    this.setState({
      currentStep: 1,
      firstname: null,
      lastname: null,
      address: null,
      usergender: null,
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
    // Checking that the fields are not empty or null
    if (this.state.firstname === null || this.state.firstname.length === 0) {
      this.prev()
      return alert("The first name is empty! Please fill the field.")
    }
    if (this.state.lastname === null || this.state.firstname.length === 0) {
      this.prev()
      return alert("The last name is empty! Please fill the field.")
    }
    if (this.state.address === null || this.state.firstname.length === 0) {
      this.prev()
      return alert("The address is empty! Please fill the field.")
    }
    if (this.state.usergender === null) {
      return alert("The gender is not selected! Please select the gender.")
    }
    alert(`Twoje dane: \n 
             Imię: ${firstname} \n 
             Nazwisko: ${lastname} \n
             Adres: ${address} \n
             Płeć: ${usergender}`)
    fetch('http://localhost:5000/api/form', {
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
    .then(response => response.json())
    .then(data=>{
      console.log("Success:", data);
    }).catch((err)=>{
      console.error("Error: ", err);
    });
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
        <button type="button" onClick={this.prev}>
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
    <div>
      <label htmlFor="firstname">Imię</label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        placeholder="Podaj swoję imię"
        value={props.firstname}
        onChange={props.handleChange}
      />
      <label htmlFor="lastname">Nazwisko</label>
      <input
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Podaj swoje nazwisko"
        value={props.lastname}
        onChange={props.handleChange}
      />
      <label htmlFor="address">Adres</label>
      <input
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
      <div>
        <label htmlFor="gender">Płeć</label>
        <select
          id="usergender"
          name="usergender"
          type="text"
          placeholder="Podaj swoją płeć"
          value={props.usergender}
          onChange={props.handleChange}
        >
          <option> </option>
          <option>Nie chcę podawać</option>
          <option>Kobieta</option>
          <option>Mężczyzna</option>

        </select>
      </div>
      <button>Wyślij</button>
    </React.Fragment>
  )
}

export default SlideForm
