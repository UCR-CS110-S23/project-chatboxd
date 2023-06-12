import react from "react";
import Auth from './Screens/Auth.js';
import Lobby from "./Screens/Lobby.js";
import Chatroom from "./Screens/Chatroom.js";
import { Button } from "@mui/material";

const server_url = "http://localhost:3001";


class ScreenHandler extends react.Component{
    constructor(props){
        super(props);

        this.state = {
            screen: undefined,
        }
    }

    componentDidMount(){
        // checking if the user has active session
        // if yes, then show lobby. if no, then show auth
        fetch(server_url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then((data) => {
                if (data.message == "logged in"){
                    this.setState({screen: "lobby"});
                }
                else{
                    this.setState({screen: "auth"});
                }
            });
        });
    }

    changeScreen = (screen) => {
        this.setState({screen: screen});
    }

    logout = () => {
        fetch(server_url + '/api/auth/logout', {
            method: "POST",
            mode: 'cors',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            /* body: JSON.stringify(data), */
        }).then((res) => {
            res.json().then((data) => {
                if (data.msg == "Logged out"){
                    this.setState({screen: "auth"})
                }
                else{
                    alert(data.msg);
                }
            });
        }); 
    }

    render(){
        let display = "loading...";
        if (this.state.screen == "auth"){
            display = <Auth server_url = {server_url} 
            changeScreen={this.changeScreen}/>;
        }
        else if (this.state.screen == "lobby"){
            display = <Lobby server_url = {server_url}/>;
        }
        else if (this.state.screen == "chatroom"){
            display = <Chatroom server_url = {server_url}/>;
        }
        return(
            <div>
                {this.state.screen !== "auth" ?
                    <Button variant="contained" onClick={this.logout}> log out </Button>
                    : <div></div>}
                {display}
            </div>
        );
    }
}

export default ScreenHandler;
