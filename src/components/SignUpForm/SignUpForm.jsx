import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import "../LoginForm/LoginForm.css";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
    userID: Math.floor(Math.random() * 10000),
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An Error occurred
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: "",
    });
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="signUpForm-container">
        <div className="form-container">
          <form className="signUpForm-form" autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="signUpForm-input-container">
              <label className="signUpForm-input-label">Name</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className="signUpForm-input-container">
              <label className="signUpForm-input-label">Email</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className="signUpForm-input-container">
              <label className="signUpForm-input-label">Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className="signUpForm-input-container">
              <label className="signUpForm-input-label">Confirm</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <button className="signUpForm-button" type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
