import React, { Component, Fragment} from 'react';

import { NEW_CUSTOMER } from '../../mutations'
import { Mutation } from 'react-apollo'

class NewCustomer extends Component {
  state = {
    customer: {
      name: '',
      surname: '',
      company: '',
      age: '',
      email: '',
      type: ''
    },
    error: false,
    emails: []
  }

  readField = i => (e) => {
    console.log(`en ${i} se escribe ${e.value}`)
    const newEmail = this.state.emails.map((email, index) => {
      if(i !== index) return email
      return {
        ...email,
        email: e.target.value
      }
    })
    this.setState({emails: newEmail})
  }

  newField = () => {
    this.setState({
      emails: this.state.emails.concat([{email:''}])
    })
  }

  removeField = (i) => () => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    })
  }

  render() {
    const {error} = this.state
    let response = (error) ? <p className="alert alert-danger p-3 text-center">All fields are mandatory</p> : ''

    return (
      <Fragment>
        <h2 className="text-center">New Customer</h2>
        {response}
        <div className="row justify-content-center">
          <Mutation
            mutation={NEW_CUSTOMER}
            onCompleted={() => this.props.history.push('/')}
          >
            { createCustomer => (
              <form
                className="col-md-8 m-3"
                onSubmit={ e => {
                  e.preventDefault()
                  const {name, surname, company, age, type } = this.state.customer

                  const {emails} = this.state

                  if(name === '' || surname === '' || company === '' || age === '' || type === '') {
                    this.setState({
                      error: true
                    })
                    return;
                  }

                  this.setState({
                    error: false
                  })

                  const input = {
                    name,
                    surname,
                    company,
                    age: Number(age),
                    emails,
                    type
                  }
                  createCustomer({
                    variables: {input}
                  })
                }}
                >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={e => {
                          this.setState({
                            customer: {
                              ...this.state.customer,
                              name: e.target.value
                            }
                          })
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Surname</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Surname"
                        onChange={e => {
                          this.setState({
                            customer: {
                              ...this.state.customer,
                              surname: e.target.value
                            }
                          })
                        }}
                      />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Company</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company"
                        onChange={e => {
                          this.setState({
                            customer: {
                              ...this.state.customer,
                              company: e.target.value
                            }
                          })
                        }}
                      />
                    </div>
                    {this.state.emails.map((input, index) => (
                      <div key={index} className="form-group col-md-12">
                        <label>Correo {index + 1}:</label>
                      <div className="input-group">
                        <input
                            onChange={this.readField(index)}
                            type="email"
                            placeholder="Email"
                            className="form-control"
                          />
                        <div className="input-group-append">
                          <button
                            onClick={this.removeField(index)}
                            type="button"
                            className="btn btn-danger"
                          >
                            x Delete
                          </button>
                        </div>
                      </div>

                      </div>
                    ))}
                    <div className="form-group d-flex justify-content-center col-md-12">
                      <button
                        onClick={this.newField}
                        type="button"
                        className="btn btn-warning"
                        >
                        + Add email
                      </button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Age</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Age"
                        onChange={e => {
                          this.setState({
                            customer: {
                              ...this.state.customer,
                              age: e.target.value
                            }
                          })
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Customer Type</label>
                        <select
                          onChange={e => {
                            this.setState({
                              customer: {
                                ...this.state.customer,
                                type: e.target.value
                              }
                            })
                          }}
                          className="form-control">
                            <option value="">Choose...</option>
                            <option value="PREMIUM">PREMIUM</option>
                          <option value="BASIC">BASIC</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Create Customer</button>
              </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    )
  }
}

export default NewCustomer
