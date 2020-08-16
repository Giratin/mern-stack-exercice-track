import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      /*created : undefined*/
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      showFailAlert : false,
      showSuccessAlert : false
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    axios.post('http://localhost:5000/users/add', user)
      .then((res) => {
        res.data.created ? this.setState({ username: '', showSuccessAlert: true }) : this.setState({ showFailAlert: true })
        console.log(this.state)
      });

  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          {this.state.showSuccessAlert &&  <div className="alert alert-success"> Username added </div> }
          {this.state.showFailAlert &&  <div className="alert alert-danger"> Username duplicated </div> }

          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}