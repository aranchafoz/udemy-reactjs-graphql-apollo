import React, { Component } from 'react';

import { UPDATE_CUSTOMER } from '../../mutations'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

class EditCustomerForm extends Component {

  state =  {
    customer: this.props.customer,
    emails: this.props.customer.emails
  }

  newField = () => {
    this.setState({
      emails: this.state.emails.concat([{email:''}])
    })
  }

  readField = i => e => {
    const newMail = this.state.emails.map((email, index) => {
        if (i !== index) return email;
        return { ...email, email: e.target.value };
    });
    this.setState({ emails: newMail });
  }

  removeField = i => () => {
    this.setState({
      emails: this.state.emails.filter((s, index) => i !== index)
    });
  }

  render() {
    const {name, surname, company, age, type} = this.state.customer
    const {emails} = this.state;

    return (
      <Mutation
        mutation={UPDATE_CUSTOMER}
        onCompleted={() => this.props.refetch().then(() => {
          this.props.history.push('/customers')
        })}
      >
        {updateCustomer => (
          <form className="col-md-8 m-3" onSubmit={e => {
              e.preventDefault()

              const {id, name, surname, company, age, type} = this.state.customer

              const {emails} = this.state

              const input = {
                id,
                name,
                surname,
                company,
                age: Number(age),
                type,
                emails
              }

              updateCustomer({variables: {input}})
            }}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={name}
                    onChange={e => {
                      this.setState({customer: {
                        ...this.state.customer,
                        name: e.target.value
                      }})
                    }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Surname</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={surname}
                    onChange={e => {
                      this.setState({customer: {
                        ...this.state.customer,
                        surname: e.target.value
                      }})
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
                    defaultValue={company}
                    onChange={e => {
                      this.setState({customer: {
                        ...this.state.customer,
                        company: e.target.value
                      }})
                    }}
                />
              </div>

              {emails.map((input, index) => (
                  <div key={index} className="form-group col-md-12">
                      <label>Email {index + 1} : </label>
                      <div className="input-group">

                          <input
                              type="email"
                              placeholder={`Email`}
                              className="form-control"
                              onChange={this.readField(index)}
                              defaultValue={input.email}
                          />
                          <div className="input-group-append">
                              <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={this.removeField(index)}>
                                  &times; Delete
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
                  >+ Add Email</button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Age</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={age}
                    onChange={e => {
                      this.setState({customer: {
                        ...this.state.customer,
                        age: e.target.value
                      }})
                    }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Customer Type</label>
                <select
                    className="form-control"
                    value={type}
                    onChange={e => {
                      this.setState({customer: {
                        ...this.state.customer,
                        type: e.target.value
                      }})
                    }}
                >
                  <option value="">Choose...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASICO">BASIC</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">Save Changes</button>
          </form>
        )}
      </Mutation>

    )
  }
}

export default withRouter(EditCustomerForm)
