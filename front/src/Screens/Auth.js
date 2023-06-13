import react from "react";
import Form from "../Components/form.js";
import '../Styles/Auth.css';
import { Button } from "@mui/material";

class Auth extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            showForm: false,
            selectedForm: undefined,
        }
    }

    closeForm = () => {
        this.setState({showForm: false});
    }

    login = (data) => {
        fetch(this.props.server_url + '/api/auth/login', {
            method: "POST",
            mode: 'cors',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            res.json().then((data) => {
                if (data.msg == "Logged in"){
                    this.props.changeScreen("lobby");
                }
                else{
                    alert(data.msg);
                }
            });
        });
    }

    register = (data) => {
        fetch(this.props.server_url + "/api/auth/signup", {
            method: "POST",
            mode: 'cors',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            res.json().then((data) => {
                if (data.msg !== "Username already exists. Please choose another username."){
                    this.login({username:data.username, password:data.password})
                }
                else{
                    alert(data.msg);
                }
            });
        });
    }

    render() {
        let display = null;
        if (this.state.showForm) {
          let formComponent = null;
          if (this.state.selectedForm === "login") {
            const fields = ["username", "password"];
            formComponent = (
              <Form
                fields={fields}
                close={this.closeForm}
                type="login"
                submit={this.login}
                key={this.state.selectedForm}
              />
            );
          } else if (this.state.selectedForm === "register") {
            const fields = ["username", "password", "name"];
            formComponent = (
              <Form
                fields={fields}
                close={this.closeForm}
                type="register"
                submit={this.register}
                key={this.state.selectedForm}
              />
            );
          }
    
          display = (
            <div className="auth-form-container">
              <div className="auth-form">
                {formComponent}
              </div>
            </div>
          );
        } else {
          display = (
            <div className="auth-buttons">
              <Button
                className="auth-button"
                onClick={() =>
                  this.setState({ showForm: true, selectedForm: "login" })
                }
              >
                Login
              </Button>
              <Button
                className="auth-button"
                onClick={() =>
                  this.setState({ showForm: true, selectedForm: "register" })
                }
              >
                Register
              </Button>
            </div>
          );
        }
        return (
          <div className="auth-container">
            <h1 className="auth-title">Welcome to our website!</h1>
            {display}
          </div>
        );
      }
    }
    
    export default Auth;