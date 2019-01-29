import React, { Component, Fragment} from 'react';

import { NEW_CUSTOMER } from '../mutations'
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
    }
  }

  render() {
    return (
      <Fragment>
        <h2 className="text-center">New Customer</h2>
        <div className="row justify-content-center">
          <Mutation mutation={NEW_CUSTOMER}>
            { createCustomer => (
              <form
                className="col-md-8 m-3"
                onSubmit={ e => {
                  e.preventDefault()
                  const {name, surname, company, age, type, email } = this.state.customer

                  const input = {
                    name,
                    surname,
                    company,
                    age: Number(age),
                    email,
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
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={e => {
                            this.setState({
                              customer: {
                                ...this.state.customer,
                                email: e.target.value
                              }
                            })
                          }}
                        />
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
                <button type="submit" className="btn btn-success float-right">Save Changes</button>
              </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    )
  }
}

export default NewCustomer
