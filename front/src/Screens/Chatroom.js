import react from "react";
import {useState} from "react"
import { Button } from "@mui/material";

class Chatroom extends react.Component{
    constructor(props){
        super(props);
        /* this.socket = io('http://localhost:3001') */ //more stuff here
        this.state = {
            text: '',
            messages: [],
            error: "none",
        }
    }

    render(){

        this.props.socket.on('room delete', (data)=>{
            //console.log("REACHED HERE")
            if(data.msg == "failed message"){
                this.setState({error:"exists"})
            }
        })

        this.props.socket.on('load history', (history)=>{
            //console.log("HISTORY", history)
            this.setState({messages:history});
        })

        return(
            <div>
                {/* show chats */}
                <ul>
                    {this.state.messages.map((message)=><li> {message.sender.name}: {message.message.text} </li>)}
                </ul>
                {/* show chat input box*/}
                {this.state.error === "none" ? 
                    <input type="text" id="text" onChange={(e)=>{this.setState({text:e.target.value})}}/>
                    : <div>Room does not exist anymore. Please press back button. </div>} 

                {this.state.error === "none" ?
                    <button onClick={()=>this.props.sendChat(this.state.text)}>send</button>
                    : <div></div>}
                
                {this.state.error === "none" ? 
                    Chatroom
                    : <div></div>}
                <Button onClick={() => this.props.goBack()}> back </Button>
            </div>
        );
    }
}

export default Chatroom;