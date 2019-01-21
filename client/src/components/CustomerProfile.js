import React from 'react';

class CustomerProfile extends React.Component {
  
  state = {
    custname: "",
    email: "",
    address: "" 
  }

  Change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.setState({
      custname: "",
      email: "",
      address: ""
    });
  };

  
  
  
    render() {
      return (
        <form>
          <input 
              name="custname"
              placeholder="CustName" 
              value={this.state.custname} 
              onChange={e => this.Change(e)} 
          />
          <br/>
          <input 
              name="email"
              placeholder="Email" 
              value={this.state.email} 
              onChange={e => this.Change(e)} 
          />
          <br/>
          <input 
              name="address"
              placeholder="Address" 
              value={this.state.address} 
              onChange={e => this.Change(e)}
          />
          <br/>
          <button onClick={e => this.onSubmit(e)}>Submit</button>
        </form>
      );
    }
  


}

export default CustomerProfile;